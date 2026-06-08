import { DiagramCard, DiagramShell } from "./DiagramShell";

const statuses = ["Open", "In Progress", "Completed"];

export function ExecuteDiagram() {
  return (
    <DiagramShell diagram="execute" eyebrow="Action delivery & tracking" stageClassName="justify-center">
      <div className="grid h-full grid-cols-2 items-center gap-4 md:gap-5">
        <DiagramCard animate="item" className="h-full">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              WhatsApp alert
            </p>
            <p className="text-[9px] text-on-surface-variant">Shift B · 06:42</p>
          </div>

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant">
            New prescription assigned
          </p>
          <p className="mt-1 text-[11px] font-bold leading-snug text-on-surface md:text-xs">
            Stagger Compressor 1 & Press Line 3 startup
          </p>

          <p className="mt-2 text-[11px] leading-snug text-on-surface md:text-xs">
            <span className="font-semibold text-on-surface">Why:</span> Simultaneous start caused
            MD spike at shift handover.
          </p>
          <p className="mt-1.5 text-[11px] leading-snug text-on-surface md:text-xs">
            <span className="font-semibold text-on-surface">Impact:</span>{" "}
            <span className="font-bold text-primary">₹38K / month</span> potential savings
          </p>
          <p className="mt-1.5 text-[11px] leading-snug text-on-surface md:text-xs">
            <span className="font-semibold text-on-surface">Owner:</span> Plant Supervisor ·{" "}
            <span className="font-semibold text-on-surface">Due:</span> Today, 14:00
          </p>

          <p className="mt-2.5 rounded-md border border-primary/20 bg-primary/8 px-2 py-1.5 text-[10px] font-semibold text-primary md:text-[11px]">
            Tap to acknowledge →
          </p>
        </DiagramCard>

        <div className="space-y-2">
          <p
            data-animate="accent"
            className="text-[10px] font-semibold uppercase tracking-wider text-primary"
          >
            Workflow status
          </p>
          {statuses.map((status, index) => (
            <DiagramCard
              key={status}
              animate="item"
              className="flex items-center gap-2.5 py-2 md:py-2.5"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  index === 2 ? "bg-primary" : index === 1 ? "bg-tertiary" : "bg-outline-variant"
                }`}
              />
              <span className="text-sm text-on-surface">{status}</span>
            </DiagramCard>
          ))}
        </div>
      </div>
    </DiagramShell>
  );
}
