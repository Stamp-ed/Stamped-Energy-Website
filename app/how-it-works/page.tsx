import type { Metadata } from "next";

import { HiwBeforeAfter } from "@/components/how-it-works/HiwBeforeAfter";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwIntegrations } from "@/components/how-it-works/HiwIntegrations";
import { HiwIntelligenceStack } from "@/components/how-it-works/HiwIntelligenceStack";
import { HiwMediaSlots } from "@/components/how-it-works/HiwMediaSlots";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwPageCta } from "@/components/how-it-works/HiwPageCta";
import { HiwPinnedJourney } from "@/components/how-it-works/HiwPinnedJourney";
import { HiwPrescriptionWalkthrough } from "@/components/how-it-works/HiwPrescriptionWalkthrough";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Scroll through Stamped Energy's Connect → Observe → Decide → Execute → Verify workflow — prescriptive energy intelligence for Indian manufacturers.",
};

export default function HowItWorksPage() {
  return (
    <>
      <HiwOpening />
      <HiwPinnedJourney />
      <HiwIntelligenceStack />
      <HiwPrescriptionWalkthrough />
      <HiwBeforeAfter />
      <HiwIntegrations />
      <HiwDeployment />
      <HiwMediaSlots />
      <HiwPageCta />
    </>
  );
}
