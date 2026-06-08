"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled
          ? "border-b border-outline-variant/40 bg-surface-lowest/95 backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-on-surface"
        >
          <Image
            src="/LogoBlack.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
            priority
          />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button href="#contact" variant="primary">
            Book a Discovery Call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-outline-variant text-on-surface md:hidden"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "≡"}</span>
        </button>
      </Container>

      {isMenuOpen ? (
        <div className="border-t border-outline-variant/40 bg-surface-lowest md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-on-surface"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-on-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
            <Button href="#contact" variant="primary" className="w-full">
              Book a Discovery Call
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
