import { isDatabaseConfigured } from "@/cms/db";
import { getMedia } from "@/cms/media";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; filename: string }> }) {
  const { id } = await params;
  const mediaId = Number(id);
  if (!isDatabaseConfigured() || !Number.isInteger(mediaId) || mediaId < 1) return new Response("Not found", { status: 404 });

  const media = await getMedia(mediaId);
  if (!media) return new Response("Not found", { status: 404 });

  // A media ID never changes content (uploads always get a new ID), so it can be cached indefinitely.
  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mime_type,
      "Content-Length": String(media.size),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
