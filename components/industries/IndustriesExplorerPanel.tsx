"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { industriesContent } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";
import { cn } from "@/lib/utils";

type IndustriesExplorerPanelProps = {
  className?: string;
  compact?: boolean;
  onNavigate?: () => void;
};

export function IndustriesExplorerPanel({
  className,
  compact = false,
  onNavigate,
}: IndustriesExplorerPanelProps) {
  const { verticals } = industriesContent;
  const [activeId, setActiveId] = useState(verticals[0]?.id ?? "automotive");
  const active = verticals.find((vertical) => vertical.id === activeId) ?? verticals[0];

  if (!active) {
    return null;
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-[0_24px_60px_-32px_color-mix(in_srgb,var(--brand-on-surface)_18%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "grid",
          compact
            ? "grid-cols-1 lg:grid-cols-[13.5rem_1fr]"
            : "grid-cols-1 md:grid-cols-[13rem_1fr]",
        )}
      >
        <div
          className={cn(
            "border-b border-outline-variant/40 bg-surface-low/80 md:border-b-0 md:border-r",
            compact ? "p-4 lg:p-5" : "p-3 md:p-4",
          )}
        >
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant",
              compact ? "px-1 py-1.5" : "px-2 py-1",
            )}
          >
            Verticals
          </p>
          <ul className={cn(compact ? "mt-2 space-y-1.5" : "mt-1 space-y-1")}>
            {verticals.map((vertical) => {
              const isActive = vertical.id === active.id;
              return (
                <li key={vertical.id}>
                  <Link
                    href={vertical.href}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-lg text-left text-sm font-semibold transition-colors",
                      compact ? "px-3 py-3" : "px-2.5 py-2.5",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface hover:bg-surface-low",
                    )}
                    onMouseEnter={() => setActiveId(vertical.id)}
                    onFocus={() => setActiveId(vertical.id)}
                    onClick={onNavigate}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        isActive ? "bg-primary" : "bg-outline-variant/60",
                      )}
                      aria-hidden="true"
                    />
                    {vertical.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={cn(compact ? "min-h-[19rem] p-5 lg:p-6" : "p-4 md:p-5")}>
          <div
            className={cn(
              "flex items-start justify-between gap-4 border-b border-outline-variant/30",
              compact ? "mb-5 pb-5" : "mb-3 pb-3",
            )}
          >
            <div>
              <Link
                href={active.href}
                className="text-base font-bold text-on-surface hover:text-primary md:text-lg"
                onClick={onNavigate}
              >
                {active.name} overview
              </Link>
              <p
                className={cn(
                  "mt-1.5 max-w-xl text-on-surface-variant",
                  compact ? "text-sm leading-6" : "text-xs leading-5 md:text-sm",
                )}
              >
                {active.tagline}
              </p>
            </div>
            <Link
              href={active.href}
              className="shrink-0 pt-0.5 text-xs font-semibold text-primary hover:underline"
              onClick={onNavigate}
            >
              View all →
            </Link>
          </div>

          {active.segments.length > 0 ? (
          <div className={cn("grid sm:grid-cols-2", compact ? "gap-3.5" : "gap-2")}>
            {active.segments.map((segment) => (
              <Link
                key={segment.id}
                href={segment.href}
                className={cn(
                  "group flex rounded-xl border border-outline-variant/40 bg-surface-low/50 transition-colors hover:border-primary/35 hover:bg-primary/5",
                  compact ? "gap-3.5 p-4" : "gap-3 p-2.5",
                )}
                onClick={onNavigate}
              >
                <div
                  className={cn(
                    "relative shrink-0 overflow-hidden rounded-lg",
                    compact ? "h-[4.5rem] w-[5.75rem]" : "h-14 w-20",
                  )}
                >
                  <Image
                    src={segment.imageSrc}
                    alt={segment.imageAlt}
                    fill
                    className={cn(
                      getSegmentImageFocus(segment.id),
                      "transition-transform duration-300 group-hover:scale-105",
                    )}
                    sizes={compact ? "92px" : "80px"}
                  />
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                    {segment.name}
                  </p>
                  <p
                    className={cn(
                      "mt-1 line-clamp-2 text-on-surface-variant",
                      compact ? "text-xs leading-5" : "mt-0.5 text-[11px] leading-snug",
                    )}
                  >
                    {segment.focus}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          ) : (
            <p
              className={cn(
                "text-on-surface-variant",
                compact ? "text-sm leading-6" : "text-xs leading-5 md:text-sm",
              )}
            >
              {active.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
