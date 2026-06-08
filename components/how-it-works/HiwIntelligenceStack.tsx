"use client";

import { Fragment, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

const CARD_DURATION = 0.72;
const ARROW_DURATION = 0.55;
const STEP_PAUSE = 0.12;

function buildSimpleTimeline(
  layers: HTMLElement[],
  arrows: HTMLElement[],
  axis: "x" | "y",
) {
  const fromOffset = axis === "x" ? { x: -20 } : { y: 18 };
  const toOffset = axis === "x" ? { x: 0 } : { y: 0 };
  const arrowOrigin = axis === "x" ? "left center" : "top center";
  const arrowFrom = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const arrowTo = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };

  gsap.set(layers, { autoAlpha: 0, scale: 0.97, ...fromOffset });
  gsap.set(arrows, { autoAlpha: 0, transformOrigin: arrowOrigin, ...arrowFrom });
  gsap.set("[data-stack-glow]", { autoAlpha: 0, scale: 0.92 });

  const timeline = gsap.timeline();
  let cursor = 0;

  timeline.to(
    layers[0],
    { autoAlpha: 1, scale: 1, ...toOffset, duration: CARD_DURATION, ease: "power2.out" },
    cursor,
  );
  cursor += CARD_DURATION + STEP_PAUSE;

  arrows.forEach((arrow, index) => {
    const nextLayer = layers[index + 1];
    if (!nextLayer) {
      return;
    }

    timeline.to(
      arrow,
      { autoAlpha: 1, ...arrowTo, duration: ARROW_DURATION, ease: "power2.inOut" },
      cursor,
    );
    cursor += ARROW_DURATION + STEP_PAUSE;

    timeline.to(
      nextLayer,
      { autoAlpha: 1, scale: 1, ...toOffset, duration: CARD_DURATION, ease: "power2.out" },
      cursor,
    );
    cursor += CARD_DURATION + STEP_PAUSE;
  });

  timeline.to(
    "[data-stack-glow]",
    { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" },
    cursor,
  );

  return timeline;
}

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

      const layers = gsap.utils.toArray<HTMLElement>("[data-stack-layer]");

      if (!layers.length) {
        return;
      }

      const mm = gsap.matchMedia();

      const playOnce = (arrows: HTMLElement[], axis: "x" | "y", start: string) => {
        const timeline = buildSimpleTimeline(layers, arrows, axis);

        const scrollTrigger = ScrollTrigger.create({
          trigger: trackRef.current,
          start,
          once: true,
          animation: timeline,
        });

        return () => {
          scrollTrigger.kill();
          timeline.kill();
        };
      };

      mm.add("(min-width: 1024px)", () => {
        const arrows = gsap.utils.toArray<HTMLElement>("[data-stack-arrow-draw]");
        return playOnce(arrows, "x", "top 78%");
      });

      mm.add("(max-width: 1023px)", () => {
        const mobileArrows = gsap.utils.toArray<HTMLElement>("[data-stack-arrow-draw-mobile]");
        return playOnce(mobileArrows, "y", "top 82%");
      });

      return () => mm.revert();
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

          <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:justify-center lg:gap-3">
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
                  <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-on-secondary/20 bg-inverse-surface/40 px-3 py-1.5 text-xs font-medium text-on-secondary/90 md:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>

                {index < intelligenceStack.layers.length - 1 ? (
                  <>
                    <div
                      className="flex shrink-0 items-center justify-center self-center py-1 lg:hidden"
                      aria-hidden="true"
                    >
                      <div
                        data-stack-arrow-draw-mobile
                        className="flex h-8 origin-top flex-col items-center"
                      >
                        <span className="w-[2px] flex-1 rounded-full bg-inverse-primary" />
                        <span className="-mt-0.5 text-lg leading-none text-inverse-primary">›</span>
                      </div>
                    </div>

                    <div
                      className="hidden w-12 shrink-0 items-center self-center px-1 lg:flex"
                      aria-hidden="true"
                    >
                      <div data-stack-arrow-draw className="flex w-full origin-left items-center">
                        <span className="h-[2px] flex-1 rounded-full bg-inverse-primary" />
                        <span className="-ml-0.5 text-xl font-light leading-none text-inverse-primary">
                          ›
                        </span>
                      </div>
                    </div>
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
