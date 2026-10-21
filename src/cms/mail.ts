import "server-only";
import nodemailer from "nodemailer";
import type { NewSubmission } from "./submissions";

function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM);
}

/** Emails a new contact submission to the CMS notification recipients. No-op when SMTP isn't configured. */
export async function notifySubmission(submission: NewSubmission & { id: number }, recipients: string[]) {
  const to = recipients.length ? recipients : (process.env.CONTACT_NOTIFY_TO ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  if (!isMailConfigured() || to.length === 0) return;

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const lines = [
    `New website inquiry #${submission.id}`,
    "",
    `Name: ${submission.name}`,
    `Company: ${submission.company ?? "—"}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone ?? "—"}`,
    `Inquiry type: ${submission.inquiry_type}`,
    "",
    submission.message,
    "",
    siteUrl ? `View in the CMS: ${siteUrl}/admin/inbox/${submission.id}` : "",
  ];

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to,
    replyTo: submission.email,
    subject: `Website inquiry: ${submission.inquiry_type} — ${submission.name}`,
    text: lines.join("\n"),
  });
}
