"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const { industries } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-industry-card]");

      cards.forEach((card, index) => {
        gsap.set(card, { autoAlpha: 0, y: 24 });

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={industries.eyebrow}
            title={industries.title}
            description={industries.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {industries.items.map((industry) => (
            <article
              key={industry.id}
              data-industry-card
              className={cn(
                "group relative h-full overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1",
                industry.featured
                  ? "border-primary/40 bg-gradient-to-br from-primary/10 via-surface-lowest to-surface-lowest shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]"
                  : "border-outline-variant/50 bg-surface-lowest hover:shadow-md",
              )}
            >
              {industry.featured ? (
                <span className="mb-3 inline-block rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary">
                  Initial focus
                </span>
              ) : null}
              <h3 className="text-lg font-bold text-on-surface">{industry.name}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{industry.description}</p>
              <div
                aria-hidden="true"
                className="mt-5 h-px w-0 bg-primary/40 transition-all duration-500 group-hover:w-full"
              />
            </article>
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
