import { prisma } from "@/lib/blog/db";

export type ContactSubmissionInput = {
  name: string;
  company: string;
  location: string | null;
  billSize: string | null;
  whatsapp: string | null;
  email: string | null;
};

export type ContactSubmissionRecord = {
  id: string;
  name: string;
  company: string;
  location: string | null;
  billSize: string | null;
  whatsapp: string | null;
  email: string | null;
  createdAt: Date;
};

export async function createContactSubmission(input: ContactSubmissionInput) {
  return prisma.contactSubmission.create({
    data: input,
  });
}

export async function listContactSubmissions(limit?: number): Promise<ContactSubmissionRecord[]> {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
}

export async function getContactSubmissionStats() {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const [total, last7Days, last30Days] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: monthAgo } } }),
  ]);

  return { total, last7Days, last30Days };
}
