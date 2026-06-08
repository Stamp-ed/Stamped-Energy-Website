"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const STAGE_CENTER = { x: 400, y: 280 };
const SOURCE_COUNT = 6;

const INGESTION_SOURCES = [
  { id: "scada", label: "SCADA / DCS" },
  { id: "plc", label: "PLCs & CNCs" },
  { id: "meters", label: "Energy meters" },
  { id: "bms", label: "BMS / utilities" },
  { id: "erp", label: "ERP / MES" },
  { id: "bills", label: "Utility bills" },
];

/** Scaled ~72% of full-page orbit so nodes stay inside the card. */
const GRID_OFFSETS = [
  { x: -158, y: -86 },
  { x: 0, y: -86 },
  { x: 158, y: -86 },
  { x: -158, y: 86 },
  { x: 0, y: 86 },
  { x: 158, y: 86 },
];

const CARD_HALF_W = 36;
const CARD_HALF_H = 26;

/** ~5s total: hub rise → orbit collapse → line draw. */
const TIMING = {
  hubRise: 1.08,
  cardsAt: 0.78,
  cardsMove: 1.92,
  linesAt: 2.72,
  linesDraw: 1.5,
  linesStagger: 0.17,
} as const;

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
  const cardExtent = Math.abs(ux) * CARD_HALF_W + Math.abs(uy) * CARD_HALF_H;

  return {
    x1: STAGE_CENTER.x + ux * hubRadius,
    y1: STAGE_CENTER.y + uy * hubRadius,
    x2: STAGE_CENTER.x + ux * (orbitRadius + cardExtent + cardReach),
    y2: STAGE_CENTER.y + uy * (orbitRadius + cardExtent + cardReach),
  };
}

/** Full no-rip-and-replace orbit animation — scoped to the ingestion card visual. */
export function IngestionOrbitVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-ingest-orbit-card]", stageRef.current);
      const lines = gsap.utils.toArray<SVGLineElement>("[data-ingest-orbit-line]", stageRef.current);

      const runTimeline = (orbitRadius: number, gridScale: number, hubRadius: number) => {
        lines.forEach((line, index) => {
          const { x1, y1, x2, y2 } = getLineEndpoints(index, orbitRadius, hubRadius, 2);
          const length = Math.hypot(x2 - x1, y2 - y1);
          line.setAttribute("x1", String(x1));
          line.setAttribute("y1", String(y1));
          line.setAttribute("x2", String(x2));
          line.setAttribute("y2", String(y2));
          line.setAttribute("stroke-dasharray", String(length));
          gsap.set(line, { strokeDashoffset: length, autoAlpha: 0 });
        });

        gsap.set(hubRef.current, { autoAlpha: 0, y: 96, xPercent: -50, yPercent: -50 });

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
            trigger: stageRef.current,
            start: "top 88%",
            once: true,
          },
        });

        timeline.to(hubRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: TIMING.hubRise,
          ease: "power2.out",
        });

        cards.forEach((card, index) => {
          const orbit = getOrbitOffset(index, orbitRadius);
          timeline.to(
            card,
            {
              x: orbit.x,
              y: orbit.y,
              duration: TIMING.cardsMove,
              ease: "power2.inOut",
            },
            TIMING.cardsAt,
          );
        });

        timeline.to(
          lines,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: TIMING.linesDraw,
            stagger: TIMING.linesStagger,
            ease: "power2.out",
          },
          TIMING.linesAt,
        );

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      };

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => runTimeline(156, 1, 34));
      mm.add("(max-width: 767px)", () => runTimeline(112, 0.78, 28));

      return () => mm.revert();
    },
    {
      scope: stageRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 800 560"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {INGESTION_SOURCES.map((source, index) => {
          const { x1, y1, x2, y2 } = getLineEndpoints(index, 156, 34, 2);
          const length = Math.hypot(x2 - x1, y2 - y1);
          return (
            <line
              key={source.id}
              data-ingest-orbit-line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--brand-primary)"
              strokeWidth="1.75"
              strokeOpacity="0.5"
              strokeDasharray={length}
              strokeDashoffset={length}
            />
          );
        })}
      </svg>

      <div
        ref={hubRef}
        className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-primary bg-surface-lowest text-center shadow-[0_0_32px_-10px_color-mix(in_srgb,var(--brand-primary)_55%,transparent)] md:h-16 md:w-16"
      >
        <span className="text-[8px] font-bold uppercase leading-tight tracking-wide text-primary md:text-[9px]">
          Stamped
        </span>
        <span className="text-[7px] text-on-surface-variant md:text-[8px]">Energy</span>
      </div>

      {INGESTION_SOURCES.map((source) => (
        <article
          key={source.id}
          data-ingest-orbit-card
          className="absolute left-1/2 top-1/2 z-10 flex w-[5.5rem] flex-col items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-lowest px-2 py-2 text-center shadow-sm md:w-[6.25rem] md:py-2.5"
        >
          <h4 className="text-[9px] font-bold leading-tight text-on-surface md:text-[10px]">
            {source.label}
          </h4>
        </article>
      ))}
    </div>
  );
}
