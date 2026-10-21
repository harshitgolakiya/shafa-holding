import "server-only";
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import { execute, query, type RowDataPacket } from "./db";

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = "shafa_cms_session";
const SESSION_DAYS = 7;

export type CmsUser = { id: number; email: string; name: string };

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await scrypt(password, Buffer.from(salt, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function validatePassword(password: string) {
  if (password.length < 10) return "Password must be at least 10 characters.";
  if (password.length > 200) return "Password is too long.";
  return null;
}

export async function countUsers() {
  const rows = await query<RowDataPacket & { total: number }>("SELECT COUNT(*) AS total FROM cms_users");
  return Number(rows[0]?.total ?? 0);
}

/** Creates the first administrator from CMS_ADMIN_EMAIL / CMS_ADMIN_PASSWORD when the user table is empty. */
export async function bootstrapAdmin() {
  const email = process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.CMS_ADMIN_PASSWORD;
  if (!email || !password || (await countUsers()) > 0) return;
  await createUser({ email, name: process.env.CMS_ADMIN_NAME?.trim() || "Administrator", password });
}

export async function createUser({ email, name, password }: { email: string; name: string; password: string }) {
  await execute("INSERT INTO cms_users (email, name, password_hash) VALUES (?, ?, ?)", [
    email.trim().toLowerCase(),
    name.trim(),
    await hashPassword(password),
  ]);
}

export async function setPassword(userId: number, password: string) {
  await execute("UPDATE cms_users SET password_hash = ? WHERE id = ?", [await hashPassword(password), userId]);
  await execute("DELETE FROM cms_sessions WHERE user_id = ?", [userId]);
}

export async function checkCredentials(email: string, password: string): Promise<CmsUser | null> {
  const rows = await query<RowDataPacket & CmsUser & { password_hash: string }>(
    "SELECT id, email, name, password_hash FROM cms_users WHERE email = ?",
    [email.trim().toLowerCase()],
  );
  const user = rows[0];
  if (!user) {
    // Spend comparable time so response timing doesn't reveal which emails exist.
    await hashPassword(password);
    return null;
  }
  if (!(await verifyPassword(password, user.password_hash))) return null;
  return { id: user.id, email: user.email, name: user.name };
}

export async function startSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 86_400_000);
  await execute("INSERT INTO cms_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)", [hashToken(token), userId, expires]);
  await execute("UPDATE cms_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?", [userId]);
  await execute("DELETE FROM cms_sessions WHERE expires_at < CURRENT_TIMESTAMP");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function endSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await execute("DELETE FROM cms_sessions WHERE token_hash = ?", [hashToken(token)]);
  jar.delete(SESSION_COOKIE);
}

export const getCurrentUser = cache(async (): Promise<CmsUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await query<RowDataPacket & CmsUser>(
    `SELECT u.id, u.email, u.name FROM cms_sessions s JOIN cms_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND s.expires_at > CURRENT_TIMESTAMP`,
    [hashToken(token)],
  );
  return rows[0] ?? null;
});

/**
 * Use at the top of every admin page and server action. Signed-out visitors get a plain 404,
 * so the CMS isn't advertised anywhere except /admin/login.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) notFound();
  return user;
}

// Simple in-memory throttle for login attempts, per client address.
const attempts = new Map<string, { count: number; resetAt: number }>();

export function isThrottled(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export function clearThrottle(key: string) {
  attempts.delete(key);
}
