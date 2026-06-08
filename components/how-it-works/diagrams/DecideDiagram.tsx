const fields = [
  { label: "What", value: "Stagger compressor and press startup" },
  { label: "Why", value: "Simultaneous start caused MD spike" },
  { label: "Impact", value: "₹38,000 / month" },
];

export function DecideDiagram() {
  return (
    <div
      data-diagram="decide"
      className="relative flex aspect-[4/3] w-full min-h-[280px] flex-col justify-center rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[320px] md:p-6"
    >
      <p
        data-animate="header"
        className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
      >
        Prescription generated
      </p>

      <div className="mt-3 space-y-2.5">
        {fields.map((field) => (
          <div
            key={field.label}
            data-animate="field"
            className="rounded-lg border border-outline-variant/50 bg-surface-low px-3.5 py-2.5 md:px-4 md:py-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              {field.label}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-on-surface">
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div
        data-animate="badge"
        className="mt-3 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-on-secondary"
      >
        Priority: High · Effort: Low
      </div>
    </div>
  );
}
