import { jsonError, jsonOk } from "@/lib/blog/api";
import { getSession } from "@/lib/blog/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonError("Unauthorized.", 401);
  }

  return jsonOk({ user: session });
}
