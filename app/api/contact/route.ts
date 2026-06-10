import { NextResponse } from "next/server";

import { sendContactNotification } from "@/lib/contact/notify";
import { createContactSubmission } from "@/lib/contact/submissions";

type ContactPayload = {
  name?: string;
  company?: string;
  location?: string;
  billSize?: string;
  whatsapp?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const requiredFields: Array<keyof ContactPayload> = [
    "name",
    "company",
    "location",
    "billSize",
    "whatsapp",
  ];

  const missingField = requiredFields.find((field) => !isNonEmptyString(payload[field]));

  if (missingField) {
    return NextResponse.json(
      { error: `Missing required field: ${missingField}` },
      { status: 400 },
    );
  }

  const submission = {
    name: payload.name!.trim(),
    company: payload.company!.trim(),
    location: payload.location!.trim(),
    billSize: payload.billSize!.trim(),
    whatsapp: payload.whatsapp!.trim(),
  };

  try {
    await createContactSubmission(submission);
  } catch (error) {
    console.error("[contact] database error:", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again or email us directly." },
      { status: 500 },
    );
  }

  const emailResult = await sendContactNotification(submission);
  if (!emailResult.sent) {
    console.warn("[contact] notification email not sent:", emailResult.error);
  }

  return NextResponse.json({ success: true });
}
