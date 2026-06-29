"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const VIEW_W = 800;
const VIEW_H = 440;
const BASELINE = 340;
const CHART_LEFT = 48;
const CHART_RIGHT = 752;

type BarSpec = { id: string; x: number; height: number };

const TRADITIONAL_BARS: BarSpec[] = [
  { id: "t1", x: 108, height: 200 },
  { id: "t2", x: 188, height: 168 },
  { id: "t3", x: 268, height: 128 },
  { id: "t4", x: 348, height: 88 },
  { id: "t5", x: 428, height: 64 },
  { id: "t6", x: 508, height: 48 },
];

const STAMPED_BARS: BarSpec[] = [
  { id: "s1", x: 148, height: 96 },
  { id: "s2", x: 248, height: 28 },
  { id: "s3", x: 348, height: 28 },
  { id: "s4", x: 448, height: 28 },
  { id: "s5", x: 548, height: 28 },
  { id: "s6", x: 648, height: 28 },
];

const TRADITIONAL_ROI =
  "M48,340 C88,340 108,334 148,322 C188,310 228,292 288,268 C348,244 408,212 468,172 C528,132 588,96 648,68 C688,48 720,32 752,20";

const STAMPED_ROI =
  "M48,340 C96,340 120,332 160,312 C200,292 248,260 308,216 C368,172 428,124 488,80 C548,44 608,24 668,12 C708,4 732,0 752,0";

const SCALE = { cx: 448, cy: 168 };

const INTRO = {
  grid: 0.65,
  barStagger: 0.08,
  barGrow: 0.52,
  barsAt: 0.35,
  fillAt: 1.05,
  fillDur: 0.75,
  lineAt: 0.75,
  lineDraw: 2.1,
  scaleAt: 2.65,
  scalePop: 0.55,
} as const;

type PayAsYouSaveChartVisualProps = {
  variant: "traditional" | "stamped";
  className?: string;
};

