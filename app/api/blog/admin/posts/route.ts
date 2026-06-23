import type { PostStatus } from "@prisma/client";

import { jsonError, jsonOk, parseJsonBody } from "@/lib/blog/api";
import { requireAdminSession } from "@/lib/blog/auth";
import { BLOG_CATEGORY_IDS } from "@/lib/blog/constants";
import { createPost, listAdminPosts, type CreatePostInput } from "@/lib/blog/posts";
import { revalidateBlogPages, revalidateContentSitemap, revalidateHomepageSpotlight } from "@/lib/blog/revalidate-public";
import { HomepageSpotlightFullError } from "@/lib/content/homepage-spotlight";
import { isAuthorProfileId } from "@/lib/content/author-profiles";

type CreateBody = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  contentFormat?: "MARKDOWN" | "RICH";
  bodyJson?: string | null;
  coverImage?: string | null;
  category?: string;
  tags?: string[];
  status?: PostStatus;
  featured?: boolean;
  homepageFeatured?: boolean;
  homepageOrder?: number | null;
  readTimeMin?: number;
  authorProfile?: string;
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

  const posts = await listAdminPosts({ status, search });
  return jsonOk({ posts });
}

export async function POST(request: Request) {
  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const body = await parseJsonBody<CreateBody>(request);

  if (!body?.title?.trim() || !body.excerpt?.trim() || !body.category) {
    return jsonError("Title, excerpt, and category are required.", 400);
  }

  if (!body.bodyJson?.trim() && !body.content?.trim()) {
    return jsonError("Article body is required.", 400);
  }

  if (!BLOG_CATEGORY_IDS.includes(body.category as (typeof BLOG_CATEGORY_IDS)[number])) {
    return jsonError("Invalid category.", 400);
  }

  if (body.authorProfile && !isAuthorProfileId(body.authorProfile)) {
    return jsonError("Invalid author profile.", 400);
  }

  try {
    const post = await createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      contentFormat: body.contentFormat,
      bodyJson: body.bodyJson,
      coverImage: body.coverImage,
      category: body.category,
      tags: body.tags,
      status: body.status,
      featured: body.featured,
      homepageFeatured: body.homepageFeatured,
      homepageOrder: body.homepageOrder,
      readTimeMin: body.readTimeMin,
      authorId: session.userId,
      authorProfile: body.authorProfile as CreatePostInput["authorProfile"],
    });

    if (post.status === "PUBLISHED") {
      revalidateBlogPages(post.slug);
      revalidateContentSitemap();
    }
    if (post.homepageFeatured) {
      revalidateHomepageSpotlight();
    }

    return jsonOk({ post }, { status: 201 });
  } catch (error) {
    if (error instanceof HomepageSpotlightFullError) {
      return jsonError("Homepage spotlight is full. Unpin another item first (max 3).", 409);
    }
    throw error;
  }
}
