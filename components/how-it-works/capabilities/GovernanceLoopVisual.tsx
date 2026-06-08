"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const VIEW_W = 800;
const VIEW_H = 560;

/** Square loop — expanded so the four edge boxes read larger in the card. */
const SQUARE = {
  left: 188,
  right: 612,
  top: 72,
  bottom: 352,
  cx: 400,
  cy: 212,
} as const;

const VERIFY_BOX_EDGE = SQUARE.bottom + 34;
const LEDGER_CARD_TOP = SQUARE.bottom + 88;
const LEDGER_CARD_CENTER = SQUARE.bottom + 118;
const ARROW_END = LEDGER_CARD_TOP - 8;

const LOOP_SEGMENTS = [
  { id: "assign-notify", d: `M ${SQUARE.left} ${SQUARE.cy} L ${SQUARE.cx} ${SQUARE.top}` },
  { id: "notify-track", d: `M ${SQUARE.cx} ${SQUARE.top} L ${SQUARE.right} ${SQUARE.cy}` },
  { id: "track-verify", d: `M ${SQUARE.right} ${SQUARE.cy} L ${SQUARE.cx} ${SQUARE.bottom}` },
  { id: "verify-assign", d: `M ${SQUARE.cx} ${SQUARE.bottom} L ${SQUARE.left} ${SQUARE.cy}` },
] as const;

const VERIFY_TO_LEDGER = `M ${SQUARE.cx} ${VERIFY_BOX_EDGE} L ${SQUARE.cx} ${ARROW_END}`;

const STEPS = [
  { id: "assign", label: "Assign", sub: "Owner set", x: SQUARE.left, y: SQUARE.cy },
  { id: "notify", label: "WhatsApp", sub: "To supervisor", x: SQUARE.cx, y: SQUARE.top },
  { id: "track", label: "Track", sub: "Open → Done", x: SQUARE.right, y: SQUARE.cy },
  { id: "verify", label: "Verify", sub: "M&V check", x: SQUARE.cx, y: SQUARE.bottom },
] as const;

/** ~5s total: loop draw + four-step cycle, then arrow falls and ledger pops below Verify. */
const TIMING = {
  segmentDraw: 0.38,
  segmentStagger: 0.07,
  stepsAt: 0.28,
  stepStagger: 0.1,
  stepPop: 0.36,
  highlightAt: 0.9,
  highlightStagger: 0.72,
  highlightIn: 0.3,
  highlightOut: 0.22,
  arrowAt: 3.95,
  arrowDraw: 0.55,
  ledgerAt: 4.35,
  ledgerPop: 0.42,
  barFill: 0.48,
} as const;

function toPercent(x: number, y: number) {
  return {
    left: `${(x / VIEW_W) * 100}%`,
    top: `${(y / VIEW_H) * 100}%`,
  };
}

