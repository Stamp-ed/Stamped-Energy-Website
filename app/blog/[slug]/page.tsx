import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleView } from "@/components/blog/BlogArticleView";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/posts";
import { prisma } from "@/lib/blog/db";
import { buildPageMetadata } from "@/lib/seo/metadata";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return { title: "Article" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post.slug, post.category, 3);

  return <BlogArticleView post={post} related={related} />;
}
