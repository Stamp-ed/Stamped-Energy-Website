"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const ctaButtonBase = cn(
  "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-[transform,box-shadow,opacity] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
  "hover:-translate-y-0.5 active:translate-y-0",
);

export function LandingClosingCta() {
  const { closingCta } = landingContent;

  return (
    <section className="relative bg-surface-low pb-8 pt-12 md:pb-10 md:pt-16">
      <Container className="relative z-10">
        <Reveal>
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl px-6 py-10 text-center shadow-[0_24px_64px_-20px_color-mix(in_srgb,var(--brand-primary)_55%,transparent)]",
              "md:px-14 md:py-14",
              "bg-[linear-gradient(135deg,var(--brand-primary)_0%,#e03a28_48%,#c42f1f_100%)]",
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-on-primary/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-secondary/20 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-2xl font-extrabold leading-tight text-on-primary md:text-4xl">
                {closingCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-on-primary/90 md:text-base">
                {closingCta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={closingCta.primaryCta.href}
                  className={cn(
                    ctaButtonBase,
                    "bg-on-primary text-primary shadow-lg hover:shadow-xl",
                  )}
                >
                  {closingCta.primaryCta.label}
                </Link>
                <Link
                  href={closingCta.secondaryCta.href}
                  className={cn(
                    ctaButtonBase,
                    "border border-on-primary/20 bg-secondary text-on-secondary hover:opacity-95",
                  )}
                >
                  {closingCta.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
