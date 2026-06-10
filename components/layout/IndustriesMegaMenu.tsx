"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { IndustriesExplorerPanel } from "@/components/industries/IndustriesExplorerPanel";
import { industriesContent, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

export function IndustriesMegaMenu({ lightNav = false }: { lightNav?: boolean }) {
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
      className="relative hidden lg:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={industriesLink.href}
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium transition-colors",
          lightNav
            ? "text-on-secondary/80 hover:text-on-secondary"
            : "text-on-surface-variant hover:text-on-surface",
          lightNav ? isOpen && "text-on-secondary" : isOpen && "text-on-surface",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {industriesLink.label}
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70 transition-transform duration-200",
            isOpen && "scale-125 opacity-100",
          )}
        />
      </Link>

      {/* pt-3 bridges the gap so the pointer can reach the panel without closing */}
      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-[min(50rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200",
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
  const [isExpanded, setIsExpanded] = useState(false);
  const industriesLink = navLinks.find((link) => link.megaMenu === "industries");
  const vertical = industriesContent.verticals[0];

  if (!industriesLink || !vertical) {
    return null;
  }

  return (
    <div className="border-b border-outline-variant/20 pb-3">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-on-surface"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((open) => !open)}
      >
        <span>{industriesLink.label}</span>
        <span
          aria-hidden="true"
          className={cn(
            "text-base leading-none text-on-surface-variant transition-transform duration-200",
            isExpanded && "rotate-45",
          )}
        >
          +
        </span>
      </button>

      {isExpanded ? (
        <div className="mt-2 space-y-2 border-l-2 border-primary/25 pl-3">
          <Link
            href="/industries"
            className="block text-sm text-on-surface-variant hover:text-primary"
            onClick={onNavigate}
          >
            All industries
          </Link>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            {vertical.name}
          </p>
          <ul className="space-y-1.5">
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
                  className="block pl-2 text-sm text-on-surface-variant hover:text-primary"
                  onClick={onNavigate}
                >
                  {segment.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
