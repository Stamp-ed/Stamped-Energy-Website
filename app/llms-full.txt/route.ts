import { listPublishedPosts } from "@/lib/blog/posts";
import { listPublishedCaseStudies } from "@/lib/case-studies/studies";
import { icp } from "@/lib/content/icp";
import { SITE_URL } from "@/lib/seo/constants";

export const revalidate = 3600;

export async function GET() {
  const [postsResult, studiesResult] = await Promise.all([
    listPublishedPosts({ limit: 500 }),
    listPublishedCaseStudies({ limit: 100 }),
  ]);

  const lines: string[] = [
    "# Stamped Energy — Full Content Index",
    "",
    "> Auto-generated index of all published blog posts and case studies for AI crawlers and answer engines.",
    "",
    icp.seo.entityDefinition,
    "",
    `Site: ${SITE_URL}`,
    `Category: ${icp.seo.categoryLabel}`,
    `Audience: ${icp.seo.audienceLine}`,
    `For overview see ${SITE_URL}/llms.txt`,
    "",
    "## Blog posts",
    "",
  ];

  if (postsResult.posts.length === 0) {
    lines.push("- (No published posts yet)");
  } else {
    for (const post of postsResult.posts) {
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`);
    }
  }

  lines.push("", "## Case studies", "");

  if (studiesResult.studies.length === 0) {
    lines.push("- (No published case studies yet)");
  } else {
    for (const study of studiesResult.studies) {
      lines.push(
        `- [${study.title}](${SITE_URL}/case-studies/${study.slug}): ${study.excerpt}`,
      );
    }
  }

  lines.push(
    "",
    "## Static pages",
    "",
    `- [Home](${SITE_URL}/)`,
    `- [How It Works](${SITE_URL}/how-it-works)`,
    `- [Industries hub](${SITE_URL}/industries)`,
    `- [Industries — Automotive](${SITE_URL}/industries/automotive)`,
    `- [Industries — Cement](${SITE_URL}/industries/cement)`,
    `- [Industries — Steel](${SITE_URL}/industries/steel)`,
    `- [Industries — Pharmaceutical](${SITE_URL}/industries/pharma)`,
    `- [Industries — Chemical](${SITE_URL}/industries/chemical)`,
    `- [Case Studies](${SITE_URL}/case-studies)`,
    `- [Blog](${SITE_URL}/blog)`,
    `- [About](${SITE_URL}/about)`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
