import { jsonError, jsonOk } from "@/lib/blog/api";
import { BLOG_CATEGORY_IDS } from "@/lib/blog/constants";
import { listPublishedPosts } from "@/lib/blog/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "6");
  const category = searchParams.get("category") ?? "all";
  const featured = searchParams.get("featured") === "true";
  const search = searchParams.get("search") ?? undefined;

  if (category !== "all" && !BLOG_CATEGORY_IDS.includes(category as (typeof BLOG_CATEGORY_IDS)[number])) {
    return jsonError("Invalid category.", 400);
  }

  const result = await listPublishedPosts({
    page: Number.isFinite(page) ? page : 1,
    limit: Number.isFinite(limit) ? limit : 6,
    category,
    featured: featured || undefined,
    search,
  });

  return jsonOk(result);
}
