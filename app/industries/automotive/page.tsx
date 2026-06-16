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
import { automotiveFaqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.industriesAutomotive);

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
