import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DiagramShellProps = {
  diagram: string;
  eyebrow: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  stageClassName?: string;
};

export function DiagramShell({
  diagram,
  eyebrow,
  children,
  footer,
  className,
  stageClassName,
}: DiagramShellProps) {
  return (
    <div
      data-diagram={diagram}
      className={cn(
        "relative flex w-full min-w-0 max-w-full flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-3 sm:p-5 md:p-6",
        "min-h-[220px] sm:aspect-[4/3] sm:min-h-[260px] md:min-h-[320px]",
        className,
      )}
    >
      <p
        data-animate="label"
        className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-xs"
      >
        {eyebrow}
      </p>

      <div
        className={cn(
          "relative mt-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-low/60 p-3 sm:mt-3 sm:p-4 md:p-5",
          stageClassName,
        )}
      >
        {children}
      </div>

      {footer ? <div className="mt-2 shrink-0 sm:mt-3">{footer}</div> : null}
    </div>
  );
}

export function DiagramCard({
  children,
  className,
  animate = "item",
  style,
  ...rest
}: Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  animate?: string;
}) {
  return (
    <div
      data-animate={animate}
      style={style}
      className={cn(
        "min-w-0 rounded-lg border border-outline-variant/50 bg-surface-lowest px-2.5 py-2 text-on-surface shadow-sm sm:px-3 sm:py-2.5 md:px-3.5 md:py-3",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function DiagramCallout({
  children,
  className,
  animate = "footer",
}: {
  children: ReactNode;
  className?: string;
  animate?: string;
}) {
  return (
    <p
      data-animate={animate}
      className={cn(
        "rounded-lg border border-primary/25 bg-primary/8 px-2.5 py-1.5 text-center text-[10px] leading-snug text-on-surface sm:px-3 sm:py-2 sm:text-[11px] md:text-xs",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DiagramBadge({
  children,
  className,
  animate = "accent",
}: {
  children: ReactNode;
  className?: string;
  animate?: string;
}) {
  return (
    <span
      data-animate={animate}
      className={cn(
        "inline-flex w-fit max-w-full rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:px-3 sm:text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
