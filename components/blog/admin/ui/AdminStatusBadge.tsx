import type { BlogPostListItem } from "@/lib/blog/posts";
import { cn } from "@/lib/utils";

type AdminStatusBadgeProps = {
  status: BlogPostListItem["status"];
  className?: string;
};

const STATUS_STYLES: Record<
  BlogPostListItem["status"],
  { label: string; className: string }
> = {
  PUBLISHED: {
    label: "Published",
    className:
      "border-[var(--admin-success-border)] bg-[var(--admin-success-bg)] text-[var(--admin-success-text)]",
  },
  DRAFT: {
    label: "Draft",
    className:
      "border-[var(--admin-warn-border)] bg-[var(--admin-warn-bg)] text-[var(--admin-warn-text)]",
  },
  ARCHIVED: {
    label: "Archived",
    className:
      "border-[var(--admin-neutral-border)] bg-[var(--admin-neutral-bg)] text-[var(--admin-neutral-text)]",
  },
};

export function AdminStatusBadge({ status, className }: AdminStatusBadgeProps) {
  const config = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
