import type {
  CtaLink,
  HiwCapability,
  HiwDeploymentPhase,
  HiwIntegrationSource,
  HiwJourneyStep,
  HiwMediaSlot,
  HiwSldNode,
  HiwStackLayer,
  PrescriptionEmbedConfig,
} from "./types";

export const howItWorksContent = {
  hero: {
    eyebrow: "Platform",
    title: "Prescriptive intelligence on unified plant data",
    description:
      "One energy graph from meters, SCADA, PLCs, and bills — prescriptions with verified ₹ impact. No retrofit.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
    secondaryCta: { label: "Back to home", href: "/" } satisfies CtaLink,
  },

  plantSld: {
    title: "Your plant energy graph",
    hint: "Hover or tap a node",
    nodes: [
      {
        id: "incomer",
        label: "Incomer meter",
        tooltip: "MD kVA, demand windows, tariff periods.",
        x: 50,
        y: 10,
        kind: "source",
      },
      {
        id: "scada",
        label: "SCADA / DCS",
        tooltip: "Historian tags and process states.",
        x: 14,
        y: 26,
        kind: "source",
      },
      {
        id: "plc",
        label: "PLCs & CNCs",
        tooltip: "Run states and cycle times.",
        x: 14,
        y: 46,
        kind: "source",
      },
      {
        id: "meters",
        label: "Sub-meters",
        tooltip: "Section kWh and demand.",
        x: 14,
        y: 66,
        kind: "source",
      },
      {
        id: "bill",
        label: "Utility bill",
        tooltip: "Tariff, MD charges, TOU windows.",
        x: 14,
        y: 84,
        kind: "source",
      },
      {
        id: "stamped",
        label: "Stamped graph",
        tooltip: "Time-aligned consumption, production, and cost.",
        x: 50,
        y: 50,
        kind: "hub",
      },
      {
        id: "compressor",
        label: "Compressors",
        tooltip: "Shift-start spikes and idle hours.",
        x: 86,
        y: 26,
        kind: "load",
      },
      {
        id: "press",
        label: "Press lines",
        tooltip: "Startup patterns vs. production.",
        x: 86,
        y: 46,
        kind: "load",
      },
      {
        id: "furnace",
        label: "Furnaces / ovens",
        tooltip: "Setback gaps and holding losses.",
        x: 86,
        y: 66,
        kind: "load",
      },
    ] satisfies HiwSldNode[],
  },

  capabilities: {
    eyebrow: "Core capabilities",
    title: "Signals → verified savings",
    items: [
      {
        id: "ingestion",
        title: "Universal ingestion",
        description: "Meters, SCADA, PLCs, bills — no control-system changes.",
      },
      {
        id: "repository",
        title: "Unified energy graph",
        description: "Time-aligned consumption, production, and cost.",
      },
      {
        id: "intelligence",
        title: "Contextual intelligence",
        description: "Anomalies and prescriptions with ₹ impact.",
      },
      {
        id: "governance",
        title: "Closed-loop governance",
        description: "Assign, track, verify — WhatsApp + dashboard.",
      },
    ] satisfies HiwCapability[],
  },

  journey: {
    eyebrow: "The workflow loop",
    title: "Five steps. One closed loop.",
    steps: [
      {
        id: "connect",
        step: 1,
        title: "Connect",
        tagline: "Plug into what you already run",
        description: "",
        bullets: ["Incomer + bill first", "Modbus · OPC-UA · MQTT"],
        diagram: "connect",
      },
      {
        id: "observe",
        step: 2,
        title: "Observe",
        tagline: "Baselines that understand production",
        description: "",
        bullets: ["Production-normalized SEC", "Tariff-aware anomaly detection"],
        diagram: "observe",
      },
      {
        id: "decide",
        step: 3,
        title: "Decide",
        tagline: "Prescriptions, not charts",
        description: "",
        bullets: ["What · why · who · ₹", "Prioritized action queue"],
        diagram: "decide",
      },
      {
        id: "execute",
        step: 4,
        title: "Execute",
        tagline: "Actions reach the floor",
        description: "",
        bullets: ["WhatsApp to supervisors", "Open → Done tracking"],
        diagram: "execute",
      },
      {
        id: "verify",
        step: 5,
        title: "Verify",
        tagline: "Potential vs. realized — in rupees",
        description: "",
        bullets: ["M&V vs. adjusted baseline", "Running ₹ savings ledger"],
        diagram: "verify",
      },
    ] satisfies HiwJourneyStep[],
  },

  intelligenceStack: {
    eyebrow: "The intelligence layer",
    title: "From signals to prescriptions",
    layers: [
      {
        id: "ingestion",
        title: "Universal ingestion",
        subtitle: "Signals → pipeline",
        items: ["SCADA · PLC · meters · bills", "One time-aligned graph"],
      },
      {
        id: "intelligence",
        title: "Contextual intelligence",
        subtitle: "Detect → prescribe",
        items: ["Production-normalized baselines", "₹ quantified prescriptions"],
      },
      {
        id: "orchestration",
        title: "Closed-loop orchestration",
        subtitle: "Assign → verify",
        items: ["WhatsApp + dashboard", "Post-action M&V ledger"],
      },
    ] satisfies HiwStackLayer[],
  },

  prescriptionDemo: {
    eyebrow: "Product preview",
    title: "Prescription dashboard",
    embed: {
      iframeSrc: null,
      videoSrc: null,
      iframeTitle: "Stamped Energy prescription dashboard preview",
      placeholderTitle: "Dashboard embed — coming soon",
      placeholderDescription: "Live demo or screen recording loads here when ready.",
    } satisfies PrescriptionEmbedConfig,
  },

  beforeAfter: {
    eyebrow: "The shift",
    title: "Before vs. with Stamped",
    before: {
      title: "Before",
      items: [
        "Bill shock every month",
        "Scattered systems",
        "Gut-feel decisions",
        "Unquantified waste",
      ],
    },
    after: {
      title: "With Stamped",
      items: [
        "Ahead-of-time alerts",
        "One operational view",
        "Prescriptive actions",
        "Verified ₹ savings",
      ],
    },
  },

  integrations: {
    eyebrow: "Works with what you have",
    title: "No rip-and-replace",
    sources: [
      { id: "scada", label: "SCADA / DCS", detail: "Historian & alarms" },
      { id: "plc", label: "PLCs & CNCs", detail: "Run states & cycles" },
      { id: "meters", label: "Energy meters", detail: "Incomer & sub-meters" },
      { id: "bms", label: "BMS / utilities", detail: "HVAC & compressed air" },
      { id: "erp", label: "ERP / MES", detail: "Orders & shifts" },
      { id: "bills", label: "Utility bills", detail: "Tariff & MD charges" },
    ] satisfies HiwIntegrationSource[],
  },

  deployment: {
    eyebrow: "Deployment path",
    title: "Live in weeks, not quarters",
    phases: [
      {
        id: "week-1-2",
        week: "Week 1–2",
        title: "Connect & baseline",
        description: "Meter + bill live. First baselines.",
      },
      {
        id: "week-3-4",
        week: "Week 3–4",
        title: "First insights",
        description: "Anomalies + first prescriptions.",
      },
      {
        id: "month-2",
        week: "Month 2",
        title: "Deepen integration",
        description: "SCADA/PLC + production SEC.",
      },
      {
        id: "month-3",
        week: "Month 3+",
        title: "Verified savings",
        description: "M&V complete. ₹ ledger live.",
      },
    ] satisfies HiwDeploymentPhase[],
  },

  gifSlots: [
    {
      id: "dashboard-walkthrough",
      title: "Dashboard walkthrough",
      description: "Prescription queue → detail → savings update.",
      reason: "Optional product UI capture when embed is not ready.",
    },
  ] satisfies HiwMediaSlot[],

  finalCta: {
    eyebrow: "Next step",
    title: "Walk through your data",
    description: "Map your meters, estimate waste, outline a pilot.",
    primaryCta: { label: "Book a Discovery Call", href: "/#contact" } satisfies CtaLink,
  },
} as const;
