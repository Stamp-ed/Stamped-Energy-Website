import type {
  CtaLink,
  HowItWorksStep,
  IndustryItem,
  PrescriptionField,
  ProblemItem,
  StatItem,
  WhyStampedItem,
  WorkflowStep,
} from "./types";

export const landingContent = {
  hero: {
    eyebrow: "Prescriptive energy intelligence for manufacturers",
    headline: "AI energy intelligence. Turn data into verified savings",
    subheadline:
      "Connect your existing plant data. Get prescriptions with rupee impact. Verify the saving on your next electricity bill.",
    primaryCta: { label: "Book a Discovery Call", href: "#contact" } satisfies CtaLink,
    secondaryCta: { label: "See How It Works", href: "/how-it-works" } satisfies CtaLink,
  },

  trust: {
    label: "Built for Indian manufacturers",
    items: [
      "Software-only. No hardware retrofit.",
      "Designed for auto component and process-intensive plants",
      "Pilot-led. Verified savings before annual commitment.",
    ],
  },

  outcomes: {
    eyebrow: "Target outcomes",
    title: "Savings you can verify on the next bill",
    disclaimer:
      "Target ranges based on industry benchmarks. Customer-validated figures will replace these as pilot data accumulates.",
    stats: [
      {
        id: "bill-reduction",
        value: "12–20%",
        label: "Monthly electricity cost reduction",
        detail: "Typical range for process-intensive SME plants",
      },
      {
        id: "md-reduction",
        value: "15–25%",
        label: "Maximum demand charge reduction",
        detail: "Often achievable from incomer meter + bill data alone",
      },
      {
        id: "waste-elimination",
        value: "10–20%",
        label: "Non-production energy identified",
        detail: "Within the first 90 days of deployment",
      },
      {
        id: "payback",
        value: "3–6 mo",
        label: "Target platform payback",
        detail: "Subscription cost recovered from verified savings",
      },
    ] satisfies StatItem[],
  },

  problem: {
    eyebrow: "The gap",
    title: "You already have the data. You are still losing money.",
    items: [
      {
        id: "fragmented",
        title: "Fragmented systems",
        description:
          "SCADA, PLCs, CNCs, meters, and utility bills live in separate systems that never synthesize into one operational picture.",
      },
      {
        id: "reactive",
        title: "Reactive decisions",
        description:
          "By the time the electricity bill arrives, the month's waste has already happened. Decisions stay intuitive, not quantified in rupees.",
      },
      {
        id: "unverified",
        title: "Savings never verified",
        description:
          "Internal recommendations are made, but nobody tracks execution or confirms whether the saving materialized on the next bill.",
      },
    ] satisfies ProblemItem[],
  },

  workflow: {
    eyebrow: "The Stamped loop",
    title: "From fragmented data to verified savings",
    steps: [
      {
        id: "connect",
        title: "Connect",
        description: "Integrate SCADA, PLCs, CNCs, meters, and bill data from infrastructure you already run.",
      },
      {
        id: "observe",
        title: "Observe",
        description: "Build production-normalized baselines and detect deviations in near real time.",
      },
      {
        id: "decide",
        title: "Decide",
        description: "Generate prescriptions with root cause, assigned role, effort, and monthly rupee impact.",
      },
      {
        id: "execute",
        title: "Execute",
        description: "Route actions into a lightweight workflow with WhatsApp and dashboard visibility.",
      },
      {
        id: "verify",
        title: "Verify",
        description: "Measure post-action consumption and build a running ledger of verified savings in rupees.",
      },
    ] satisfies WorkflowStep[],
  },

  prescription: {
    eyebrow: "Not another dashboard",
    title: "A prescription, not a chart",
    fields: [
      { label: "What", value: "Stagger Compressor 1 and Press Line 3 startup by 10 minutes" },
      {
        label: "Why",
        value: "Demand spiked at 07:15 Monday because both assets started simultaneously",
      },
      { label: "Who", value: "Electrical maintenance team" },
      { label: "Effort", value: "Scheduling change only. No capital spend." },
      { label: "Impact", value: "₹38,000/month at current operating hours" },
      { label: "When", value: "Apply before next billing cycle" },
    ] satisfies PrescriptionField[],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Five steps from connection to verified savings",
    cta: { label: "Explore the full workflow", href: "/how-it-works" } satisfies CtaLink,
    steps: [
      {
        id: "connect-systems",
        step: 1,
        title: "Connect existing systems",
        description: "Start with meters and bills, then deepen into SCADA, PLCs, and production data.",
      },
      {
        id: "baseline",
        step: 2,
        title: "Build energy baseline",
        description: "Normalize consumption against production context, shifts, and tariff structure.",
      },
      {
        id: "detect",
        step: 3,
        title: "Detect inefficiencies",
        description: "Surface demand spikes, idle loads, utility waste, and tariff misalignment.",
      },
      {
        id: "prescribe",
        step: 4,
        title: "Generate prescriptions",
        description: "Turn anomalies into assigned actions with rupee impact and execution tracking.",
      },
      {
        id: "verify-savings",
        step: 5,
        title: "Verify savings",
        description: "Confirm realized savings against adjusted baselines and build a defensible ledger.",
      },
    ] satisfies HowItWorksStep[],
  },

  industries: {
    eyebrow: "Industries",
    title: "Starting with automotive. Built for manufacturing broadly.",
    description:
      "The initial focus is auto component and process-intensive manufacturing in the NCR belt. The platform is designed to expand across verticals as validation grows.",
    cta: { label: "View all industries", href: "/industries" } satisfies CtaLink,
    items: [
      {
        id: "automotive",
        name: "Automotive Components",
        description: "Tier 1 and Tier 2 suppliers facing OEM cost pressure and rising electricity tariffs.",
        featured: true,
      },
      {
        id: "die-casting",
        name: "Die Casting",
        description: "High energy intensity, demand spikes at shift start, and furnace-compressor coordination issues.",
      },
      {
        id: "forging",
        name: "Forging",
        description: "Heavy loads, MD charge exposure, and production-linked SEC variability.",
      },
      {
        id: "heat-treatment",
        name: "Heat Treatment",
        description: "Furnace setback gaps, weekend holding losses, and tariff-sensitive operating windows.",
      },
      {
        id: "rubber-moulding",
        name: "Rubber Moulding",
        description: "Curing cycles, compressor air leaks, and idle machine loads between batches.",
      },
    ] satisfies IndustryItem[],
  },

  whyStamped: {
    eyebrow: "Why Stamped",
    title: "Built for plant heads, not sustainability committees",
    items: [
      {
        id: "prescriptive",
        title: "Prescriptive, not descriptive",
        description: "Stamped tells you what is wrong, why, who should fix it, and how much it costs in rupees.",
      },
      {
        id: "sme-priced",
        title: "SME-priced and pilot-led",
        description: "Accessible for mid-market manufacturers with a low-risk pilot before annual commitment.",
      },
      {
        id: "software-only",
        title: "Software-only integration",
        description: "Connect to existing meters, SCADA, and PLCs without a hardware retrofit program.",
      },
      {
        id: "whatsapp-native",
        title: "WhatsApp-native execution",
        description: "Prescriptions reach the people who act, not a dashboard that only managers open.",
      },
    ] satisfies WhyStampedItem[],
  },

  futureMedia: {
    eyebrow: "Product walkthrough",
    title: "See the workflow in action",
    description:
      "Product demos, Remotion walkthroughs, and workflow GIFs will live here. Placeholder reserved for upcoming media.",
    placeholderLabel: "Product demo media coming soon",
  },

  credibility: {
    eyebrow: "Credibility",
    title: "Engineering depth behind every prescription",
    founderNote:
      "Founded by an IIT Roorkee electrical engineering graduate with research background in energy systems. Built for manufacturers who need verified rupee outcomes, not another monitoring layer.",
    placeholders: [
      "Pilot results",
      "Case studies",
      "Customer testimonials",
    ],
  },

  finalCta: {
    eyebrow: "Start with a pilot",
    title: "See what your plant is losing every month",
    description:
      "Book a discovery call. We will review your infrastructure, estimate addressable waste, and outline a low-risk pilot path.",
    primaryCta: { label: "Book a Discovery Call", href: "#contact" } satisfies CtaLink,
  },

  contactForm: {
    title: "Book a discovery call",
    description: "Tell us about your plant. We will follow up to schedule a conversation.",
    fields: {
      name: "Full name",
      company: "Company name",
      location: "Plant location",
      billSize: "Monthly electricity bill (approx.)",
      whatsapp: "WhatsApp number",
    },
    submitLabel: "Submit request",
    successMessage: "Request received. We will contact you shortly.",
    errorMessage: "Something went wrong. Please try again.",
  },
} as const;
