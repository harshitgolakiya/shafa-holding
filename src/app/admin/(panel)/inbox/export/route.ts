import { getCurrentUser } from "@/cms/auth";
import { listAllSubmissions } from "@/cms/submissions";

function csvCell(value: unknown) {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  // Stop spreadsheet apps from treating visitor-supplied text as a formula.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await getCurrentUser())) return new Response("Not found", { status: 404 });

  const rows = await listAllSubmissions();
  const header = ["ID", "Received (UTC)", "Status", "Name", "Company", "Email", "Phone", "Inquiry type", "Message"];
  const lines = rows.map((row) =>
    [row.id, row.created_at, row.status, row.name, row.company, row.email, row.phone, row.inquiry_type, row.message].map(csvCell).join(","),
  );
  const date = new Date().toISOString().slice(0, 10);

  return new Response(`﻿${[header.map(csvCell).join(","), ...lines].join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="shafa-inquiries-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
