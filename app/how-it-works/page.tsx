import type { Metadata } from "next";

import { HiwBeforeAfter } from "@/components/how-it-works/HiwBeforeAfter";
import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwIntelligenceStack } from "@/components/how-it-works/HiwIntelligenceStack";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwPageCta } from "@/components/how-it-works/HiwPageCta";
import { HiwPinnedJourney } from "@/components/how-it-works/HiwPinnedJourney";
import { HiwPrescriptionWalkthrough } from "@/components/how-it-works/HiwPrescriptionWalkthrough";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A prescriptive intelligence platform built on unified plant data — Connect, Observe, Decide, Execute, and Verify savings for Indian manufacturers.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HiwOpening />
      <HiwPinnedJourney />
      <HiwIntelligenceStack />
      <HiwPrescriptionWalkthrough />
      <HiwCapabilities />
      <HiwBeforeAfter />
      <HiwDeployment />
      <HiwPageCta />
    </>
  );
}
