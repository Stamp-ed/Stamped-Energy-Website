type InvestmentRoiChartProps = {
  variant: "traditional" | "stamped";
  className?: string;
};

const CHART = {
  width: 280,
  height: 140,
  left: 28,
  right: 268,
  top: 16,
  bottom: 120,
  baselineY: 108,
} as const;

/** Traditional: tall early investment bars, flat ROI then slow climb */
const TRADITIONAL_BARS = [
  { x: 48, height: 72 },
  { x: 88, height: 58 },
  { x: 128, height: 44 },
  { x: 168, height: 28 },
  { x: 208, height: 22 },
];

const TRADITIONAL_ROI =
  "M28,108 C60,108 72,106 96,102 C120,98 140,94 168,88 C192,82 216,74 240,62 C252,56 260,48 268,38";

/** Stamped: moderate pilot bar, low subscription bars, faster ROI climb + scale dot */
const STAMPED_BARS = [
  { x: 68, height: 38 },
  { x: 108, height: 14 },
  { x: 148, height: 14 },
  { x: 188, height: 14 },
  { x: 228, height: 14 },
];

const STAMPED_ROI =
  "M28,108 C52,108 68,104 88,96 C108,88 128,78 152,64 C176,50 200,36 224,24 C244,16 258,10 268,6";

const SCALE_DOT = { cx: 188, cy: 64 };

export function InvestmentRoiChart({ variant, className }: InvestmentRoiChartProps) {
  const isTraditional = variant === "traditional";
  const bars = isTraditional ? TRADITIONAL_BARS : STAMPED_BARS;
  const roiPath = isTraditional ? TRADITIONAL_ROI : STAMPED_ROI;

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
    >
      <title>
        {isTraditional ? "Traditional approach investment and ROI" : "Stamped approach investment and ROI"}
      </title>

      {/* Grid lines */}
      {[88, 68, 48].map((y) => (
        <line
          key={y}
          x1={CHART.left}
          y1={y}
          x2={CHART.right}
          y2={y}
          stroke="var(--brand-outline-variant)"
          strokeOpacity={0.35}
          strokeWidth={1}
        />
      ))}

      {/* Baseline */}
      <line
        x1={CHART.left}
        y1={CHART.baselineY}
        x2={CHART.right}
        y2={CHART.baselineY}
        stroke="var(--brand-outline-variant)"
        strokeOpacity={0.5}
        strokeWidth={1}
      />

      {/* Investment bars */}
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x - 12}
          y={CHART.baselineY - bar.height}
          width={24}
          height={bar.height}
          rx={3}
          fill="var(--brand-secondary)"
          fillOpacity={isTraditional ? 0.85 : 0.65}
        />
      ))}

      {/* ROI line */}
      <path
        d={roiPath}
        fill="none"
        stroke="var(--brand-primary)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Scale marker - Stamped only */}
      {!isTraditional ? (
        <>
          <circle
            cx={SCALE_DOT.cx}
            cy={SCALE_DOT.cy}
            r={10}
            fill="var(--brand-primary)"
            fillOpacity={0.15}
          />
          <circle cx={SCALE_DOT.cx} cy={SCALE_DOT.cy} r={5} fill="var(--brand-primary)" />
        </>
      ) : null}
    </svg>
  );
}
