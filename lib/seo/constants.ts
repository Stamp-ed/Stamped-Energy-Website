import { SITE_ORIGIN } from "@/lib/config/admin-host";

export const SITE_URL = SITE_ORIGIN.replace(/\/$/, "");

export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";

export const DEFAULT_OG_IMAGE = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;

export const DEFAULT_OG_IMAGE_ALT =
  "Stamped Energy — Prescriptive Energy Intelligence for Indian Manufacturers";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const WEBSITE_ID = `${SITE_URL}/#website`;

export const GEO_METADATA = {
  "geo.region": "IN",
  "geo.placename": "India",
  "content-language": "en-IN",
} as const;

/** Primary and secondary target keywords for metadata `keywords` field. */
export const SEO_KEYWORDS = [
  "stamped energy",
  "prescriptive energy intelligence India",
  "energy management software for manufacturers India",
  "reduce electricity bill manufacturing India",
  "maximum demand reduction India",
  "energy cost reduction auto component manufacturers",
  "DISCOM bill savings India",
  "SEC reduction manufacturing India",
] as const;
