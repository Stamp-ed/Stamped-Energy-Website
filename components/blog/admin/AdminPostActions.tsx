"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { BlogPostListItem } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

type AdminPostActionsProps = {
  post: BlogPostListItem;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: BlogPostListItem["status"]) => void;
};

export function AdminPostActions({ post, onDelete, onStatusChange }: AdminPostActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateStatus = async (status: BlogPostListItem["status"]) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/blog/admin/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = (await response.json()) as { success: boolean };
      if (json.success) {
        onStatusChange?.(post.id, status);
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blog/admin/posts/${post.id}`, { method: "DELETE" });
      const json = (await response.json()) as { success: boolean };
      if (json.success) {
        onDelete?.(post.id);
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <Link
        href={`/blog/admin/posts/${post.id}/edit`}
        className="admin-btn admin-btn-secondary"
      >
        Edit
      </Link>

      {post.status === "PUBLISHED" ? (
        <>
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="admin-btn admin-btn-ghost"
          >
            View
          </Link>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => updateStatus("DRAFT")}
            className="admin-btn admin-btn-ghost"
          >
            Unpublish
          </button>
        </>
      ) : post.status === "DRAFT" ? (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("PUBLISHED")}
          className={cn("admin-btn admin-btn-secondary")}
        >
          Publish
        </button>
      ) : (
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => updateStatus("DRAFT")}
          className="admin-btn admin-btn-ghost"
        >
          Restore
        </button>
      )}

      <button
        type="button"
        disabled={isDeleting}
        onClick={handleDelete}
        className="admin-btn admin-btn-danger"
      >
        Delete
      </button>
    </div>
  );
}
