"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { AiWriterAssistant } from "@/components/blog/admin/AiWriterAssistant";
import { RichArticleBody } from "@/components/rich-content/RichArticleBody";
import { RichArticleEditor } from "@/components/rich-content/RichArticleEditor";
import type { AiBlogImport } from "@/lib/blog/ai-workflow";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";
import type { BlogPostDTO } from "@/lib/blog/posts";
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
      bodyJson: data.bodyJson ?? (data.content ? serializeRichDoc(markdownToRichDoc(data.content)) : current.bodyJson),
      coverImage: data.coverImage ?? current.coverImage,
      category: data.category ?? current.category,
      tags: data.tags?.length ? data.tags.join(", ") : current.tags,
      status: data.status ?? current.status,
      featured: data.featured ?? current.featured,
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
    <div className="space-y-6">
      <AiWriterAssistant variant="blog" onImport={handleAiImport} />

      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="admin-panel space-y-4 p-5">
          <div>
            <label className={labelClass}>Title</label>
            <input
              required
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              className={`${fieldClass} text-lg font-semibold`}
              placeholder="One clear headline, like Medium"
            />
          </div>
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
            <label className={labelClass}>Subtitle / excerpt</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(event) => update("excerpt", event.target.value)}
              className={textareaClass}
              placeholder="Short summary shown under the title"
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
                {BLOG_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
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
            <label className={labelClass}>Cover image URL</label>
            <input
              value={form.coverImage}
              onChange={(event) => update("coverImage", event.target.value)}
              placeholder="/industries/forging.jpg"
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              value={form.tags}
              onChange={(event) => update("tags", event.target.value)}
              className={fieldClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--admin-text-secondary)]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => update("featured", event.target.checked)}
              className="h-4 w-4 rounded border-[var(--admin-border)]"
            />
            Feature on blog homepage
          </label>
          <div>
            <label className={labelClass}>Story</label>
            <p className="mb-2 text-[11px] text-[var(--admin-text-muted)]">
              Write like Medium, headings, paragraphs, then drop images, GIFs, or YouTube videos
              anywhere in the flow.
            </p>
            <RichArticleEditor
              value={form.bodyJson}
              onChange={(json) => update("bodyJson", json)}
              placeholder="Use Image for GIFs/photos; Video for YouTube embeds."
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-[var(--admin-danger-border)] bg-[var(--admin-danger-bg)] px-3 py-2 text-sm text-[var(--admin-danger-text)]">
              {error}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-2">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
            </button>
            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="admin-panel sticky top-20 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--admin-text-muted)]">
              Reading preview
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-[var(--admin-text)]">
              {form.title || "Post title"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--admin-text-secondary)]">
              {form.excerpt || "Excerpt preview"}
            </p>
            <div className="mt-5 max-h-[65vh] overflow-y-auto border-t border-[var(--admin-border-subtle)] pt-5">
              <RichArticleBody bodyJson={form.bodyJson} contentFormat="RICH" reading={false} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
