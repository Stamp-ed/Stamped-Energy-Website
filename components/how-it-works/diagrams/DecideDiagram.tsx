import { DiagramBadge, DiagramCard, DiagramShell } from "./DiagramShell";

const fields = [
  { label: "What", value: "Stagger compressor and press startup" },
  { label: "Why", value: "Simultaneous start caused MD spike" },
  { label: "Impact", value: "₹2.5-4L / month" },
];

export function DecideDiagram() {
  return (
    <DiagramShell
      diagram="decide"
      eyebrow="Prescription generated"
      footer={<DiagramBadge>Priority: High · Effort: Low</DiagramBadge>}
      stageClassName="justify-center"
    >
      <div className="space-y-2.5">
        {fields.map((field) => (
          <DiagramCard key={field.label} animate="item">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              {field.label}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug text-on-surface">{field.value}</p>
          </DiagramCard>
        ))}
      </div>
    </DiagramShell>
  );
}
