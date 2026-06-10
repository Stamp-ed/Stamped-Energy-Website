import { DiagramCallout, DiagramShell } from "./DiagramShell";

export function VerifyDiagram() {
  return (
    <DiagramShell
      diagram="verify"
      eyebrow="Potential vs. realized"
      footer={
        <DiagramCallout>
          Running ledger: <span className="font-bold text-on-surface">₹14L verified</span> since
          deployment
        </DiagramCallout>
      }
      stageClassName="justify-end"
    >
      <div className="flex flex-1 items-end justify-center gap-6 sm:gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-24 items-end sm:h-28 md:h-32">
            <div
              data-animate="item"
              className="w-10 rounded-t-md border border-outline-variant/40 bg-outline-variant/35 sm:w-14 md:w-[4.5rem]"
              style={{ height: "100%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Potential / month</p>
          <p className="text-sm font-bold text-on-surface md:text-base">₹4L</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-24 items-end sm:h-28 md:h-32">
            <div
              data-animate="accent"
              className="w-10 rounded-t-md border border-primary/30 bg-primary sm:w-14 md:w-[4.5rem]"
              style={{ height: "82%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Realized / month</p>
          <p className="text-sm font-bold text-primary md:text-base">₹3.4L</p>
        </div>
      </div>
    </DiagramShell>
  );
}
