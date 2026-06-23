import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailView } from "@/components/case-studies/CaseStudyDetail";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedCaseStudyBySlug } from "@/lib/case-studies/studies";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { extractFaqFromContent } from "@/lib/seo/extract-faq";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/metadata";
import { buildCaseStudySchema, buildFaqSchema } from "@/lib/seo/schemas";

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

  const publishedTime = study.publishedAt ?? study.createdAt;

  return buildPageMetadata({
    title: study.title,
    absoluteTitle: `${study.title} - Case Study | Stamped Energy`,
    description: study.excerpt,
    path: `/case-studies/${study.slug}`,
    image: study.coverImage,
    type: "article",
    publishedTime,
    modifiedTime: study.updatedAt,
    authors: [study.author.name],
    keywords: [study.industry, study.categoryLabel, "case study", "energy savings"],
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const publishedDate = study.publishedAt ?? study.createdAt;

  const caseStudySchema = buildCaseStudySchema({
    title: study.title,
    description: study.excerpt,
    slug: study.slug,
    image: study.coverImage,
    publishedDate,
    modifiedDate: study.updatedAt,
    industry: study.industry,
    category: study.categoryLabel,
    authorName: study.author.name,
    authorUrl: study.author.linkedIn,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Case Studies", url: absoluteUrl("/case-studies") },
    { name: study.title, url: absoluteUrl(`/case-studies/${study.slug}`) },
  ]);

  const faqSchema = buildFaqSchema(
    extractFaqFromContent({
      contentFormat: study.contentFormat,
      bodyJson: study.bodyJson,
      content: study.content,
    }),
  );

  const jsonLd = [caseStudySchema, breadcrumbSchema, faqSchema].filter(
    (item): item is NonNullable<typeof item> => item !== null,
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <CaseStudyDetailView study={study} />
    </>
  );
}
