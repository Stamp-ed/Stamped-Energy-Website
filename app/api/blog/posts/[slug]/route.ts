import { jsonError, jsonOk } from "@/lib/blog/api";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/posts";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return jsonError("Post not found.", 404);
  }

  const related = await getRelatedPosts(post.slug, post.category, 3);

  return jsonOk({ post, related });
}
