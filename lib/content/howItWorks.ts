import type {
  CtaLink,
  HiwDeploymentPhase,
  HiwIntegrationSource,
  HiwJourneyStep,
  HiwMediaSlot,
  HiwStackLayer,
  PrescriptionField,
} from "./types";

export const howItWorksContent = {
  hero: {
    eyebrow: "How Stamped works",
    title: "From fragmented plant data to verified rupee savings",
    description:
      "Scroll through the full Connect → Observe → Decide → Execute → Verify loop. Each step shows what happens inside the platform — not abstract diagrams, but the actual workflow your plant team will follow.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    secondaryCta: { label: "Back to home", href: "/" } satisfies CtaLink,
  },

  journey: {
    eyebrow: "The workflow loop",
    title: "Five steps. One closed loop.",
    description:
      "Pinned scroll storytelling — inspired by Greenovative's platform walkthrough and Zerowatt's sensor-to-action narrative. Watch each phase build on the last.",
    steps: [
      {
        id: "connect",
        step: 1,
        title: "Connect",
        tagline: "Plug into what you already run",
        description:
          "No hardware retrofit. Stamped layers on top of meters, SCADA, PLCs, CNCs, and your utility bill — the same sources Greenovative and Zerowatt integrate with, sized for SME plants.",
        bullets: [
          "Start with incomer meter + monthly bill (fastest path to MD insight)",
          "Deepen into SCADA, PLC, and production signals over time",
          "Protocol-agnostic adapters — Modbus, OPC-UA, MQTT, REST",
        ],
        diagram: "connect",
      },
      {
        id: "observe",
        step: 2,
        title: "Observe",
        tagline: "Baselines that understand production",
        description:
          "Raw kWh is meaningless without context. Stamped normalizes consumption against shifts, production volume, and tariff windows — filtering noise like Greenovative's context-aware engine.",
        bullets: [
          "Production-normalized SEC baselines per asset and line",
          "Near-real-time anomaly detection on demand and idle loads",
          "Tariff-aware windows (peak, off-peak, MD billing periods)",
        ],
        diagram: "observe",
      },
      {
        id: "decide",
        step: 3,
        title: "Decide",
        tagline: "Prescriptions, not charts",
        description:
          "Every insight becomes a structured prescription: what to do, why, who owns it, effort level, and monthly rupee impact — the format plant heads actually act on.",
        bullets: [
          "Root cause tied to evidence from your own telemetry",
          "Rupee impact calculated at current tariff and operating hours",
          "Prioritized queue — tackle highest-impact items first",
        ],
        diagram: "decide",
      },
      {
        id: "execute",
        step: 4,
        title: "Execute",
        tagline: "Actions reach the floor",
        description:
          "Prescriptions route to the right role via WhatsApp and dashboard — Zerowatt's lesson applied for SME plants where the owner is often the only executor.",
        bullets: [
          "WhatsApp-native alerts to supervisors and maintenance",
          "Open → In Progress → Completed tracking per action",
          "Re-surfaces if not actioned within 48 hours",
        ],
        diagram: "execute",
      },
      {
        id: "verify",
        step: 5,
        title: "Verify",
        tagline: "Potential vs. realized — in rupees",
        description:
          "After execution, Stamped monitors post-action consumption against adjusted baselines and records verified savings — the closed loop Greenovative calls Potential vs. Realized.",
        bullets: [
          "M&V against production-adjusted baseline",
          "Running ledger: total verified savings since deployment",
          "Defensible numbers for CFO, OEM auditors, and PAT reporting",
        ],
        diagram: "verify",
      },
    ] satisfies HiwJourneyStep[],
  },

  intelligenceStack: {
    eyebrow: "Under the hood",
    title: "Three layers of intelligence",
    description:
      "Greenovative separates a base industrial model from plant-specific fine-tuning. Stamped uses the same principle — global energy physics, localized to your tariffs, shifts, and assets.",
    layers: [
      {
        id: "ingestion",
        title: "Universal ingestion",
        subtitle: "Signals → unified pipeline",
        items: [
          "SCADA, PLC, BMS, smart meters, utility bills",
          "Time-aligned streaming into one energy graph",
          "No change to existing control systems",
        ],
      },
      {
        id: "intelligence",
        title: "Contextual intelligence",
        subtitle: "Baselines + anomaly + prescription engine",
        items: [
          "Production-normalized baselines and SEC tracking",
          "Demand spike, idle load, and tariff misalignment detection",
          "Prescription generation with rupee quantification",
        ],
      },
      {
        id: "orchestration",
        title: "Closed-loop orchestration",
        subtitle: "Assign → track → verify",
        items: [
          "Work orders with role assignment and status",
          "WhatsApp + dashboard delivery",
          "Post-action M&V and savings ledger",
        ],
      },
    ] satisfies HiwStackLayer[],
  },

  prescriptionDemo: {
    eyebrow: "Live example",
    title: "Watch a prescription assemble",
    description:
      "This is what lands on your maintenance team's phone — field by field, with evidence and impact.",
    fields: [
      { label: "What", value: "Stagger Compressor 1 and Press Line 3 startup by 10 minutes" },
      {
        label: "Why",
        value: "MD spiked at 07:15 Monday — both assets started simultaneously, adding 180 kVA",
      },
      { label: "Who", value: "Electrical maintenance / shift supervisor" },
      { label: "Effort", value: "Scheduling change only. No capital spend." },
      { label: "Impact", value: "₹38,000/month at current tariff and operating hours" },
      { label: "When", value: "Apply before next billing cycle" },
    ] satisfies PrescriptionField[],
  },

  beforeAfter: {
    eyebrow: "The shift",
    title: "Before Stamped vs. with Stamped",
    before: {
      title: "Before Stamped",
      items: [
        "Bill arrives — waste already happened",
        "SCADA charts nobody acts on",
        "Recommendations with no owner or tracking",
        "Savings claimed but never verified",
        "Energy treated as fixed overhead",
      ],
    },
    after: {
      title: "With Stamped",
      items: [
        "Anomalies caught in near real time",
        "One operational view across systems",
        "Prescriptions with rupee impact and owner",
        "Verified savings ledger in ₹",
        "Energy managed as a P&L line item",
      ],
    },
  },

  integrations: {
    eyebrow: "Works with what you have",
    title: "No rip-and-replace",
    description:
      "Zerowatt's integration-first model, adapted for software-only SME deployment. We enhance data fidelity where gaps exist — without stopping production.",
    sources: [
      { id: "scada", label: "SCADA / DCS", detail: "Historian tags, alarms, process states" },
      { id: "plc", label: "PLCs & CNCs", detail: "Machine run states, cycle times, load signals" },
      { id: "meters", label: "Energy meters", detail: "Incomer, sub-meters, demand kVA" },
      { id: "bms", label: "BMS / utilities", detail: "HVAC, compressed air, steam headers" },
      { id: "erp", label: "ERP / MES", detail: "Production orders, shift schedules" },
      { id: "bills", label: "Utility bills", detail: "Tariff structure, MD charges, TOU windows" },
    ] satisfies HiwIntegrationSource[],
  },

  deployment: {
    eyebrow: "Deployment path",
    title: "Live in weeks, not quarters",
    description: "Pilot-led rollout designed for Band B/C plants — prove savings before annual commitment.",
    phases: [
      {
        id: "week-1-2",
        week: "Week 1–2",
        title: "Connect & baseline",
        description: "Meter + bill integration. First baselines and tariff mapping.",
      },
      {
        id: "week-3-4",
        week: "Week 3–4",
        title: "First insights",
        description: "Anomalies surfaced. First prescriptions with rupee estimates.",
      },
      {
        id: "month-2",
        week: "Month 2",
        title: "Deepen integration",
        description: "SCADA/PLC signals added. Production-normalized SEC live.",
      },
      {
        id: "month-3",
        week: "Month 3+",
        title: "Verified savings",
        description: "First M&V cycle complete. Savings ledger reported in ₹.",
      },
    ] satisfies HiwDeploymentPhase[],
  },

  gifSlots: [
    {
      id: "plant-sld",
      title: "Plant single-line diagram (recommended GIF)",
      description:
        "Animated energy flow from incomer → sub-meters → major loads, with live highlighting when an anomaly fires.",
      reason:
        "A full SLD with dynamic path tracing is hard to maintain as GSAP — Remotion export will look more polished and match Greenovative's digital twin section.",
    },
    {
      id: "dashboard-walkthrough",
      title: "Dashboard walkthrough (optional GIF)",
      description:
        "30s screen capture style: prescription queue → detail → mark complete → savings update.",
      reason:
        "Real UI chrome and micro-interactions are faster to nail in Remotion than hand-coded mocks that drift from the product.",
    },
  ] satisfies HiwMediaSlot[],

  finalCta: {
    eyebrow: "See it on your plant",
    title: "Walk through your data in a discovery call",
    description:
      "We will map your existing meters and systems, estimate addressable waste, and outline a low-risk pilot.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
  },
} as const;
