import { NextResponse } from "next/server";

import { sendContactNotification } from "@/lib/contact/notify";
import { createContactSubmission } from "@/lib/contact/submissions";
import { validateContactSubmission } from "@/lib/contact/validate";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validation = validateContactSubmission(payload);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    await createContactSubmission(validation.data);
  } catch (error) {
    console.error("[contact] database error:", error);
    return NextResponse.json(
      { error: "Could not save your request. Please try again or email us directly." },
      { status: 500 },
    );
  }

  const emailResult = await sendContactNotification(validation.data);
  if (!emailResult.sent) {
    console.warn("[contact] notification email not sent:", emailResult.error);
  }

  return NextResponse.json({ success: true });
}
