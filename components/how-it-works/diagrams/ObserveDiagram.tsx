import { DiagramCallout, DiagramShell } from "./DiagramShell";

export function ObserveDiagram() {
  return (
    <DiagramShell
      diagram="observe"
      eyebrow="Production-normalized baseline"
      footer={
        <DiagramCallout>
          Anomaly: demand spike at shift start — 18% above baseline
        </DiagramCallout>
      }
    >
      <div className="relative min-h-0 flex-1">
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
            strokeOpacity="0.6"
          />
          <line
            x1="40"
            y1="30"
            x2="40"
            y2="170"
            stroke="var(--brand-outline-variant)"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <path
            data-animate="baseline"
            d="M 40 120 Q 120 115 200 100 T 380 85"
            fill="none"
            stroke="var(--brand-outline)"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeOpacity="0.7"
          />
          <path
            data-animate="actual"
            d="M 40 130 L 80 125 L 120 140 L 160 95 L 200 110 L 240 70 L 280 90 L 320 60 L 360 75 L 380 65"
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle data-animate="accent" cx="240" cy="70" r="8" fill="var(--brand-primary)" />
        </svg>
      </div>
    </DiagramShell>
  );
}
