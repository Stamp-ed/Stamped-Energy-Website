"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type NavLinkItemProps = {
  link: NavLink;
  onNavigate?: () => void;
  mobile?: boolean;
  lightNav?: boolean;
};

export function NavLinkItem({
  link,
  onNavigate,
  mobile = false,
  lightNav = false,
}: NavLinkItemProps) {
  const pathname = usePathname();
  const isActive =
    !link.external &&
    (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));

  const className = cn(
    "relative font-medium transition-colors duration-200 ease-out",
    mobile
      ? cn(
          "block min-h-12 border-b border-outline-variant/20 py-3.5 text-base text-on-surface",
          isActive ? "text-primary" : "hover:text-primary",
        )
      : cn(
          "text-sm",
          lightNav
            ? "nav-link text-on-secondary/80 hover:text-on-secondary"
            : "nav-link text-on-surface-variant hover:text-on-surface",
          isActive &&
            (lightNav ? "nav-link-active text-on-secondary" : "nav-link-active text-on-surface"),
        ),
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      <span className={cn(mobile && isActive && "pl-3.5")}>{link.label}</span>
      {isActive ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute rounded-full bg-primary",
            mobile ? "left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2" : "-bottom-1 left-0 h-0.5 w-full",
          )}
        />
      ) : null}
    </Link>
  );
}
