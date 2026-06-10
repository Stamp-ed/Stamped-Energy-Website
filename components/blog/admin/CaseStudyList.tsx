"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AdminCaseStudyActions } from "@/components/blog/admin/AdminCaseStudyActions";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { AdminStatusBadge } from "@/components/blog/admin/ui/AdminStatusBadge";
import type { CaseStudyListItem } from "@/lib/case-studies/studies";
import { formatBlogDate } from "@/lib/blog/utils";

type CaseStudyListProps = {
  studies: CaseStudyListItem[];
};

export function CaseStudyList({ studies: initialStudies }: CaseStudyListProps) {
  const [studies, setStudies] = useState(initialStudies);
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    if (!search.trim()) {
      return studies;
    }

    const query = search.trim().toLowerCase();
    return studies.filter(
      (study) =>
        study.title.toLowerCase().includes(query) ||
        study.slug.toLowerCase().includes(query) ||
        study.categoryLabel.toLowerCase().includes(query),
    );
  }, [studies, search]);

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
              {studies.length === 0 ? "No case studies yet." : "No case studies match your search."}
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
