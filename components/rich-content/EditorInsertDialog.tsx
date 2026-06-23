"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

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
    description: "Linked text is inserted at your cursor. Select words first to prefill display text.",
    fields: [
      {
        key: "text",
        label: "Display text",
        placeholder: "e.g. Read the full case study",
        required: true,
      },
      {
        key: "url",
        label: "Link URL",
        placeholder: "https://stamped.work/blog/…",
        required: true,
      },
    ],
    submitLabel: "Insert link",
  },
  image: {
    title: "Insert image",
    description: "The image is placed at your cursor. Add an optional caption below it.",
    fields: [
      {
        key: "src",
        label: "Image URL",
        placeholder: "/industries/forging.jpg or https://…",
        required: true,
      },
      {
        key: "alt",
        label: "Alt text",
        placeholder: "Describe the image for accessibility",
        required: true,
      },
      {
        key: "caption",
        label: "Caption (optional)",
        placeholder: "Short caption shown under the image",
      },
    ],
    submitLabel: "Insert image",
  },
  video: {
    title: "Embed YouTube video",
    description: "The video embed is inserted at your cursor position.",
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
    description: "Mermaid syntax - flowcharts, sequence diagrams, and more render on publish.",
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

const inputClass =
  "h-10 w-full rounded-lg border border-[#dde3dc] bg-white px-3.5 text-sm text-[#141916] shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-[#7a857d] focus:border-[#e04a38] focus:shadow-[0_0_0_3px_#e04a3833]";

const textareaClass =
  "w-full resize-y rounded-lg border border-[#dde3dc] bg-white px-3.5 py-2.5 font-mono text-sm leading-relaxed text-[#141916] shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-[#7a857d] focus:border-[#e04a38] focus:shadow-[0_0_0_3px_#e04a3833]";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function EditorInsertDialog({
  kind,
  onClose,
  onSubmit,
  initialValues = {},
  canRemoveLink,
  onRemoveLink,
}: EditorInsertDialogProps) {
  const titleId = useId();
  const descId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!kind) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      window.clearTimeout(timer);
    };
  }, [kind, onClose]);

  if (!kind || typeof document === "undefined") {
    return null;
  }

  const config = CONFIG[kind];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const values: Record<string, string> = {};
    for (const field of config.fields) {
      values[field.key] = String(formData.get(field.key) ?? "").trim();
    }
    onSubmit(values);
  };

  const dialog = (
    <div
      className="editor-insert-dialog-root fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
      style={{ fontFamily: "var(--font-inter, ui-sans-serif, system-ui, sans-serif)" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Opaque backdrop - portaled dialogs sit outside .admin-cms so we cannot rely on admin CSS vars alone */}
      <div className="pointer-events-none absolute inset-0 bg-[#0f1713]/60 backdrop-blur-[2px]" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative z-10 flex max-h-[min(92vh,640px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#dde3dc] bg-white shadow-[0_28px_80px_-16px_rgba(15,23,19,0.55)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form ref={formRef} onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-[#e8ece8] bg-[#f9faf9] px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-base font-semibold tracking-tight text-[#141916] sm:text-lg">
                  {config.title}
                </h2>
                <p id={descId} className="mt-1.5 text-sm leading-6 text-[#4f5a53]">
                  {config.description}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose();
                }}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#dde3dc] bg-white text-[#4f5a53] transition-colors hover:bg-[#f3f5f3] hover:text-[#141916]"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
            {config.fields.map((field, index) => (
              <div key={field.key}>
                <label
                  htmlFor={`editor-dialog-${kind}-${field.key}`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#4f5a53]"
                >
                  {field.label}
                  {field.required ? <span className="text-[#e04a38]"> *</span> : null}
                </label>
                {field.multiline ? (
                  <textarea
                    ref={index === 0 ? (firstFieldRef as React.RefObject<HTMLTextAreaElement>) : undefined}
                    id={`editor-dialog-${kind}-${field.key}`}
                    name={field.key}
                    rows={field.rows ?? 4}
                    required={field.required}
                    defaultValue={initialValues[field.key] ?? ""}
                    placeholder={field.placeholder}
                    className={textareaClass}
                  />
                ) : (
                  <input
                    ref={index === 0 ? (firstFieldRef as React.RefObject<HTMLInputElement>) : undefined}
                    id={`editor-dialog-${kind}-${field.key}`}
                    name={field.key}
                    type="text"
                    required={field.required}
                    defaultValue={initialValues[field.key] ?? ""}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#e8ece8] bg-[#f9faf9] px-5 py-4 sm:px-6">
            <div>
              {kind === "link" && canRemoveLink && onRemoveLink ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemoveLink();
                  }}
                  className="text-sm font-medium text-[#9b2c2c] hover:underline"
                >
                  Remove link
                </button>
              ) : null}
            </div>
            <div className="ml-auto flex gap-2.5">
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onClose();
                }}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#dde3dc] bg-white px-4 text-sm font-semibold text-[#141916] transition-colors hover:bg-[#f3f5f3]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[#e04a38] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#c93d2d]"
              >
                {config.submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
