/**
 * ScrollTrigger start positions for How It Works.
 * Lower viewport % = later trigger (element more visible before animation runs).
 */
export const hiwScrollStarts = {
  /** ~5s capability diagram timelines - center-based on mobile so the visual is in view */
  capabilityDiagram: {
    desktop: "top 58%",
    mobile: "center 72%",
  },
  sectionReveal: {
    desktop: "top 72%",
    mobile: "top 62%",
  },
  diagram: {
    desktop: "top 65%",
    mobile: "top 50%",
  },
  intelligenceStack: {
    desktop: "top 72%",
    mobile: "top 56%",
  },
  journeyMobileFade: {
    mobile: "top 68%",
  },
  journeyMobileDiagram: {
    mobile: "top 36%",
  },
  deploymentReveal: {
    desktop: "top 72%",
    mobile: "top 62%",
  },
  deploymentScrub: {
    desktop: "top 65%",
    mobile: "top 55%",
  },
} as const;

export function getHiwScrollStart(
  preset: keyof typeof hiwScrollStarts,
  mobile: boolean,
): string {
  const values = hiwScrollStarts[preset] as {
    desktop?: string;
    mobile?: string;
  };

  if (mobile && values.mobile) {
    return values.mobile;
  }

  if (values.desktop) {
    return values.desktop;
  }

  return values.mobile ?? "top 75%";
}
