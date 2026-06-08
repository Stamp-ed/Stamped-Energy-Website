import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.14em]",
            "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-bold leading-tight md:text-4xl",
          dark ? "text-on-secondary" : "text-on-surface",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 md:text-lg",
            dark ? "text-on-secondary/80" : "text-on-surface-variant",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
