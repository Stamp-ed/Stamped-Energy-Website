import type { Metadata } from "next";

import { IndustriesHubPage } from "@/components/industries/IndustriesHubPage";
import { industriesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: industriesContent.hub.description,
};

export default function IndustriesPage() {
  return <IndustriesHubPage />;
}
