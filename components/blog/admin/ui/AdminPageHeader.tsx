import Link from "next/link";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
};

export function AdminPageHeader({
  title,
  description,
  action,
  secondaryAction,
}: AdminPageHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--admin-text)]">
          {title}
        </h1>
        {(action || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-2">
            {secondaryAction ? (
              <Link href={secondaryAction.href} className="admin-btn admin-btn-secondary">
                {secondaryAction.label}
              </Link>
            ) : null}
            {action ? (
              <Link href={action.href} className="admin-btn admin-btn-primary">
                {action.label}
              </Link>
            ) : null}
          </div>
        )}
      </div>
      {description ? (
        <p className="max-w-2xl text-sm text-[var(--admin-text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}
