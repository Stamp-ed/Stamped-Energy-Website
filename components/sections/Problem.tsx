"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const PROBLEM_MARKERS = ["01", "02", "03"];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { problem } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-problem-card]");

      cards.forEach((card, index) => {
        gsap.set(card, { autoAlpha: 0, y: 36, scale: 0.97 });

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
          delay: index * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
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
    <section
      ref={sectionRef}
      id="why-energy-projects-fail"
      className="relative overflow-hidden bg-secondary section-y text-on-secondary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,color-mix(in_srgb,var(--brand-primary)_14%,transparent),transparent_50%)]"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading eyebrow={problem.eyebrow} title={problem.title} dark align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-8 grid md:mt-14 gap-5 lg:grid-cols-3">
          {problem.items.map((item, index) => (
            <article
              key={item.id}
              data-problem-card
              className="group relative h-full overflow-hidden rounded-2xl border border-on-secondary/15 bg-surface-lowest p-5 text-on-surface shadow-lg transition-transform duration-300 hover:-translate-y-1 sm:p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 font-display text-sm font-extrabold text-primary"
                >
                  {PROBLEM_MARKERS[index]}
                </span>
                <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-primary/80">
                  0{index + 1}
                </p>
              </div>
              <h3 className="mt-5 text-xl font-bold text-on-surface">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.description}</p>
              {item.solutionPoints && item.solutionPoints.length > 0 ? (
                <div className="mt-5 border-t border-outline-variant/40 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {item.solutionHeading ?? "How Stamped solves it"}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {item.solutionPoints.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-6 text-on-surface-variant"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div
                aria-hidden="true"
                className="mt-6 h-px w-full bg-gradient-to-r from-primary/50 via-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
