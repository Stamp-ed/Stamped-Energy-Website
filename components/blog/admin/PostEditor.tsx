"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { AiWriterAssistant } from "@/components/blog/admin/AiWriterAssistant";
import { RichArticleEditor } from "@/components/rich-content/RichArticleEditor";
import type { AiBlogImport } from "@/lib/blog/ai-workflow";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";
import type { BlogPostDTO } from "@/lib/blog/posts";
import {
  AUTHOR_PROFILES,
  DEFAULT_AUTHOR_PROFILE_ID,
  type AuthorProfileId,
} from "@/lib/content/author-profiles";
import { markdownToRichDoc, serializeRichDoc } from "@/lib/rich-content/document";
import { slugify } from "@/lib/blog/utils";

type PostEditorProps = {
  mode: "create" | "edit";
  initial?: BlogPostDTO;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  bodyJson: string;
  coverImage: string;
  category: string;
  tags: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  homepageFeatured: boolean;
  homepageOrder: string;
  authorProfile: AuthorProfileId;
};

const labelClass = "mb-1.5 block text-xs font-medium text-[var(--admin-text-secondary)]";
const fieldClass = "admin-input";
const textareaClass =
  "w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 text-sm text-[var(--admin-text)] outline-none transition-[border-color,box-shadow] focus:border-[var(--admin-accent)] focus:shadow-[0_0_0_3px_var(--admin-focus)]";

function initialBodyJson(initial?: BlogPostDTO): string {
  if (initial?.bodyJson) {
    return initial.bodyJson;
  }
  if (initial?.content) {
    return serializeRichDoc(markdownToRichDoc(initial.content));
  }
  return serializeRichDoc({ type: "doc", content: [{ type: "paragraph" }] });
}

export function PostEditor({ mode, initial }: PostEditorProps) {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    bodyJson: initialBodyJson(initial),
    coverImage: initial?.coverImage ?? "",
    category: initial?.category ?? BLOG_CATEGORIES[0].id,
    tags: initial?.tags.join(", ") ?? "",
    status: initial?.status ?? "DRAFT",
    featured: initial?.featured ?? false,
    homepageFeatured: initial?.homepageFeatured ?? false,
    homepageOrder:
      initial?.homepageOrder != null ? String(initial.homepageOrder) : "",
    authorProfile: initial?.authorProfile ?? DEFAULT_AUTHOR_PROFILE_ID,
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const autoSlug = useMemo(() => slugify(form.title), [form.title]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleAiImport = useCallback((data: AiBlogImport) => {
    setForm((current) => ({
      title: data.title ?? current.title,
      slug: data.slug ?? current.slug,
      excerpt: data.excerpt ?? current.excerpt,
      bodyJson:
        data.bodyJson ??
        (data.content ? serializeRichDoc(markdownToRichDoc(data.content)) : current.bodyJson),
      coverImage: data.coverImage ?? current.coverImage,
      category: data.category ?? current.category,
      tags: data.tags?.length ? data.tags.join(", ") : current.tags,
      status: data.status ?? current.status,
      featured: data.featured ?? current.featured,
      homepageFeatured: current.homepageFeatured,
      homepageOrder: current.homepageOrder,
      authorProfile: current.authorProfile,
    }));
    setError("");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    const payload = {
      title: form.title,
      slug: form.slug.trim() || autoSlug,
      excerpt: form.excerpt,
      contentFormat: "RICH" as const,
      bodyJson: form.bodyJson,
      coverImage: form.coverImage.trim() || null,
      category: form.category,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: form.status,
      featured: form.featured,
      homepageFeatured: form.homepageFeatured,
      homepageOrder:
        form.homepageOrder.trim() === "" ? null : Number.parseInt(form.homepageOrder, 10),
      authorProfile: form.authorProfile,
    };

    try {
      const url =
        mode === "create" ? "/api/blog/admin/posts" : `/api/blog/admin/posts/${initial!.id}`;
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
        setError(json.error?.message ?? "Failed to save post.");
        return;
      }

      router.push("/blog/admin/posts");
      router.refresh();
    } catch {
      setError("Failed to save post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <AiWriterAssistant variant="blog" onImport={handleAiImport} />

      <form onSubmit={handleSubmit} className="space-y-0">
        <div className="sticky top-0 z-20 -mx-1 mb-4 flex flex-col gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)]/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <input
              required
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className="w-full border-0 bg-transparent text-xl font-semibold text-[var(--admin-text)] outline-none placeholder:text-[var(--admin-text-muted)]"
              placeholder="Post title"
            />
            <p className="mt-0.5 truncate text-[11px] text-[var(--admin-text-muted)]">
              /blog/{form.slug.trim() || autoSlug || "your-slug"}
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
              {isSaving ? "Saving…" : mode === "create" ? "Create post" : "Save"}
            </button>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          <button
            type="button"
            onClick={() => setSettingsOpen((open) => !open)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-[var(--admin-text)] transition-colors hover:bg-[var(--admin-panel)]"
          >
            <span>Post settings</span>
            <span className="text-xs text-[var(--admin-text-muted)]">
              {settingsOpen ? "Hide" : "Slug, excerpt, category, cover…"}
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
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Subtitle / excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={(event) => update("excerpt", event.target.value)}
                  className={textareaClass}
                  placeholder="Short summary shown under the title on the blog"
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
                  placeholder="/industries/forging.jpg or https://…"
                  className={fieldClass}
                />
                <p className="mt-1.5 text-xs text-[var(--admin-text-muted)]">
                  Site path from public/ or any https image URL, same as inline article images.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                  value={form.tags}
                  onChange={(event) => update("tags", event.target.value)}
                  className={fieldClass}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)] sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) => update("featured", event.target.checked)}
                  className="h-4 w-4 rounded border-[var(--admin-border)]"
                />
                Feature on blog homepage
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)] sm:col-span-2">
                <input
                  type="checkbox"
                  checked={form.homepageFeatured}
                  onChange={(event) => update("homepageFeatured", event.target.checked)}
                  className="h-4 w-4 rounded border-[var(--admin-border)]"
                />
                Show on main site homepage (max 3 across blogs and case studies)
              </label>
              {form.homepageFeatured ? (
                <div>
                  <label className={labelClass}>Homepage order (optional)</label>
                  <input
                    type="number"
                    min={0}
                    max={2}
                    value={form.homepageOrder}
                    onChange={(event) => update("homepageOrder", event.target.value)}
                    placeholder="0 = first card"
                    className={fieldClass}
                  />
                </div>
              ) : null}
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
          placeholder="Use the toolbar for headings, links, tables, images, and embeds. Paste from the AI writer imports cleanly."
        />
      </form>
    </div>
  );
}
