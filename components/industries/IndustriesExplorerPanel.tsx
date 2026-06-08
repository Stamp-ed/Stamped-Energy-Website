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
      <div className={cn("grid", compact ? "grid-cols-1 lg:grid-cols-[11rem_1fr]" : "grid-cols-1 md:grid-cols-[12rem_1fr]")}>
        <div className="border-b border-outline-variant/40 bg-surface-low/80 p-2 md:border-b-0 md:border-r md:p-3">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
            Verticals
          </p>
          <ul className="mt-1 space-y-1">
            {verticals.map((vertical) => {
              const isActive = vertical.id === active.id;
              return (
                <li key={vertical.id}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-on-surface hover:bg-surface-low",
                    )}
                    onMouseEnter={() => setActiveId(vertical.id)}
                    onFocus={() => setActiveId(vertical.id)}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        isActive ? "bg-primary" : "bg-outline-variant/60",
                      )}
                      aria-hidden="true"
                    />
                    {vertical.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-3 md:p-4">
          <div className="mb-3 flex items-start justify-between gap-3 border-b border-outline-variant/30 pb-3">
            <div>
              <Link
                href={active.href}
                className="text-base font-bold text-on-surface hover:text-primary md:text-lg"
                onClick={onNavigate}
              >
                {active.name} overview
              </Link>
              <p className="mt-1 max-w-xl text-xs leading-5 text-on-surface-variant md:text-sm">
                {active.tagline}
              </p>
            </div>
            <Link
              href={active.href}
              className="shrink-0 text-xs font-semibold text-primary hover:underline"
              onClick={onNavigate}
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {active.segments.map((segment) => (
              <Link
                key={segment.id}
                href={segment.href}
                className="group flex gap-3 rounded-xl border border-outline-variant/40 bg-surface-low/50 p-2.5 transition-colors hover:border-primary/35 hover:bg-primary/5"
                onClick={onNavigate}
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={segment.imageSrc}
                    alt={segment.imageAlt}
                    fill
                    className={cn(
                      getSegmentImageFocus(segment.id),
                      "transition-transform duration-300 group-hover:scale-105",
                    )}
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-on-surface group-hover:text-primary">
                    {segment.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-on-surface-variant">
                    {segment.focus}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
