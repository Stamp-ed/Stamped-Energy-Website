import { cookies } from "next/headers";

import { jsonError, jsonOk, parseJsonBody } from "@/lib/blog/api";
import {
  createSession,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/blog/auth";
import { prisma } from "@/lib/blog/db";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = await parseJsonBody<LoginBody>(request);

  if (!body?.email?.trim() || !body?.password) {
    return jsonError("Email and password are required.", 400);
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: body.email.trim().toLowerCase() },
  });

  if (!user) {
    return jsonError("Invalid credentials.", 401);
  }

  const valid = await verifyPassword(body.password, user.passwordHash);
  if (!valid) {
    return jsonError("Invalid credentials.", 401);
  }

  const token = await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieOptions(token));

  return jsonOk({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
