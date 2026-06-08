"use client";

import { DiagramCard, DiagramShell } from "./DiagramShell";

const sources = [
  { id: "scada", label: "SCADA" },
  { id: "plc", label: "PLC / CNC" },
  { id: "meter", label: "Meters" },
  { id: "bill", label: "Utility bill" },
];

export function ConnectDiagram() {
  return (
    <DiagramShell diagram="connect" eyebrow="Unified ingestion" stageClassName="justify-center">
      <div
        data-connect-stage
        className="relative flex min-h-[220px] w-full items-center justify-between gap-3 md:min-h-[240px] md:gap-5"
      >
        <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-2.5 md:max-w-[48%]">
          {sources.map((source) => (
            <DiagramCard
              key={source.id}
              animate="item"
              data-connect-source={source.id}
              className="px-3 py-2.5 text-center text-xs font-semibold md:text-sm"
            >
              {source.label}
            </DiagramCard>
          ))}
        </div>

        <svg
          data-connect-svg
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
          aria-hidden="true"
        >
          {sources.map((source) => (
            <line
              key={source.id}
              data-connect-line="converge"
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="var(--brand-primary)"
              strokeWidth="2"
              strokeOpacity="0.42"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div data-connect-hub className="relative z-10 flex shrink-0 items-center">
          <div className="relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-primary/8 md:-inset-3.5"
            />
            <div
              data-hub-circle
              aria-hidden="true"
              className="relative h-[4.75rem] w-[4.75rem] rounded-full border-[2.5px] border-primary/65 bg-surface-low/35 md:h-[5.25rem] md:w-[5.25rem]"
            />
          </div>
          <div
            data-animate="accent"
            className="relative -ml-5 min-w-[5.75rem] rounded-lg border-2 border-primary/45 bg-surface-lowest px-4 py-3 text-center shadow-sm md:-ml-6 md:min-w-[6.25rem] md:px-4 md:py-3.5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary md:text-[13px]">
              Stamped
            </p>
            <p className="mt-0.5 text-[10px] text-on-surface-variant md:text-[11px]">
              Unified graph
            </p>
          </div>
        </div>
      </div>
    </DiagramShell>
  );
}
