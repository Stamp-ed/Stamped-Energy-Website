/**
 * Join class names, dropping falsy values. Keeps component markup tidy
 * without pulling in an extra dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
