import "server-only";
import { execute, query, type RowDataPacket } from "./db";

export type SubmissionStatus = "new" | "read" | "archived";

export type Submission = {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  inquiry_type: string;
  message: string;
  status: SubmissionStatus;
  ip_address: string | null;
  user_agent: string | null;
  created_at: Date;
};

export type NewSubmission = Pick<Submission, "name" | "company" | "email" | "phone" | "inquiry_type" | "message" | "ip_address" | "user_agent">;

export async function createSubmission(input: NewSubmission) {
  const result = await execute(
    `INSERT INTO contact_submissions (name, company, email, phone, inquiry_type, message, ip_address, user_agent)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [input.name, input.company, input.email, input.phone, input.inquiry_type, input.message, input.ip_address, input.user_agent],
  );
  return result.insertId;
}

export const PAGE_SIZE = 25;

export async function listSubmissions({ status, search, page }: { status?: SubmissionStatus | "inbox"; search?: string; page: number }) {
  const where: string[] = [];
  const params: unknown[] = [];

  if (status === "inbox") where.push("status <> 'archived'");
  else if (status) {
    where.push("status = ?");
    params.push(status);
  }
  if (search) {
    where.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ?)");
    const like = `%${search.replace(/[%_\\]/g, "\\$&")}%`;
    params.push(like, like, like, like);
  }

  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const [rows, totals] = await Promise.all([
    query<RowDataPacket & Submission>(
      `SELECT * FROM contact_submissions ${clause} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`,
      [...params, PAGE_SIZE, (page - 1) * PAGE_SIZE],
    ),
    query<RowDataPacket & { total: number }>(`SELECT COUNT(*) AS total FROM contact_submissions ${clause}`, params),
  ]);
  return { rows, total: Number(totals[0]?.total ?? 0) };
}

export async function listAllSubmissions() {
  return query<RowDataPacket & Submission>("SELECT * FROM contact_submissions ORDER BY created_at DESC, id DESC");
}

export async function getSubmission(id: number) {
  const rows = await query<RowDataPacket & Submission>("SELECT * FROM contact_submissions WHERE id = ?", [id]);
  return rows[0] ?? null;
}

export async function countByStatus() {
  const rows = await query<RowDataPacket & { status: SubmissionStatus; total: number }>(
    "SELECT status, COUNT(*) AS total FROM contact_submissions GROUP BY status",
  );
  const counts: Record<SubmissionStatus, number> = { new: 0, read: 0, archived: 0 };
  for (const row of rows) counts[row.status] = Number(row.total);
  return counts;
}

export async function setSubmissionStatus(id: number, status: SubmissionStatus) {
  await execute("UPDATE contact_submissions SET status = ? WHERE id = ?", [status, id]);
}

export async function deleteSubmission(id: number) {
  await execute("DELETE FROM contact_submissions WHERE id = ?", [id]);
}
