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
      <div className="relative flex h-full min-h-[200px] items-center">
        <div className="relative z-10 flex h-full w-[36%] flex-col justify-between gap-2 py-0.5">
          {sources.map((source) => (
            <DiagramCard
              key={source.id}
              animate="item"
              className="px-2.5 py-2 text-center text-xs font-semibold md:text-sm"
            >
              {source.label}
            </DiagramCard>
          ))}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 260"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            data-animate="line"
            x1="138"
            y1="32"
            x2="248"
            y2="130"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="6 4"
          />
          <line
            data-animate="line"
            x1="138"
            y1="92"
            x2="248"
            y2="130"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="6 4"
          />
          <line
            data-animate="line"
            x1="138"
            y1="152"
            x2="248"
            y2="130"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="6 4"
          />
          <line
            data-animate="line"
            x1="138"
            y1="212"
            x2="248"
            y2="130"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="6 4"
          />
          <circle cx="268" cy="130" r="48" fill="var(--brand-primary)" fillOpacity="0.08" />
          <circle
            cx="268"
            cy="130"
            r="34"
            fill="var(--brand-surface-container-lowest)"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeOpacity="0.65"
          />
        </svg>

        <div className="relative z-10 ml-auto flex w-[40%] items-center justify-center">
          <DiagramCard
            animate="accent"
            className="rounded-full border-2 border-primary/40 px-5 py-4 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Stamped</p>
            <p className="mt-0.5 text-[10px] text-on-surface-variant">Unified graph</p>
          </DiagramCard>
        </div>
      </div>
    </DiagramShell>
  );
}
