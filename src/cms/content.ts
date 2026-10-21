import "server-only";
import { connection } from "next/server";
import { cache } from "react";
import { execute, isDatabaseConfigured, query, type RowDataPacket } from "./db";
import { defaultContent, type BusinessCategory, type ContentKey, type ContentMap } from "./defaults";

type StoredContent = Partial<Record<ContentKey, unknown>>;

// Content rarely changes, so each server process keeps a short-lived copy. Saves clear it
// immediately in the saving process; other processes pick changes up within the TTL.
const CACHE_TTL_MS = 15_000;
let processCache: { at: number; data: StoredContent } | null = null;

async function loadStoredContent(): Promise<StoredContent> {
  if (!isDatabaseConfigured()) return {};
  if (processCache && Date.now() - processCache.at < CACHE_TTL_MS) return processCache.data;

  try {
    const rows = await query<RowDataPacket & { content_key: string; data: unknown }>(
      "SELECT content_key, data FROM cms_content",
    );
    const data: StoredContent = {};
    for (const row of rows) {
      data[row.content_key as ContentKey] = typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    }
    processCache = { at: Date.now(), data };
    return data;
  } catch (error) {
    // Keep the public site online with built-in content if the database is unreachable.
    console.error("[cms] Failed to load content, falling back to defaults", error);
    return processCache?.data ?? {};
  }
}

const loadAll = cache(async () => {
  await connection();
  return loadStoredContent();
});

/** Overlays saved values onto the defaults, keeping the default wherever the saved shape doesn't match. */
export function mergeContent<T>(fallback: T, saved: unknown): T {
  if (saved === undefined || saved === null) return fallback;
  if (Array.isArray(fallback)) {
    if (!Array.isArray(saved)) return fallback;
    // Default lists in this project are either strings or objects sharing one shape.
    const sample = fallback[0];
    if (sample === undefined) return saved.filter((item) => typeof item === "string") as T;
    return saved.map((item) => mergeContent(blank(sample), item)) as T;
  }
  if (typeof fallback === "object" && fallback !== null) {
    if (typeof saved !== "object" || Array.isArray(saved)) return fallback;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fallback)) {
      result[key] = mergeContent(value, (saved as Record<string, unknown>)[key]);
    }
    return result as T;
  }
  return (typeof saved === typeof fallback ? saved : fallback) as T;
}

function blank<T>(template: T): T {
  if (Array.isArray(template)) return [] as T;
  if (typeof template === "object" && template !== null) {
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, blank(value)])) as T;
  }
  if (typeof template === "number") return 0 as T;
  if (typeof template === "boolean") return false as T;
  return "" as T;
}

export async function getContent<K extends ContentKey>(key: K): Promise<ContentMap[K]> {
  const stored = await loadAll();
  return mergeContent(defaultContent[key], stored[key]);
}

export async function getBusinesses() {
  const [investment, construction] = await Promise.all([getContent("investment"), getContent("construction")]);
  return {
    investment: investment.businesses.map((business) => ({ ...business, category: "investment" as BusinessCategory })),
    construction: construction.businesses.map((business) => ({ ...business, category: "construction" as BusinessCategory })),
  };
}

export type BusinessNavigation = Awaited<ReturnType<typeof getBusinesses>>;

/** Reads a document for the editor straight from the database, bypassing the process cache. */
export async function getContentForEditor<K extends ContentKey>(key: K) {
  const rows = await query<RowDataPacket & { data: unknown; updated_at: Date; updated_by_name: string | null }>(
    `SELECT c.data, c.updated_at, u.name AS updated_by_name
       FROM cms_content c LEFT JOIN cms_users u ON u.id = c.updated_by
      WHERE c.content_key = ?`,
    [key],
  );
  const row = rows[0];
  const saved = row ? (typeof row.data === "string" ? JSON.parse(row.data) : row.data) : undefined;
  return {
    data: mergeContent(defaultContent[key], saved),
    updatedAt: row?.updated_at ?? null,
    updatedBy: row?.updated_by_name ?? null,
  };
}

export async function saveContent(key: ContentKey, data: unknown, userId: number) {
  const value = mergeContent(defaultContent[key], data);
  await execute(
    `INSERT INTO cms_content (content_key, data, updated_by) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data), updated_by = VALUES(updated_by)`,
    [key, JSON.stringify(value), userId],
  );
  processCache = null;
}

export async function resetContent(key: ContentKey) {
  await execute("DELETE FROM cms_content WHERE content_key = ?", [key]);
  processCache = null;
}

export async function listContentUpdates() {
  return query<RowDataPacket & { content_key: ContentKey; updated_at: Date; updated_by_name: string | null }>(
    `SELECT c.content_key, c.updated_at, u.name AS updated_by_name
       FROM cms_content c LEFT JOIN cms_users u ON u.id = c.updated_by`,
  );
}
