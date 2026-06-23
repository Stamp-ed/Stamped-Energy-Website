import type { PostStatus } from "@prisma/client";

import { jsonError, jsonOk, parseJsonBody } from "@/lib/blog/api";
import { requireAdminSession } from "@/lib/blog/auth";
import { CASE_STUDY_CATEGORY_IDS } from "@/lib/case-studies/constants";
import {
  deleteCaseStudy,
  getAdminCaseStudyById,
  updateCaseStudy,
  type UpdateCaseStudyInput,
} from "@/lib/case-studies/studies";
import { revalidateCaseStudyPages, revalidateContentSitemap, revalidateHomepageSpotlight } from "@/lib/blog/revalidate-public";
import { HomepageSpotlightFullError } from "@/lib/content/homepage-spotlight";
import { isAuthorProfileId } from "@/lib/content/author-profiles";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type UpdateBody = {
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
  homepageFeatured?: boolean;
  homepageOrder?: number | null;
  readTimeMin?: number;
  authorProfile?: string;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const { id } = await context.params;
  const study = await getAdminCaseStudyById(id);

  if (!study) {
    return jsonError("Case study not found.", 404);
  }

  return jsonOk({ study });
}

export async function PUT(request: Request, context: RouteContext) {
  return updateHandler(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return updateHandler(request, context);
}

async function updateHandler(request: Request, context: RouteContext) {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const { id } = await context.params;
  const body = await parseJsonBody<UpdateBody>(request);

  if (!body) {
    return jsonError("Invalid request body.", 400);
  }

  if (
    body.category &&
    !CASE_STUDY_CATEGORY_IDS.includes(body.category as (typeof CASE_STUDY_CATEGORY_IDS)[number])
  ) {
    return jsonError("Invalid category.", 400);
  }

  if (body.authorProfile && !isAuthorProfileId(body.authorProfile)) {
    return jsonError("Invalid author profile.", 400);
  }

  try {
    const study = await updateCaseStudy(id, {
      ...body,
      authorProfile: body.authorProfile as UpdateCaseStudyInput["authorProfile"],
    });
    revalidateCaseStudyPages(study.slug);
    revalidateContentSitemap();
    revalidateHomepageSpotlight();
    return jsonOk({ study });
  } catch (error) {
    if (error instanceof HomepageSpotlightFullError) {
      return jsonError("Homepage spotlight is full. Unpin another item first (max 3).", 409);
    }
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return jsonError("Case study not found.", 404);
    }
    throw error;
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const { id } = await context.params;

  try {
    await deleteCaseStudy(id);
    revalidateCaseStudyPages();
    revalidateContentSitemap();
    return jsonOk({ deleted: true });
  } catch {
    return jsonError("Case study not found.", 404);
  }
}
