"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent, howItWorksContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/** Prescription card used on How It Works when no live embed is configured */
function PrescriptionCard() {
  const cardRef = useRef<HTMLElement>(null);
  const { prescription } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const fields = gsap.utils.toArray<HTMLElement>("[data-hiw-rx-field]");

      gsap.set(fields, { autoAlpha: 0.2, y: 8 });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        once: true,
        animation: gsap.to(fields, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        }),
      });
    },
    { scope: cardRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <article
      ref={cardRef}
      className="rounded-xl border-2 border-primary/20 bg-surface-lowest p-6 shadow-lg md:p-8"
    >
      <p className="mb-5 border-b border-outline-variant/40 pb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Sample prescription, shift-start MD
      </p>
      <dl className="space-y-4">
        {prescription.fields.map((field) => (
          <div key={field.label} data-hiw-rx-field className="grid gap-1 sm:grid-cols-[88px_1fr]">
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              {field.label}
            </dt>
            <dd
              className={
                field.label === "Impact"
                  ? "font-display text-lg font-bold text-primary"
                  : "text-sm leading-6 text-on-surface"
              }
            >
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function HiwPrescriptionWalkthrough() {
  const { prescriptionDemo } = howItWorksContent;

  return (
    <section className="relative bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={prescriptionDemo.eyebrow}
            title={prescriptionDemo.title}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <PrescriptionCard />
        </Reveal>
      </Container>
    </section>
  );
}
