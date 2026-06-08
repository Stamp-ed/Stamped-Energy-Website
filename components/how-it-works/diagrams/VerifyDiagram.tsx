import { DiagramCallout, DiagramShell } from "./DiagramShell";

export function VerifyDiagram() {
  return (
    <DiagramShell
      diagram="verify"
      eyebrow="Potential vs. realized"
      footer={
        <DiagramCallout>
          Running ledger: <span className="font-bold text-on-surface">₹2.1L verified</span> since
          deployment
        </DiagramCallout>
      }
      stageClassName="justify-end"
    >
      <div className="flex flex-1 items-end justify-center gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-28 items-end md:h-32">
            <div
              data-animate="item"
              className="w-14 rounded-t-md border border-outline-variant/40 bg-outline-variant/35 md:w-[4.5rem]"
              style={{ height: "100%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Potential</p>
          <p className="text-sm font-bold text-on-surface md:text-base">₹38K</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-28 items-end md:h-32">
            <div
              data-animate="accent"
              className="w-14 rounded-t-md border border-primary/30 bg-primary md:w-[4.5rem]"
              style={{ height: "82%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Realized</p>
          <p className="text-sm font-bold text-primary md:text-base">₹34K</p>
        </div>
      </div>
    </DiagramShell>
  );
}
