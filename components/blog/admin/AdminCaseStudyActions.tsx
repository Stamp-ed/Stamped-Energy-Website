"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CaseStudyListItem } from "@/lib/case-studies/studies";
import { cn } from "@/lib/utils";

type AdminCaseStudyActionsProps = {
  study: CaseStudyListItem;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: CaseStudyListItem["status"]) => void;
};

export function AdminCaseStudyActions({
  study,
  onDelete,
  onStatusChange,
}: AdminCaseStudyActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateStatus = async (status: CaseStudyListItem["status"]) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/blog/admin/case-studies/${study.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = (await response.json()) as { success: boolean };
      if (json.success) {
        onStatusChange?.(study.id, status);
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${study.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blog/admin/case-studies/${study.id}`, {
        method: "DELETE",
      });
      const json = (await response.json()) as { success: boolean };
      if (json.success) {
        onDelete?.(study.id);
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <Link
        href={`/blog/admin/case-studies/${study.id}/edit`}
        className="admin-btn admin-btn-secondary"
      >
        Edit
      </Link>

      {study.status === "PUBLISHED" ? (
        <>
          <Link
            href={`/case-studies/${study.slug}`}
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
      ) : study.status === "DRAFT" ? (
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
