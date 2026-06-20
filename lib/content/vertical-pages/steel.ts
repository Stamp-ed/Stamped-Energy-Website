import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { icp } from "../icp";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "How it works", href: "/how-it-works" } satisfies CtaLink;

export const steelPage: VerticalPageContent = {
  slug: "steel",
  hero: {
    eyebrow: "Steel & metals",
    title: "Steel margins are set globally. Your electricity bill is local and controllable.",
    description: `Prescriptive intelligence for furnaces, rolling mills, and utilities — for ${icp.geography} spending ${icp.monthlyBillFloor}+ monthly. PAT-aligned SEC discipline, verified on your bill.`,
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How can steel plants reduce induction furnace electricity consumption?",
      "What is PAT scheme SEC for steel plants?",
      "How does Stamped help rolling mills with maximum demand?",
    ],
  },
  economics: {
    eyebrow: "Energy economics",
    title: "Energy is 20-40% of production cost — and PAT discipline is mandatory",
    description:
      "EAF, induction furnaces, and rolling mills create extreme MD exposure. ~270 PAT-covered plants with 20,000 TOE threshold [~] — SEC improvement is regulated and monetizable.",
    stats: [
      {
        id: "cost-share",
        value: "20-40%",
        label: "Energy share of production cost",
        detail: "TERI steel sector review [~]",
      },
      {
        id: "sec-win",
        value: "17%",
        label: "SEC reduction (external benchmark)",
        detail: "Zerowatt published case: 2,126 → 1,765 kWh/ton [external]",
      },
      {
        id: "pat",
        value: "~270",
        label: "PAT-covered steel plants",
        detail: "20,000 TOE threshold [~]",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Where lakhs leak",
    title: "Furnace, rolling, and utility waste patterns",
    description:
      "Six waste categories apply across steel routes [~]. Reference ranges — your pilot replaces them with verified numbers.",
    areas: [
      {
        id: "eaf-induction",
        step: "01",
        title: "EAF / induction furnace",
        description:
          "Holding power between heats and power factor penalties — schedule and PF sequencing prescriptions.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹3-8L",
      },
      {
        id: "reheating",
        step: "02",
        title: "Reheating furnace",
        description:
          "Weekend hold and idle soak — same playbook as heat treatment in auto-adjacent forging plants.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2-6L",
      },
      {
        id: "rolling-md",
        step: "03",
        title: "Rolling mill startup",
        description: "Simultaneous stand startup → MD spike. Stagger prescriptions assigned to electrical.",
        potentialLabel: "Est. MD savings [~]",
        potentialValue: "₹4-10L",
      },
      {
        id: "pumps-vfd",
        step: "04",
        title: "Cooling water & fume extraction",
        description: "Constant-speed pumps running at full flow — VFD opportunity ranked by ROI.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.5-4L",
      },
      {
        id: "compressed-air",
        step: "05",
        title: "Compressed air",
        description: "Leak and overpressure — Category 1 waste across steel utilities.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1-3L",
      },
      {
        id: "gas-electric",
        step: "06",
        title: "Gas-electric mix",
        description:
          "Suboptimal scheduling when grid time-of-day is high — shift production to tariff windows [Path B].",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2-5L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "Furnace and MD actions assigned this week",
    description:
      "Illustrative actions from secondary steel and rolling benchmarks [~]. Your pilot generates prescriptions from your meters and bill.",
    footnote:
      "Impact ranges are benchmark estimates [~]. External reference: Zerowatt integrated plant case at enterprise scale [external] — Stamped targets mid-market induction and rolling plants.",
    items: [
      {
        id: "induction-hold",
        title: "Reduce induction furnace holding power between heats",
        description:
          "Furnace held at full power 45 minutes between heats with no pour scheduled. Setback schedule aligned to production calendar.",
        impactRange: "₹3-8L/month [~]",
        assignee: "Furnace operator / electrical",
      },
      {
        id: "rolling-startup",
        title: "Sequence rolling mill stand startup after morning break",
        description:
          "Four stands restarted simultaneously at 06:30 — incomer MD breached by 220 kVA. Stagger over 15 minutes.",
        impactRange: "₹4-10L/month [~]",
        assignee: "Rolling mill supervisor",
      },
      {
        id: "pump-vfd",
        title: "Duty-cycle cooling water pumps during low-production window",
        description:
          "CW pumps at 100% flow with 40% rolling output. VFD setpoint adjustment — capital action ranked by payback.",
        impactRange: "₹1.5-4L/month [~]",
        assignee: "Utilities / maintenance",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Path A bill-first, Path B when SCADA exists",
    items: [
      {
        id: "path-a",
        title: "Path A: Incomer meter + DISCOM bills",
        description:
          "MD windows and furnace holding patterns from bill data alone — first prescriptions within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: Furnace SCADA and production data",
        description:
          "Heat schedules, rolling output, and kWh aligned — SEC baselines per route with PAT evidence support.",
      },
      {
        id: "forging-overlap",
        title: "Forging & foundry overlap",
        description:
          "Same playbook as automotive heat treatment and forging — one platform for multi-process metal plants.",
      },
      {
        id: "pat-ccts",
        title: "PAT / CCTS alignment",
        description:
          "SEC improvement tracked and verified — informational support for PAT discipline, not compliance consulting.",
      },
    ],
  },
  outcomes: {
    eyebrow: "Target outcomes",
    title: "Outcomes aligned with PAT and plant economics",
    disclaimer: "Benchmark bands [~]. External SEC wins cited with attribution only.",
    items: [
      {
        id: "furnace-md",
        title: "Furnace holding quantified in rupees",
        description:
          "Induction and reheating idle load tied to heat schedule — prescriptions before the bill, not after.",
      },
      {
        id: "rolling-sec",
        title: "Rolling SEC and MD within shift bands",
        description:
          "kWh/ton tracked by product mix — startup overlap flagged with stagger assignments.",
      },
      {
        id: "pat-sec",
        title: "SEC ledger for PAT reviews",
        description:
          "Verified improvement quarter over quarter — defensible for internal cost reviews and PAT evidence.",
      },
      {
        id: "ledger",
        title: "Verified ₹ ledger on DISCOM bill",
        description:
          "Potential vs realised savings — plant director and CFO see closed-loop M&V.",
      },
    ],
  },
  segments: {
    eyebrow: "Process routes",
    title: "EAF, rolling, forging — where the bill hurts most",
    description:
      "Secondary steel, rolling mills, and forging-adjacent plants — expand each route for typical leaks and prescriptions.",
  },
  faq: [
    {
      id: "induction-consumption",
      question: "How much does induction furnace holding power cost?",
      answer:
        "Holding power between heats can run 30-50% of furnace electricity with no production output [~]. Stamped quantifies this per furnace and assigns setback schedules with monthly rupee impact.",
    },
    {
      id: "pat-sec",
      question: "How does Stamped support PAT SEC targets?",
      answer:
        "Stamped tracks SEC improvement with bill-verified M&V — a ledger for management and PAT evidence. Stamped is prescriptive intelligence, not PAT consulting or audit services.",
    },
    {
      id: "integrated-steel",
      question: "Is Stamped suitable for integrated BF-BOF plants?",
      answer:
        "Phase 1-2 focus is secondary steel, rolling, and forging (₹10L-₹1Cr+/mo electricity [~]). Integrated BF route plants with enterprise-scale bills require a different sales motion — we qualify honestly on discovery calls.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Map your furnace and rolling mill data",
    description:
      "Discovery call: meters, main loads, PAT context — we outline a pilot if the numbers justify it.",
    primaryCta: CTA,
  },
};
