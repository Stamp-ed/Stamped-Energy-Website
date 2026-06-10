import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/case-studies/CaseStudiesPage";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { buildPageMetadata } from "@/lib/seo/metadata";

const CASE_STUDIES_DESCRIPTION =
  "Real deployments and field pilots showing measurable energy cost, efficiency, and demand outcomes for Indian manufacturers.";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description: CASE_STUDIES_DESCRIPTION,
  path: "/case-studies",
});

export default async function CaseStudiesRoute() {
  const { studies } = await listPublishedCaseStudies({ limit: 24 });
  return <CaseStudiesPage studies={studies} />;
}
