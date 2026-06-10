import type {
  CtaLink,
  IndustrySegment,
  IndustryValueArea,
  IndustryVertical,
  StatItem,
} from "./types";
import { resourcesContent } from "./resources";

const INDUSTRY_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
  rubberMoulding: "/industries/rubber-moulding.jpg",
} as const;

export const industriesContent = {
  hub: {
    eyebrow: "Industries",
    title: "Built for plants where furnaces and compressors drive the bill",
    description:
      "Auto component suppliers in die casting, forging, heat treatment, and rubber moulding, NCR belt first. Same approach wherever process utilities hit margin.",
    heroImageSrc: INDUSTRY_IMAGES.forging,
    heroImageAlt: "Automotive forging press line in an energy-intensive manufacturing plant",
    primaryCta: { label: "Explore Automotive", href: "/industries/automotive" } satisfies CtaLink,
    secondaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    stats: [
      {
        id: "hub-sec",
        value: "12–20%",
        label: "Typical electricity cost reduction",
        detail: "Process-intensive SME plants",
      },
      {
        id: "hub-md",
        value: "15–25%",
        label: "MD / demand charge reduction",
        detail: "From incomer meter + bill data",
      },
      {
        id: "hub-processes",
        value: "4",
        label: "Automotive processes covered",
        detail: "Die casting, forging, heat treatment, rubber moulding",
      },
    ] satisfies StatItem[],
    approach: {
      eyebrow: "How we fit your plant",
      title: "Process context, not generic kWh dashboards",
      items: [
        {
          id: "process-baselines",
          title: "Baselines by shift and batch",
          description:
            "SEC and MD tracked against pour times, stroke counts, and furnace states, not plant-wide averages that hide the leak.",
        },
        {
          id: "segment-prescriptions",
          title: "Prescriptions your supervisors recognise",
          description:
            "Shift-start staggering, holding schedule changes, compressor unload timers, assigned roles and monthly ₹ impact.",
        },
        {
          id: "verified-outcomes",
          title: "Verified on the DISCOM bill",
          description:
            "Closed-loop M&V so plant head and CFO see realised ₹, defensible for OEM energy audits.",
        },
      ],
    },
    explorer: {
      eyebrow: "Browse verticals",
      title: "Select a vertical to explore",
      description:
        "Hover a vertical to preview process segments. Automotive is live today, more verticals follow as validation grows.",
    },
    featured: {
      eyebrow: "Live today",
      title: "Automotive component manufacturing",
      description:
        "Tier 1 and Tier 2 suppliers under OEM cost-down pressure, four process segments with plant-floor playbooks.",
      cta: { label: "Open automotive page", href: "/industries/automotive" } satisfies CtaLink,
      showMoreLabel: "Show process segments",
      showLessLabel: "Show fewer segments",
    },
    finalCta: {
      eyebrow: "Start with your plant",
      title: "Not sure which process segment fits?",
      description:
        "Discovery call: we map your meters, main loads, and bill pattern, and say honestly if a pilot makes sense.",
      primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    },
    cta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
  },

  verticals: [
    {
      id: "automotive",
      slug: "automotive",
      name: "Automotive",
      tagline: "Energy cost control for auto component suppliers",
      description:
        "Die casting, forging, heat treatment, and rubber moulding, where OEM price pressure and HT tariffs squeeze margin on every rupee of electricity.",
      href: "/industries/automotive",
      heroImageSrc: INDUSTRY_IMAGES.dieCasting,
      heroImageAlt: "Molten metal pour in an automotive die casting plant",
      segments: [
        {
          id: "die-casting",
          slug: "die-casting",
          name: "Die Casting",
          focus: "Furnace–compressor coordination & shift-start spikes",
          description:
            "High-pressure die casting cells where melting, holding, and auxiliary loads create simultaneous demand at shift start and leak rupees through idle holding.",
          href: "/industries/automotive#die-casting",
          imageSrc: INDUSTRY_IMAGES.dieCasting,
          imageAlt: "Molten metal die casting operation in an automotive supplier plant",
          challenges: [
            "Melting and holding furnaces ramp together at shift start",
            "Compressors run for core cooling while cells idle between shots",
            "SEC varies with shot rate but baselines ignore production mix",
          ],
          stampProvides: [
            "Production-normalized SEC baselines per cell and shift",
            "Prescriptions to stagger furnace pre-heat and compressor staging",
            "WhatsApp alerts when holding load exceeds adjusted baseline",
          ],
          metrics: [
            { id: "dc-sec", value: "8–15%", label: "Typical SEC improvement range" },
            { id: "dc-md", value: "₹2–5L", label: "Monthly MD / demand charge savings" },
          ],
        },
        {
          id: "forging",
          slug: "forging",
          name: "Forging",
          focus: "Heavy loads, MD exposure & hammer cycle variability",
          description:
            "Forging hammers and press lines with extreme demand spikes, power-factor penalties, and production-linked SEC that passive monitoring never explains.",
          href: "/industries/automotive#forging",
          imageSrc: INDUSTRY_IMAGES.forging,
          imageAlt: "Industrial forging press in a metal components factory",
          challenges: [
            "Hammer and press startups overlap with utility baseload",
            "Maximum demand charges from short, high-kVA cycles",
            "Shift handovers leave auxiliaries running without output",
          ],
          stampProvides: [
            "Cycle-aware anomaly detection on hammer and furnace loads",
            "Prescriptions for startup sequencing and idle auxiliary shutdown",
            "Verified savings ledger tied to adjusted production baselines",
          ],
          metrics: [
            { id: "fg-md", value: "12–22%", label: "MD / demand charge reduction potential" },
            { id: "fg-sec", value: "₹3–8L", label: "Monthly energy cost reduction" },
          ],
        },
        {
          id: "heat-treatment",
          slug: "heat-treatment",
          name: "Heat Treatment",
          focus: "Furnace setbacks, weekend holding & carburizing loads",
          description:
            "Carburizing, induction, and batch furnaces where setback gaps, weekend holding, and tariff windows determine whether heat energy converts to shipped parts.",
          href: "/industries/automotive#heat-treatment",
          imageSrc: INDUSTRY_IMAGES.heatTreatment,
          imageAlt: "Heat treatment furnace bay in an automotive components plant",
          challenges: [
            "Furnaces held at temperature through breaks and low-load windows",
            "Weekend holding losses with no production scheduled",
            "Batch timing misaligned with off-peak tariff periods",
          ],
          stampProvides: [
            "Furnace-level baselines with batch and shift context",
            "Setback and hold-time prescriptions with ₹ impact per furnace",
            "Track open → done on furnace tuning actions via WhatsApp",
          ],
          metrics: [
            { id: "ht-hold", value: "15–25%", label: "Holding loss recoverable" },
            { id: "ht-tariff", value: "₹1.5–4L", label: "Monthly tariff-window savings" },
          ],
        },
        {
          id: "rubber-moulding",
          slug: "rubber-moulding",
          name: "Rubber Moulding",
          focus: "Curing cycles, compressor leaks & idle presses",
          description:
            "Injection and compression moulding lines where curing cycles, steam or hot-oil systems, and compressed air leaks inflate SEC between batches.",
          href: "/industries/automotive#rubber-moulding",
          imageSrc: INDUSTRY_IMAGES.rubberMoulding,
          imageAlt: "Rubber moulding and automotive polymer components production",
          challenges: [
            "Curing timers and press heat run through planned downtime",
            "Compressed air leaks masked by overall plant load",
            "Batch changeovers leave mould heaters fully on",
          ],
          stampProvides: [
            "Per-line curing SEC normalized by parts produced",
            "Leak and idle-load prescriptions with supervisor routing",
            "Closed-loop verification on realised ₹ per line",
          ],
          metrics: [
            { id: "rm-air", value: "5–12%", label: "Compressed air system savings" },
            { id: "rm-cure", value: "₹1.2–3L", label: "Monthly curing & idle-load savings" },
          ],
        },
      ] satisfies IndustrySegment[],
    },
  ] satisfies IndustryVertical[],

  automotive: {
    eyebrow: "Automotive",
    title: "Where utility cost hits margin on every OEM price-down",
    description:
      "Die casting, forging, heat treatment, rubber moulding, prescriptions tied to furnaces, compressors, and shift-start MD, verified on your bill.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    secondaryCta: { label: "How it works", href: "/how-it-works" } satisfies CtaLink,

    challenges: {
      eyebrow: "Energy challenges",
      title: "Utilities are 12–18% of operating cost, and rising every tariff revision",
      description:
        "Furnaces, compressors, and heat treatment run whether parts are in the press or not. Visibility stops at the incomer meter; the bill explains nothing asset by asset.",
      stats: [
        {
          id: "cost-share",
          value: "12–18%",
          label: "Of operating cost linked to energy",
          detail: "Typical for process-intensive auto component suppliers",
        },
        {
          id: "uncontrolled",
          value: "50–60%",
          label: "Energy outside direct production control",
          detail: "Auxiliaries, holding loads, and startup overlap",
        },
        {
          id: "variability",
          value: "20–30%",
          label: "Lost to operational variability",
          detail: "Shift starts, idle windows, and uncoordinated startups",
        },
      ] satisfies StatItem[],
    },

    valueExplorer: {
      eyebrow: "Where lakhs leak",
      title: "Typical savings areas in auto component plants",
      description:
        "Select a process area. Figures are reference ranges from comparable plants, your pilot replaces them with verified numbers.",
      areas: [
        {
          id: "press-body",
          step: "01",
          title: "Press shop & body components",
          description:
            "Stagger press and auxiliary startup to avoid simultaneous MD spikes. Zero-investment sequencing prescriptions plus ROI-ranked capital actions.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹1.5–3L",
        },
        {
          id: "die-cast",
          step: "02",
          title: "Die casting cells",
          description:
            "Furnace holding, core cooling compressors, and shot-cycle SEC, normalized by alloy mix and production rate.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹2–5L",
        },
        {
          id: "heat-treat",
          step: "03",
          title: "Heat treatment & carburizing",
          description:
            "Setback gaps, weekend holding, and batch timing against tariff windows, prescribed per furnace with M&V.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹1.5–4L",
        },
        {
          id: "compressed-air",
          step: "04",
          title: "Compressed air & utilities",
          description:
            "Leak detection, over-pressure, and overlapping compressors, a recurring theme across auto component plants.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹1.2–2.5L",
        },
        {
          id: "rubber-cure",
          step: "05",
          title: "Rubber moulding & curing",
          description:
            "Curing cycle optimization, idle press heat, and batch changeover windows with supervisor-ready actions.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹1.2–3L",
        },
        {
          id: "demand-md",
          step: "06",
          title: "Electrical demand & MD management",
          description:
            "Demand windows, power factor, and shift-overlap spikes, tied to rupee impact on your utility bill.",
          potentialLabel: "Est. monthly savings",
          potentialValue: "₹2–6L",
        },
      ] satisfies IndustryValueArea[],
    },

    mediaSlot: {
      eyebrow: "Product preview",
      title: "Automotive workflow in action",
      description:
        "Reserved for an interactive walkthrough or GIF, how Stamped connects, prescribes, and verifies savings across automotive process lines.",
      placeholderTitle: "Interactive preview, coming soon",
      placeholderDescription:
        "GIF or product capture loads here. Full-width white canvas sized for a screen recording or live demo embed.",
      mediaSrc: null as string | null,
      mediaAlt: "Stamped Energy automotive workflow preview",
    },

    provides: {
      eyebrow: "What Stamped delivers",
      title: "From plant signals to verified savings",
      items: [
        {
          id: "connect",
          title: "Connect without retrofit",
          description: "Meters, SCADA, PLCs, and utility bills into one time-aligned graph, Modbus, OPC-UA, MQTT.",
        },
        {
          id: "prescribe",
          title: "Prescriptions, not dashboards",
          description: "What to change, why, who owns it, and ₹ impact, prioritized for your supervisors.",
        },
        {
          id: "execute",
          title: "WhatsApp-native execution",
          description: "Actions reach shift leads with open → done tracking, not another portal login.",
        },
        {
          id: "verify",
          title: "Verified ₹ ledger",
          description: "Potential vs. realized savings with M&V against production-adjusted baselines.",
        },
      ],
    },

    segments: {
      eyebrow: "Automotive processes",
      title: "Four processes where the bill hurts most",
      description:
        "Die casting, forging, heat treatment, rubber moulding, expand each for typical leaks and how Stamped addresses them.",
    },

    outcomes: {
      eyebrow: "What you gain",
      title: "Outcomes your plant head and CFO will ask for",
      items: [
        {
          id: "real-time",
          title: "MD spikes explained asset by asset",
          description:
            "Shift-start overlap, simultaneous furnace ramp, compressor idle, tied to monthly rupee impact, not plant-wide kWh.",
        },
        {
          id: "sec",
          title: "SEC held within shift bands",
          description:
            "kWh per unit output tracked by process and shift, so drift shows up before the bill, not after.",
        },
        {
          id: "reliability",
          title: "Maintenance tickets before breakdown",
          description:
            "Compressor inlet filter degradation, furnace holding anomalies, flagged when specific power drifts, not when the motor fails.",
        },
        {
          id: "sustained",
          title: "Verified ₹ ledger quarter over quarter",
          description:
            "Potential vs realised savings tracked, defensible for OEM energy audits and internal cost reviews.",
        },
      ],
    },

    resources: resourcesContent,

    finalCta: {
      eyebrow: "Next step",
      title: "Map your automotive plant data",
      description: "Walk through meters, processes, and estimated waste, outline a pilot in weeks.",
      primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    },
  },
} as const;

export function getIndustryVertical(slug: string) {
  return industriesContent.verticals.find((vertical) => vertical.slug === slug);
}

export function getAutomotiveSegments() {
  return industriesContent.verticals[0]?.segments ?? [];
}
