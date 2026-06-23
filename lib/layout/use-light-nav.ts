"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

import {
  DARK_HERO_BODY_ATTR,
  hasDarkHeroBodyOverride,
  usesLightNavText,
} from "@/lib/layout/nav-theme";

export function useLightNavText(): boolean {
  const pathname = usePathname();
  const [hasDarkHeroOverride, setHasDarkHeroOverride] = useState(false);

  useLayoutEffect(() => {
    const sync = () => setHasDarkHeroOverride(hasDarkHeroBodyOverride());

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [DARK_HERO_BODY_ATTR],
    });

    return () => observer.disconnect();
  }, [pathname]);

  return usesLightNavText(pathname) || hasDarkHeroOverride;
}
