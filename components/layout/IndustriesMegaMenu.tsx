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

  if (!industriesLink) {
    return null;
  }

  return (
    <div className="border-b border-outline-variant/20">
      <div className="flex min-h-12 items-stretch">
        <Link
          href={industriesLink.href}
          className="flex flex-1 items-center py-3.5 text-base font-medium text-on-surface transition-colors hover:text-primary"
          onClick={onNavigate}
        >
          {industriesLink.label}
        </Link>
        <button
          type="button"
          className={cn(
            "flex w-12 shrink-0 items-center justify-center rounded-md text-on-surface-variant transition-colors duration-200 ease-out",
            "hover:bg-surface-container-low hover:text-on-surface",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lowest",
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Hide industry verticals" : "Show industry verticals"}
          onClick={() => setIsExpanded((open) => !open)}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={cn(
              "h-4 w-4 transition-transform duration-200 ease-out",
              isExpanded && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>

      {isExpanded ? (
        <ul className="grid gap-2 pb-4 pt-1 sm:grid-cols-2">
          {industriesContent.verticals.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex min-h-12 w-full items-center gap-2.5 rounded-xl border border-outline-variant/50",
                  "bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface",
                  "transition-[background-color,border-color,color,transform] duration-200 ease-out",
                  "hover:border-primary/45 hover:bg-primary/8 hover:text-primary",
                  "active:scale-[0.99] active:bg-primary/12",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lowest",
                )}
                onClick={onNavigate}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/75"
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
