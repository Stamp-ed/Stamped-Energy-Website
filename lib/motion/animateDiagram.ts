import { gsap } from "@/lib/motion/gsap";

export function animateDiagramPanel(panel: HTMLElement): void {
  const diagram = panel.querySelector<HTMLElement>("[data-diagram]");
  if (!diagram) {
    return;
  }

  const type = diagram.dataset.diagram;

  const animatedTargets = diagram.querySelectorAll("[data-animate]");
  gsap.killTweensOf(animatedTargets);

  if (type !== "verify") {
    gsap.set(animatedTargets, { clearProps: "all" });
  }

  if (type === "connect") {
    gsap.fromTo(
      diagram.querySelectorAll("[data-animate='node']"),
      { autoAlpha: 0, x: -16 },
      { autoAlpha: 1, x: 0, stagger: 0.09, duration: 0.45, ease: "power2.out" },
    );
    gsap.fromTo(
      diagram.querySelectorAll("[data-animate='line']"),
      { strokeDashoffset: 120, autoAlpha: 0 },
      { strokeDashoffset: 0, autoAlpha: 1, stagger: 0.07, duration: 0.55, ease: "power2.out", delay: 0.1 },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='hub']"),
      { scale: 0.88, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.5, ease: "back.out(1.4)", delay: 0.3 },
    );
    return;
  }

  if (type === "observe") {
    gsap.fromTo(
      diagram.querySelector("[data-animate='label']"),
      { autoAlpha: 0, y: -6 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='baseline']"),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='actual']"),
      { strokeDasharray: 400, strokeDashoffset: 400 },
      { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", delay: 0.15 },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='anomaly']"),
      { scale: 0, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)", delay: 0.9 },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='callout']"),
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, delay: 1.1 },
    );
    return;
  }

  if (type === "decide") {
    gsap.fromTo(
      diagram.querySelector("[data-animate='header']"),
      { autoAlpha: 0, y: -6 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
    );
    gsap.fromTo(
      diagram.querySelectorAll("[data-animate='field']"),
      { autoAlpha: 0, x: 20 },
      { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.42, ease: "power2.out", delay: 0.08 },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='badge']"),
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.35, delay: 0.5 },
    );
    return;
  }

  if (type === "execute") {
    gsap.fromTo(
      diagram.querySelector("[data-animate='phone']"),
      { autoAlpha: 0, x: -18, rotate: -3 },
      { autoAlpha: 1, x: 0, rotate: 0, duration: 0.5, ease: "power2.out" },
    );
    gsap.fromTo(
      diagram.querySelector("[data-animate='tracker']"),
      { autoAlpha: 0, x: 14 },
      { autoAlpha: 1, x: 0, duration: 0.45, ease: "power2.out", delay: 0.12 },
    );
    gsap.fromTo(
      diagram.querySelectorAll("[data-animate='status']"),
      { autoAlpha: 0, x: 12 },
      { autoAlpha: 1, x: 0, stagger: 0.08, duration: 0.35, delay: 0.22 },
    );
    return;
  }

  if (type === "verify") {
    const potential = diagram.querySelector<HTMLElement>("[data-animate='bar-potential']");
    const realized = diagram.querySelector<HTMLElement>("[data-animate='bar-realized']");
    const ledger = diagram.querySelector<HTMLElement>("[data-animate='ledger']");
    const label = diagram.querySelector<HTMLElement>("[data-animate='label']");

    gsap.set([potential, realized], {
      scaleY: 1,
      transformOrigin: "bottom center",
      autoAlpha: 1,
    });
    gsap.set(ledger, { autoAlpha: 1, y: 0 });
    gsap.set(label, { autoAlpha: 1, y: 0 });

    gsap.fromTo(
      label,
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
    gsap.fromTo(
      potential,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 0.65, ease: "power2.out", delay: 0.05 },
    );
    gsap.fromTo(
      realized,
      { scaleY: 0, transformOrigin: "bottom center" },
      { scaleY: 1, duration: 0.65, ease: "power2.out", delay: 0.25 },
    );
    gsap.fromTo(
      ledger,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.5 },
    );
  }
}
