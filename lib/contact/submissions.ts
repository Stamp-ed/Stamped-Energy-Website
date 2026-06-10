import { prisma } from "@/lib/blog/db";

export type ContactSubmissionInput = {
  name: string;
  company: string;
  location: string;
  billSize: string;
  whatsapp: string;
};

export async function createContactSubmission(input: ContactSubmissionInput) {
  return prisma.contactSubmission.create({
    data: input,
  });
}
