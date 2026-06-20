/** Canonical title tags and meta descriptions per SEO spec (Sections 1-2). */

export type PageSeoConfig = {
  absoluteTitle: string;
  description: string;
  path: string;
};

export const PAGE_SEO = {
  home: {
    absoluteTitle:
      "Stamped Energy | Prescriptive Energy Intelligence for Indian Manufacturers",
    description:
      "Stamped Energy turns your existing meters, SCADA, and bills into rupee-denominated prescriptions. Cut your electricity bill by 12-20%. Verified on your DISCOM bill.",
    path: "/",
  },
  howItWorks: {
    absoluteTitle: "How It Works | Stamped Energy — 5-Step Energy Loop",
    description:
      "See how Stamped Energy connects your incomer meters, SCADA, and plant data into verified rupee savings — in five operational steps. No hardware retrofit required.",
    path: "/how-it-works",
  },
  about: {
    absoluteTitle: "About Stamped Energy | IIT Roorkee Engineers, Verified Savings",
    description:
      "Stamped Energy is built by IIT Roorkee electrical engineers for plant heads who need verified savings on the DISCOM bill, not another monitoring dashboard.",
    path: "/about",
  },
  blog: {
    absoluteTitle: "Energy Intelligence Blog | Stamped Energy",
    description:
      "Field notes on maximum demand, shift-start overlap, furnace holding, and compressor waste — written for plant heads and electrical HODs in Indian manufacturing.",
    path: "/blog",
  },
  caseStudies: {
    absoluteTitle: "Energy Savings Case Studies | Stamped Energy",
    description:
      "Real energy savings outcomes from die casting, forging, and heat treatment plants. Every figure tied to IPMVP M&V or labelled as benchmark until pilot data is publishable.",
    path: "/case-studies",
  },
  contact: {
    absoluteTitle: "Book a Discovery Call | Stamped Energy",
    description:
      "Book a discovery call with Stamped Energy. We review your last three DISCOM bills, plant meter setup, and outline a pilot — only if the numbers justify it.",
    path: "/contact",
  },
  industries: {
    absoluteTitle: "Industries | Stamped Energy — Cement, Steel, Pharma, Auto",
    description:
      "Prescriptive energy intelligence for cement, steel, pharmaceutical, chemical, and automotive plants across India. ₹20 lakh+ monthly bills — verified on your DISCOM bill.",
    path: "/industries",
  },
  industriesAutomotive: {
    absoluteTitle: "Auto Component Energy Cost Reduction | Stamped Energy",
    description:
      "Prescriptive energy intelligence for auto component suppliers. Die casting, forging, heat treatment, rubber moulding — savings tied to furnaces, compressors, and shift-start MD.",
    path: "/industries/automotive",
  },
  industriesCement: {
    absoluteTitle: "Cement Plant Energy Management India | Stamped Energy",
    description:
      "Cut cement plant electricity cost with prescriptions on kWh/ton, MD, and WHR/grid dispatch — verified on your DISCOM bill. For mid-market plants spending ₹20 lakh+ monthly.",
    path: "/industries/cement",
  },
  industriesSteel: {
    absoluteTitle: "Steel Plant Energy Efficiency India | Stamped Energy",
    description:
      "Prescriptive energy intelligence for steel and metals — induction furnaces, rolling mills, MD control, and PAT-aligned SEC improvement verified on your bill.",
    path: "/industries/steel",
  },
  industriesPharma: {
    absoluteTitle: "Pharmaceutical Plant HVAC Energy Savings | Stamped Energy",
    description:
      "HVAC is ~85% of your pharma plant bill. Chiller staging, AHU schedules, and MD prescriptions — GMP-safe operational levers, verified on your DISCOM bill.",
    path: "/industries/pharma",
  },
  industriesChemical: {
    absoluteTitle: "Chemical Plant Batch Energy Optimization | Stamped Energy",
    description:
      "Batch energy waste between reactors — stagger, soak setback, and off-peak utility prescriptions for specialty chemical and paint plants. Verified monthly on your bill.",
    path: "/industries/chemical",
  },
} as const satisfies Record<string, PageSeoConfig>;

const VERTICAL_SEO_MAP: Record<string, PageSeoConfig> = {
  automotive: PAGE_SEO.industriesAutomotive,
  cement: PAGE_SEO.industriesCement,
  steel: PAGE_SEO.industriesSteel,
  pharma: PAGE_SEO.industriesPharma,
  chemical: PAGE_SEO.industriesChemical,
};

export function getVerticalPageSeo(slug: string): PageSeoConfig | undefined {
  return VERTICAL_SEO_MAP[slug];
}
