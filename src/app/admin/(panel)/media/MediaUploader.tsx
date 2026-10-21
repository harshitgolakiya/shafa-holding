"use client";

import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ui } from "../../ui";

export function MediaUploader() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(files: FileList) {
    setUploading(true);
    setError("");
    for (const file of Array.from(files)) {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/admin/api/media", { method: "POST", body });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { message?: string };
        setError(`${file.name}: ${result.message ?? "Upload failed."}`);
      }
    }
    setUploading(false);
    if (input.current) input.current.value = "";
    router.refresh();
  }

  return (
    <div className="text-right">
      <button type="button" onClick={() => input.current?.click()} disabled={uploading} className={ui.button}>
        <ImagePlus aria-hidden="true" className="size-4" /> {uploading ? "Uploading…" : "Upload images"}
      </button>
      <input ref={input} type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="hidden" onChange={(event) => event.target.files?.length && upload(event.target.files)} />
      {error ? <p role="alert" className="mt-2 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
