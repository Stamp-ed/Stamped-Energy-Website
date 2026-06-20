import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { icp } from "../icp";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "How it works", href: "/how-it-works" } satisfies CtaLink;

export const cementPage: VerticalPageContent = {
  slug: "cement",
  hero: {
    eyebrow: "Cement",
    title: "Your plant has the data. It lacks the decision layer.",
    description: `Govern power mix, kWh/ton, and MD for cement plants spending ${icp.monthlyBillFloor}+ monthly — specific prescriptions verified on your DISCOM bill, not another EMS dashboard.`,
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can cement plants reduce kWh per ton?",
      "What is WHR and grid dispatch optimization for cement plants?",
      "How does Stamped work with existing cement plant EMS?",
    ],
  },
  economics: {
    eyebrow: "Energy economics",
    title: "Power is 35–50% of cost — and tariffs keep climbing",
    description:
      "HV tariffs above ₹10–11/kWh [~] in key states. Multi-source stacks — grid, WHR, captive solar — exceed what operator heuristics can govern shift by shift.",
    stats: [
      {
        id: "cost-share",
        value: "35–50%",
        label: "Energy share of production cost",
        detail: "Company-dependent; structural margin driver [~]",
      },
      {
        id: "sec",
        value: "70–80",
        label: "kWh/ton cement (electrical SEC)",
        detail: "Best plants under 67 kWh/ton [~]",
      },
      {
        id: "tariff",
        value: "₹10–11+",
        label: "HV tariff per kWh in key states",
        detail: "Rajasthan, MP, Chhattisgarh, Gujarat [~]",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Where lakhs leak",
    title: "Electrical hotspots across the cement line",
    description:
      "Load → pattern → prescription. Reference ranges from industry benchmarks [~] — your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "mills",
        step: "01",
        title: "Raw & finish mills",
        description:
          "SEC drift 5–12% when bearings or separator degrade [~]. Anomaly triggers maintenance work order and schedule adjustment.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2–6L",
      },
      {
        id: "kiln-aux",
        step: "02",
        title: "Kiln auxiliaries",
        description: "Idling fans, cooler inefficiency — idle load plus kWh/clinker SEC tracked per line.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.5–4L",
      },
      {
        id: "crushers-md",
        step: "03",
        title: "Crushers & mill startups",
        description: "Simultaneous restart after outage → MD breach. Stagger startup prescriptions assigned to electrical.",
        potentialLabel: "Est. MD savings [~]",
        potentialValue: "₹3–8L",
      },
      {
        id: "whr-re",
        step: "04",
        title: "WHR + grid + RE dispatch",
        description:
          "Under-use of cheap power in peak grid windows. Daily source-mix prescription — increase WHR/solar draw when grid tariff peaks.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹4–12L",
      },
      {
        id: "compressed-air",
        step: "05",
        title: "Compressed air",
        description: "Instrument and plant air leaks — recurring Category 1 waste across cement utilities.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1–2.5L",
      },
      {
        id: "dispatch",
        step: "06",
        title: "Dispatch heuristics",
        description:
          '"Safe" thermal when RE is available — governed dispatch habits replace operator guesswork.',
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹5–15L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "Governed dispatch decisions your team executes this week",
    description:
      "Illustrative actions from cement plant benchmarks [~]. Your pilot generates prescriptions from your meters, EMS feeds, and bill.",
    footnote:
      "Impact ranges are benchmark estimates [~] — not customer guarantees. External reference: enterprise cement dispatch governance cases report ₹8–10 Cr/yr potential at large scale [Greenovative external]. Stamped targets mid-market plants.",
    attribution: {
      text: "Enterprise cement plants saved ₹8–10 Cr/yr potential through dispatch governance — Stamped brings governed decisions to mid-market scale.",
      source: "Greenovative external benchmark",
    },
    items: [
      {
        id: "peak-whr",
        title: "Increase WHR and solar draw 18:00–22:00 peak grid window",
        description:
          "Grid tariff peaks while WHR output available. Shift load to cheaper sources before MD window closes.",
        impactRange: "₹4–12L/month [~]",
        assignee: "Plant electrical / dispatch coordinator",
      },
      {
        id: "mill-restart",
        title: "Stagger finish mill restart after power outage",
        description:
          "Three mills restarted simultaneously — incomer breached contracted MD by 180 kVA. Sequence restart over 20 minutes.",
        impactRange: "₹3–8L/month [~]",
        assignee: "Head electrical",
      },
      {
        id: "sec-drift",
        title: "Finish mill SEC drift vs baseline — maintenance trigger",
        description:
          "kWh/ton up 8% over 14 days with stable output. Separator and bearing inspection before SEC degrades further.",
        impactRange: "₹2–5L/month [~]",
        assignee: "Maintenance planner",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Works with your existing EMS — no rip-and-replace",
    items: [
      {
        id: "path-a",
        title: "Path A: Bill + HT metering first",
        description:
          "Last three DISCOM bills and incomer MD data — prescriptions on demand windows and source mix within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: EMS / PMS / SCADA feeds",
        description:
          "Unify mill SEC, WHR output, and grid draw into one time-aligned graph — prescriptions on kWh/ton and dispatch.",
      },
      {
        id: "coexist",
        title: "Coexists with OEM EMS",
        description:
          "Stamped is the decision layer on top of trends your EMS already shows — assigned actions with ₹ impact and M&V.",
      },
      {
        id: "pat",
        title: "PAT evidence support",
        description:
          "SEC improvement ledger for management reviews and PAT discipline — verified on monthly bills.",
      },
    ],
  },
  outcomes: {
    eyebrow: "Target outcomes",
    title: "What plant directors and electrical heads measure",
    disclaimer: "Benchmark bands [~]. Your pilot replaces these with bill-verified figures.",
    items: [
      {
        id: "kwh-ton",
        title: "kWh/ton visible per line, not plant average",
        description:
          "Finish mill and raw mill SEC tracked against production mix — drift triggers prescriptions before month-end.",
      },
      {
        id: "dispatch",
        title: "Governed source-mix habits",
        description:
          "WHR, grid, and RE utilization tied to tariff windows — daily prescriptions, not quarterly reviews.",
      },
      {
        id: "md",
        title: "MD explained by asset startup",
        description:
          "Crusher and mill restart overlap quantified in rupees — stagger assignments to shift supervisors.",
      },
      {
        id: "ledger",
        title: "Verified ₹ ledger for management",
        description:
          "Potential vs realised savings quarter over quarter — defensible for PAT and internal cost reviews.",
      },
    ],
  },
  faq: [
    {
      id: "kwh-ton-benchmark",
      question: "What is a good kWh/ton benchmark for cement plants?",
      answer:
        "Electrical SEC for cement typically runs 70–80 kWh/ton [~], with best-performing plants under 67 kWh/ton. Stamped tracks your plant's baseline by line and shift — benchmarks are starting points, not targets.",
    },
    {
      id: "ems-vs-stamped",
      question: "We already have an EMS. Why Stamped?",
      answer:
        "EMS shows trends; Stamped assigns governed actions with rupee impact, owner, and verification on the next bill. No rip-and-replace — Stamped is the decision layer your EMS lacks.",
    },
    {
      id: "whr-dispatch",
      question: "Can Stamped optimize WHR and grid dispatch?",
      answer:
        "Yes — daily source-mix prescriptions based on tariff windows, WHR output, and solar availability. Mid-market plants get shift-level governance, not 15-minute enterprise agent stacks on day one.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Upload your last three DISCOM bills",
    description:
      "Free MD and dispatch opportunity scan — we say honestly if a pilot makes sense for your plant scale.",
    primaryCta: CTA,
  },
};
