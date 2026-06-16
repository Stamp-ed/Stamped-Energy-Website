import type { MetadataRoute } from "next";

import { crawlerAllowRules } from "@/lib/seo/crawlers";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlerAllowRules(),
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
