import type { Metadata } from "next";

import { LandingClosingCta } from "@/components/sections/LandingClosingCta";
import { FutureMedia } from "@/components/sections/FutureMedia";
import { Hero } from "@/components/sections/Hero";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { IndustryFourPointZero } from "@/components/sections/IndustryFourPointZero";
import { OperationalSustainability } from "@/components/sections/OperationalSustainability";
import { Outcomes } from "@/components/sections/Outcomes";
import { PrescriptionExample } from "@/components/sections/PrescriptionExample";
import { Problem } from "@/components/sections/Problem";
import { WhyStamped } from "@/components/sections/WhyStamped";
import { DynamicIndustryResources } from "@/components/industries/shared/DynamicIndustryResources";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  homepageFaqSchema,
  homepageSpeakableSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.home);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema,
          softwareApplicationSchema,
          homepageFaqSchema,
          homepageSpeakableSchema,
        ]}
      />
      <Hero />
      <Outcomes />
      <OperationalSustainability />
      <Problem />
      <PrescriptionExample />
      <HowItWorks />
      <IndustryFourPointZero />
      <Industries />
      <WhyStamped />
      <FutureMedia />
      <DynamicIndustryResources />
      <HomeFaq />
      <LandingClosingCta />
    </>
  );
}
