"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IndustriesExplorerPanel } from "@/components/industries/IndustriesExplorerPanel";
import { industriesContent, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function IndustriesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const industriesLink = navLinks.find((link) => link.megaMenu === "industries");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!industriesLink) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={industriesLink.href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface",
          isOpen && "text-on-surface",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onFocus={() => setIsOpen(true)}
      >
        {industriesLink.label}
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70"
        />
      </Link>

      {/* pt-3 bridges the gap so the pointer can reach the panel without closing */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <IndustriesExplorerPanel compact onNavigate={() => setIsOpen(false)} />
      </div>
    </div>
  );
}

export function IndustriesMobileNav({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const vertical = industriesContent.verticals[0];

  if (!vertical) {
    return null;
  }

  return (
    <div className="rounded-lg border border-outline-variant/40 bg-surface-low/60 p-3">
      <Link
        href="/industries"
        className="text-sm font-semibold text-on-surface"
        onClick={onNavigate}
      >
        Industries overview
      </Link>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">
        {vertical.name}
      </p>
      <ul className="mt-2 space-y-1.5">
        <li>
          <Link
            href={vertical.href}
            className="block text-sm text-on-surface-variant hover:text-primary"
            onClick={onNavigate}
          >
            {vertical.name} overview
          </Link>
        </li>
        {vertical.segments.map((segment) => (
          <li key={segment.id}>
            <Link
              href={segment.href}
              className="block pl-3 text-sm text-on-surface-variant hover:text-primary"
              onClick={onNavigate}
            >
              {segment.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
