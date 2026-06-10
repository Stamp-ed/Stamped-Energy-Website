import type { Metadata } from "next";

import { HiwBeforeAfter } from "@/components/how-it-works/HiwBeforeAfter";
import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwIntelligenceStack } from "@/components/how-it-works/HiwIntelligenceStack";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwPageCta } from "@/components/how-it-works/HiwPageCta";
import { HiwPinnedJourney } from "@/components/how-it-works/HiwPinnedJourney";
import { HiwPrescriptionWalkthrough } from "@/components/how-it-works/HiwPrescriptionWalkthrough";
import { IndustryResources } from "@/components/industries/shared/IndustryResources";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Connect incomer meters, SCADA, and bills. Assign fixes in rupees. Verify savings on the next DISCOM bill, for Indian auto component manufacturers.",
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
      <IndustryResources />
      <HiwPageCta />
    </>
  );
}
