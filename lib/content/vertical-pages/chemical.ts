import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { icp } from "../icp";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "How it works", href: "/how-it-works" } satisfies CtaLink;

export const chemicalPage: VerticalPageContent = {
  slug: "chemical",
  hero: {
    eyebrow: "Chemical & paint",
    title: "Batch energy waste is invisible until the bill arrives.",
    description: `Prescribe stagger, setback, and utility changes between batches — for specialty chemical and paint plants spending ${icp.monthlyBillFloor}+ monthly. kWh per batch, verified on your DISCOM bill.`,
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can chemical plants reduce batch process energy consumption?",
      "What causes maximum demand spikes in batch chemical plants?",
      "Does Stamped work without DCS integration?",
    ],
  },
  economics: {
    eyebrow: "Energy economics",
    title: "Batch plants fail on kWh per batch — not total kWh",
    description:
      "Reactors, distillation, steam, and agitators create time-shifted demand. Waste hides in idle hold between batches, simultaneous heating, and utility baseload — analogous to shift-start overlap in discrete manufacturing.",
    stats: [
      {
        id: "batch-idle",
        value: "15-30%",
        label: "Energy in idle hold between batches",
        detail: "Heated vessels idle, utilities at baseload [~]",
      },
      {
        id: "md-overlap",
        value: "₹3-10L",
        label: "Monthly MD from simultaneous batch starts",
        detail: "Multiple reactors heating together [~]",
      },
      {
        id: "pat",
        value: "PAT",
        label: "Chlor-alkali and chemical subsectors covered",
        detail: "GtG SEC, gate-to-gate discipline [~]",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Where lakhs leak",
    title: "Batch timeline waste: heat → hold → idle → cool",
    description:
      "Five prescription types across batch chemical plants [~]. Reference ranges — your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "reactor-idle",
        step: "01",
        title: "Batch reactor idle hold",
        description:
          "Soak temperature maintained with no batch scheduled — setback schedule vs production calendar.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2-6L",
      },
      {
        id: "batch-md",
        step: "02",
        title: "Simultaneous batch heating",
        description: "Three reactors ramp together at shift start → MD breach. Stagger prescriptions.",
        potentialLabel: "Est. MD savings [~]",
        potentialValue: "₹3-10L",
      },
      {
        id: "steam-thermal",
        step: "03",
        title: "Steam & thermal systems",
        description: "Trap maintenance signals from condensate temperature drift [Path B].",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.5-5L",
      },
      {
        id: "cooling-between",
        step: "04",
        title: "Cooling between batches",
        description: "Chiller setpoint vs next batch start — avoid full cool when short gap scheduled.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1-3L",
      },
      {
        id: "solvent-recovery",
        step: "05",
        title: "Solvent recovery units",
        description: "Run window vs tariff — shift recovery to off-peak when batch schedule allows.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "paint-oven",
        step: "06",
        title: "Paint oven & coating lines",
        description: "Cure cycle alignment — avoid partial oven heat between short batch gaps.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.2-3L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "What to change before month-end — assigned to your batch team",
    description:
      "Illustrative actions from batch chemical benchmarks [~]. Path A: batch log CSV + bill. Path B: DCS integration.",
    footnote:
      "Impact ranges are benchmark estimates [~] — not customer guarantees. Verified figures come from your pilot M&V.",
    items: [
      {
        id: "reactor-stagger",
        title: "Stagger reactor heating start across three batch lines",
        description:
          "Reactors R1, R2, R3 heated simultaneously at 07:00 — incomer MD breached by 195 kVA. Sequence over 25 minutes.",
        impactRange: "₹3-10L/month [~]",
        assignee: "Batch supervisor / electrical",
      },
      {
        id: "soak-setback",
        title: "Setback reactor soak during 4-hour batch gap",
        description:
          "Reactor held at 180°C with no batch until 14:00. Setback to 140°C during gap — production calendar confirmed.",
        impactRange: "₹2-6L/month [~]",
        assignee: "Process operator",
      },
      {
        id: "off-peak-utility",
        title: "Shift solvent recovery run to off-peak tariff window",
        description:
          "Recovery unit running peak hours when batch schedule allows night-window operation.",
        impactRange: "₹1.5-4L/month [~]",
        assignee: "Utilities / production planner",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Batch log + bill first, DCS when available",
    items: [
      {
        id: "path-a",
        title: "Path A: Batch log CSV + DISCOM bills",
        description:
          "Batch windows and incomer MD aligned manually — first prescriptions on idle hold and stagger within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: DCS / batch MES historian",
        description:
          "Reactor states, steam flow, and production aligned — kWh/batch baselines with anomaly prescriptions.",
      },
      {
        id: "pat-sec",
        title: "PAT SEC note",
        description:
          "Gate-to-gate SEC tracking for PAT-covered chemical subsectors — verified ledger, not audit services.",
      },
      {
        id: "clusters",
        title: "Built for batch clusters",
        description:
          "Specialty chemicals, resins, agrochemical formulation, paint — Vapi, Ankleshwar, Dahej, Cuddalore, Alwar.",
      },
    ],
  },
  outcomes: {
    eyebrow: "Target outcomes",
    title: "kWh per batch — not plant-wide averages",
    disclaimer: "Benchmark bands [~]. Your pilot replaces these with bill-verified figures.",
    items: [
      {
        id: "batch-sec",
        title: "kWh/batch baseline per reactor line",
        description:
          "SEC normalized by batch type and volume — idle hold drift triggers prescriptions before month-end.",
      },
      {
        id: "idle-hold",
        title: "Idle hold quantified in rupees",
        description:
          "Heated vessel hold between batches tied to production calendar — setback assignments to operators.",
      },
      {
        id: "md-stagger",
        title: "Batch-start MD staggered",
        description:
          "Simultaneous reactor heating explained asset by asset — electrical gets sequence prescription.",
      },
      {
        id: "ledger",
        title: "Verified ₹ ledger monthly",
        description:
          "Potential vs realised savings on DISCOM bill — defensible for PAT and internal cost reviews.",
      },
    ],
  },
  faq: [
    {
      id: "batch-sec",
      question: "How does Stamped measure energy per batch?",
      answer:
        "Stamped aligns incomer and sub-meter kWh with batch windows from logs or DCS — kWh/batch baselines by reactor line and product. Drift triggers prescriptions with rupee impact.",
    },
    {
      id: "path-a-batch",
      question: "Can we start without DCS integration?",
      answer:
        "Yes — Path A uses batch log CSV (start/end times, reactor ID) plus DISCOM bills. First prescriptions on idle hold and MD stagger typically within two weeks.",
    },
    {
      id: "chlor-alkali",
      question: "Is Stamped for large chlor-alkali plants?",
      answer:
        "Phase 1-2 focus is specialty chemicals, resins, agrochemical formulation, and paint — ₹8L-₹80L+/month electricity [~]. Mega chlor-alkali DCs require enterprise motion — we qualify on discovery calls.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Connect your batch calendar to your bill",
    description:
      "Discovery call: batch logs, main loads, tariff windows — outline a pilot if batch SEC waste justifies it.",
    primaryCta: CTA,
  },
};
