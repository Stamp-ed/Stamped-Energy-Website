import { LandingClosingCta } from "@/components/sections/LandingClosingCta";
import { FutureMedia } from "@/components/sections/FutureMedia";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Outcomes } from "@/components/sections/Outcomes";
import { PrescriptionExample } from "@/components/sections/PrescriptionExample";
import { Problem } from "@/components/sections/Problem";
import { WhyStamped } from "@/components/sections/WhyStamped";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Outcomes />
      <Problem />
      <PrescriptionExample />
      <HowItWorks />
      <Industries />
      <WhyStamped />
      <FutureMedia />
      <IndustryResources />
      <LandingClosingCta />
    </>
  );
}