export function GovernanceLoopVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const scope = stageRef.current;
      const segments = gsap.utils.toArray<SVGPathElement>("[data-gov-segment]", scope);
      const arrow = scope.querySelector<SVGPathElement>("[data-gov-arrow]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-gov-step]", scope);

      segments.forEach((segment) => {
        const length = segment.getTotalLength();
        segment.setAttribute("stroke-dasharray", String(length));
        gsap.set(segment, { strokeDashoffset: length, autoAlpha: 0.45 });
      });

      if (arrow) {
        const length = arrow.getTotalLength();
        arrow.setAttribute("stroke-dasharray", String(length));
        gsap.set(arrow, { strokeDashoffset: length, autoAlpha: 0 });
      }

      gsap.set(steps, { autoAlpha: 0, scale: 0.84 });
      gsap.set("[data-gov-step-active]", { autoAlpha: 0, scale: 0.88 });
      gsap.set("[data-gov-arrow-head]", { autoAlpha: 0 });
      gsap.set(ledgerRef.current, { autoAlpha: 0, scale: 0.82, y: -12 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 76%", once: true },
      });

      segments.forEach((segment, index) => {
        timeline.to(
          segment,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: TIMING.segmentDraw,
            ease: "power2.inOut",
          },
          index * TIMING.segmentStagger,
        );
      });

      steps.forEach((step, index) => {
        timeline.to(
          step,
          {
            autoAlpha: 1,
            scale: 1,
            duration: TIMING.stepPop,
            ease: "back.out(1.5)",
          },
          TIMING.stepsAt + index * TIMING.stepStagger,
        );
      });

      steps.forEach((step, index) => {
        const ring = step.querySelector<HTMLElement>("[data-gov-step-active]");
        const highlightAt = TIMING.highlightAt + index * TIMING.highlightStagger;

        timeline.to(
          ring,
          { autoAlpha: 1, scale: 1, duration: TIMING.highlightIn, ease: "power2.out" },
          highlightAt,
        );
        timeline.to(
          step,
          {
            borderColor: "color-mix(in srgb, var(--brand-primary) 55%, var(--brand-outline-variant))",
            duration: TIMING.highlightIn,
            ease: "power2.out",
          },
          highlightAt,
        );
        timeline.to(
          ring,
          { autoAlpha: 0, duration: TIMING.highlightOut, ease: "power2.out" },
          highlightAt + TIMING.highlightIn + 0.18,
        );
      });

      if (arrow) {
        timeline.to(
          arrow,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: TIMING.arrowDraw,
            ease: "power2.in",
          },
          TIMING.arrowAt,
        );
      }

      timeline.to(
        "[data-gov-arrow-head]",
        { autoAlpha: 1, duration: 0.22, ease: "power2.in" },
        TIMING.arrowAt + TIMING.arrowDraw - 0.12,
      );

      timeline.to(
        ledgerRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: TIMING.ledgerPop,
          ease: "back.out(1.6)",
        },
        TIMING.ledgerAt,
      );

      timeline.to(
        barRef.current,
        { scaleX: 1, duration: TIMING.barFill, ease: "power2.inOut" },
        TIMING.ledgerAt + 0.14,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: stageRef, dependencies: [isReady, prefersReducedMotion] },
  );

  const ledgerPos = toPercent(SQUARE.cx, LEDGER_CARD_CENTER);

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {LOOP_SEGMENTS.map((segment) => (
          <path
            key={segment.id}
            data-gov-segment
            d={segment.d}
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="2.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        ))}

        {[
          { x: SQUARE.cx, y: SQUARE.top + 20, rot: 90 },
          { x: SQUARE.right - 20, y: SQUARE.cy, rot: 0 },
          { x: SQUARE.cx, y: SQUARE.bottom - 20, rot: 270 },
          { x: SQUARE.left + 20, y: SQUARE.cy, rot: 180 },
        ].map((head, index) => (
          <polygon
            key={index}
            points="0,-6 12,0 0,6"
            fill="var(--brand-primary)"
            fillOpacity="0.55"
            transform={`translate(${head.x} ${head.y}) rotate(${head.rot})`}
          />
        ))}

        <path
          data-gov-arrow
          d={VERIFY_TO_LEDGER}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="2.25"
          strokeOpacity="0.6"
          strokeLinecap="round"
        />
        <polygon
          data-gov-arrow-head
          points={`${SQUARE.cx},${ARROW_END + 2} ${SQUARE.cx - 8},${ARROW_END - 10} ${SQUARE.cx + 8},${ARROW_END - 10}`}
          fill="var(--brand-primary)"
          fillOpacity="0.75"
        />
      </svg>

      {STEPS.map((step) => {
        const pos = toPercent(step.x, step.y);
        return (
          <article
            key={step.id}
            data-gov-step
            className="absolute z-10 flex w-[6.25rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-outline-variant/50 bg-surface-lowest px-2.5 py-2.5 text-center shadow-sm md:w-[7rem] md:px-3 md:py-3"
            style={{ left: pos.left, top: pos.top }}
          >
            <span
              data-gov-step-active
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-lg bg-primary/8"
            />
            <span className="relative text-[11px] font-bold text-on-surface md:text-xs">
              {step.label}
            </span>
            <span className="relative mt-0.5 text-[9px] text-on-surface-variant md:text-[10px]">
              {step.sub}
            </span>
          </article>
        );
      })}

      <div
        ref={ledgerRef}
        className="absolute z-20 w-[min(78%,16rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/40 bg-surface-lowest px-4 py-3.5 shadow-[0_14px_40px_-18px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)] md:w-[17rem] md:px-4 md:py-4"
        style={{ left: ledgerPos.left, top: ledgerPos.top }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary md:text-[11px]">
              Verified savings
            </p>
            <p className="mt-0.5 text-[9px] text-on-surface-variant md:text-[10px]">
              Potential → realized
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-0.5 text-sm font-extrabold text-primary">
            ₹
          </span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-outline-variant/25">
          <div ref={barRef} className="h-full w-full rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}
