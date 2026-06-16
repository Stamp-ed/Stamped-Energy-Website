/** Canonical title tags and meta descriptions per SEO spec (Sections 1–2). */

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
      "Stamped Energy turns your existing meters, SCADA, and bills into rupee-denominated prescriptions. Cut your electricity bill by 12–20%. Verified on your DISCOM bill.",
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
    absoluteTitle: "Industries | Stamped Energy — Auto, Forging, Heat Treatment",
    description:
      "Prescriptive energy intelligence for auto component suppliers, forging, heat treatment, and rubber moulding plants across India.",
    path: "/industries",
  },
  industriesAutomotive: {
    absoluteTitle: "Auto Component Energy Cost Reduction | Stamped Energy",
    description:
      "Prescriptive energy intelligence for auto component suppliers. Die casting, forging, heat treatment, rubber moulding — savings tied to furnaces, compressors, and shift-start MD.",
    path: "/industries/automotive",
  },
} as const satisfies Record<string, PageSeoConfig>;
