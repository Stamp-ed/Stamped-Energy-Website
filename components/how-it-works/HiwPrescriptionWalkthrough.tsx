"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwPrescriptionWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const { prescriptionDemo } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const fields = gsap.utils.toArray<HTMLElement>("[data-rx-field]");
      gsap.set(fields, { autoAlpha: 0.2, y: 8 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=55%",
            pin: pinRef.current,
            scrub: 0.45,
          },
        });

        fields.forEach((field, index) => {
          timeline.to(
            field,
            { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" },
            index * 0.12,
          );
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(fields, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      return () => mm.revert();

    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="flex min-h-[72vh] items-center py-12 md:min-h-[68vh]">
        <Container>
          <SectionHeading
            eyebrow={prescriptionDemo.eyebrow}
            title={prescriptionDemo.title}
            description={prescriptionDemo.description}
            align="center"
            className="mx-auto"
          />

          <div className="mx-auto mt-8 max-w-3xl rounded-xl border-2 border-primary/25 bg-surface-lowest p-5 shadow-[0_20px_50px_-24px_color-mix(in_srgb,var(--brand-primary)_40%,transparent)] md:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-outline-variant/40 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Prescription #1042
              </p>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-secondary">
                Assembling…
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {prescriptionDemo.fields.map((field, index) => (
                <div
                  key={field.label}
                  data-rx-field={index}
                  className="rounded-lg border border-outline-variant/40 bg-surface-low px-3 py-2.5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {field.label}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-5 text-on-surface">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
