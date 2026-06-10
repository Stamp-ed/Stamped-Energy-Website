import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyDetailView } from "@/components/case-studies/CaseStudyDetail";
import { getPublishedCaseStudyBySlug } from "@/lib/case-studies/studies";
import { siteConfig } from "@/lib/content";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study" };
  }

  return {
    title: study.title,
    description: study.excerpt,
    openGraph: {
      title: `${study.title} | ${siteConfig.name}`,
      description: study.excerpt,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyDetailView study={study} />;
}
