"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwBeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { beforeAfter } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .from("[data-before-card]", {
          autoAlpha: 0,
          x: -24,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          "[data-after-card]",
          { autoAlpha: 0, x: 24, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        )
        .from(
          "[data-before-item], [data-after-item]",
          { autoAlpha: 0, y: 10, duration: 0.35, stagger: 0.06, ease: "power2.out" },
          "-=0.35",
        );
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          align="center"
          className="mx-auto"
        />

        <div className="relative mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-lowest text-primary md:flex"
          >
            →
          </div>

          <article
            data-before-card
            className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-lowest shadow-sm"
          >
            <div className="border-b border-outline-variant/50 bg-surface-dim/60 px-6 py-4">
              <h3 className="text-lg font-bold text-on-surface-variant">
                {beforeAfter.before.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-on-surface-variant/70">
                Reactive · fragmented
              </p>
            </div>
            <ul className="space-y-0 px-6 py-5">
              {beforeAfter.before.items.map((item) => (
                <li
                  key={item}
                  data-before-item
                  className="flex gap-3 border-b border-outline-variant/30 py-3 text-sm leading-6 text-on-surface-variant last:border-0"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-outline-variant/30 text-xs text-on-surface-variant">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article
            data-after-card
            className="overflow-hidden rounded-2xl border-2 border-primary/35 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--brand-primary)_10%,var(--brand-surface-container-lowest)),var(--brand-surface-container-lowest))] shadow-[0_20px_50px_-30px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]"
          >
            <div className="border-b border-primary/20 bg-primary/10 px-6 py-4">
              <h3 className="text-lg font-bold text-on-surface">{beforeAfter.after.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-primary">
                Prescriptive · verified
              </p>
            </div>
            <ul className="space-y-0 px-6 py-5">
              {beforeAfter.after.items.map((item) => (
                <li
                  key={item}
                  data-after-item
                  className="flex gap-3 border-b border-primary/10 py-3 text-sm leading-6 text-on-surface last:border-0"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
