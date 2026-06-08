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
        "relative flex aspect-[4/3] w-full min-h-[300px] flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[360px] md:p-6",
        className,
      )}
    >
      <p
        data-animate="label"
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
      >
        {eyebrow}
      </p>

      <div
        className={cn(
          "relative mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-low/60 p-4 md:p-5",
          stageClassName,
        )}
      >
        {children}
      </div>

      {footer ? <div className="mt-3 shrink-0">{footer}</div> : null}
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
        "rounded-lg border border-outline-variant/50 bg-surface-lowest px-3 py-2.5 text-on-surface shadow-sm md:px-3.5 md:py-3",
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
        "rounded-lg border border-primary/25 bg-primary/8 px-3 py-2 text-center text-[11px] leading-snug text-on-surface md:text-xs",
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
        "inline-flex w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
