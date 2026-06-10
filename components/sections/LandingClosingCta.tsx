"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const ctaButtonBase = cn(
  "inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition-[transform,box-shadow,opacity] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
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
              "rounded-3xl border border-on-secondary/10 bg-secondary px-6 py-10 text-center shadow-lg",
              "md:px-14 md:py-14",
            )}
          >
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-2xl font-extrabold leading-tight text-on-secondary md:text-4xl">
                {closingCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-on-secondary/80 md:text-base">
                {closingCta.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={closingCta.primaryCta.href}
                  className={cn(
                    ctaButtonBase,
                    "bg-primary text-on-primary shadow-md hover:shadow-lg",
                  )}
                >
                  {closingCta.primaryCta.label}
                </Link>
                <Link
                  href={closingCta.secondaryCta.href}
                  className={cn(
                    ctaButtonBase,
                    "border border-on-secondary/25 bg-transparent text-on-secondary hover:bg-on-secondary/5",
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
