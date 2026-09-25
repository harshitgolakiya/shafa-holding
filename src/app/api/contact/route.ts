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
    message.length < 20 ||
    message.length > 4000
  ) {
    return Response.json({ message: "Please complete all required fields with valid information." }, { status: 422 });
  }

  return Response.json(
    { message: "The inquiry form is not connected yet. Please try again after the production contact provider is configured." },
    { status: 503 },
  );
}
