import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/case-studies/CaseStudiesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.caseStudies);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Case Studies", url: PAGE_SEO.caseStudies.path },
]);

export default async function CaseStudiesRoute() {
  const { studies } = await listPublishedCaseStudies({ limit: 24 });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CaseStudiesPage studies={studies} />
    </>
  );
}
