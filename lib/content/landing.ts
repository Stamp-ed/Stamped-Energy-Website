import type {
  CtaLink,
  HeroFeatureItem,
  HowItWorksStep,
  IndustryItem,
  ProblemItem,
  StatItem,
  WhyStampedItem,
  WorkflowStep,
} from "./types";
import { icp } from "./icp";
import { getHeroCallouts, getHeroVisual, getScenarioPrescription } from "./scenarios";

export const landingContent = {
  hero: {
    eyebrow: "AI-Powered Energy Intelligence",
    headlineLine1: "From plant data",
    headlineLine2: "to verified savings",
    subheadline: "",
    supportingLine:
      "AI-powered prescriptive intelligence that identifies cost-saving opportunities and delivers actions to improve efficiency.",
    supportingLine2: icp.heroBillLine,
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See How It Works", href: "/how-it-works" } satisfies CtaLink,
    features: [
      {
        id: "read-only",
        title: "Read-only integration",
        subtitle: "No control writes",
        icon: "shield",
      },
      {
        id: "systems",
        title: "Works with your systems",
        subtitle: "SCADA, PLC, EMS, Meters",
        icon: "factory",
      },
      {
        id: "prescriptions",
        title: "Prescriptions, not charts",
        subtitle: "Assigned. Tracked. Verified.",
        icon: "prescription",
      },
      {
        id: "verified",
        title: "Savings verified on",
        subtitle: "DISCOM bills",
        icon: "rupee",
      },
    ] satisfies HeroFeatureItem[],
    callouts: getHeroCallouts(),
    video: {
      webm: "/video/how-it-works-cinematic.webm",
      poster: "/video/how-it-works-poster.png",
      label:
        "How Stamped Energy works: connect plant data, get rupee-denominated AI prescriptions, verify savings on your next bill.",
    },
    visualImageSrc: getHeroVisual().src,
    visualImageAlt: getHeroVisual().alt,
  },

  trust: {
    label: `For ${icp.buyerTitlesShort} at ${icp.revenueFloor} plants`,
    items: [
      "Connects to incomer meters and existing SCADA. No hardware retrofit.",
      "Actions on WhatsApp to supervisors who can execute tomorrow morning",
      "Pilot first. One verified saving on the bill before annual commitment.",
    ],
  },

  outcomes: {
    eyebrow: "Typical recovery ranges",
    title: "Numbers that must appear on the bill, not in a slide deck",
    disclaimer:
      "Benchmark ranges from comparable plants. Your pilot replaces these with verified figures.",
    stats: [
      {
        id: "bill-reduction",
        value: "12-20%",
        label: "Off your monthly electricity bill",
        detail: "Cement, steel, pharma, chemical, automotive [~]",
      },
      {
        id: "md-reduction",
        value: "15-25%",
        label: "Off maximum demand charges",
        detail: "Often from incomer meter + bill data alone, no capex",
      },
      {
        id: "waste-elimination",
        value: "10-20%",
        label: "Non-production energy flagged",
        detail: "Idle loads, holding, HVAC staging, batch gaps within 90 days",
      },
      {
        id: "payback",
        value: "3-6 mo",
        label: "Subscription paid back from savings",
        detail: "Target payback once prescriptions are executed",
      },
    ] satisfies StatItem[],
  },

  problem: {
    eyebrow: "Why the bill keeps winning",
    title: "You have the data. Nobody closes the loop.",
    items: [
      {
        id: "fragmented",
        title: "SCADA, PLCs, and bills never meet",
        description:
          "Incomer kW, furnace states, and shift schedules sit in separate systems, so nobody sees the same picture when the MD spikes at 07:15.",
      },
      {
        id: "reactive",
        title: "The bill arrives after the waste is gone",
        description:
          "You know shift-start overlap costs money. Without a rupee figure tied to Compressor 1 and Furnace 2, it stays a gut feel, not a maintenance ticket.",
      },
      {
        id: "unverified",
        title: "Good ideas die before the next bill",
        description:
          "Stagger startups, fix holding schedules: discussed in meetings, never tracked, never checked against what the incomer meter actually did.",
      },
    ] satisfies ProblemItem[],
  },

  workflow: {
    eyebrow: "The Stamped Energy Loop",
    title: "From fragmented data to verified savings in five operational steps.",
    description: "",
    media: {
      title: "Five-step closed loop walkthrough",
      description:
        "Connect plant signals, build baselines, prescribe in rupees, route on WhatsApp, verify on the bill.",
      src: null as string | null,
      posterAlt: "Stamped Energy five-step workflow: Connect, Observe, Decide, Execute, Verify",
    },
    steps: [
      {
        id: "connect",
        title: "Connect",
        description: "Integrate with your systems and meters.",
      },
      {
        id: "observe",
        title: "Observe",
        description: "Normalize and analyze patterns.",
      },
      {
        id: "decide",
        title: "Decide",
        description: "Get ranked prescriptions with ₹ impact.",
      },
      {
        id: "execute",
        title: "Execute",
        description: "Assign actions to your team and track.",
      },
      {
        id: "verify",
        title: "Verify",
        description: "Savings verified on your electricity bill.",
      },
    ] satisfies WorkflowStep[],
  },

  prescription: {
    eyebrow: "Not a dashboard",
    title: "This is what your plant team gets — not a kWh chart",
    fields: getScenarioPrescription("homepagePrescription"),
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "The Stamped Energy Loop",
    cta: { label: "Full workflow walkthrough", href: "/how-it-works" } satisfies CtaLink,
    steps: [
      {
        id: "connect-systems",
        step: 1,
        title: "Connect what you already run",
        description: "Incomer + bills first. SCADA, PLCs, and production data as available.",
      },
      {
        id: "baseline",
        step: 2,
        title: "Baseline normal for your plant",
        description: "SEC and demand by shift, process, and product mix, not generic benchmarks.",
      },
      {
        id: "detect",
        step: 3,
        title: "Flag deviations in rupees",
        description: "MD spikes, holding loads, idle compressors, tariff misalignment, quantified monthly.",
      },
      {
        id: "prescribe",
        step: 4,
        title: "Assign fixes to your team",
        description: "What, why, who, effort, ₹ impact tracked until done.",
      },
      {
        id: "verify-savings",
        step: 5,
        title: "Confirm on the next bill",
        description: "Potential vs realised savings. Defensible for plant head and OEM audits.",
      },
    ] satisfies HowItWorksStep[],
  },

  industries: {
    eyebrow: "Industries",
    title: "Industries we serve",
    description:
      "Purpose-built AI-powered energy intelligence for energy-intensive manufacturing - cement, steel, pharma, chemical, and automotive.",
    cta: { label: "View all industries", href: "/industries" } satisfies CtaLink,
    items: [
      {
        id: "automotive",
        name: "Automotive",
        focus: "AI-led energy control",
        description:
          "AI enables automotive manufacturers to control energy-intensive operations and utilities at scale - influencing cost stability, uptime, and operational competitiveness.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Automotive forging press line",
      },
      {
        id: "cement",
        name: "Cement",
        focus: "AI-driven energy intelligence",
        description:
          "AI enables cement plants to prescribe optimal energy actions across continuous processes and utilities in real time - improving cost stability and uptime.",
        imageSrc: "/industries/cement.png",
        imageAlt: "Cement manufacturing plant with silos and towers at dusk",
      },
      {
        id: "steel",
        name: "Steel & metals",
        focus: "AI-driven energy management",
        description:
          "AI enables steel manufacturers to manage fuel- and power-intensive operations at scale - where energy balance directly determines cost competitiveness and throughput stability.",
        imageSrc: "/industries/steel.png",
        imageAlt: "Steel rolling mill with glowing hot metal billets",
      },
      {
        id: "pharma",
        name: "Pharmaceutical",
        focus: "AI-driven energy management",
        description:
          "AI enables pharmaceutical plants to manage energy-intensive operations and utilities at scale - impacting operating cost, compliance, uptime, and product quality.",
        imageSrc: "/industries/pharma.png",
        imageAlt: "Pharmaceutical vial filling line in a sterile manufacturing plant",
      },
      {
        id: "chemical",
        name: "Chemical & paint",
        focus: "AI-powered energy intelligence",
        description:
          "AI brings continuous energy discipline to chemical and paint manufacturing - improving cost control, operational predictability, and long-term competitiveness.",
        imageSrc: "/industries/chemical.png",
        imageAlt: "Chemical refinery with storage tanks and distillation towers at twilight",
      },
    ] satisfies IndustryItem[],
  },

  whyStamped: {
    eyebrow: "Why Stamped",
    title: "Enterprise EMS tools were not built for your plant's decision layer",
    items: [
      {
        id: "prescriptive",
        title: "Tells your team what to do tomorrow",
        description:
          'Not "energy is high." Instead: stagger Furnace 2 by 10 minutes, assign to electrical maintenance, ₹1.2L/month.',
      },
      {
        id: "sme-priced",
        title: "Pilot before annual commitment",
        description:
          "Low-fee pilot or pay-as-you-save on first verified month. You see ₹ on the bill before you scale spend.",
      },
      {
        id: "software-only",
        title: "Uses infrastructure you already paid for",
        description:
          "Incomer meter, SCADA, PLCs, CNCs connected without a hardware retrofit program.",
      },
      {
        id: "whatsapp-native",
        title: "Reaches supervisors on WhatsApp",
        description:
          "Prescriptions go to people who can act, not a screen only the plant head opens once a month.",
      },
    ] satisfies WhyStampedItem[],
  },

  futureMedia: {
    eyebrow: "On the shop floor",
    title: "Actions reach supervisors, not another login",
    description:
      "Your electrical and maintenance teams get what to fix, why the data shows it, and how many rupees are on the line. Plant head sees what closed and what saved.",
    imageSrc: "/industries/heat-treatment.webp",
    imageAlt: "Industrial heat treatment furnace in operation",
    imageCaption:
      "Furnace holding, shift-start overlap, compressor unload: the patterns your bill already hints at",
  },

  credibility: {
    eyebrow: "Who builds this",
    title: "Electrical engineering depth. Prescriptions in rupees, not slides.",
    founderNote:
      "Founded by an IIT Roorkee electrical engineering graduate with research in energy systems. Built for plant heads who need verified outcomes on the DISCOM bill, not another monitoring layer.",
  },

  closingCta: {
    title: "Verify energy savings before you commit",
    description:
      "Begin with a pilot on your existing meters and plant data. We quantify outcomes in rupees and confirm them on your next electricity bill before annual subscription.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See How It Works", href: "/how-it-works" } satisfies CtaLink,
  },
} as const;
