"use client";

import { Fragment, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwIntelligenceStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { intelligenceStack } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          once: true,
        },
      });

      timeline
        .from("[data-stack-layer]", {
          autoAlpha: 0,
          y: 32,
          scale: 0.96,
          duration: 0.55,
          stagger: 0.14,
          ease: "power2.out",
        })
        .from(
          "[data-stack-arrow]",
          { scaleX: 0, autoAlpha: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" },
          "-=0.35",
        )
        .from(
          "[data-stack-glow]",
          { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="overflow-hidden bg-secondary py-20 text-on-secondary md:py-28">
      <Container>
        <SectionHeading
          eyebrow={intelligenceStack.eyebrow}
          title={intelligenceStack.title}
          description={intelligenceStack.description}
          align="center"
          dark
          className="mx-auto"
        />

        <div ref={trackRef} className="relative mx-auto mt-14 max-w-6xl">
          <div
            data-stack-glow
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-24 -translate-y-1/2 rounded-full bg-inverse-primary/10 blur-3xl lg:block"
          />

          <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-2">
            {intelligenceStack.layers.map((layer, index) => (
              <Fragment key={layer.id}>
                <article
                  data-stack-layer
                  className="flex flex-1 flex-col rounded-xl border border-on-secondary/15 bg-inverse-surface/50 p-5 backdrop-blur-sm md:p-6"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-inverse-primary">
                    {layer.subtitle}
                  </p>
                  <h3 className="mt-2 text-lg font-bold md:text-xl">{layer.title}</h3>
                  <ul className="mt-4 flex-1 space-y-2">
                    {layer.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-5 text-on-secondary/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-inverse-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>

                {index < intelligenceStack.layers.length - 1 ? (
                  <div
                    data-stack-arrow
                    className="hidden shrink-0 items-center justify-center self-center px-1 lg:flex"
                    aria-hidden="true"
                  >
                    <span className="text-2xl font-light text-inverse-primary">→</span>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
