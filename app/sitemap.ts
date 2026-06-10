import type { MetadataRoute } from "next";

import { listPublishedPosts } from "@/lib/blog/posts";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/case-studies",
  "/how-it-works",
  "/industries",
  "/industries/automotive",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsResult, studiesResult] = await Promise.all([
    listPublishedPosts({ limit: 100 }),
    listPublishedCaseStudies({ limit: 100 }),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = postsResult.posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = studiesResult.studies.map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: new Date(study.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
