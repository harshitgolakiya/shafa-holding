import "server-only";
import { execute, query, type RowDataPacket } from "./db";

// Images live in the database rather than on disk so they survive redeploys, which replace the app folder.
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export type MediaItem = { id: number; filename: string; mime_type: string; size: number; created_at: Date };

export function mediaUrl(item: Pick<MediaItem, "id" | "filename">) {
  return `/media/${item.id}/${encodeURIComponent(item.filename)}`;
}

export function safeFilename(name: string) {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return cleaned.slice(-120) || "image";
}

export async function saveMedia({ filename, mimeType, data, userId }: { filename: string; mimeType: string; data: Buffer; userId: number }) {
  const name = safeFilename(filename);
  const result = await execute("INSERT INTO cms_media (filename, mime_type, size, data, created_by) VALUES (?, ?, ?, ?, ?)", [
    name,
    mimeType,
    data.length,
    data,
    userId,
  ]);
  return { id: result.insertId, filename: name };
}

export async function getMedia(id: number) {
  const rows = await query<RowDataPacket & MediaItem & { data: Buffer }>(
    "SELECT id, filename, mime_type, size, data, created_at FROM cms_media WHERE id = ?",
    [id],
  );
  return rows[0] ?? null;
}

export async function listMedia() {
  return query<RowDataPacket & MediaItem>("SELECT id, filename, mime_type, size, created_at FROM cms_media ORDER BY id DESC");
}

export async function deleteMedia(id: number) {
  await execute("DELETE FROM cms_media WHERE id = ?", [id]);
}
