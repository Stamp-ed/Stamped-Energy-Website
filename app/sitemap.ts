import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/blog/posts";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC_PATHS = [
  "/",
  "/how-it-works",
  "/about",
  "/blog",
  "/case-studies",
  "/contact",
  "/industries",
  "/industries/automotive",
  "/industries/cement",
  "/industries/steel",
  "/industries/pharma",
  "/industries/chemical",
] as const;

const STATIC_PRIORITIES: Record<string, number> = {
  "/": 1.0,
  "/how-it-works": 0.9,
  "/industries/automotive": 0.9,
  "/industries/cement": 0.9,
  "/industries/steel": 0.85,
  "/industries/pharma": 0.85,
  "/industries/chemical": 0.85,
  "/case-studies": 0.85,
  "/about": 0.8,
  "/blog": 0.8,
  "/industries": 0.8,
  "/contact": 0.75,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, studiesResult] = await Promise.all([
    listPublishedPosts({ limit: 500 }),
    listPublishedCaseStudies({ limit: 100 }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly",
    priority: STATIC_PRIORITIES[path] ?? 0.7,
    lastModified: new Date(),
  }));

  const blogEntries: MetadataRoute.Sitemap = postsResult.posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = studiesResult.studies.map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: new Date(study.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
