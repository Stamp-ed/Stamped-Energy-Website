import type { CtaLink, StatItem, VerticalPageContent } from "../types";
import { icp } from "../icp";

const CTA = { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink;
const HOW = { label: "How it works", href: "/how-it-works" } satisfies CtaLink;

export const pharmaPage: VerticalPageContent = {
  slug: "pharma",
  hero: {
    eyebrow: "Pharmaceutical",
    title: "Most of your electricity is HVAC. Stamped shows exactly where — in rupees.",
    description: `HVAC is ~85% of the bill [BEE]. For formulation and API plants spending ${icp.monthlyBillFloor}+ monthly — chiller staging, AHU schedules, and MD prescriptions verified on your DISCOM bill.`,
    primaryCta: CTA,
    secondaryCta: HOW,
    seoHeadings: [
      "How much electricity do pharmaceutical plants use for HVAC?",
      "How can pharma plants reduce chiller energy consumption?",
      "Is Stamped safe for GMP-regulated pharmaceutical facilities?",
    ],
  },
  economics: {
    eyebrow: "Energy economics",
    title: "HVAC is ~85% of your electricity bill — and ~24% savings are identifiable",
    description:
      "BEE MSME pharma cluster mapping [~]: ~8,000–9,000 units, ~22,873 GWh/yr sector electricity. Chillers, AHUs, CA, and pumps dominate — but nobody ties run-hours to production and tariff windows.",
    stats: [
      {
        id: "hvac-share",
        value: "~85%",
        label: "HVAC share of plant electricity",
        detail: "BEE MSME pharma study [~]",
      },
      {
        id: "ee-potential",
        value: "~24%",
        label: "Electricity savings identified",
        detail: "BEE MSME cluster mapping [~]",
      },
      {
        id: "focus-loads",
        value: "~92%",
        label: "Electrical focus: HVAC + CA + pumps",
        detail: "Remaining loads comparatively minor [~]",
      },
    ] satisfies StatItem[],
  },
  wasteTable: {
    eyebrow: "Where lakhs leak",
    title: "HVAC and utility waste in pharma plants",
    description:
      "Low-risk operational levers first — setpoints, schedules, staging. Not HVAC redesign. Reference ranges [~].",
    areas: [
      {
        id: "chillers-ahu",
        step: "01",
        title: "Chillers & AHUs",
        description:
          "Over-cooling and fixed setpoints vs occupancy — schedule and setpoint band prescriptions.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2–8L",
      },
      {
        id: "chiller-staging",
        step: "02",
        title: "Chiller staging & MD",
        description: "All chiller units start together at shift change → MD spike. Stagger and load-balance.",
        potentialLabel: "Est. MD savings [~]",
        potentialValue: "₹3–10L",
      },
      {
        id: "compressed-air",
        step: "03",
        title: "Compressed air",
        description: 'Overpressure for "safety margin" — pressure band and leak-tag prescriptions.',
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1–3L",
      },
      {
        id: "pumps-cw",
        step: "04",
        title: "Pumps & chilled water loops",
        description: "Constant flow when batch load varies — duty cycle and VFD opportunities.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹1.5–4L",
      },
      {
        id: "clean-room-idle",
        step: "05",
        title: "Clean room idle HVAC",
        description:
          "Full HVAC during non-production windows — qualified setback prescriptions with GMP documentation note.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2–6L",
      },
      {
        id: "captive-re",
        step: "06",
        title: "Captive RE / open access",
        description:
          "Banking leakage and peak grid draw — RE utilization prescriptions for plants with solar.",
        potentialLabel: "Est. monthly savings [~]",
        potentialValue: "₹2–5L",
      },
    ],
  },
  prescriptionExamples: {
    eyebrow: "Example prescriptions",
    title: "GMP-safe operational levers — utilities, not room reclassification",
    description:
      "Illustrative actions from BEE pharma cluster benchmarks [~]. Change-control-friendly utility tweaks first.",
    footnote:
      "Impact ranges are benchmark estimates [~]. Stamped frames prescriptions as utilities operations — not GMP room classification changes. Validate with your quality team before execution.",
    attribution: {
      text: "Large pharma RE governance cases report ₹1–2 Cr/yr leakage prevented at enterprise scale [Greenovative external]. Stamped targets MSME and mid-market formulation plants.",
      source: "Greenovative external benchmark",
    },
    items: [
      {
        id: "chiller-staging",
        title: "Stagger chiller bank startup at morning production ramp",
        description:
          "Three chillers started simultaneously at 06:00 — incomer MD hit 980 kVA with only 60% AHU load required.",
        impactRange: "₹3–10L/month [~]",
        assignee: "Utilities / engineering head",
      },
      {
        id: "ahu-schedule",
        title: "Align AHU run-hours with batch production calendar",
        description:
          "AHUs at full flow 4 hours before first batch start. Schedule adjustment — no setpoint change in classified zones.",
        impactRange: "₹2–6L/month [~]",
        assignee: "Production planner / utilities",
      },
      {
        id: "ca-pressure",
        title: "Reduce compressed air header pressure band",
        description:
          "Header at 8.2 bar for 7.5 bar process requirement — 9% energy reduction on CA system [~].",
        impactRange: "₹1–3L/month [~]",
        assignee: "Maintenance / utilities",
      },
    ],
  },
  integration: {
    eyebrow: "Integration",
    title: "Utilities layer — no GMP system replacement",
    items: [
      {
        id: "path-a",
        title: "Path A: Bill + sub-metering on utilities",
        description:
          "Chiller, AHU, and CA kWh from existing meters — MD and schedule prescriptions within two weeks.",
      },
      {
        id: "path-b",
        title: "Path B: BMS / SCADA historian",
        description:
          "Chiller run-hours, AHU states, and production batch logs aligned — staging prescriptions with context.",
      },
      {
        id: "gmp-safe",
        title: "GMP-safe operational framing",
        description:
          "Prescriptions target utility schedules and staging — not clean room reclassification. Quality team validates before execution.",
      },
      {
        id: "re-solar",
        title: "Solar and open-access plants",
        description:
          "RE banking and peak grid draw prescriptions for plants with captive solar or open access.",
      },
    ],
  },
  outcomes: {
    eyebrow: "Target outcomes",
    title: "What engineering heads and plant owners measure",
    disclaimer: "BEE benchmark bands [~]. Your pilot replaces these with bill-verified figures.",
    items: [
      {
        id: "hvac-rupees",
        title: "HVAC waste in rupees, not kWh charts",
        description:
          "Chiller and AHU run-hours tied to production calendar — prescriptions your utilities team executes this week.",
      },
      {
        id: "md-chiller",
        title: "Chiller MD explained and staggered",
        description:
          "Morning startup overlap quantified — stagger assignments before next billing cycle.",
      },
      {
        id: "schedule",
        title: "Schedule alignment without GMP risk",
        description:
          "Utility-level schedule changes documented — not room classification or validation changes.",
      },
      {
        id: "ledger",
        title: "Verified ₹ ledger on DISCOM bill",
        description:
          "Potential vs realised savings — cost-focused proof for MSME owners and plant heads.",
      },
    ],
  },
  faq: [
    {
      id: "hvac-share",
      question: "Why is HVAC 85% of pharma plant electricity?",
      answer:
        "GMP requires 24/7 environmental control — chillers, AHUs, clean air, and WFI systems run continuously. BEE MSME pharma cluster study [~] identifies HVAC as the dominant electrical load in formulation and API plants.",
    },
    {
      id: "gmp-safe",
      question: "Are Stamped prescriptions safe for GMP facilities?",
      answer:
        "Stamped targets utility operations — chiller staging, AHU schedules, CA pressure bands — not clean room reclassification. Your quality team validates any schedule change before execution. We never promise GMP changes without your validation.",
    },
    {
      id: "api-vs-formulation",
      question: "Does Stamped work for API and formulation plants?",
      answer:
        "Yes — MSME and mid-market formulation, API, and nutraceutical plants in Baddi, Hyderabad, Ahmedabad, and Goa clusters. Bill band ₹5L–₹50L+/month [~] with meaningful HVAC savings potential.",
    },
  ],
  finalCta: {
    eyebrow: "Next step",
    title: "Map your chiller and AHU data",
    description:
      "Discovery call: utility meters, BMS availability, production calendar — outline a pilot if HVAC savings justify it.",
    primaryCta: CTA,
  },
};
