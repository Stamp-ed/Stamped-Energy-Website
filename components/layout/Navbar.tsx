"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IndustriesMegaMenu, IndustriesMobileNav } from "@/components/layout/IndustriesMegaMenu";
import { NavLinkItem } from "@/components/layout/NavLinkItem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/content";
import { usesLightNavText } from "@/lib/layout/nav-theme";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLightNav =
    !isScrolled && !isMenuOpen && usesLightNavText(pathname);
  const showSolidHeader = isScrolled || isMenuOpen;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        showSolidHeader
          ? "border-b border-outline-variant/30 bg-surface-lowest/95 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4 md:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-primary transition-colors hover:text-primary/90"
        >
          <Image
            src="/LogoOrange.png"
            alt={siteConfig.name}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
            priority
          />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8"
          aria-label="Primary"
        >
          {navLinks.map((link) =>
            link.megaMenu === "industries" ? (
              <IndustriesMegaMenu key={link.label} lightNav={isLightNav} />
            ) : (
              <NavLinkItem key={link.label} link={link} lightNav={isLightNav} />
            ),
          )}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href="/contact" variant="primary">
            Book a Discovery Call
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition-colors lg:hidden",
            isLightNav
              ? "border-on-secondary/40 text-on-secondary hover:border-on-secondary/60"
              : "border-outline-variant text-on-surface",
          )}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "≡"}</span>
        </button>
      </Container>

      {isMenuOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-outline-variant/30 bg-surface-lowest/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {navLinks.map((link) =>
              link.megaMenu === "industries" ? (
                <IndustriesMobileNav
                  key={link.label}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              ) : (
                <NavLinkItem
                  key={link.label}
                  link={link}
                  mobile
                  onNavigate={() => setIsMenuOpen(false)}
                />
              ),
            )}
            <Button href="/contact" variant="primary" className="mt-2 w-full">
              Book a Discovery Call
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
