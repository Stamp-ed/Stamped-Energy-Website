"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const { finalCta, contactForm } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !glowRef.current) {
        return;
      }

      gsap.to(glowRef.current, {
        x: 40,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
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
      id="contact"
      className="relative overflow-hidden bg-primary section-y text-on-primary"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-on-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-on-primary/8 blur-3xl"
      />

      <Container className="relative z-10">
        <div className="grid gap-8 md:gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-on-primary/80">
                {finalCta.eyebrow}
              </p>
              <h2 className="text-3xl font-bold leading-tight text-on-primary md:text-4xl">
                {finalCta.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-on-primary/90 md:text-lg">
                {finalCta.description}
              </p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="rounded-xl border border-on-primary/20 bg-surface-lowest p-5 text-on-surface shadow-xl sm:p-6 md:p-8">
              <h3 className="text-xl font-bold">{contactForm.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                {contactForm.description}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
