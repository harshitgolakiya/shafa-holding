import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { listContentUpdates } from "@/cms/content";
import { documents } from "@/cms/schema";
import { formatDate, ui } from "../../ui";

export const metadata: Metadata = { title: "Pages & content" };

export default async function ContentIndexPage() {
  await requireUser();
  const updates = new Map((await listContentUpdates()).map((row) => [row.content_key, row]));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className={ui.pageTitle}>Pages & content</h1>
      <p className="mt-2 text-sm text-[#5a6056]">Choose a page to edit. Changes go live on the website as soon as you publish them.</p>
      <ul className={`${ui.card} mt-8 divide-y divide-[#efeee6]`}>
        {documents.map((document) => {
          const update = updates.get(document.key);
          return (
            <li key={document.key}>
              <Link href={`/admin/content/${document.key}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#faf9f5]">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{document.title}</p>
                  <p className="mt-0.5 text-sm text-[#5a6056]">{document.description}</p>
                  <p className="mt-1 text-xs text-[#5a6056]/80">
                    {update ? `Last edited ${formatDate(update.updated_at)}${update.updated_by_name ? ` by ${update.updated_by_name}` : ""}` : "Showing original content"}
                  </p>
                </div>
                <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-[#5a6056]" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
