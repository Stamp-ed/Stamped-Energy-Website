"use client";

import { useRef } from "react";

import { Container } from "@/components/ui/Container";
import { landingContent } from "@/lib/content";
import { registerGsap, useGSAP } from "@/lib/motion/gsap";
import { refreshScrollTriggers, revealOnScroll } from "@/lib/motion/scrollAnimations";

export function TrustStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { trust } = landingContent;

  useGSAP(
    () => {
      registerGsap();

      revealOnScroll("[data-trust-item]", {
        y: 20,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      refreshScrollTriggers();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-outline-variant/40 bg-surface-low py-8"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p
            data-trust-item
            className="text-sm font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {trust.label}
          </p>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-8">
            {trust.items.map((item) => (
              <li key={item} data-trust-item className="text-sm text-on-surface-variant">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
