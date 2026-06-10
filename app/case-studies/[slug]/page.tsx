import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailView } from "@/components/case-studies/CaseStudyDetail";
import { getPublishedCaseStudyBySlug } from "@/lib/case-studies/studies";
import { buildPageMetadata } from "@/lib/seo/metadata";

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

  return <CaseStudyDetailView study={study} />;
}
