import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/case-studies/CaseStudiesPage";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real deployments and field pilots showing measurable energy cost, efficiency, and demand outcomes for Indian manufacturers.",
  openGraph: {
    title: `Case Studies | ${siteConfig.name}`,
    description:
      "Verified outcomes from automotive-adjacent and process-intensive manufacturing plants.",
  },
};

export const dynamic = "force-dynamic";

export default async function CaseStudiesRoute() {
  const { studies } = await listPublishedCaseStudies({ limit: 24 });
  return <CaseStudiesPage studies={studies} />;
}
