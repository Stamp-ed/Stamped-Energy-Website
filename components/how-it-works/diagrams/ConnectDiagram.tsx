const sources = [
  { id: "scada", label: "SCADA" },
  { id: "plc", label: "PLC / CNC" },
  { id: "meter", label: "Meters" },
  { id: "bill", label: "Utility bill" },
];

export function ConnectDiagram() {
  return (
    <div
      data-diagram="connect"
      className="relative flex aspect-[4/3] w-full min-h-[280px] items-center rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[320px] md:p-6"
    >
      <div className="relative z-10 flex h-full w-[38%] flex-col justify-between py-1">
        {sources.map((source) => (
          <div
            key={source.id}
            data-animate="node"
            className="rounded-lg border border-outline-variant/60 bg-surface-low px-2.5 py-2 text-center text-xs font-semibold text-on-surface md:text-sm"
          >
            {source.label}
          </div>
        ))}
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          data-animate="line"
          x1="148"
          y1="38"
          x2="248"
          y2="150"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="6 4"
        />
        <line
          data-animate="line"
          x1="148"
          y1="108"
          x2="248"
          y2="150"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="6 4"
        />
        <line
          data-animate="line"
          x1="148"
          y1="178"
          x2="248"
          y2="150"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="6 4"
        />
        <line
          data-animate="line"
          x1="148"
          y1="248"
          x2="248"
          y2="150"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeOpacity="0.4"
          strokeDasharray="6 4"
        />
        <circle
          cx="268"
          cy="150"
          r="52"
          fill="var(--brand-primary)"
          fillOpacity="0.1"
        />
        <circle
          cx="268"
          cy="150"
          r="36"
          fill="var(--brand-surface-container-lowest)"
          stroke="var(--brand-primary)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 ml-auto flex w-[42%] items-center justify-center">
        <div
          data-animate="hub"
          className="rounded-full border-2 border-primary bg-surface-lowest px-5 py-4 text-center shadow-sm"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Stamped</p>
          <p className="mt-0.5 text-[10px] text-on-surface-variant">Unified graph</p>
        </div>
      </div>
    </div>
  );
}
