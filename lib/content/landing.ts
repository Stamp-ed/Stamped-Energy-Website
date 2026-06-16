import type {
  CtaLink,
  HeroFeatureItem,
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
    eyebrow: "Prescriptive energy intelligence",
    headlineLine1: "Energy decisions.",
    headlineLine2: "Verified savings.",
    subheadline: "Built for manufacturers.",
    supportingLine:
      "Connect existing plant data. Get rupee-denominated prescriptions. Verify savings on your next bill.",
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
    callouts: [
      { id: "incomer", label: "INCOMER", value: "1,240 kVA", x: "8%", y: "18%" },
      { id: "compressor", label: "COMPRESSOR HOUSE", value: "385 kW", x: "62%", y: "8%" },
      { id: "solar", label: "SOLAR PLANT", value: "350 kW", x: "72%", y: "52%" },
      { id: "furnace", label: "FURNACE LINE", value: "620 kW", x: "12%", y: "58%" },
    ],
    video: {
      webm: "/video/how-it-works-cinematic.webm",
      poster: "/video/how-it-works-poster.png",
      label:
        "How Stamped Energy works: connect plant data, get rupee-denominated AI prescriptions, verify savings on your next bill.",
    },
    visualImageSrc: "/industries/die-casting.jpeg",
    visualImageAlt: "Molten metal pour in a die casting plant, energy-intensive automotive manufacturing",
  },

  trust: {
    label: "For plant heads, owners, and electrical HODs",
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
        value: "12–20%",
        label: "Off your monthly electricity bill",
        detail: "Process-intensive die casting, forging, heat treatment",
      },
      {
        id: "md-reduction",
        value: "15–25%",
        label: "Off maximum demand charges",
        detail: "Often from incomer meter + bill data alone, no capex",
      },
      {
        id: "waste-elimination",
        value: "10–20%",
        label: "Non-production energy flagged",
        detail: "Idle loads, holding furnaces, leak air within 90 days",
      },
      {
        id: "payback",
        value: "3–6 mo",
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
    title: "This is what your maintenance team gets, not a kWh chart",
    fields: [
      {
        label: "What",
        value: "Stagger Compressor 1 and Press Line 3 startup by 10 minutes each shift",
      },
      {
        label: "Why",
        value:
          "Incomer demand hit 1,240 kVA at 07:15 Monday. Both assets ramped together with zero production load.",
      },
      { label: "Who", value: "Electrical maintenance / shift supervisor" },
      { label: "Effort", value: "Scheduling change only. No capital spend." },
      { label: "Impact", value: "₹38,000/month at current tariff and shift pattern" },
      { label: "When", value: "Before next billing cycle. MD resets monthly." },
    ] satisfies PrescriptionField[],
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
    eyebrow: "Your processes",
    title: "Die casting, forging, heat treatment, rubber: where utility cost hits margin",
    description:
      "Starting with auto component suppliers in the NCR belt. Same approach applies wherever furnaces, compressors, and shift-start sequencing drive the bill.",
    cta: { label: "View all industries", href: "/industries" } satisfies CtaLink,
    showMoreLabel: "Show process segments",
    showLessLabel: "Show fewer segments",
    items: [
      {
        id: "automotive",
        name: "Automotive Components",
        focus: "OEM price cuts meet rising HT tariffs",
        description:
          "Tier 1 and Tier 2 suppliers absorbing tariff hikes while OEMs demand 2–5% annual cost-down.",
        featured: true,
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Automotive forging press line",
      },
      {
        id: "die-casting",
        name: "Die Casting",
        focus: "Morning MD spike every shift",
        description:
          "Three furnaces and compressors ramp together before the first pour. Predictable, avoidable demand charges.",
        imageSrc: "/industries/die-casting.jpeg",
        imageAlt: "Die casting molten metal process",
      },
      {
        id: "forging",
        name: "Forging",
        focus: "Compressors run unloaded between strokes",
        description:
          "Screw compressors sized for peak stroke demand. 60% of shift in unload with no production benefit.",
        imageSrc: "/industries/forging.jpg",
        imageAlt: "Industrial forging operation",
      },
      {
        id: "heat-treatment",
        name: "Heat Treatment",
        focus: "Furnaces hold over empty weekends",
        description:
          "Soak temperature maintained with zero batches scheduled. ₹3–6L/month in pure holding waste at typical loads.",
        imageSrc: "/industries/heat-treatment.webp",
        imageAlt: "Heat treatment furnace batch operation",
      },
      {
        id: "rubber-moulding",
        name: "Rubber Moulding",
        focus: "No SEC baseline per press",
        description:
          "Curing cycles vary by operator. Leak air and idle press heat invisible until the bill arrives.",
        imageSrc: "/industries/rubber-moulding.jpg",
        imageAlt: "Rubber moulding production line",
      },
    ] satisfies IndustryItem[],
  },

  whyStamped: {
    eyebrow: "Why Stamped",
    title: "Enterprise EMS tools were not built for your plant size",
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
