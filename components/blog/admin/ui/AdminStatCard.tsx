import Link from "next/link";

type AdminStatCardProps = {
  label: string;
  value: number;
  href: string;
  hint?: string;
};

export function AdminStatCard({ label, value, href, hint }: AdminStatCardProps) {
  return (
    <Link
      href={href}
      className="admin-panel group block p-4 transition-colors hover:border-[var(--admin-border-strong,#c9d1cb)]"
    >
      <p className="text-xs font-medium text-[var(--admin-text-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-[var(--admin-text)]">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs text-[var(--admin-text-muted)] transition-colors group-hover:text-[var(--admin-accent)]">
          {hint}
        </p>
      ) : null}
    </Link>
  );
}
