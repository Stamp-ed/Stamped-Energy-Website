"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const INDUSTRY_CODES: Record<string, string> = {
  automotive: "AC",
  "die-casting": "DC",
  forging: "FG",
  "heat-treatment": "HT",
  "rubber-moulding": "RM",
};

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { industries } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-industry-card]");
      const icons = gsap.utils.toArray<HTMLElement>("[data-industry-icon]");

      gsap.set(cards, { autoAlpha: 0, y: 28 });
      gsap.set(icons, { scale: 0.82, autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%",
          once: true,
        },
      });

      cards.forEach((card, index) => {
        const icon = icons[index];
        const isFeatured = card.dataset.featured === "true";

        timeline.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            duration: isFeatured ? 0.7 : 0.55,
            ease: "power2.out",
          },
          index * 0.09,
        );

        if (icon) {
          timeline.to(
            icon,
            { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(1.8)" },
            index * 0.09 + 0.05,
          );
        }
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,color-mix(in_srgb,var(--brand-primary)_7%,transparent),transparent_50%)]"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={industries.eyebrow}
            title={industries.title}
            description={industries.description}
          />
        </Reveal>

        <div ref={gridRef} className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.items.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries#${industry.id}`}
              data-industry-card
              data-featured={industry.featured ? "true" : "false"}
              className={cn(
                "group relative flex h-full flex-col rounded-xl border p-6 outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                industry.featured
                  ? "border-primary/35 bg-gradient-to-br from-primary/10 via-surface-lowest to-surface-lowest shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)] hover:border-primary/55 hover:shadow-[0_22px_48px_-26px_color-mix(in_srgb,var(--brand-primary)_55%,transparent)] md:col-span-2 xl:col-span-1"
                  : "border-outline-variant/50 bg-surface-lowest hover:border-primary/30 hover:shadow-md",
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  data-industry-icon
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-xs font-bold tracking-wide transition-colors duration-300",
                    industry.featured
                      ? "border-primary/35 bg-primary/12 text-primary group-hover:bg-primary/18"
                      : "border-outline-variant/60 bg-surface-low text-on-surface-variant group-hover:border-primary/25 group-hover:text-primary",
                  )}
                  aria-hidden="true"
                >
                  {INDUSTRY_CODES[industry.id] ?? "IN"}
                </div>

                <div className="min-w-0 flex-1">
                  {industry.featured ? (
                    <span className="mb-2 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary">
                      Initial focus
                    </span>
                  ) : null}
                  <h3 className="text-lg font-bold text-on-surface">{industry.name}</h3>
                  <p className="mt-1.5 text-sm font-medium text-primary/90">{industry.focus}</p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-6 text-on-surface-variant">
                {industry.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore sector
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <Reveal className="mt-10">
          <Button href={industries.cta.href} variant="outline">
            {industries.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
