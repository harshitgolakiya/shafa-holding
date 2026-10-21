"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  bootstrapAdmin,
  checkCredentials,
  clearThrottle,
  createUser,
  endSession,
  isThrottled,
  requireUser,
  setPassword,
  startSession,
  validatePassword,
} from "@/cms/auth";
import { resetContent, saveContent } from "@/cms/content";
import { execute } from "@/cms/db";
import { defaultContent, type ContentKey } from "@/cms/defaults";
import { deleteMedia } from "@/cms/media";
import { deleteSubmission, setSubmissionStatus, type SubmissionStatus } from "@/cms/submissions";

export type FormState = { ok?: boolean; message?: string; email?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAction(_state: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isThrottled(`login:${ip}`, 10, 15 * 60_000)) {
    return { email, message: "Too many sign-in attempts. Please wait 15 minutes and try again." };
  }

  try {
    await bootstrapAdmin();
    const user = await checkCredentials(email, password);
    if (!user) return { email, message: "Incorrect email or password." };
    clearThrottle(`login:${ip}`);
    await startSession(user.id);
  } catch (error) {
    console.error("[cms] Sign-in failed", error);
    return { email, message: "Could not connect to the database. Check the server configuration." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

function isContentKey(key: string): key is ContentKey {
  return Object.hasOwn(defaultContent, key);
}

export async function saveDocumentAction(key: string, data: unknown): Promise<FormState> {
  const user = await requireUser();
  if (!isContentKey(key)) return { message: "Unknown document." };

  try {
    await saveContent(key, data, user.id);
  } catch (error) {
    console.error("[cms] Save failed", error);
    return { message: "Saving failed. Please try again." };
  }
  revalidatePath("/", "layout");
  return { ok: true, message: "Changes published." };
}

export async function resetDocumentAction(key: string): Promise<FormState> {
  await requireUser();
  if (!isContentKey(key)) return { message: "Unknown document." };
  await resetContent(key);
  revalidatePath("/", "layout");
  return { ok: true, message: "Restored the original content." };
}

const statuses: SubmissionStatus[] = ["new", "read", "archived"];

export async function setSubmissionStatusAction(id: number, status: SubmissionStatus) {
  await requireUser();
  if (!statuses.includes(status)) return;
  await setSubmissionStatus(id, status);
  revalidatePath("/admin", "layout");
}

export async function deleteSubmissionAction(id: number) {
  await requireUser();
  await deleteSubmission(id);
  revalidatePath("/admin", "layout");
  redirect("/admin/inbox");
}

export async function deleteMediaAction(id: number) {
  await requireUser();
  await deleteMedia(id);
  revalidatePath("/admin/media");
}

export async function createUserAction(_state: FormState, formData: FormData): Promise<FormState> {
  await requireUser();
  const name = field(formData, "name");
  const email = field(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2 || name.length > 120) return { message: "Enter the user’s name." };
  if (!emailPattern.test(email) || email.length > 254) return { message: "Enter a valid email address." };
  const passwordError = validatePassword(password);
  if (passwordError) return { message: passwordError };

  try {
    await createUser({ name, email, password });
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") return { message: "A user with this email already exists." };
    throw error;
  }
  revalidatePath("/admin/users");
  return { ok: true, message: `${name} can now sign in.` };
}

export async function changePasswordAction(_state: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!(await checkCredentials(user.email, current))) return { message: "Your current password is incorrect." };
  if (next !== confirm) return { message: "The new passwords don’t match." };
  const passwordError = validatePassword(next);
  if (passwordError) return { message: passwordError };

  // Changing the password signs out every session, so start a fresh one for this browser.
  await setPassword(user.id, next);
  await startSession(user.id);
  return { ok: true, message: "Password updated." };
}

export async function deleteUserAction(id: number) {
  const user = await requireUser();
  if (id === user.id) return;
  await execute("DELETE FROM cms_users WHERE id = ?", [id]);
  revalidatePath("/admin/users");
}
