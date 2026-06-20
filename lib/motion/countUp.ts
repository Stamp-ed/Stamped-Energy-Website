import { gsap } from "@/lib/motion/gsap";

const RANGE_PATTERN = /^(\d+(?:\.\d+)?)\s*[--]\s*(\d+(?:\.\d+)?)\s*(.*)$/;

export function animateStatValue(
  element: HTMLElement,
  value: string,
  duration = 1.15,
): gsap.core.Tween {
  const match = value.match(RANGE_PATTERN);

  if (!match) {
    return gsap.fromTo(
      element,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
    );
  }

  const start = Number.parseFloat(match[1]);
  const end = Number.parseFloat(match[2]);
  const suffix = match[3]?.trim() ?? "";
  const suffixText = suffix ? ` ${suffix}` : "";
  const state = { current: start };

  element.textContent = `${start}-${start}${suffixText}`;

  return gsap.to(state, {
    current: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const current = Math.round(state.current);
      element.textContent = `${start}-${current}${suffixText}`;
    },
  });
}
