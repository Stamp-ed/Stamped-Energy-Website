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
        className="relative flex w-full min-w-0 flex-col items-center justify-center gap-3 sm:min-h-[200px] sm:flex-row sm:items-center sm:justify-between sm:gap-5 md:min-h-[240px]"
      >
        <div className="relative z-10 grid w-full min-w-0 grid-cols-2 gap-2 sm:flex sm:max-w-[48%] sm:flex-1 sm:flex-col sm:justify-center sm:gap-2.5">
          {sources.map((source) => (
            <DiagramCard
              key={source.id}
              animate="item"
              data-connect-source={source.id}
              className="px-2 py-2 text-center text-[11px] font-semibold sm:px-3 sm:py-2.5 sm:text-xs md:text-sm"
            >
              {source.label}
            </DiagramCard>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex h-5 flex-col items-center text-primary sm:hidden"
        >
          <span className="w-0.5 flex-1 rounded-full bg-primary/50" />
          <span className="text-xs leading-none">↓</span>
        </div>

        <svg
          data-connect-svg
          className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full sm:block"
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
          <div className="relative hidden shrink-0 sm:block">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-primary/8 md:-inset-3.5"
            />
            <div
              data-hub-circle
              aria-hidden="true"
              className="relative h-[4.25rem] w-[4.25rem] rounded-full border-[2.5px] border-primary/65 bg-surface-low/35 md:h-[5.25rem] md:w-[5.25rem]"
            />
          </div>
          <div
            data-animate="accent"
            className="relative rounded-lg border-2 border-primary/45 bg-surface-lowest px-4 py-2.5 text-center shadow-sm sm:-ml-4 sm:min-w-[5rem] md:-ml-6 md:min-w-[6.25rem] md:px-4 md:py-3.5"
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