export function PayAsYouSaveChartVisual({ variant, className }: PayAsYouSaveChartVisualProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const isStamped = variant === "stamped";
  const bars = isStamped ? STAMPED_BARS : TRADITIONAL_BARS;
  const roiPath = isStamped ? STAMPED_ROI : TRADITIONAL_ROI;
  const chartId = variant;

  useGSAP(
    () => {
      if (!isReady || !stageRef.current) {
        return;
      }

      const scope = stageRef.current;
      loopRef.current?.kill();

      if (prefersReducedMotion) {
        gsap.set("[data-pay-grid]", { autoAlpha: 1 });
        gsap.set("[data-pay-bar]", { scaleY: 1 });
        gsap.set("[data-pay-roi-fill]", { autoAlpha: isStamped ? 0.18 : 0.1 });
        gsap.set("[data-pay-roi-line]", { strokeDashoffset: 0, autoAlpha: 1 });
        gsap.set("[data-pay-scale-dot]", { autoAlpha: isStamped ? 1 : 0, scale: 1 });
        return;
      }

      const line = scope.querySelector<SVGPathElement>("[data-pay-roi-line]");
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 1 });
      }

      gsap.set("[data-pay-grid]", { autoAlpha: 0 });
      gsap.set("[data-pay-bar]", { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set("[data-pay-roi-fill]", { autoAlpha: 0 });
      gsap.set("[data-pay-scale-dot]", { autoAlpha: 0, scale: 0 });
      gsap.set("[data-pay-scale-ring]", { autoAlpha: 0, scale: 0.65 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 72%",
          once: true,
        },
      });

      intro.to("[data-pay-grid]", { autoAlpha: 1, duration: INTRO.grid, ease: "power2.out" });

      intro.to(
        "[data-pay-bar]",
        {
          scaleY: 1,
          duration: INTRO.barGrow,
          stagger: INTRO.barStagger,
          ease: "power2.out",
        },
        INTRO.barsAt,
      );

      intro.to(
        "[data-pay-roi-fill]",
        { autoAlpha: isStamped ? 0.2 : 0.12, duration: INTRO.fillDur, ease: "power2.out" },
        INTRO.fillAt,
      );

      if (line) {
        intro.to(
          line,
          { strokeDashoffset: 0, duration: INTRO.lineDraw, ease: "power2.inOut" },
          INTRO.lineAt,
        );
      }

      if (isStamped) {
        intro.to(
          "[data-pay-scale-dot]",
          { autoAlpha: 1, scale: 1, duration: INTRO.scalePop, ease: "back.out(2)" },
          INTRO.scaleAt,
        );
        intro.to(
          "[data-pay-scale-ring]",
          { autoAlpha: 0.7, scale: 1, duration: 0.45, ease: "power2.out" },
          INTRO.scaleAt,
        );
        intro.to(
          "[data-pay-scale-ring]",
          { scale: 1.45, autoAlpha: 0, duration: 0.65, ease: "power2.out" },
          INTRO.scaleAt + 0.35,
        );
      }

      if (isStamped) {
        loopRef.current = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.4,
          delay: INTRO.scaleAt + INTRO.scalePop + 0.5,
        });

        loopRef.current.to("[data-pay-scale-ring]", {
          autoAlpha: 0.55,
          scale: 0.85,
          duration: 0.01,
        });

        loopRef.current.to("[data-pay-scale-ring]", {
          scale: 1.5,
          autoAlpha: 0,
          duration: 1.35,
          ease: "power2.out",
        });

        loopRef.current.to(
          "[data-pay-roi-line]",
          { strokeOpacity: 0.72, duration: 0.9, ease: "sine.inOut" },
          0,
        );
        loopRef.current.to(
          "[data-pay-roi-line]",
          { strokeOpacity: 1, duration: 0.9, ease: "sine.inOut" },
          0.9,
        );
      }

      return () => {
        intro.scrollTrigger?.kill();
        intro.kill();
        loopRef.current?.kill();
        loopRef.current = null;
      };
    },
    { scope: stageRef, dependencies: [isReady, prefersReducedMotion, variant] },
  );

  return (
    <div
      ref={stageRef}
      className={cn("relative h-full min-h-[220px] w-full overflow-hidden bg-surface-lowest sm:min-h-[260px] md:min-h-[300px]", className)}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={
          isStamped
            ? "Animated chart: moderate pilot investment with faster return and scale point"
            : "Animated chart: high upfront investment with delayed return"
        }
      >
        <defs>
          <linearGradient id={`pay-bar-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={isStamped ? 0.78 : 0.92} />
            <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={isStamped ? 0.42 : 0.55} />
          </linearGradient>
          <linearGradient id={`pay-roi-fill-${chartId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <g data-pay-grid opacity="0">
          {[260, 220, 180, 140, 100].map((y) => (
            <line
              key={y}
              x1={CHART_LEFT}
              y1={y}
              x2={CHART_RIGHT}
              y2={y}
              stroke="var(--brand-outline-variant)"
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeDasharray={y === BASELINE ? undefined : "5 7"}
            />
          ))}
          <line
            x1={CHART_LEFT}
            y1={BASELINE}
            x2={CHART_RIGHT}
            y2={BASELINE}
            stroke="var(--brand-outline-variant)"
            strokeOpacity={0.45}
            strokeWidth={1.5}
          />
          <text
            x={CHART_LEFT}
            y={56}
            className="fill-[var(--brand-on-surface-variant)] text-[11px] font-semibold uppercase tracking-[0.1em]"
          >
            Return on investment
          </text>
          <text
            x={CHART_LEFT}
            y={BASELINE + 28}
            className="fill-[var(--brand-on-surface-variant)] text-[11px] font-semibold uppercase tracking-[0.1em]"
          >
            Time →
          </text>
          <text
            x={CHART_RIGHT - 4}
            y={72}
            textAnchor="end"
            className="fill-[var(--brand-secondary)] text-[10px] font-bold uppercase tracking-[0.08em]"
          >
            Investment
          </text>
        </g>

        {bars.map((bar) => (
          <g key={bar.id} transform={`translate(${bar.x}, ${BASELINE})`}>
            <rect
              data-pay-bar
              x={-20}
              y={-bar.height}
              width={40}
              height={bar.height}
              rx={5}
              fill={`url(#pay-bar-${chartId})`}
            />
          </g>
        ))}

        <path
          data-pay-roi-fill
          d={`${roiPath} L752,${BASELINE} L48,${BASELINE} Z`}
          fill={`url(#pay-roi-fill-${chartId})`}
          opacity={0}
        />

        <path
          data-pay-roi-line
          d={roiPath}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={3.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {isStamped ? (
          <>
            <circle
              data-pay-scale-ring
              cx={SCALE.cx}
              cy={SCALE.cy}
              r={28}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth={2}
              strokeOpacity={0.45}
              style={{ transformOrigin: `${SCALE.cx}px ${SCALE.cy}px` }}
            />
            <circle
              data-pay-scale-dot
              cx={SCALE.cx}
              cy={SCALE.cy}
              r={11}
              fill="var(--brand-surface-lowest)"
              stroke="var(--brand-primary)"
              strokeWidth={2.75}
              style={{ transformOrigin: `${SCALE.cx}px ${SCALE.cy}px` }}
            />
            <circle cx={SCALE.cx} cy={SCALE.cy} r={4.5} fill="var(--brand-primary)" />
            <text
              x={SCALE.cx}
              y={SCALE.cy - 36}
              textAnchor="middle"
              className="fill-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-[0.08em]"
            >
              Scale
            </text>
          </>
        ) : null}
      </svg>
    </div>
  );
}
