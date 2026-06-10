"use client";

import Link from "next/link";
import { useState } from "react";

import { AdminPostActions } from "@/components/blog/admin/AdminPostActions";
import { AdminStatusBadge } from "@/components/blog/admin/ui/AdminStatusBadge";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";

type AdminDashboardTableProps = {
  posts: BlogPostListItem[];
};

export function AdminDashboardTable({ posts }: AdminDashboardTableProps) {
  const [items, setItems] = useState(posts);

  return (
    <div className="admin-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="hidden px-4 py-3 text-left md:table-cell">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="hidden px-4 py-3 text-left lg:table-cell">Updated</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/blog/admin/posts/${post.id}/edit`}
                    className="font-medium text-[var(--admin-text)] hover:text-[var(--admin-accent)]"
                  >
                    {post.title}
                  </Link>
                  <p className="admin-slug mt-0.5">/blog/{post.slug}</p>
                  {post.featured ? (
                    <span className="mt-1.5 inline-flex rounded-md bg-[var(--admin-warn-bg)] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--admin-warn-text)]">
                      Featured
                    </span>
                  ) : null}
                </td>
                <td className="hidden px-4 py-3.5 text-[var(--admin-text-secondary)] md:table-cell">
                  {post.categoryLabel}
                </td>
                <td className="px-4 py-3.5">
                  <AdminStatusBadge status={post.status} />
                </td>
                <td className="hidden px-4 py-3.5 text-[var(--admin-text-muted)] lg:table-cell">
                  {formatBlogDate(post.updatedAt)}
                </td>
                <td className="px-4 py-3.5">
                  <AdminPostActions
                    post={post}
                    onDelete={(id) => setItems((current) => current.filter((p) => p.id !== id))}
                    onStatusChange={(id, status) =>
                      setItems((current) =>
                        current.map((p) => (p.id === id ? { ...p, status } : p)),
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="text-sm text-[var(--admin-text-secondary)]">No posts yet.</p>
          <Link
            href="/blog/admin/posts/new"
            className="admin-btn admin-btn-primary mt-4 inline-flex"
          >
            Create your first post
          </Link>
        </div>
      ) : null}
    </div>
  );
}
