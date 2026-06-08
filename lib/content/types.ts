export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  megaMenu?: "industries";
};

export type CtaLink = {
  label: string;
  href: string;
};

export type StatItem = {
  id: string;
  value: string;
  label: string;
  detail?: string;
};

export type ResourceCard = {
  id: string;
  type: "case-study" | "blog";
  title: string;
  description: string;
  href: string;
  tag?: string;
  imageSrc: string;
  imageAlt: string;
};

export type IndustrySegment = {
  id: string;
  slug: string;
  name: string;
  focus: string;
  description: string;
  /** v1: hash on automotive page; future: `/industries/automotive/[slug]` */
  href: string;
  imageSrc: string;
  imageAlt: string;
  challenges: string[];
  stampProvides: string[];
  metrics: StatItem[];
};

export type IndustryVertical = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  heroImageSrc: string;
  heroImageAlt: string;
  segments: IndustrySegment[];
};

export type IndustryValueArea = {
  id: string;
  step: string;
  title: string;
  description: string;
  potentialLabel: string;
  potentialValue: string;
};

export type ProblemItem = {
  id: string;
  title: string;
  description: string;
};

export type WorkflowStep = {
  id: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export type IndustryItem = {
  id: string;
  name: string;
  /** Short pain-point line shown on landing cards for quick context */
  focus: string;
  description: string;
  featured?: boolean;
};

export type WhyStampedItem = {
  id: string;
  title: string;
  description: string;
};

export type PrescriptionField = {
  label: string;
  value: string;
};

export type PrescriptionEmbedConfig = {
  /** Interactive demo URL (simulated or live dashboard) */
  iframeSrc: string | null;
  /** Fallback: recorded dashboard walkthrough (.webm / .mp4) */
  videoSrc: string | null;
  placeholderTitle: string;
  placeholderDescription: string;
  iframeTitle: string;
};

export type HiwJourneyStep = {
  id: string;
  step: number;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  diagram: "connect" | "observe" | "decide" | "execute" | "verify";
};

export type HiwStackLayer = {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
};

export type HiwIntegrationSource = {
  id: string;
  label: string;
  detail: string;
};

export type HiwDeploymentPhase = {
  id: string;
  week: string;
  title: string;
  description: string;
};

export type HiwMediaSlot = {
  id: string;
  title: string;
  description: string;
  reason: string;
};

export type HiwSldNode = {
  id: string;
  label: string;
  tooltip: string;
  /** 0–100 position within the diagram frame */
  x: number;
  y: number;
  kind: "source" | "hub" | "load";
};

export type HiwCapability = {
  id: string;
  title: string;
  description: string;
  /** Optional WebM/GIF/PNG — falls back to built-in SVG animation */
  mediaSrc?: string | null;
  mediaAlt?: string;
};
