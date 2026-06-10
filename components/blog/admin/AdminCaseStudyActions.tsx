"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CaseStudyListItem } from "@/lib/case-studies/studies";

type AdminCaseStudyActionsProps = {
  study: CaseStudyListItem;
  onDelete?: (id: string) => void;
};

export function AdminCaseStudyActions({ study, onDelete }: AdminCaseStudyActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

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
      {study.status === "PUBLISHED" ? (
        <Link
          href={`/case-studies/${study.slug}`}
          target="_blank"
          className="admin-btn admin-btn-ghost"
        >
          View
        </Link>
      ) : null}
      <Link
        href={`/blog/admin/case-studies/${study.id}/edit`}
        className="admin-btn admin-btn-secondary"
      >
        Edit
      </Link>
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
