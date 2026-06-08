"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { trust } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const items = gsap.utils.toArray<HTMLElement>("[data-trust-item]");
      const checks = gsap.utils.toArray<HTMLElement>("[data-trust-check]");

      gsap.set(items, { autoAlpha: 0, x: -12 });
      gsap.set(checks, { scale: 0.6, autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        },
      });

      timeline.to(items, {
        autoAlpha: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
      });

      timeline.to(
        checks,
        { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.08, ease: "back.out(2)" },
        "-=0.45",
      );
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="border-y border-outline-variant/40 bg-surface-low py-8">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p
            data-trust-item
            className="text-sm font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {trust.label}
          </p>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-6">
            {trust.items.map((item) => (
              <li key={item} data-trust-item className="flex items-start gap-2.5 text-sm text-on-surface-variant">
                <span
                  data-trust-check
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[10px] font-bold text-primary"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
