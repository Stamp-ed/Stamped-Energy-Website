"use client";

import { IndustriesHubApproach } from "@/components/industries/IndustriesHubApproach";
import { IndustriesHubExplorer } from "@/components/industries/IndustriesHubExplorer";
import { IndustriesHubFeatured } from "@/components/industries/IndustriesHubFeatured";
import { IndustriesHubHero } from "@/components/industries/IndustriesHubHero";
import { IndustriesHubStats } from "@/components/industries/IndustriesHubStats";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { industriesContent } from "@/lib/content";

export function IndustriesHubPage() {
  return (
    <>
      <IndustriesHubHero />
      <IndustriesHubStats />
      <IndustriesHubApproach />
      <IndustriesHubFeatured />
      <IndustriesHubExplorer />
      <IndustryResources />
      <IndustryPageCta content={industriesContent.hub.finalCta} />
    </>
  );
}
