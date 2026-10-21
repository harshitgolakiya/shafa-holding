import type { Metadata } from "next";
import { Download, Search } from "lucide-react";
import Link from "next/link";
import { requireUser } from "@/cms/auth";
import { PAGE_SIZE, countByStatus, listSubmissions, type SubmissionStatus } from "@/cms/submissions";
import { formatDate, ui } from "../../ui";

export const metadata: Metadata = { title: "Contact inbox" };

type Filter = SubmissionStatus | "inbox" | "all";

const filters: { value: Filter; label: string }[] = [
  { value: "inbox", label: "Inbox" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
  { value: "all", label: "All" },
];

type Props = { searchParams: Promise<{ status?: string; q?: string; page?: string }> };

export default async function InboxPage({ searchParams }: Props) {
  await requireUser();
  const params = await searchParams;
  const filter = filters.find((item) => item.value === params.status)?.value ?? "inbox";
  const search = params.q?.trim().slice(0, 100) ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const [{ rows, total }, counts] = await Promise.all([
    listSubmissions({ status: filter === "all" ? undefined : filter, search, page }),
    countByStatus(),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const href = (overrides: Record<string, string | number>) => {
    const query = new URLSearchParams({ status: filter, ...(search ? { q: search } : {}), page: String(page) });
    for (const [key, value] of Object.entries(overrides)) query.set(key, String(value));
    return `/admin/inbox?${query}`;
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={ui.pageTitle}>Contact inbox</h1>
          <p className="mt-2 text-sm text-[#5a6056]">Inquiries submitted through the website’s contact form.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download from a route handler, not a page */}
        <a href="/admin/inbox/export" className={ui.buttonSecondary}>
          <Download aria-hidden="true" className="size-4" /> Export CSV
        </a>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <nav aria-label="Filter inquiries" className="flex flex-wrap gap-1 rounded-lg border border-[#e2e1d6] bg-white p-1">
          {filters.map((item) => {
            const count = item.value === "inbox" ? counts.new + counts.read : item.value === "all" ? counts.new + counts.read + counts.archived : counts[item.value];
            const active = item.value === filter;
            return (
              <Link
                key={item.value}
                href={href({ status: item.value, page: 1 })}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm transition ${active ? "bg-[#1c2417] font-semibold text-white" : "text-[#5a6056] hover:bg-[#f1efe7]"}`}
              >
                {item.label} <span className="tabular-nums opacity-70">{count}</span>
              </Link>
            );
          })}
        </nav>
        <form className="relative ml-auto w-full sm:w-72" action="/admin/inbox">
          <input type="hidden" name="status" value={filter} />
          <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#5a6056]" />
          <input type="search" name="q" defaultValue={search} placeholder="Search name, email, message" aria-label="Search inquiries" className={`${ui.input} pl-9`} />
        </form>
      </div>

      <div className={`${ui.card} mt-4 overflow-hidden`}>
        {rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-[#5a6056]">{search ? "No inquiries match your search." : "No inquiries here yet."}</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e2e1d6] bg-[#faf9f5] text-xs uppercase tracking-wide text-[#5a6056]">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">From</th>
                <th scope="col" className="hidden px-5 py-3 font-semibold md:table-cell">Inquiry</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efeee6]">
              {rows.map((row) => (
                <tr key={row.id} className="relative transition hover:bg-[#faf9f5]">
                  <td className="max-w-0 px-5 py-3 md:w-72">
                    <Link href={`/admin/inbox/${row.id}`} className="block after:absolute after:inset-0">
                      <span className="flex items-center gap-2">
                        {row.status === "new" ? <span className="size-2 shrink-0 rounded-full bg-[#9f8c50]" aria-label="New" /> : null}
                        <span className={`truncate ${row.status === "new" ? "font-semibold" : ""}`}>{row.name}</span>
                        {row.status === "archived" ? <span className="rounded bg-[#f1efe7] px-1.5 text-xs text-[#5a6056]">Archived</span> : null}
                      </span>
                      <span className="block truncate text-xs text-[#5a6056]">{row.company ? `${row.company} · ` : ""}{row.email}</span>
                    </Link>
                  </td>
                  <td className="hidden max-w-0 px-5 py-3 md:table-cell">
                    <span className="block truncate font-medium">{row.inquiry_type}</span>
                    <span className="block truncate text-xs text-[#5a6056]">{row.message}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-xs text-[#5a6056]">{formatDate(row.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-[#5a6056]">Page {page} of {pages}</p>
          <div className="flex gap-2">
            {page > 1 ? <Link href={href({ page: page - 1 })} className={ui.buttonSecondary}>Previous</Link> : null}
            {page < pages ? <Link href={href({ page: page + 1 })} className={ui.buttonSecondary}>Next</Link> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
