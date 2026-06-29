import { DATABASE_FETCH_ERROR_MESSAGE } from "@/lib/db/safe-query";
import { cn } from "@/lib/utils";

type DatabaseFetchNoticeProps = {
  className?: string;
};

export function DatabaseFetchNotice({ className }: DatabaseFetchNoticeProps) {
  return (
    <p
      role="status"
      className={cn(
        "rounded-lg border border-outline-variant/50 bg-surface-dim/40 px-3 py-2 text-center text-xs text-on-surface-variant",
        className,
      )}
    >
      {DATABASE_FETCH_ERROR_MESSAGE}
    </p>
  );
}
