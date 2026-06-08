import { DiagramCard, DiagramShell } from "./DiagramShell";

const statuses = ["Open", "In Progress", "Completed"];

export function ExecuteDiagram() {
  return (
    <DiagramShell diagram="execute" eyebrow="Action delivery & tracking" stageClassName="justify-center">
      <div className="grid h-full grid-cols-2 items-center gap-4 md:gap-5">
        <DiagramCard animate="item" className="h-full">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            WhatsApp alert
          </p>
          <p className="mt-2 text-[11px] leading-snug text-on-surface md:text-xs">
            New prescription: Stagger Compressor 1 startup. Est. ₹38K/mo. Tap to acknowledge.
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
