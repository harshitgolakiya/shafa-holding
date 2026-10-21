import { getCurrentUser } from "@/cms/auth";
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_BYTES, listMedia, mediaUrl, saveMedia } from "@/cms/media";

export async function GET() {
  if (!(await getCurrentUser())) return Response.json({ message: "Not found" }, { status: 404 });
  const items = await listMedia();
  return Response.json(items.map((item) => ({ id: item.id, filename: item.filename, url: mediaUrl(item) })));
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ message: "Not found" }, { status: 404 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ message: "Choose an image to upload." }, { status: 400 });
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return Response.json({ message: "Only JPG, PNG, WebP, AVIF or GIF images can be uploaded." }, { status: 415 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ message: "Images must be 8 MB or smaller." }, { status: 413 });

  const saved = await saveMedia({ filename: file.name, mimeType: file.type, data: Buffer.from(await file.arrayBuffer()), userId: user.id });
  return Response.json({ id: saved.id, filename: saved.filename, url: mediaUrl(saved) });
}
