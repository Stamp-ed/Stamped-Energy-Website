"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { AiWriterAssistant } from "@/components/blog/admin/AiWriterAssistant";
import { RichArticleBody } from "@/components/rich-content/RichArticleBody";
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
    <div className="space-y-6">
      <AiWriterAssistant variant="case-study" onImport={handleAiImport} />

      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="admin-panel space-y-4 p-5">
        <div>
          <label className={labelClass}>Title</label>
          <input
            required
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            className={`${fieldClass} text-lg font-semibold`}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={(event) =>
                update("status", event.target.value as FormState["status"])
              }
              className={fieldClass}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            required
            rows={2}
            value={form.excerpt}
            onChange={(event) => update("excerpt", event.target.value)}
            className={textareaClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
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
          <div>
            <label className={labelClass}>Industry</label>
            <input
              required
              value={form.industry}
              onChange={(event) => update("industry", event.target.value)}
              className={fieldClass}
            />
          </div>
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
          <p className="mt-1.5 text-[11px] leading-5 text-[var(--admin-text-muted)]">
            {AUTHOR_PROFILES[form.authorProfile].shortBio}
          </p>
        </div>
        <div>
          <label className={labelClass}>Client context (card / hero summary)</label>
          <textarea
            rows={2}
            value={form.clientContext}
            onChange={(event) => update("clientContext", event.target.value)}
            className={textareaClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Cover image URL</label>
            <input
              value={form.coverImage}
              onChange={(event) => update("coverImage", event.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cover alt text</label>
            <input
              value={form.coverImageAlt}
              onChange={(event) => update("coverImageAlt", event.target.value)}
              className={fieldClass}
            />
          </div>
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
          <label className={labelClass}>Hero metrics (JSON array)</label>
          <textarea
            rows={4}
            value={form.metricsJson}
            onChange={(event) => update("metricsJson", event.target.value)}
            className={`${textareaClass} font-mono text-xs`}
          />
        </div>
        <div>
          <label className={labelClass}>Outcome bullets (JSON array, shown in hero cards)</label>
          <textarea
            rows={4}
            value={form.outcomesJson}
            onChange={(event) => update("outcomesJson", event.target.value)}
            className={`${textareaClass} font-mono text-xs`}
          />
        </div>
        <div>
          <label className={labelClass}>Disclaimer</label>
          <textarea
            rows={2}
            value={form.disclaimer}
            onChange={(event) => update("disclaimer", event.target.value)}
            className={textareaClass}
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => update("featured", event.target.checked)}
            className="h-4 w-4 rounded border-[var(--admin-border)]"
          />
          Feature on case studies page
        </label>
        <div>
          <label className={labelClass}>Full story</label>
          <p className="mb-2 text-[11px] text-[var(--admin-text-muted)]">
            Problem → approach → proof. Add diagrams, GIFs, and walkthrough videos inline.
          </p>
          <RichArticleEditor
            value={form.bodyJson}
            onChange={(json) => update("bodyJson", json)}
          />
        </div>
        {error ? (
          <p className="rounded-lg border border-[var(--admin-danger-border)] bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger-text)]">
            {error}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2 pt-2">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
            {isSaving ? "Saving..." : mode === "create" ? "Create case study" : "Save changes"}
          </button>
          <button type="button" className="admin-btn admin-btn-secondary" onClick={() => router.back()}>
            Cancel
          </button>
        </div>
      </div>

      <div className="hidden xl:block">
        <div className="admin-panel sticky top-20 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--admin-text-muted)]">
            Preview
          </p>
          <h2 className="mt-3 font-display text-xl font-extrabold leading-tight text-[var(--admin-text)]">
            {form.title || "Case study title"}
          </h2>
          <p className="mt-2 text-sm text-[var(--admin-text-secondary)]">{form.excerpt}</p>
          <div className="mt-5 max-h-[65vh] overflow-y-auto border-t border-[var(--admin-border-subtle)] pt-5">
            <RichArticleBody bodyJson={form.bodyJson} contentFormat="RICH" reading={false} />
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}
