"use client";

import { useEffect, useId, useRef } from "react";

export type EditorDialogKind = "link" | "image" | "video" | "mermaid";

type EditorInsertDialogProps = {
  kind: EditorDialogKind | null;
  onClose: () => void;
  onSubmit: (values: Record<string, string>) => void;
  initialValues?: Record<string, string>;
  canRemoveLink?: boolean;
  onRemoveLink?: () => void;
};

const CONFIG: Record<
  EditorDialogKind,
  {
    title: string;
    description: string;
    fields: Array<{
      key: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      multiline?: boolean;
      rows?: number;
    }>;
    submitLabel: string;
  }
> = {
  link: {
    title: "Insert link",
    description: "Add a hyperlink to selected text, or enter display text to insert a new linked phrase.",
    fields: [
      { key: "url", label: "URL", placeholder: "https://stamped.work/blog/…", required: true },
      {
        key: "text",
        label: "Display text",
        placeholder: "Optional — uses selection or URL if empty",
      },
    ],
    submitLabel: "Apply link",
  },
  image: {
    title: "Insert image",
    description: "Paste a path from your site or a full HTTPS URL. GIFs work too.",
    fields: [
      {
        key: "src",
        label: "Image URL",
        placeholder: "/industries/forging.jpg or https://…",
        required: true,
      },
      { key: "alt", label: "Alt text", placeholder: "Describe the image for accessibility" },
    ],
    submitLabel: "Insert image",
  },
  video: {
    title: "Embed YouTube video",
    description: "Paste a YouTube watch or youtu.be link. It will embed in the article.",
    fields: [
      {
        key: "url",
        label: "YouTube URL",
        placeholder: "https://www.youtube.com/watch?v=…",
        required: true,
      },
    ],
    submitLabel: "Embed video",
  },
  mermaid: {
    title: "Insert diagram",
    description: "Mermaid syntax — flowcharts, sequence diagrams, and more render on publish.",
    fields: [
      {
        key: "source",
        label: "Diagram source",
        placeholder: "flowchart TD\n  A[Plant data] --> B[Prescriptions]",
        required: true,
        multiline: true,
        rows: 8,
      },
    ],
    submitLabel: "Insert diagram",
  },
};

export function EditorInsertDialog({
  kind,
  onClose,
  onSubmit,
  initialValues = {},
  canRemoveLink,
  onRemoveLink,
}: EditorInsertDialogProps) {
  const titleId = useId();
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!kind) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", handleKey);
      window.clearTimeout(timer);
    };
  }, [kind, onClose]);

  if (!kind) {
    return null;
  }

  const config = CONFIG[kind];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    for (const field of config.fields) {
      values[field.key] = String(formData.get(field.key) ?? "").trim();
    }
    onSubmit(values);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[0_24px_80px_-12px_rgba(15,23,19,0.35)]"
      >
        <form onSubmit={handleSubmit}>
          <div className="border-b border-[var(--admin-border-subtle)] px-5 py-4">
            <h2 id={titleId} className="text-base font-semibold text-[var(--admin-text)]">
              {config.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-[var(--admin-text-secondary)]">
              {config.description}
            </p>
          </div>

          <div className="space-y-4 px-5 py-4">
            {config.fields.map((field, index) => (
              <div key={field.key}>
                <label
                  htmlFor={`editor-dialog-${field.key}`}
                  className="mb-1.5 block text-xs font-medium text-[var(--admin-text-secondary)]"
                >
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                {field.multiline ? (
                  <textarea
                    ref={index === 0 ? (firstFieldRef as React.RefObject<HTMLTextAreaElement>) : undefined}
                    id={`editor-dialog-${field.key}`}
                    name={field.key}
                    rows={field.rows ?? 4}
                    required={field.required}
                    defaultValue={initialValues[field.key] ?? ""}
                    placeholder={field.placeholder}
                    className="w-full resize-y rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] px-3 py-2.5 font-mono text-sm text-[var(--admin-text)] outline-none transition-[border-color,box-shadow] focus:border-[var(--admin-accent)] focus:shadow-[0_0_0_3px_var(--admin-focus)]"
                  />
                ) : (
                  <input
                    ref={index === 0 ? (firstFieldRef as React.RefObject<HTMLInputElement>) : undefined}
                    id={`editor-dialog-${field.key}`}
                    name={field.key}
                    type="text"
                    required={field.required}
                    defaultValue={initialValues[field.key] ?? ""}
                    placeholder={field.placeholder}
                    className="admin-input w-full"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--admin-border-subtle)] bg-[var(--admin-panel)] px-5 py-3">
            <div>
              {kind === "link" && canRemoveLink && onRemoveLink ? (
                <button
                  type="button"
                  onClick={onRemoveLink}
                  className="text-sm font-medium text-[var(--admin-danger-text,#c0392b)] hover:underline"
                >
                  Remove link
                </button>
              ) : null}
            </div>
            <div className="flex gap-2">
              <button type="button" className="admin-btn admin-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="admin-btn admin-btn-primary">
                {config.submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
