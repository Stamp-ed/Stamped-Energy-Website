/** Viewport offset where pinned sections lock — heading scrolls above, stage stays put. */
export const PIN_LOCK_OFFSET_PX = 200;

export function getPinScrollStart(offsetPx = PIN_LOCK_OFFSET_PX): string {
  return `top ${offsetPx}px`;
}
