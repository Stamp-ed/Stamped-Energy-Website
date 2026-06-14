"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const BASE_WIDTH = 1440;
const BASE_HEIGHT = 900;

type LiveDemoFrameProps = {
  src: string;
  title: string;
  /** Hostname shown in the faux browser bar. */
  displayUrl: string;
  className?: string;
};

export function LiveDemoFrame({ src, title, displayUrl, className }: LiveDemoFrameProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) {
      return;
    }
    const update = () => setScale(el.clientWidth / BASE_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const enableInteraction = useCallback(() => setInteractive(true), []);
  const disableInteraction = useCallback(() => setInteractive(false), []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-[0_24px_60px_-32px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-outline-variant/50 bg-surface-low/60 px-3 py-2.5 backdrop-blur-sm sm:px-4">
        <span aria-hidden="true" className="flex shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <div className="flex max-w-full items-center gap-2 rounded-md border border-outline-variant/50 bg-surface px-3 py-1 text-xs text-on-surface-variant">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
            <span className="truncate">{displayUrl}</span>
          </div>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-md border border-outline-variant/50 px-2.5 py-1 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
        >
          Open ↗
        </a>
      </div>

      <div
        ref={viewportRef}
        className="relative aspect-[16/10] w-full overflow-hidden bg-surface"
        onMouseLeave={disableInteraction}
      >
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="fullscreen"
          referrerPolicy="no-referrer-when-downgrade"
          className={cn(
            "absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-300",
            scale === null ? "opacity-0" : "opacity-100",
          )}
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale ?? 1})`,
            pointerEvents: interactive ? "auto" : "none",
          }}
        />

        <button
          type="button"
          onClick={enableInteraction}
          aria-label="Click to interact with the live demo"
          className={cn(
            "absolute inset-0 z-10 flex items-end justify-center bg-transparent pb-5 transition-opacity duration-200",
            interactive ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <span className="pointer-events-none flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface-lowest/90 px-4 py-2 text-xs font-semibold text-on-surface shadow-md backdrop-blur-sm transition-transform group-hover:-translate-y-0.5">
            <span aria-hidden="true" className="text-primary">▶</span>
            Click to interact
          </span>
        </button>

        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-on-surface/80 px-2.5 py-1 text-[10px] font-medium text-surface-lowest shadow-sm transition-opacity duration-200",
            interactive ? "opacity-100" : "opacity-0",
          )}
        >
          Move cursor out to scroll the page
        </span>
      </div>
    </div>
  );
}
