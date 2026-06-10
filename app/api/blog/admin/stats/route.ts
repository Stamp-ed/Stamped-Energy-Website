import { jsonError, jsonOk } from "@/lib/blog/api";
import { requireAdminSession } from "@/lib/blog/auth";
import { getAdminStats } from "@/lib/blog/posts";

export async function GET() {
  try {
    await requireAdminSession();
  } catch {
    return jsonError("Unauthorized.", 401);
  }

  const stats = await getAdminStats();
  return jsonOk({ stats });
}
