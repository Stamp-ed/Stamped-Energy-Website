/** True when the src is an absolute http(s) URL (not a site-relative path). */
export function isRemoteImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}
