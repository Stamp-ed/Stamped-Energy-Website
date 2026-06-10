import type { ContactSubmissionInput } from "@/lib/contact/submissions";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export type ContactValidationResult =
  | { ok: true; data: ContactSubmissionInput }
  | { ok: false; error: string; field?: keyof ContactSubmissionInput | "whatsapp" | "email" };

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function normalizeWhatsapp(raw: string): string {
  return raw.trim();
}

export function isValidEmail(value: string): boolean {
  const email = normalizeEmail(value);
  if (!email || email.length > 254) {
    return false;
  }
  return EMAIL_PATTERN.test(email);
}

export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return true;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return true;
  }
  return digits.length >= 10 && digits.length <= 15;
}

export function validateContactSubmission(
  payload: Record<string, unknown>,
): ContactValidationResult {
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const company = typeof payload.company === "string" ? payload.company.trim() : "";
  const location = typeof payload.location === "string" ? payload.location.trim() : "";
  const billSize = typeof payload.billSize === "string" ? payload.billSize.trim() : "";
  const whatsapp =
    typeof payload.whatsapp === "string" ? normalizeWhatsapp(payload.whatsapp) : "";
  const email = typeof payload.email === "string" ? normalizeEmail(payload.email) : "";

  if (!name) {
    return { ok: false, error: "Full name is required.", field: "name" };
  }

  if (!company) {
    return { ok: false, error: "Company name is required.", field: "company" };
  }

  const hasWhatsapp = whatsapp.length > 0;
  const hasEmail = email.length > 0;

  if (!hasWhatsapp && !hasEmail) {
    return {
      ok: false,
      error: "Provide a WhatsApp number or email address so we can reach you.",
      field: "whatsapp",
    };
  }

  if (hasWhatsapp && !isValidWhatsapp(whatsapp)) {
    return {
      ok: false,
      error: "Enter a valid phone number (at least 10 digits).",
      field: "whatsapp",
    };
  }

  if (hasEmail && !isValidEmail(email)) {
    return {
      ok: false,
      error: "Enter a valid email address.",
      field: "email",
    };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      location: location || null,
      billSize: billSize || null,
      whatsapp: hasWhatsapp ? whatsapp : null,
      email: hasEmail ? email : null,
    },
  };
}
