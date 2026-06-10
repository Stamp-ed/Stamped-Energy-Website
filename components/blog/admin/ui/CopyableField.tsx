"use client";

import { useCallback, useState } from "react";

import { ClipboardIcon } from "@/components/blog/admin/ui/ClipboardIcon";
import { cn } from "@/lib/utils";

type CopyableFieldProps = {
  label: string;
  value: string;
  className?: string;
};

export function CopyableField({ label, value, className }: CopyableFieldProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${label}`}
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-panel)] px-4 py-3 text-left transition-colors",
        "hover:border-[var(--admin-border-strong,#c9d1cb)] hover:bg-[var(--admin-surface)]",
        className,
      )}
    >
      <span className="min-w-0">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-[var(--admin-text-muted)]">
          {label}
        </span>
        <span className="mt-1 block truncate text-sm font-semibold tabular-nums text-[var(--admin-text)]">
          {value}
        </span>
      </span>
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
          copied
            ? "bg-[var(--admin-success-bg)] text-[var(--admin-success-text)]"
            : "bg-[var(--admin-surface)] text-[var(--admin-text-muted)] group-hover:text-[var(--admin-accent)]",
        )}
      >
        <ClipboardIcon className="h-3.5 w-3.5" />
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
