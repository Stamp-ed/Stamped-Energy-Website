"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function FutureMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const { futureMedia, credibility } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const placeholders = gsap.utils.toArray<HTMLElement>("[data-cred-placeholder]");

      gsap.set(placeholders, { autoAlpha: 0, x: 16 });
      gsap.to(placeholders, {
        autoAlpha: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
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
    <section ref={sectionRef} className="border-t border-outline-variant/30 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal from="left">
            <SectionHeading
              eyebrow={futureMedia.eyebrow}
              title={futureMedia.title}
              description={futureMedia.description}
            />
            <div className="mt-8 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest shadow-sm">
              <div className="relative flex aspect-video items-center justify-center bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_5%,var(--brand-surface-container-low)),var(--brand-surface-container-high))]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--brand-primary)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--brand-primary)_8%,transparent)_1px,transparent_1px)] [background-size:40px_40px]"
                />
                <p className="relative text-sm font-medium text-on-surface-variant">
                  {futureMedia.placeholderLabel}
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal from="right">
              <SectionHeading
                eyebrow={credibility.eyebrow}
                title={credibility.title}
                description={credibility.founderNote}
              />
            </Reveal>
            <div className="mt-8 space-y-3">
              {credibility.placeholders.map((item) => (
                <div
                  key={item}
                  data-cred-placeholder
                  className="flex items-center gap-3 rounded-lg border border-dashed border-outline-variant/70 bg-surface-low px-4 py-3.5 text-sm text-on-surface-variant"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary"
                  >
                    +
                  </span>
                  {item} — coming soon
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
