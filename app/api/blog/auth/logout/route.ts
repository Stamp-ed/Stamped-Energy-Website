import { cookies } from "next/headers";

import { jsonOk } from "@/lib/blog/api";
import { clearSessionCookieOptions } from "@/lib/blog/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(clearSessionCookieOptions());
  return jsonOk({ loggedOut: true });
}
