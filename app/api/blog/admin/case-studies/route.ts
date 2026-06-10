import type { PostStatus } from "@prisma/client";

import { jsonError, jsonOk, parseJsonBody } from "@/lib/blog/api";
import { requireAdminSession } from "@/lib/blog/auth";
import { CASE_STUDY_CATEGORY_IDS } from "@/lib/case-studies/constants";
import { createCaseStudy, listAdminCaseStudies } from "@/lib/case-studies/studies";

type CreateBody = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  contentFormat?: "MARKDOWN" | "RICH";
  bodyJson?: string | null;
  coverImage?: string | null;
  coverImageAlt?: string;
  category?: string;
  industry?: string;
  clientContext?: string;
  tag?: string | null;
  metrics?: { label: string; value: string }[];
  outcomes?: string[];
  disclaimer?: string | null;
  status?: PostStatus;
  featured?: boolean;
  readTimeMin?: number;
};

export async function GET(request: Request) {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const { searchParams } = new URL(request.url);
  const status = (searchParams.get("status") ?? "all") as PostStatus | "all";
  const search = searchParams.get("search") ?? undefined;

  const studies = await listAdminCaseStudies({ status, search });
  return jsonOk({ studies });
}

export async function POST(request: Request) {
  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const body = await parseJsonBody<CreateBody>(request);

  if (!body?.title?.trim() || !body.excerpt?.trim() || !body.category || !body.industry?.trim()) {
    return jsonError("Title, excerpt, category, and industry are required.", 400);
  }

  if (!body.bodyJson?.trim() && !body.content?.trim()) {
    return jsonError("Case study body is required.", 400);
  }

  if (!CASE_STUDY_CATEGORY_IDS.includes(body.category as (typeof CASE_STUDY_CATEGORY_IDS)[number])) {
    return jsonError("Invalid category.", 400);
  }

  const study = await createCaseStudy({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    contentFormat: body.contentFormat,
    bodyJson: body.bodyJson,
    coverImage: body.coverImage,
    coverImageAlt: body.coverImageAlt,
    category: body.category,
    industry: body.industry,
    clientContext: body.clientContext,
    tag: body.tag,
    metrics: body.metrics,
    outcomes: body.outcomes,
    disclaimer: body.disclaimer,
    status: body.status,
    featured: body.featured,
    readTimeMin: body.readTimeMin,
    authorId: session.userId,
  });

  return jsonOk({ study }, { status: 201 });
}
