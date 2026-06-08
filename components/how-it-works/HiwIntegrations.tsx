"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const STAGE_CENTER = { x: 400, y: 280 };
const SOURCE_COUNT = howItWorksContent.integrations.sources.length;

const GRID_OFFSETS = [
  { x: -220, y: -120 },
  { x: 0, y: -120 },
  { x: 220, y: -120 },
  { x: -220, y: 120 },
  { x: 0, y: 120 },
  { x: 220, y: 120 },
];

function getOrbitOffset(index: number, radius: number) {
  const angle = (index / SOURCE_COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function getLineEndpoints(
  index: number,
  orbitRadius: number,
  hubRadius: number,
  cardReach: number,
) {
  const angle = (index / SOURCE_COUNT) * Math.PI * 2 - Math.PI / 2;
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const cardHalfW = 52;
  const cardHalfH = 38;
  const cardExtent = Math.abs(ux) * cardHalfW + Math.abs(uy) * cardHalfH;

  return {
    x1: STAGE_CENTER.x + ux * hubRadius,
    y1: STAGE_CENTER.y + uy * hubRadius,
    x2: STAGE_CENTER.x + ux * (orbitRadius + cardExtent + cardReach),
    y2: STAGE_CENTER.y + uy * (orbitRadius + cardExtent + cardReach),
  };
}

export function HiwIntegrations() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const { integrations } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-integration-card]");
      const lines = gsap.utils.toArray<SVGLineElement>("[data-integration-line]");

      const runTimeline = (orbitRadius: number, gridScale: number) => {
        const hubRadius = 48;

        lines.forEach((line, index) => {
          const { x1, y1, x2, y2 } = getLineEndpoints(index, orbitRadius, hubRadius, 4);
          const length = Math.hypot(x2 - x1, y2 - y1);
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
          line.setAttribute("stroke-dasharray", String(length));
          gsap.set(line, { strokeDashoffset: length, autoAlpha: 0 });
        });

        gsap.set(hubRef.current, { autoAlpha: 0, y: 160, xPercent: -50, yPercent: -50 });

        cards.forEach((card, index) => {
          const grid = GRID_OFFSETS[index];
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: grid.x * gridScale,
            y: grid.y * gridScale,
            autoAlpha: 1,
          });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=130%",
            pin: pinRef.current,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
          },
        });

        timeline.to(hubRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out",
        });

        cards.forEach((card, index) => {
          const orbit = getOrbitOffset(index, orbitRadius);
          timeline.to(
            card,
            {
              x: orbit.x,
              y: orbit.y,
              duration: 0.42,
              ease: "power2.inOut",
            },
            0.18,
          );
        });

        timeline.to(
          lines,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.32,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.52,
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => runTimeline(218, 1));
      mm.add("(max-width: 767px)", () => runTimeline(158, 0.72));

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="bg-surface-low">
      <Container className="py-16 md:py-20">
        <SectionHeading
          eyebrow={integrations.eyebrow}
          title={integrations.title}
          description={integrations.description}
          align="center"
          className="mx-auto"
        />
      </Container>

      <div ref={pinRef} className="min-h-screen">
        <Container className="flex min-h-screen items-center py-10">
          <div
            ref={stageRef}
            className="relative mx-auto h-[min(68vh,580px)] w-full max-w-4xl"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 800 560"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {integrations.sources.map((source, index) => {
                const { x1, y1, x2, y2 } = getLineEndpoints(index, 218, 48, 4);
                const length = Math.hypot(x2 - x1, y2 - y1);
                return (
                  <line
                    key={source.id}
                    data-integration-line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--brand-primary)"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    strokeDasharray={length}
                    strokeDashoffset={length}
                  />
                );
              })}
            </svg>

            <div
              ref={hubRef}
              className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-primary bg-surface-lowest text-center shadow-[0_0_40px_-10px_color-mix(in_srgb,var(--brand-primary)_55%,transparent)]"
            >
              <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-primary">
                Stamped
              </span>
              <span className="text-[9px] text-on-surface-variant">Energy</span>
            </div>

            {integrations.sources.map((source) => (
              <article
                key={source.id}
                data-integration-card
                className="absolute left-1/2 top-1/2 z-10 w-[9.5rem] rounded-lg border border-outline-variant/50 bg-surface-lowest p-3 shadow-sm md:w-[10.5rem] md:p-4"
              >
                <h3 className="text-sm font-bold text-on-surface">{source.label}</h3>
                <p className="mt-1 text-[11px] leading-4 text-on-surface-variant">
                  {source.detail}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
