"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const VIEW_W = 800;
const VIEW_H = 560;

/** Topmost hub — the graph root. */
const HUB = { id: "hub", label: "Energy graph", x: 400, y: 96 };

const GRAPH_NODES = [
  { id: "kwh", label: "kWh streams", x: 188, y: 248 },
  { id: "prod", label: "Production", x: 308, y: 272 },
  { id: "cost", label: "Cost / ₹", x: 492, y: 272 },
  { id: "shift", label: "Shifts", x: 612, y: 248 },
  { id: "align", label: "Time-aligned", x: 400, y: 372 },
] as const;

const HUB_RADIUS = 34;
const NODE_HALF_W = 34;
const NODE_HALF_H = 22;

/** ~5s: hub appears → nodes spawn from hub → edges draw. */
const TIMING = {
  hubAppear: 1.04,
  nodesAt: 0.84,
  nodeSpawn: 1.32,
  nodeStagger: 0.14,
  linesAt: 2.78,
  linesDraw: 1.46,
  linesStagger: 0.15,
} as const;

function toPercent(x: number, y: number) {
  return {
    left: `${(x / VIEW_W) * 100}%`,
    top: `${(y / VIEW_H) * 100}%`,
  };
}

function getEdgeEndpoints(nodeX: number, nodeY: number) {
  const dx = nodeX - HUB.x;
  const dy = nodeY - HUB.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const nodeExtent = Math.abs(ux) * NODE_HALF_W + Math.abs(uy) * NODE_HALF_H;

  return {
    x1: HUB.x + ux * (HUB_RADIUS + 2),
    y1: HUB.y + uy * (HUB_RADIUS + 2),
    x2: nodeX - ux * (nodeExtent + 2),
    y2: nodeY - uy * (nodeExtent + 2),
  };
}

export function RepositoryGraphVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  const hubPos = toPercent(HUB.x, HUB.y);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const nodes = gsap.utils.toArray<HTMLElement>("[data-graph-node]", stageRef.current);
      const lines = gsap.utils.toArray<SVGLineElement>("[data-graph-line]", stageRef.current);

      lines.forEach((line, index) => {
        const node = GRAPH_NODES[index];
        if (!node) {
          return;
        }
        const { x1, y1, x2, y2 } = getEdgeEndpoints(node.x, node.y);
        const length = Math.hypot(x2 - x1, y2 - y1);
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        line.setAttribute("stroke-dasharray", String(length));
        gsap.set(line, { strokeDashoffset: length, autoAlpha: 0 });
      });

      gsap.set(hubRef.current, { autoAlpha: 0, scale: 0.72 });
      gsap.set(nodes, {
        autoAlpha: 0,
        scale: 0.55,
        left: hubPos.left,
        top: hubPos.top,
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
        scale: 1,
        duration: TIMING.hubAppear,
        ease: "back.out(1.5)",
      });

      nodes.forEach((nodeEl, index) => {
        const node = GRAPH_NODES[index];
        if (!node) {
          return;
        }
        const target = toPercent(node.x, node.y);
        timeline.to(
          nodeEl,
          {
            autoAlpha: 1,
            scale: 1,
            left: target.left,
            top: target.top,
            duration: TIMING.nodeSpawn,
            ease: "power2.out",
          },
          TIMING.nodesAt + index * TIMING.nodeStagger,
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
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {GRAPH_NODES.map((node) => {
          const { x1, y1, x2, y2 } = getEdgeEndpoints(node.x, node.y);
          const length = Math.hypot(x2 - x1, y2 - y1);
          return (
            <line
              key={node.id}
              data-graph-line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--brand-primary)"
              strokeWidth="1.75"
              strokeOpacity="0.45"
              strokeDasharray={length}
              strokeDashoffset={length}
            />
          );
        })}
      </svg>

      <div
        ref={hubRef}
        className="absolute z-20 flex h-14 w-[5.75rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border-2 border-primary bg-surface-lowest px-2 py-2 text-center shadow-[0_0_28px_-8px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)] md:h-[3.75rem] md:w-[6.5rem]"
        style={{ left: hubPos.left, top: hubPos.top }}
      >
        <span className="text-[8px] font-bold uppercase leading-tight tracking-wide text-primary md:text-[9px]">
          {HUB.label}
        </span>
      </div>

      {GRAPH_NODES.map((node) => {
        const pos = toPercent(node.x, node.y);
        return (
          <article
            key={node.id}
            data-graph-node
            className="absolute z-10 flex w-[5.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-lowest px-2 py-2 text-center shadow-sm md:w-[5.75rem] md:py-2.5"
            style={{ left: pos.left, top: pos.top }}
          >
            <h4 className="text-[9px] font-bold leading-tight text-on-surface md:text-[10px]">
              {node.label}
            </h4>
          </article>
        );
      })}
    </div>
  );
}
