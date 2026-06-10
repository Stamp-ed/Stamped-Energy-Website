"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ContactInquiryDetail } from "@/components/blog/admin/ContactInquiryDetail";
import type { ContactSubmissionRecord } from "@/lib/contact/submissions";
import { formatInquiryDate, formatInquiryRelative } from "@/lib/contact/format";
import { cn } from "@/lib/utils";

type ContactInquiryWorkspaceProps = {
  initialInquiries: ContactSubmissionRecord[];
  initialSelectedId?: string | null;
};

function matchesSearch(inquiry: ContactSubmissionRecord, query: string): boolean {
  const haystack = [
    inquiry.name,
    inquiry.company,
    inquiry.location,
    inquiry.billSize,
    inquiry.whatsapp,
    inquiry.email,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

export function ContactInquiryWorkspace({
  initialInquiries,
  initialSelectedId = null,
}: ContactInquiryWorkspaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);

  const visible = useMemo(() => {
    if (!search.trim()) {
      return initialInquiries;
    }
    const query = search.trim().toLowerCase();
    return initialInquiries.filter((inquiry) => matchesSearch(inquiry, query));
  }, [initialInquiries, search]);

  const selectedInquiry = useMemo(
    () => initialInquiries.find((inquiry) => inquiry.id === selectedId) ?? null,
    [initialInquiries, selectedId],
  );

  const selectInquiry = useCallback(
    (id: string) => {
      setSelectedId(id);
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", id);
      router.replace(`/blog/admin/inquiries?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    const query = params.toString();
    router.replace(query ? `/blog/admin/inquiries?${query}` : "/blog/admin/inquiries", {
      scroll: false,
    });
  }, [router, searchParams]);

  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId && initialInquiries.some((inquiry) => inquiry.id === urlId)) {
      setSelectedId(urlId);
    }
  }, [searchParams, initialInquiries]);

  useEffect(() => {
    if (selectedId && !initialInquiries.some((inquiry) => inquiry.id === selectedId)) {
      clearSelection();
    }
  }, [selectedId, initialInquiries, clearSelection]);

  const showMobileDetail = Boolean(selectedInquiry);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, company, email, or WhatsApp..."
          className="admin-input max-w-md"
        />
        <p className="text-xs text-[var(--admin-text-muted)]">
          {visible.length} of {initialInquiries.length} inquiries
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-5 lg:items-start">
        <div className={cn("lg:col-span-2", showMobileDetail && "hidden lg:block")}>
          {visible.length === 0 ? (
            <div className="admin-panel px-4 py-12 text-center">
              <p className="text-sm text-[var(--admin-text-secondary)]">
                {initialInquiries.length === 0
                  ? "No contact form submissions yet."
                  : "No inquiries match your search."}
              </p>
            </div>
          ) : (
            <ul className="admin-panel divide-y divide-[var(--admin-border-subtle)] overflow-hidden">
              {visible.map((inquiry) => {
                const isSelected = inquiry.id === selectedId;
                return (
                  <li key={inquiry.id}>
                    <button
                      type="button"
                      onClick={() => selectInquiry(inquiry.id)}
                      className={cn(
                        "flex w-full items-start justify-between gap-3 border-l-2 px-4 py-4 text-left transition-colors",
                        isSelected
                          ? "border-[var(--admin-accent)] bg-[var(--admin-panel)]"
                          : "border-transparent hover:bg-[var(--admin-panel)]/80",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-[var(--admin-text)]">
                          {inquiry.name}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-[var(--admin-text-secondary)]">
                          {inquiry.company}
                        </span>
                        <span className="mt-2 block text-[11px] text-[var(--admin-text-muted)]">
                          {inquiry.whatsapp ?? inquiry.email ?? "No contact method"}
                        </span>
                      </span>
                      <time
                        dateTime={new Date(inquiry.createdAt).toISOString()}
                        className="shrink-0 text-[11px] tabular-nums text-[var(--admin-text-muted)]"
                        title={formatInquiryDate(inquiry.createdAt)}
                      >
                        {formatInquiryRelative(inquiry.createdAt)}
                      </time>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={cn("lg:col-span-3", !showMobileDetail && "hidden lg:block")}>
          <ContactInquiryDetail
            inquiry={selectedInquiry}
            onBack={clearSelection}
            showBack={showMobileDetail}
          />
        </div>
      </div>
    </div>
  );
}
