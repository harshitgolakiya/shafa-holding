import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { listContentUpdates } from "@/cms/content";
import { documents } from "@/cms/schema";
import { countByStatus, listSubmissions } from "@/cms/submissions";
import { formatDate, ui } from "../ui";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();
  const [counts, recent, updates] = await Promise.all([countByStatus(), listSubmissions({ status: "inbox", page: 1 }), listContentUpdates()]);
  const updatedAt = new Map(updates.map((row) => [row.content_key, row]));

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className={ui.pageTitle}>Welcome, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-sm text-[#5a6056]">Manage website content and contact inquiries for Shafa Holding.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="New inquiries" value={counts.new} href="/admin/inbox?status=new" highlight={counts.new > 0} />
        <Stat label="Read inquiries" value={counts.read} href="/admin/inbox?status=read" />
        <Stat label="Archived" value={counts.archived} href="/admin/inbox?status=archived" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className={ui.card}>
          <header className="flex items-center justify-between border-b border-[#e2e1d6] px-5 py-4">
            <h2 className="font-semibold">Latest inquiries</h2>
            <Link href="/admin/inbox" className="text-sm font-semibold text-[#78672e] hover:underline">View all</Link>
          </header>
          {recent.rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-[#5a6056]">No inquiries yet. Submissions from the website’s contact form will appear here.</p>
          ) : (
            <ul className="divide-y divide-[#efeee6]">
              {recent.rows.slice(0, 6).map((row) => (
                <li key={row.id}>
                  <Link href={`/admin/inbox/${row.id}`} className="block px-5 py-3 transition hover:bg-[#faf9f5]">
                    <div className="flex items-center gap-2">
                      {row.status === "new" ? <span className="size-2 rounded-full bg-[#9f8c50]" aria-label="New" /> : null}
                      <span className={`truncate text-sm ${row.status === "new" ? "font-semibold" : ""}`}>{row.name}</span>
                      <span className="ml-auto shrink-0 text-xs text-[#5a6056]">{formatDate(row.created_at)}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-[#5a6056]">{row.inquiry_type} — {row.message}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={ui.card}>
          <header className="flex items-center justify-between border-b border-[#e2e1d6] px-5 py-4">
            <h2 className="font-semibold">Website content</h2>
            <Link href="/admin/content" className="text-sm font-semibold text-[#78672e] hover:underline">All pages</Link>
          </header>
          <ul className="divide-y divide-[#efeee6]">
            {documents.map((document) => {
              const update = updatedAt.get(document.key);
              return (
                <li key={document.key}>
                  <Link href={`/admin/content/${document.key}`} className="flex items-center gap-3 px-5 py-3 text-sm transition hover:bg-[#faf9f5]">
                    <span className="font-medium">{document.title}</span>
                    <span className="ml-auto text-xs text-[#5a6056]">
                      {update ? `Edited ${formatDate(update.updated_at)}${update.updated_by_name ? ` by ${update.updated_by_name}` : ""}` : "Original content"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, href, highlight = false }: { label: string; value: number; href: string; highlight?: boolean }) {
  return (
    <Link href={href} className={`${ui.card} block p-5 transition hover:border-[#9f8c50] ${highlight ? "border-[#9f8c50] bg-[#fbf8ee]" : ""}`}>
      <p className="text-sm text-[#5a6056]">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
    </Link>
  );
}
