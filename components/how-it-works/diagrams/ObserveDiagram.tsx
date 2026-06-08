export function ObserveDiagram() {
  return (
    <div
      data-diagram="observe"
      className="relative flex aspect-[4/3] w-full min-h-[280px] flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[320px] md:p-6"
    >
      <p
        data-animate="label"
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
      >
        Production-normalized baseline
      </p>

      <div className="relative mt-3 min-h-0 flex-1">
        <svg
          className="h-full w-full"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <line
            x1="40"
            y1="170"
            x2="380"
            y2="170"
            stroke="var(--brand-outline-variant)"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="30"
            x2="40"
            y2="170"
            stroke="var(--brand-outline-variant)"
            strokeWidth="1"
          />
          <path
            data-animate="baseline"
            d="M 40 120 Q 120 115 200 100 T 380 85"
            fill="none"
            stroke="var(--brand-outline)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <path
            data-animate="actual"
            d="M 40 130 L 80 125 L 120 140 L 160 95 L 200 110 L 240 70 L 280 90 L 320 60 L 360 75 L 380 65"
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle data-animate="anomaly" cx="240" cy="70" r="8" fill="var(--brand-primary)" />
        </svg>

        <div
          data-animate="callout"
          className="absolute bottom-1 right-0 max-w-[52%] rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-[11px] leading-snug text-on-surface md:text-xs"
        >
          Anomaly: demand spike at shift start — 18% above baseline
        </div>
      </div>
    </div>
  );
}
