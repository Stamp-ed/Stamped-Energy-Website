import Link from "next/link";

import { AdminDashboardTable } from "@/components/blog/admin/AdminDashboardTable";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { AdminStatCard } from "@/components/blog/admin/ui/AdminStatCard";
import type { getAdminStats, listAdminPosts } from "@/lib/blog/posts";

type AdminDashboardProps = {
  stats: Awaited<ReturnType<typeof getAdminStats>>;
  posts: Awaited<ReturnType<typeof listAdminPosts>>;
};

export function AdminDashboard({ stats, posts }: AdminDashboardProps) {
  const recent = posts.slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Create, edit, publish, and manage blog content."
        action={{ label: "New post", href: "/blog/admin/posts/new" }}
        secondaryAction={{ label: "All posts", href: "/blog/admin/posts" }}
      />

      <div className="admin-panel flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-[var(--admin-text)]">AI-assisted writing</p>
          <p className="mt-0.5 text-xs text-[var(--admin-text-secondary)]">
            Copy a writer prompt, answer discovery questions in ChatGPT or Claude, then paste the
            final response on New post or New case study.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link href="/blog/admin/posts/new" className="admin-btn admin-btn-secondary">
            New post
          </Link>
          <Link href="/blog/admin/case-studies/new" className="admin-btn admin-btn-secondary">
            New case study
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total posts"
          value={stats.total}
          href="/blog/admin/posts"
          hint="View all"
        />
        <AdminStatCard
          label="Published"
          value={stats.published}
          href="/blog/admin/posts?status=published"
          hint="Manage live"
        />
        <AdminStatCard
          label="Drafts"
          value={stats.drafts}
          href="/blog/admin/posts?status=draft"
          hint="Continue writing"
        />
        <AdminStatCard
          label="Featured"
          value={stats.featured}
          href="/blog/admin/posts"
          hint="Homepage picks"
        />
      </div>

      <section>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-[var(--admin-text)]">Recent posts</h2>
            <p className="mt-0.5 text-sm text-[var(--admin-text-secondary)]">
              Edit, publish, or unpublish from one place.
            </p>
          </div>
          <Link
            href="/blog/admin/posts"
            className="text-sm font-medium text-[var(--admin-accent)] hover:underline"
          >
            Open posts manager
          </Link>
        </div>
        <AdminDashboardTable posts={recent} />
      </section>
    </div>
  );
}
