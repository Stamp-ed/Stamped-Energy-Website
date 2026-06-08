import type { Metadata } from "next";

import { AutomotiveChallenges } from "@/components/industries/automotive/AutomotiveChallenges";
import { AutomotiveHero } from "@/components/industries/automotive/AutomotiveHero";
import { AutomotiveOutcomes } from "@/components/industries/automotive/AutomotiveOutcomes";
import { AutomotiveMediaSlot } from "@/components/industries/automotive/AutomotiveMediaSlot";
import { AutomotiveProvides } from "@/components/industries/automotive/AutomotiveProvides";
import { AutomotiveSegments } from "@/components/industries/automotive/AutomotiveSegments";
import { AutomotiveValueExplorer } from "@/components/industries/automotive/AutomotiveValueExplorer";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";
import { industriesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Automotive",
  description: industriesContent.automotive.description,
};

export default function AutomotiveIndustryPage() {
  return (
    <>
      <AutomotiveHero />
      <AutomotiveChallenges />
      <AutomotiveValueExplorer />
      <AutomotiveProvides />
      <AutomotiveMediaSlot />
      <AutomotiveSegments />
      <AutomotiveOutcomes />
      <IndustryResources />
      <IndustryPageCta />
    </>
  );
}
