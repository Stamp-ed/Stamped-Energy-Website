import type { Metadata } from "next";

import { ContactPageView } from "@/components/contact/ContactPageView";
import { buildPageMetadata } from "@/lib/seo/metadata";

const CONTACT_DESCRIPTION =
  "Book a discovery call with Stamped Energy. 30 minutes, no slideware - we'll review your plant data and outline a low-risk energy pilot.";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: CONTACT_DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageView />;
}
