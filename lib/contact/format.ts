export function formatInquiryDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatInquiryRelative(date: Date | string): string {
  const then = new Date(date).getTime();
  const diffMs = Date.now() - then;
  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 1) {
    return "Just now";
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  if (days < 7) {
    return `${days}d ago`;
  }
  return formatInquiryDate(date);
}

/** Normalize Indian WhatsApp numbers for wa.me links. */
export function whatsappHref(raw: string | null | undefined): string | null {
  if (!raw?.trim()) {
    return null;
  }
  const digits = raw.replace(/\D/g, "");
  if (!digits) {
    return null;
  }
  const normalized =
    digits.length === 10 ? `91${digits}` : digits.startsWith("91") ? digits : digits;
  return `https://wa.me/${normalized}`;
}

export function emptyDisplay(value: string | null | undefined): string {
  return value?.trim() ? value : "—";
}
