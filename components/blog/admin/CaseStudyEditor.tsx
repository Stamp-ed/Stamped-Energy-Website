"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { AiWriterAssistant } from "@/components/blog/admin/AiWriterAssistant";
import { RichArticleEditor } from "@/components/rich-content/RichArticleEditor";
import type { AiCaseStudyImport } from "@/lib/case-studies/ai-workflow";
import {
  CASE_STUDY_CATEGORIES,
  type CaseStudyMetric,
} from "@/lib/case-studies/constants";
import type { CaseStudyDTO } from "@/lib/case-studies/studies";
import {
  AUTHOR_PROFILES,
  DEFAULT_AUTHOR_PROFILE_ID,
  type AuthorProfileId,
} from "@/lib/content/author-profiles";
import { markdownToRichDoc, serializeRichDoc } from "@/lib/rich-content/document";
import { slugify } from "@/lib/blog/utils";

type CaseStudyEditorProps = {
  mode: "create" | "edit";
  initial?: CaseStudyDTO;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  bodyJson: string;
  coverImage: string;
  coverImageAlt: string;
  category: string;
  industry: string;
  clientContext: string;
  tag: string;
  metricsJson: string;
  outcomesJson: string;
  disclaimer: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  authorProfile: AuthorProfileId;
};

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--admin-text-secondary)]";
const fieldClass = "admin-input";
const textareaClass =
  "w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 text-sm text-[var(--admin-text)] outline-none transition-[border-color,box-shadow] focus:border-[var(--admin-accent)] focus:shadow-[0_0_0_3px_var(--admin-focus)]";

function initialBodyJson(initial?: CaseStudyDTO): string {
  if (initial?.bodyJson) {
    return initial.bodyJson;
  }
  if (initial?.content) {
    return serializeRichDoc(markdownToRichDoc(initial.content));
  }
  return serializeRichDoc({ type: "doc", content: [{ type: "paragraph" }] });
}

function metricsToJson(metrics: CaseStudyMetric[]): string {
  return JSON.stringify(metrics, null, 2);
}

