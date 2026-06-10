import type { PostStatus } from "@prisma/client";

import { jsonError, jsonOk, parseJsonBody } from "@/lib/blog/api";
import { requireAdminSession } from "@/lib/blog/auth";
import { BLOG_CATEGORY_IDS } from "@/lib/blog/constants";
import { deletePost, getAdminPostById, updatePost } from "@/lib/blog/posts";

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
  category?: string;
  tags?: string[];
  status?: PostStatus;
  featured?: boolean;
  readTimeMin?: number;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const { id } = await context.params;
  const post = await getAdminPostById(id);

  if (!post) {
    return jsonError("Post not found.", 404);
  }

  return jsonOk({ post });
}

export async function PUT(request: Request, context: RouteContext) {
  return updatePostHandler(request, context);
}

export async function PATCH(request: Request, context: RouteContext) {
  return updatePostHandler(request, context);
}

async function updatePostHandler(request: Request, context: RouteContext) {
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
    !BLOG_CATEGORY_IDS.includes(body.category as (typeof BLOG_CATEGORY_IDS)[number])
  ) {
    return jsonError("Invalid category.", 400);
  }

  try {
    const post = await updatePost(id, body);
    return jsonOk({ post });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return jsonError("Post not found.", 404);
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
    await deletePost(id);
    return jsonOk({ deleted: true });
  } catch {
    return jsonError("Post not found.", 404);
  }
}
