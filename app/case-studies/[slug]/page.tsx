import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailView } from "@/components/case-studies/CaseStudyDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedCaseStudyBySlug } from "@/lib/case-studies/studies";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study" };
  }

  return buildPageMetadata({
    title: study.title,
    absoluteTitle: `${study.title} — Case Study | Stamped Energy`,
    description: study.excerpt,
    path: `/case-studies/${study.slug}`,
    image: study.coverImage,
    type: "article",
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Case Studies", url: absoluteUrl("/case-studies") },
    { name: study.title, url: absoluteUrl(`/case-studies/${study.slug}`) },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CaseStudyDetailView study={study} />
    </>
  );
}