export function CaseStudyEditor({ mode, initial }: CaseStudyEditorProps) {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    bodyJson: initialBodyJson(initial),
    coverImage: initial?.coverImage ?? "",
    coverImageAlt: initial?.coverImageAlt ?? "",
    category: initial?.category ?? CASE_STUDY_CATEGORIES[0].id,
    industry: initial?.industry ?? "",
    clientContext: initial?.clientContext ?? "",
    tag: initial?.tag ?? "",
    metricsJson: metricsToJson(initial?.metrics ?? [{ label: "Outcome", value: "-" }]),
    outcomesJson: JSON.stringify(initial?.outcomes ?? [], null, 2),
    disclaimer: initial?.disclaimer ?? "",
    status: initial?.status ?? "DRAFT",
    featured: initial?.featured ?? false,
    authorProfile: initial?.authorProfile ?? DEFAULT_AUTHOR_PROFILE_ID,
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const autoSlug = useMemo(() => slugify(form.title), [form.title]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleAiImport = useCallback((data: AiCaseStudyImport) => {
    setForm((current) => ({
      title: data.title ?? current.title,
      slug: data.slug ?? current.slug,
      excerpt: data.excerpt ?? current.excerpt,
      bodyJson:
        data.bodyJson ??
        (data.content ? serializeRichDoc(markdownToRichDoc(data.content)) : current.bodyJson),
      coverImage: data.coverImage ?? current.coverImage,
      coverImageAlt: data.coverImageAlt ?? current.coverImageAlt,
      category: data.category ?? current.category,
      industry: data.industry ?? current.industry,
      clientContext: data.clientContext ?? current.clientContext,
      tag: data.tag ?? current.tag,
      metricsJson: data.metrics?.length
        ? JSON.stringify(data.metrics, null, 2)
        : current.metricsJson,
      outcomesJson: data.outcomes?.length
        ? JSON.stringify(data.outcomes, null, 2)
        : current.outcomesJson,
      disclaimer: data.disclaimer ?? current.disclaimer,
      status: data.status ?? current.status,
      featured: data.featured ?? current.featured,
      authorProfile: current.authorProfile,
    }));
    setError("");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    let metrics: CaseStudyMetric[];
    let outcomes: string[];

    try {
      metrics = JSON.parse(form.metricsJson) as CaseStudyMetric[];
      outcomes = JSON.parse(form.outcomesJson) as string[];
    } catch {
      setError("Metrics and outcomes must be valid JSON.");
      setIsSaving(false);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug.trim() || autoSlug,
      excerpt: form.excerpt,
      contentFormat: "RICH" as const,
      bodyJson: form.bodyJson,
      coverImage: form.coverImage.trim() || null,
      coverImageAlt: form.coverImageAlt,
      category: form.category,
      industry: form.industry,
      clientContext: form.clientContext,
      tag: form.tag.trim() || null,
      metrics,
      outcomes,
      disclaimer: form.disclaimer.trim() || null,
      status: form.status,
      featured: form.featured,
      authorProfile: form.authorProfile,
    };

    try {
      const url =
        mode === "create"
          ? "/api/blog/admin/case-studies"
          : `/api/blog/admin/case-studies/${initial!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await response.json()) as {
        success: boolean;
        error?: { message: string };
      };

      if (!json.success) {
        setError(json.error?.message ?? "Failed to save case study.");
        return;
      }

      router.push("/blog/admin/case-studies");
      router.refresh();
    } catch {
      setError("Failed to save case study.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <AiWriterAssistant variant="case-study" onImport={handleAiImport} />

      <form onSubmit={handleSubmit} className="space-y-0">
        <div className="sticky top-0 z-20 -mx-1 mb-4 flex flex-col gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)]/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <input
              required
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className="w-full border-0 bg-transparent text-xl font-semibold text-[var(--admin-text)] outline-none placeholder:text-[var(--admin-text-muted)]"
              placeholder="Case study title"
            />
            <p className="mt-0.5 truncate text-[11px] text-[var(--admin-text-muted)]">
              /case-studies/{form.slug.trim() || autoSlug || "your-slug"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={form.status}
              onChange={(event) => update("status", event.target.value as FormState["status"])}
              className="admin-input h-9 py-1 text-xs"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => router.back()}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving…" : mode === "create" ? "Create case study" : "Save"}
            </button>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <button
            type="button"
            onClick={() => setSettingsOpen((open) => !open)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel)]"
          >
            <span>Case study settings</span>
            <span className="text-xs text-[var(--admin-text-muted)]">
              {settingsOpen ? "Hide" : "Slug, metrics, cover, client context…"}
            </span>
          </button>
          {settingsOpen ? (
            <div className="grid gap-4 border-t border-[var(--admin-border-subtle)] px-4 py-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Slug</label>
                <input
                  value={form.slug}
                  onChange={(event) => update("slug", event.target.value)}
                  placeholder={autoSlug}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={form.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={fieldClass}
                >
                  {CASE_STUDY_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className={textareaClass}
                  placeholder="Short summary for cards and hero"
                />
              </div>
              <div>
                <label className={labelClass}>Industry</label>
                <input
                  required
                  value={form.industry}
                  onChange={(event) => update("industry", event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tag (optional badge)</label>
                <input
                  value={form.tag}
                  onChange={(event) => update("tag", event.target.value)}
                  placeholder="Field pilot"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Written by</label>
                <select
                  value={form.authorProfile}
                  onChange={(event) =>
                    update("authorProfile", event.target.value as AuthorProfileId)
                  }
                  className={fieldClass}
                >
                  {Object.values(AUTHOR_PROFILES).map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Cover image URL</label>
                <input
                  value={form.coverImage}
                  onChange={(event) => update("coverImage", event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Cover alt text</label>
                <input
                  value={form.coverImageAlt}
                  onChange={(event) => update("coverImageAlt", event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Client context (card / hero summary)</label>
                <textarea
                  rows={2}
                  value={form.clientContext}
                  onChange={(event) => update("clientContext", event.target.value)}
                  className={textareaClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Hero metrics (JSON array)</label>
                <textarea
                  rows={4}
                  value={form.metricsJson}
                  onChange={(event) => update("metricsJson", event.target.value)}
                  className={`${textareaClass} font-mono text-xs`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Outcome bullets (JSON array)</label>
                <textarea
                  rows={4}
                  value={form.outcomesJson}
                  onChange={(event) => update("outcomesJson", event.target.value)}
                  className={`${textareaClass} font-mono text-xs`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Disclaimer</label>
                <textarea
                  rows={2}
                  value={form.disclaimer}
                  onChange={(event) => update("disclaimer", event.target.value)}
                  className={textareaClass}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)] sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-[var(--admin-border)]"
                />
                Feature on case studies page
              </label>
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="mb-4 rounded-lg border border-[var(--admin-danger-border)] bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger-text)]">
            {error}
          </p>
        ) : null}

        <RichArticleEditor
          value={form.bodyJson}
          onChange={(json) => update("bodyJson", json)}
          placeholder="Problem → approach → proof. Place your cursor, then use Link, Image, or Video to insert at that spot."
        />
      </form>
    </div>
  );
}
