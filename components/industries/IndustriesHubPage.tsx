import type { ReactNode } from "react";

import { IndustriesHubApproach } from "@/components/industries/IndustriesHubApproach";
import { IndustriesHubExplorer } from "@/components/industries/IndustriesHubExplorer";
import { IndustriesHubFeatured } from "@/components/industries/IndustriesHubFeatured";
import { IndustriesHubHero } from "@/components/industries/IndustriesHubHero";
import { IndustriesHubStats } from "@/components/industries/IndustriesHubStats";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { industriesContent } from "@/lib/content";

type IndustriesHubPageProps = {
  resourcesSlot?: ReactNode;
};

export function IndustriesHubPage({ resourcesSlot }: IndustriesHubPageProps) {
  return (
    <>
      <IndustriesHubHero />
      <IndustriesHubStats />
      <IndustriesHubApproach />
      <IndustriesHubFeatured />
      <IndustriesHubExplorer />
      {resourcesSlot ?? <IndustryResources />}
      <IndustryPageCta content={industriesContent.hub.finalCta} />
    </>
  );
}
