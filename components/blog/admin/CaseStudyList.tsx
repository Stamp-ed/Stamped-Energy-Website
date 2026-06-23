"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminCaseStudyActions } from "@/components/blog/admin/AdminCaseStudyActions";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { AdminStatusBadge } from "@/components/blog/admin/ui/AdminStatusBadge";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";
import { formatBlogDate } from "@/lib/blog/utils";
import { cn } from "@/lib/utils";

type CaseStudyListProps = {
  studies: CaseStudyListItem[];
  initialFilter?: "all" | "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export function CaseStudyList({
  studies: initialStudies,
  initialFilter = "all",
}: CaseStudyListProps) {
  const [studies, setStudies] = useState(initialStudies);
  const [filter, setFilter] = useState<"all" | "DRAFT" | "PUBLISHED" | "ARCHIVED">(initialFilter);
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    let result = filter === "all" ? studies : studies.filter((study) => study.status === filter);

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter(
        (study) =>
          study.title.toLowerCase().includes(query) ||
          study.slug.toLowerCase().includes(query) ||
          study.categoryLabel.toLowerCase().includes(query),
      );
    }

    return result;
  }, [studies, filter, search]);

  const counts = useMemo(
    () => ({
      all: studies.length,
      PUBLISHED: studies.filter((study) => study.status === "PUBLISHED").length,
      DRAFT: studies.filter((study) => study.status === "DRAFT").length,
      ARCHIVED: studies.filter((study) => study.status === "ARCHIVED").length,
    }),
    [studies],
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title="Case studies"
        description="Client stories with rich media, problem, approach, and verified outcomes."
        action={{ label: "New case study", href: "/blog/admin/case-studies/new" }}
      />

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
              {visible.map((study) => (
                <tr key={study.id}>
                  <td className="px-4 py-3.5">
                    <Link
                      href={`/blog/admin/case-studies/${study.id}/edit`}
                      className="font-medium text-[var(--admin-text)] hover:text-[var(--admin-accent)]"
                    >
                      {study.title}
                    </Link>
                    <p className="admin-slug mt-0.5">/case-studies/{study.slug}</p>
                    {study.homepageFeatured ? (
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--admin-accent)]">
                        Homepage spotlight
                      </p>
                    ) : null}
                  </td>
                  <td className="hidden px-4 py-3.5 text-[var(--admin-text-secondary)] md:table-cell">
                    {study.categoryLabel}
                  </td>
                  <td className="px-4 py-3.5">
                    <AdminStatusBadge status={study.status} />
                  </td>
                  <td className="hidden px-4 py-3.5 text-[var(--admin-text-secondary)] lg:table-cell">
                    {formatBlogDate(study.updatedAt)}
                  </td>
                  <td className="px-4 py-3.5">
                    <AdminCaseStudyActions
                      study={study}
                      onDelete={(id) => setStudies((current) => current.filter((s) => s.id !== id))}
                      onStatusChange={(id, status) =>
                        setStudies((current) =>
                          current.map((item) => (item.id === id ? { ...item, status } : item)),
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
          <div className="px-4 py-12 text-center">
            <p className="text-sm text-[var(--admin-text-secondary)]">
              {studies.length === 0 ? "No case studies yet." : "No case studies match your filters."}
            </p>
            {studies.length === 0 ? (
              <Link
                href="/blog/admin/case-studies/new"
                className="admin-btn admin-btn-primary mt-4 inline-flex"
              >
                Create your first case study
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
