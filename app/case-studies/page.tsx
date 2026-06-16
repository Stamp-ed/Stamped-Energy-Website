import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/case-studies/CaseStudiesPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildCollectionPageSchema } from "@/lib/seo/schemas";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.caseStudies);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Case Studies", url: PAGE_SEO.caseStudies.path },
]);

const collectionSchema = buildCollectionPageSchema({
  name: PAGE_SEO.caseStudies.absoluteTitle,
  description: PAGE_SEO.caseStudies.description,
  path: PAGE_SEO.caseStudies.path,
});

export default async function CaseStudiesRoute() {
  const { studies } = await listPublishedCaseStudies({ limit: 24 });

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <CaseStudiesPage studies={studies} />
    </>
  );
}
