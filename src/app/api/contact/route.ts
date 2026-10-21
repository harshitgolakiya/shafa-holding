import { isThrottled } from "@/cms/auth";
import { getContent } from "@/cms/content";
import { isDatabaseConfigured } from "@/cms/db";
import { notifySubmission } from "@/cms/mail";
import { createSubmission } from "@/cms/submissions";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  inquiryType?: unknown;
  message?: unknown;
  website?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ message: "Invalid request format." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.length > 0) {
    return Response.json({ message: "Inquiry accepted." });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const inquiryType = typeof payload.inquiryType === "string" ? payload.inquiryType.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (
    name.length < 2 ||
    name.length > 120 ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    !inquiryType ||
    inquiryType.length > 80 ||
    message.length < 20 ||
    message.length > 4000
  ) {
    return Response.json({ message: "Please complete all required fields with valid information." }, { status: 422 });
  }

  if (!isDatabaseConfigured()) {
    return Response.json({ message: "The inquiry form is temporarily unavailable. Please contact us by email or phone." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
  if (isThrottled(`contact:${ip ?? "unknown"}`, 5, 10 * 60_000)) {
    return Response.json({ message: "Too many inquiries were sent. Please try again in a few minutes." }, { status: 429 });
  }

  const submission = {
    name,
    email,
    message,
    inquiry_type: inquiryType,
    company: text(payload.company, 160) || null,
    phone: text(payload.phone, 40) || null,
    ip_address: ip?.slice(0, 64) ?? null,
    user_agent: request.headers.get("user-agent")?.slice(0, 255) ?? null,
  };

  let id: number;
  try {
    id = await createSubmission(submission);
  } catch (error) {
    console.error("[contact] Failed to store submission", error);
    return Response.json({ message: "Your inquiry could not be sent. Please try again later." }, { status: 500 });
  }

  const [settings, contact] = await Promise.all([getContent("settings"), getContent("contact")]);
  // A mail failure shouldn't fail the request: the inquiry is already saved in the CMS inbox.
  await notifySubmission({ ...submission, id }, settings.notificationEmails).catch((error) =>
    console.error("[contact] Failed to send notification email", error),
  );

  return Response.json({ message: contact.successMessage });
}
