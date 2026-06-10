"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminPostActions } from "@/components/blog/admin/AdminPostActions";
import { AdminStatusBadge } from "@/components/blog/admin/ui/AdminStatusBadge";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";
import { cn } from "@/lib/utils";

type PostListProps = {
  initialPosts: BlogPostListItem[];
  initialFilter?: "all" | "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export function PostList({ initialPosts, initialFilter = "all" }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState<"all" | "DRAFT" | "PUBLISHED" | "ARCHIVED">(initialFilter);
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    let result = filter === "all" ? posts : posts.filter((post) => post.status === filter);

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          post.categoryLabel.toLowerCase().includes(query),
      );
    }

    return result;
  }, [posts, filter, search]);

  const counts = useMemo(
    () => ({
      all: posts.length,
      PUBLISHED: posts.filter((p) => p.status === "PUBLISHED").length,
      DRAFT: posts.filter((p) => p.status === "DRAFT").length,
      ARCHIVED: posts.filter((p) => p.status === "ARCHIVED").length,
    }),
    [posts],
  );

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by title, slug, or category..."
        className="admin-input max-w-md"
      />

      <div className="flex flex-wrap gap-2">
        {(["all", "PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === status
                ? "border-[var(--admin-text)] bg-[var(--admin-text)] text-[var(--admin-surface)]"
                : "border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text-secondary)] hover:border-[var(--admin-border-strong,#c9d1cb)]",
            )}
          >
            {status === "all" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
            <span className="ml-1 opacity-60">({counts[status]})</span>
          </button>
        ))}
      </div>

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
              {visible.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/blog/admin/posts/${post.id}/edit`}
                      className="font-medium text-[var(--admin-text)] hover:text-[var(--admin-accent)]"
                    >
                      {post.title}
                    </Link>
                    <p className="admin-slug mt-0.5">/blog/{post.slug}</p>
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
                      onDelete={(id) => setPosts((current) => current.filter((p) => p.id !== id))}
                      onStatusChange={(id, status) =>
                        setPosts((current) =>
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
        {visible.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-[var(--admin-text-secondary)]">
            No posts match your filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
