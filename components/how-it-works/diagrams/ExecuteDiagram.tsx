const statuses = ["Open", "In Progress", "Completed"];

export function ExecuteDiagram() {
  return (
    <div
      data-diagram="execute"
      className="relative flex aspect-[4/3] w-full min-h-[300px] items-center gap-5 rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[360px] md:gap-7 md:p-6"
    >
      <div
        data-animate="phone"
        className="w-[44%] max-w-[168px] shrink-0 rounded-2xl border-2 border-outline-variant bg-surface-low p-3 shadow-md"
      >
        <p className="text-[10px] font-semibold text-on-surface-variant">WhatsApp</p>
        <div className="mt-2 rounded-lg bg-[#dcf8c6] p-2.5 text-[10px] leading-snug text-on-surface">
          New prescription: Stagger Compressor 1 startup. Est. ₹38K/mo. Tap to acknowledge.
        </div>
      </div>

      <div data-animate="tracker" className="min-w-0 flex-1 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          Workflow status
        </p>
        {statuses.map((status, index) => (
          <div
            key={status}
            data-animate="status"
            className="flex items-center gap-2.5 rounded-lg border border-outline-variant/50 bg-surface-low px-3 py-2"
          >
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                index === 2 ? "bg-primary" : index === 1 ? "bg-tertiary" : "bg-outline-variant"
              }`}
            />
            <span className="text-sm text-on-surface">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
