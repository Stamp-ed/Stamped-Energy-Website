type InvestmentRoiChartProps = {
  variant: "traditional" | "stamped";
  className?: string;
};

const CHART = {
  width: 440,
  height: 220,
  left: 36,
  right: 420,
  top: 24,
  baselineY: 172,
} as const;

const GRID_LINES = [148, 118, 88, 58];

/** Traditional: tall early investment bars, flat ROI then slow climb */
const TRADITIONAL_BARS = [
  { x: 72, height: 108 },
  { x: 132, height: 88 },
  { x: 192, height: 68 },
  { x: 252, height: 48 },
  { x: 312, height: 36 },
  { x: 372, height: 28 },
];

const TRADITIONAL_ROI =
  "M36,172 C72,172 88,168 112,162 C136,156 160,148 192,136 C224,124 256,108 288,88 C320,68 352,48 384,32 C400,24 412,18 420,12";

/** Stamped: moderate pilot bar, low subscription bars, faster ROI climb + scale dot */
const STAMPED_BARS = [
  { x: 96, height: 52 },
  { x: 156, height: 18 },
  { x: 216, height: 18 },
  { x: 276, height: 18 },
  { x: 336, height: 18 },
  { x: 396, height: 18 },
];

const STAMPED_ROI =
  "M36,172 C64,172 84,166 108,154 C132,142 156,126 192,104 C228,82 264,58 300,38 C328,24 356,14 384,8 C400,4 412,2 420,0";

const STAMPED_ROI_FILL =
  `${STAMPED_ROI} L420,172 L36,172 Z`;

const TRADITIONAL_ROI_FILL =
  `${TRADITIONAL_ROI} L420,172 L36,172 Z`;

const SCALE_DOT = { cx: 276, cy: 98 };

export function InvestmentRoiChart({ variant, className }: InvestmentRoiChartProps) {
  const isTraditional = variant === "traditional";
  const bars = isTraditional ? TRADITIONAL_BARS : STAMPED_BARS;
  const roiPath = isTraditional ? TRADITIONAL_ROI : STAMPED_ROI;
  const roiFill = isTraditional ? TRADITIONAL_ROI_FILL : STAMPED_ROI_FILL;
  const chartId = isTraditional ? "traditional" : "stamped";

  return (
    <svg
      viewBox={`0 0 ${CHART.width} ${CHART.height}`}
      role="img"
      aria-label={
        isTraditional
          ? "Chart showing high upfront investment and delayed return on investment"
          : "Chart showing moderate pilot investment, faster return on investment, and scale point after verified savings"
      }
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>
        {isTraditional ? "Traditional approach investment and ROI" : "Stamped approach investment and ROI"}
      </title>

      <defs>
        <linearGradient id={`bar-gradient-${chartId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-secondary)" stopOpacity={isTraditional ? 0.95 : 0.75} />
          <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity={isTraditional ? 0.55 : 0.4} />
        </linearGradient>
        <linearGradient id={`roi-fill-${chartId}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity={isTraditional ? 0.12 : 0.22} />
          <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity={0.02} />
        </linearGradient>
        <filter id={`roi-glow-${chartId}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chart background */}
      <rect
        x={CHART.left - 8}
        y={CHART.top - 8}
        width={CHART.right - CHART.left + 16}
        height={CHART.baselineY - CHART.top + 16}
        rx={12}
        fill="var(--brand-surface-dim)"
        fillOpacity={0.35}
      />

      {/* Grid lines */}
      {GRID_LINES.map((y) => (
        <line
          key={y}
          x1={CHART.left}
          y1={y}
          x2={CHART.right}
          y2={y}
          stroke="var(--brand-outline-variant)"
          strokeOpacity={0.3}
          strokeWidth={1}
          strokeDasharray={y === CHART.baselineY ? undefined : "4 6"}
        />
      ))}

      {/* Baseline */}
      <line
        x1={CHART.left}
        y1={CHART.baselineY}
        x2={CHART.right}
        y2={CHART.baselineY}
        stroke="var(--brand-outline-variant)"
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />

      {/* Investment bars */}
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x - 18}
          y={CHART.baselineY - bar.height}
          width={36}
          height={bar.height}
          rx={4}
          fill={`url(#bar-gradient-${chartId})`}
        />
      ))}

      {/* ROI area fill */}
      <path d={roiFill} fill={`url(#roi-fill-${chartId})`} />

      {/* ROI line */}
      <path
        d={roiPath}
        fill="none"
        stroke="var(--brand-primary)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#roi-glow-${chartId})`}
      />

      {/* Scale marker - Stamped only */}
      {!isTraditional ? (
        <>
          <circle
            cx={SCALE_DOT.cx}
            cy={SCALE_DOT.cy}
            r={16}
            fill="var(--brand-primary)"
            fillOpacity={0.12}
          />
          <circle
            cx={SCALE_DOT.cx}
            cy={SCALE_DOT.cy}
            r={8}
            fill="var(--brand-surface-lowest)"
            stroke="var(--brand-primary)"
            strokeWidth={2.5}
          />
          <circle cx={SCALE_DOT.cx} cy={SCALE_DOT.cy} r={3.5} fill="var(--brand-primary)" />
        </>
      ) : null}

      {/* Axis hints */}
      <text
        x={CHART.left}
        y={CHART.baselineY + 18}
        fill="var(--brand-on-surface-variant)"
        fillOpacity={0.6}
        fontSize={10}
        fontWeight={600}
        letterSpacing="0.08em"
      >
        TIME →
      </text>
    </svg>
  );
}
