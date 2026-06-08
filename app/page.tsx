import { FinalCta } from "@/components/sections/FinalCta";
import { FutureMedia } from "@/components/sections/FutureMedia";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { Outcomes } from "@/components/sections/Outcomes";
import { PrescriptionExample } from "@/components/sections/PrescriptionExample";
import { Problem } from "@/components/sections/Problem";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyStamped } from "@/components/sections/WhyStamped";
import { WorkflowLoop } from "@/components/sections/WorkflowLoop";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Outcomes />
      <Problem />
      <WorkflowLoop />
      <PrescriptionExample />
      <HowItWorks />
      <Industries />
      <WhyStamped />
      <FutureMedia />
      <IndustryResources />
      <FinalCta />
    </>
  );
}
