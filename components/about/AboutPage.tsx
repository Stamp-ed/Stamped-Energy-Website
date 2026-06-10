"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutVisionMission } from "@/components/about/AboutVisionMission";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { aboutContent } from "@/lib/content/about";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutVisionMission />
      <AboutValues />
      <AboutTeam />
      <AboutJourney />
      <IndustryPageCta content={aboutContent.finalCta} />
    </>
  );
}
