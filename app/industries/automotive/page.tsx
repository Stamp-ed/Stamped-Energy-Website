import type { Metadata } from "next";

import { AutomotiveChallenges } from "@/components/industries/automotive/AutomotiveChallenges";
import { AutomotiveHero } from "@/components/industries/automotive/AutomotiveHero";
import { AutomotiveOutcomes } from "@/components/industries/automotive/AutomotiveOutcomes";
import { AutomotiveProvides } from "@/components/industries/automotive/AutomotiveProvides";
import { AutomotiveSegments } from "@/components/industries/automotive/AutomotiveSegments";
import { AutomotiveValueExplorer } from "@/components/industries/automotive/AutomotiveValueExplorer";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { JsonLd } from "@/components/seo/JsonLd";
import { industriesContent } from "@/lib/content";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.industriesAutomotive);

const automotiveFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much can auto component manufacturers reduce their electricity bill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Auto component suppliers using prescriptive energy intelligence typically see 12–20% monthly bill reduction. Die casting and forging plants often recover 15–25% on maximum demand charges alone from shift-start sequencing and furnace coordination.",
      },
    },
    {
      "@type": "Question",
      name: "What is maximum demand and how does it affect my electricity bill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Maximum demand (MD) is the highest average kVA your plant draws in a billing window. Indian DISCOMs charge a fixed rate per kVA of recorded MD each month. Overlapping furnace pre-heat, compressor startup, and press cycles at shift start are the most common MD drivers in auto component plants.",
      },
    },
    {
      "@type": "Question",
      name: "How does Stamped Energy work for die casting plants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stamped connects to your incomer meter and SCADA, builds production-normalized SEC baselines per cell and shift, then sends ranked prescriptions — stagger furnace pre-heat, stage compressors, reduce holding loads — with rupee impact assigned to shift supervisors via WhatsApp.",
      },
    },
  ],
};

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Industries", url: PAGE_SEO.industries.path },
  { name: "Automotive", url: PAGE_SEO.industriesAutomotive.path },
]);

export default function AutomotiveIndustryPage() {
  return (
    <>
      <JsonLd data={[automotiveFaqSchema, breadcrumbSchema]} />
      <div className="sr-only">
        <h2>How much can auto component manufacturers reduce their electricity bill?</h2>
        <h3>What is maximum demand and how does it affect my electricity bill?</h3>
        <h3>How does Stamped Energy work for die casting plants?</h3>
      </div>
      <AutomotiveHero />
      <AutomotiveChallenges />
      <AutomotiveValueExplorer />
      <AutomotiveProvides />
      <AutomotiveSegments />
      <AutomotiveOutcomes />
      <IndustryResources content={industriesContent.automotive.resources} />
      <IndustryPageCta />
    </>
  );
}
