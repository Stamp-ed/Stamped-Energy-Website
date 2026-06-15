"use client";

import { useEffect, useState } from "react";

/** Matches capability card breakpoints - compact sizing below md. */
export function useCompactVisual(query = "(max-width: 767px)") {
  const [compact, setCompact] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setCompact(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return compact;
}
