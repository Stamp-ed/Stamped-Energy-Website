/**
 * Pages with a dark hero under the fixed navbar use light/white link text.
 * Pages with a light surface hero use grey link text (default).
 */
const DARK_HERO_EXACT = new Set(["/blog", "/about", "/case-studies", "/contact"]);

const DARK_HERO_PREFIXES = ["/industries", "/case-studies/"];

/** Article and other light-background pages under /blog */
const LIGHT_HERO_PREFIXES = ["/blog/"];

export function usesLightNavText(pathname: string): boolean {
  if (LIGHT_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }

  if (DARK_HERO_EXACT.has(pathname)) {
    return true;
  }

  return DARK_HERO_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
