import type { Metadata } from "next";

import { AdminDashboard } from "@/components/blog/admin/AdminDashboard";
import { getAdminStats, listAdminPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
};

export default async function BlogAdminDashboardPage() {
  const [stats, posts] = await Promise.all([getAdminStats(), listAdminPosts()]);

  return <AdminDashboard stats={stats} posts={posts} />;
}
