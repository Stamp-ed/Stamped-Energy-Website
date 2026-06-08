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
    title: "Built for plants that run on utilities",
    description:
      "Stamped starts with automotive and its process-intensive supply chain — where furnaces, compressors, and shift-start sequencing directly hit margin.",
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
      title: "Industry context, not generic dashboards",
      items: [
        {
          id: "process-baselines",
          title: "Process-normalized baselines",
          description:
            "SEC and demand tracked against production context — shift patterns, batch cycles, and furnace states, not just kWh totals.",
        },
        {
          id: "segment-prescriptions",
          title: "Segment-specific prescriptions",
          description:
            "Die casting shift-start spikes, forging MD exposure, heat-treatment holding losses — each with assigned roles and rupee impact.",
        },
        {
          id: "verified-outcomes",
          title: "Verified on the next bill",
          description:
            "Closed-loop M&V ties every action to adjusted baselines so savings are defensible for plant heads and OEM audits.",
        },
      ],
    },
    explorer: {
      eyebrow: "Browse verticals",
      title: "Select a vertical to explore",
      description:
        "Hover a vertical to preview process segments. Automotive is live today — more verticals follow as validation grows.",
    },
    featured: {
      eyebrow: "Live today",
      title: "Automotive manufacturing",
      description:
        "Tier 1 and Tier 2 suppliers under OEM cost pressure — four process segments with expandable playbooks on the industry page.",
      cta: { label: "Open automotive page", href: "/industries/automotive" } satisfies CtaLink,
    },
    finalCta: {
      eyebrow: "Start with your plant",
      title: "Not sure which segment fits?",
      description:
        "Book a discovery call. We will map your meters, processes, and estimated waste — and outline a low-risk pilot path.",
      primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    },
    cta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
  },

  verticals: [
    {
      id: "automotive",
      slug: "automotive",
      name: "Automotive",
      tagline: "AI-led energy control for automotive manufacturing",
      description:
        "Tier 1 and Tier 2 suppliers under OEM cost pressure — die casting, forging, heat treatment, and rubber moulding plants where utilities drive margin.",
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
            { id: "dc-md", value: "₹15–40K", label: "Monthly MD / demand charge exposure" },
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
            { id: "fg-sec", value: "10–18%", label: "SEC improvement with M&V" },
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
            { id: "ht-tariff", value: "₹8–25K", label: "Monthly tariff-window savings" },
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
            { id: "rm-cure", value: "10–20%", label: "Curing energy reduction potential" },
          ],
        },
      ] satisfies IndustrySegment[],
    },
  ] satisfies IndustryVertical[],

  automotive: {
    eyebrow: "Automotive",
    title: "Prescriptive energy intelligence for automotive suppliers",
    description:
      "Die casting, forging, heat treatment, and rubber moulding — unified plant data, production-aware baselines, and floor-ready prescriptions with verified rupee impact.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    secondaryCta: { label: "How it works", href: "/how-it-works" } satisfies CtaLink,

    challenges: {
      eyebrow: "Energy challenges",
      title: "Utilities drive margin where OEM pressure is highest",
      description:
        "Automotive component plants run energy-intensive processes across furnaces, compressors, and heat treatment — often with fragmented visibility and shift-to-shift variability.",
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
      eyebrow: "Where value sits",
      title: "Actionable energy intelligence across your plant",
      description:
        "Select a process area to see where Stamped typically finds prescriptive savings in automotive component manufacturing.",
      areas: [
        {
          id: "press-body",
          step: "01",
          title: "Press shop & body components",
          description:
            "Stagger press and auxiliary startup to avoid simultaneous MD spikes. Zero-investment sequencing prescriptions plus ROI-ranked capital actions.",
          potentialLabel: "Platform potential",
          potentialValue: "3–5%",
        },
        {
          id: "die-cast",
          step: "02",
          title: "Die casting cells",
          description:
            "Furnace holding, core cooling compressors, and shot-cycle SEC — normalized by alloy mix and production rate.",
          potentialLabel: "Platform potential",
          potentialValue: "8–12%",
        },
        {
          id: "heat-treat",
          step: "03",
          title: "Heat treatment & carburizing",
          description:
            "Setback gaps, weekend holding, and batch timing against tariff windows — prescribed per furnace with M&V.",
          potentialLabel: "Platform potential",
          potentialValue: "10–15%",
        },
        {
          id: "compressed-air",
          step: "04",
          title: "Compressed air & utilities",
          description:
            "Leak detection, over-pressure, and overlapping compressors — a recurring theme across auto component plants.",
          potentialLabel: "Platform potential",
          potentialValue: "4–8%",
        },
        {
          id: "rubber-cure",
          step: "05",
          title: "Rubber moulding & curing",
          description:
            "Curing cycle optimization, idle press heat, and batch changeover windows with supervisor-ready actions.",
          potentialLabel: "Platform potential",
          potentialValue: "8–12%",
        },
        {
          id: "demand-md",
          step: "06",
          title: "Electrical demand & MD management",
          description:
            "Demand windows, power factor, and shift-overlap spikes — tied to rupee impact on your utility bill.",
          potentialLabel: "Platform potential",
          potentialValue: "2–5%",
        },
      ] satisfies IndustryValueArea[],
    },

    mediaSlot: {
      eyebrow: "Product preview",
      title: "Automotive workflow in action",
      description:
        "Reserved for an interactive walkthrough or GIF — how Stamped connects, prescribes, and verifies savings across automotive process lines.",
      placeholderTitle: "Interactive preview — coming soon",
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
          description: "Meters, SCADA, PLCs, and utility bills into one time-aligned graph — Modbus, OPC-UA, MQTT.",
        },
        {
          id: "prescribe",
          title: "Prescriptions, not dashboards",
          description: "What to change, why, who owns it, and ₹ impact — prioritized for your supervisors.",
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
      title: "Four process segments. One platform.",
      description:
        "Deep playbooks for the energy-intensive processes in your supply chain. Expand each segment for challenges and how Stamped helps — dedicated segment pages coming next.",
    },

    outcomes: {
      eyebrow: "What you gain",
      title: "Outcomes automotive plant heads care about",
      items: [
        {
          id: "real-time",
          title: "Real-time energy command",
          description:
            "Live operational data converted into prescribed actions across production and auxiliaries — cutting 5–10% utility waste without throughput risk.",
        },
        {
          id: "sec",
          title: "Stable SECs and KPIs",
          description:
            "Production-normalized SEC held within operating bands — reducing performance drift of 8–12% across shifts.",
        },
        {
          id: "reliability",
          title: "Higher asset reliability",
          description:
            "Early intervention on compressor, furnace, and press degradation patterns before unplanned downtime.",
        },
        {
          id: "sustained",
          title: "Sustained efficiency outcomes",
          description:
            "Closed-loop feedback that prescribes, validates, and refines — locking in verified cost reduction over quarters.",
        },
      ],
    },

    resources: resourcesContent,

    finalCta: {
      eyebrow: "Next step",
      title: "Map your automotive plant data",
      description: "Walk through meters, processes, and estimated waste — outline a pilot in weeks.",
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
