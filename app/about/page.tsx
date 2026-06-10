import type { Metadata } from "next";

import { AboutPageView } from "@/components/about/AboutPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

const ABOUT_DESCRIPTION =
  "Stamped Energy, software for plant heads who need verified rupee savings on the electricity bill, not another monitoring dashboard.";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description: ABOUT_DESCRIPTION,
  path: "/about",
});

export default function AboutRoute() {
  return <AboutPageView />;
}
