import type { Metadata } from "next";

import { AboutPageView } from "@/components/about/AboutPage";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Stamped Energy, software for plant heads who need verified rupee savings on the electricity bill, not another monitoring dashboard.",
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: siteConfig.description,
  },
};

export default function AboutRoute() {
  return <AboutPageView />;
}
