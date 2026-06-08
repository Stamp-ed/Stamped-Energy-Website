"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustriesHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hub } = industriesContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-stat]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface-low py-14 md:py-16">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:gap-6">
          {hub.stats.map((stat) => (
            <article
              key={stat.id}
              data-hub-stat
              className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-6 text-center shadow-sm"
            >
              <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold text-on-surface">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-2 text-xs leading-5 text-on-surface-variant">{stat.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
