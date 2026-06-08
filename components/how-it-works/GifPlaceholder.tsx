import { cn } from "@/lib/utils";

type GifPlaceholderProps = {
  title: string;
  description: string;
  reason?: string;
  variant?: "card" | "hero";
  className?: string;
};

export function GifPlaceholder({
  title,
  description,
  reason,
  variant = "card",
  className,
}: GifPlaceholderProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_8%,var(--brand-surface-container-low)),var(--brand-surface-container-high))]",
          className,
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Remotion opening animation
          </p>
          <h3 className="mt-3 max-w-lg text-lg font-bold text-on-surface md:text-xl">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-on-surface-variant">{description}</p>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_12%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_12%,transparent)_1px,transparent_1px)] [background-size:32px_32px]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-primary/35 bg-primary/5 p-6 md:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Remotion GIF — planned
      </p>
      <h3 className="mt-2 text-lg font-bold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{description}</p>
      {reason ? (
        <p className="mt-4 text-xs leading-5 text-on-surface-variant/80">
          <span className="font-semibold text-on-surface-variant">Why GIF: </span>
          {reason}
        </p>
      ) : null}
    </div>
  );
}
