function parseFrontmatterValue(raw: string): string | boolean | string[] {
  const trimmed = raw.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseYamlFrontmatter(text: string): { meta: Record<string, unknown>; body: string } | null {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return null;
  }

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (key) {
      meta[key] = parseFrontmatterValue(value);
    }
  }

  return { meta, body: match[2].trim() };
}

export function stripOuterCodeFence(text: string): string {
  const fenceMatch = text.trim().match(/^```(?:yaml|markdown|md)?\r?\n([\s\S]*?)\r?\n```$/);
  return fenceMatch ? fenceMatch[1].trim() : text.trim();
}

export function normalizeStatus(value: unknown): "DRAFT" | "PUBLISHED" | "ARCHIVED" | undefined {
  if (typeof value !== "string") return undefined;
  const upper = value.toUpperCase();
  if (upper === "DRAFT" || upper === "PUBLISHED" || upper === "ARCHIVED") {
    return upper;
  }
  if (value.toLowerCase() === "draft") return "DRAFT";
  if (value.toLowerCase() === "published") return "PUBLISHED";
  if (value.toLowerCase() === "archived") return "ARCHIVED";
  return undefined;
}

export function normalizeTags(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return undefined;
}

export function parseJsonField<T>(value: unknown): T | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}
