export const CASE_STUDY_CATEGORIES = [
  { id: "unit-economics", label: "Unit economics" },
  { id: "asset-efficiency", label: "Asset efficiency" },
  { id: "demand-management", label: "Demand management" },
  { id: "process-optimization", label: "Process optimization" },
] as const;

export const CASE_STUDY_CATEGORY_IDS = CASE_STUDY_CATEGORIES.map((c) => c.id);

export type CaseStudyCategoryId = (typeof CASE_STUDY_CATEGORY_IDS)[number];

export function getCaseStudyCategoryLabel(id: string): string {
  return CASE_STUDY_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export type CaseStudyMetric = { label: string; value: string };

export function parseMetrics(raw: string): CaseStudyMetric[] {
  try {
    const parsed = JSON.parse(raw) as CaseStudyMetric[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function serializeMetrics(metrics: CaseStudyMetric[]): string {
  return JSON.stringify(metrics);
}

export function parseOutcomes(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function serializeOutcomes(outcomes: string[]): string {
  return JSON.stringify(outcomes);
}
