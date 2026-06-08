export function VerifyDiagram() {
  return (
    <div
      data-diagram="verify"
      className="relative flex aspect-[4/3] w-full min-h-[280px] flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:min-h-[320px] md:p-6"
    >
      <p
        data-animate="label"
        className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary md:text-sm"
      >
        Potential vs. realized
      </p>

      <div className="mt-4 flex flex-1 items-end justify-center gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-28 items-end md:h-32">
            <div
              data-animate="bar-potential"
              className="w-14 rounded-t-md bg-outline-variant/50 md:w-[4.5rem]"
              style={{ height: "100%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Potential</p>
          <p className="text-sm font-bold text-on-surface md:text-base">₹38K</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-28 items-end md:h-32">
            <div
              data-animate="bar-realized"
              className="w-14 rounded-t-md bg-primary md:w-[4.5rem]"
              style={{ height: "82%" }}
            />
          </div>
          <p className="text-xs font-medium text-on-surface-variant md:text-sm">Realized</p>
          <p className="text-sm font-bold text-primary md:text-base">₹34K</p>
        </div>
      </div>

      <p
        data-animate="ledger"
        className="mt-4 shrink-0 text-center text-xs text-on-surface-variant md:text-sm"
      >
        Running ledger:{" "}
        <span className="font-bold text-on-surface">₹2.1L verified</span> since deployment
      </p>
    </div>
  );
}
