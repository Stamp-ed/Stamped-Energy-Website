"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const CAPABILITY_ICONS: Record<string, string> = {
  ingestion: "↓",
  repository: "◎",
  intelligence: "◈",
  governance: "↻",
};

export function HiwCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { capabilities } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-capability-card]");

      gsap.set(cards, { autoAlpha: 0, y: 24 });
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 py-16 md:py-20">
      <Container>
        <SectionHeading
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.items.map((item) => (
            <article
              key={item.id}
              data-capability-card
              className="flex flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary"
              >
                {CAPABILITY_ICONS[item.id] ?? "•"}
              </span>
              <h3 className="mt-3 text-base font-bold text-on-surface">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-5 text-on-surface-variant">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
