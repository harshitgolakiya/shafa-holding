import type { Metadata } from "next";
import { requireUser } from "@/cms/auth";
import { query, type RowDataPacket } from "@/cms/db";
import { getDocumentSchema } from "@/cms/schema";
import { listMedia, mediaUrl } from "@/cms/media";
import { deleteMediaAction } from "../../actions";
import { ConfirmButton } from "../../ConfirmButton";
import { formatDate, ui } from "../../ui";
import { MediaUploader } from "./MediaUploader";

export const metadata: Metadata = { title: "Media library" };

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export default async function MediaPage() {
  await requireUser();
  const [items, content] = await Promise.all([
    listMedia(),
    query<RowDataPacket & { content_key: string; data: unknown }>("SELECT content_key, data FROM cms_content"),
  ]);
  const documents = content.map((row) => ({ title: getDocumentSchema(row.content_key)?.title ?? row.content_key, json: JSON.stringify(row.data) }));
  const usage = (id: number) => documents.filter((document) => document.json.includes(`/media/${id}/`)).map((document) => document.title);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={ui.pageTitle}>Media library</h1>
          <p className="mt-2 text-sm text-[#5a6056]">Images uploaded here can be chosen from any image field in the page editor.</p>
        </div>
        <MediaUploader />
      </div>

      {items.length === 0 ? (
        <p className={`${ui.card} mt-8 px-5 py-12 text-center text-sm text-[#5a6056]`}>No images uploaded yet.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const usedOn = usage(item.id);
            return (
              <li key={item.id} className={`${ui.card} overflow-hidden`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail grid */}
                <img src={mediaUrl(item)} alt="" loading="lazy" className="aspect-4/3 w-full bg-[#f1efe7] object-cover" />
                <div className="p-3">
                  <p className="truncate text-sm font-medium" title={item.filename}>{item.filename}</p>
                  <p className="mt-0.5 text-xs text-[#5a6056]">{formatSize(item.size)} · {formatDate(item.created_at)}</p>
                  {usedOn.length ? (
                    <p className="mt-2 text-xs text-[#78672e]">Used on: {usedOn.join(", ")}</p>
                  ) : (
                    <div className="mt-2">
                      <ConfirmButton action={deleteMediaAction.bind(null, item.id)} message={`Delete ${item.filename}?`} className="text-xs font-semibold text-red-700 hover:underline">
                        Delete
                      </ConfirmButton>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
