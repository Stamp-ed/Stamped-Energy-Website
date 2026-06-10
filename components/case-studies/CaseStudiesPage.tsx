"use client";

import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { CaseStudiesCatalog } from "@/components/case-studies/CaseStudiesCatalog";
import { CaseStudiesFeatured } from "@/components/case-studies/CaseStudiesFeatured";
import { CaseStudiesHero } from "@/components/case-studies/CaseStudiesHero";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";

type CaseStudiesPageProps = {
  studies: CaseStudyListItem[];
};

export function CaseStudiesPage({ studies }: CaseStudiesPageProps) {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesFeatured studies={studies.filter((s) => s.featured)} />
      <CaseStudiesCatalog studies={studies} />
      <IndustryPageCta content={caseStudiesContent.finalCta} />
    </>
  );
}
