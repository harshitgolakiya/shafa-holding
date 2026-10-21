import type { Metadata } from "next";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/cms/auth";
import { getSubmission } from "@/cms/submissions";
import { phoneHref } from "@/components/ui/Lines";
import { deleteSubmissionAction, setSubmissionStatusAction } from "../../../actions";
import { formatDate, ui } from "../../../ui";
import { ConfirmButton } from "../../../ConfirmButton";
import { MarkAsRead } from "./SubmissionControls";

export const metadata: Metadata = { title: "Inquiry" };

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const id = Number((await params).id);
  const submission = Number.isInteger(id) ? await getSubmission(id) : null;
  if (!submission) notFound();

  const replySubject = encodeURIComponent(`Re: Your inquiry to Shafa Holding (${submission.inquiry_type})`);

  return (
    <div className="mx-auto max-w-3xl">
      {submission.status === "new" ? <MarkAsRead id={submission.id} /> : null}
      <Link href="/admin/inbox" className="inline-flex items-center gap-1.5 text-sm text-[#5a6056] hover:text-[#1c2417]">
        <ArrowLeft aria-hidden="true" className="size-4" /> Contact inbox
      </Link>

      <article className={`${ui.card} mt-4`}>
        <header className="border-b border-[#e2e1d6] p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#78672e]">{submission.inquiry_type}</p>
          <h1 className="mt-2 font-(family-name:--font-display) text-3xl leading-tight">{submission.name}</h1>
          {submission.company ? <p className="mt-1 text-sm text-[#5a6056]">{submission.company}</p> : null}
          <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <dt><Mail aria-label="Email" className="size-4 text-[#5a6056]" /></dt>
              <dd><a href={`mailto:${submission.email}`} className="text-[#78672e] hover:underline">{submission.email}</a></dd>
            </div>
            {submission.phone ? (
              <div className="flex items-center gap-2">
                <dt><Phone aria-label="Phone" className="size-4 text-[#5a6056]" /></dt>
                <dd><a href={phoneHref(submission.phone)} className="text-[#78672e] hover:underline">{submission.phone}</a></dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-4 text-xs text-[#5a6056]">Received {formatDate(submission.created_at)} (Dubai time) · #{submission.id}</p>
        </header>
        <div className="whitespace-pre-wrap wrap-break-word p-6 text-[15px] leading-7">{submission.message}</div>
      </article>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={`mailto:${submission.email}?subject=${replySubject}`} className={ui.button}>
          <Mail aria-hidden="true" className="size-4" /> Reply by email
        </a>
        {submission.status === "archived" ? (
          <form action={setSubmissionStatusAction.bind(null, submission.id, "read")}>
            <button type="submit" className={ui.buttonSecondary}>Move to inbox</button>
          </form>
        ) : (
          <form action={setSubmissionStatusAction.bind(null, submission.id, "archived")}>
            <button type="submit" className={ui.buttonSecondary}>Archive</button>
          </form>
        )}
        {submission.status !== "new" ? (
          <form action={setSubmissionStatusAction.bind(null, submission.id, "new")}>
            <button type="submit" className={ui.buttonSecondary}>Mark as unread</button>
          </form>
        ) : null}
        <ConfirmButton action={deleteSubmissionAction.bind(null, submission.id)} message="Permanently delete this inquiry?" className={`${ui.buttonDanger} ml-auto`}>
          Delete
        </ConfirmButton>
      </div>
    </div>
  );
}
