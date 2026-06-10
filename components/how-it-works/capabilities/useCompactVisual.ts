"use client";

import { useEffect, useState } from "react";

/** Matches capability card breakpoints — compact sizing below md. */
export function useCompactVisual(query = "(max-width: 767px)") {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return compact;
}
