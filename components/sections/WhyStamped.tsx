"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const WHY_ICONS: Record<string, string> = {
  prescriptive: "◎",
  "sme-priced": "₹",
  "software-only": "⧉",
  "whatsapp-native": "✓",
};

export function WhyStamped() {
  const sectionRef = useRef<HTMLElement>(null);
  const { whyStamped } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]");

      cards.forEach((card, index) => {
        const bar = card.querySelector<HTMLElement>("[data-why-bar]");

        gsap.set(card, { autoAlpha: 0, x: index % 2 === 0 ? -20 : 20 });
        if (bar) {
          gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });

        timeline.to(card, { autoAlpha: 1, x: 0, duration: 0.65, ease: "power2.out" });

        if (bar) {
          timeline.to(bar, { scaleX: 1, duration: 0.45, ease: "power2.out" }, "-=0.35");
        }
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-secondary py-20 text-on-secondary md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,color-mix(in_srgb,var(--brand-primary)_16%,transparent),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-inverse-primary)_8%,transparent)_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading eyebrow={whyStamped.eyebrow} title={whyStamped.title} dark align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {whyStamped.items.map((item) => (
            <article
              key={item.id}
              data-why-card
              className="rounded-xl border border-on-secondary/15 bg-surface-lowest p-6 text-on-surface shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary"
                >
                  {WHY_ICONS[item.id] ?? "•"}
                </span>
                <div data-why-bar className="h-1 flex-1 rounded-full bg-primary/70" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-on-surface">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
