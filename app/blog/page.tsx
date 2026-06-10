import type { Metadata } from "next";

import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogHero } from "@/components/blog/BlogHero";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { listPublishedPosts } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

const BLOG_DESCRIPTION =
  "Plant-floor notes on electricity cost, maximum demand, and verified savings for Indian auto component manufacturers.";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: BLOG_DESCRIPTION,
  path: "/blog",
});

const BLOG_CTA = {
  eyebrow: "From reading to action",
  title: "See what your incomer meter is already telling you",
  description:
    "Connect existing meters and plant data. Assigned fixes in rupees, verified on the next bill.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
};

export default async function BlogPage() {
  const [featuredResult, catalogResult] = await Promise.all([
    listPublishedPosts({ featured: true, limit: 3 }),
    listPublishedPosts({ page: 1, limit: 6 }),
  ]);

  return (
    <>
      <BlogHero
        eyebrow="Blog"
        title="Notes from the plant floor on electricity cost"
        description="Maximum demand, shift-start overlap, furnace holding, compressor waste, written for plant heads and electrical HODs, not software teams."
      />
      <BlogFeatured posts={featuredResult.posts} />
      <BlogCatalog
        initialPosts={catalogResult.posts}
        initialHasMore={catalogResult.pagination.hasMore}
        initialPage={catalogResult.pagination.page}
      />
      <IndustryPageCta content={BLOG_CTA} />
    </>
  );
}
