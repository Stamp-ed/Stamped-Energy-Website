export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
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
