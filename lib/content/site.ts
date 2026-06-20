import type { NavLink } from "./types";

export const siteConfig = {
  name: "Stamped Energy",
  tagline: "Precision energy intelligence. Verified savings. Built for manufacturers.",
  description:
    "Prescriptive energy intelligence for Indian manufacturers. Connect existing meters, SCADA, and bills — get rupee-denominated prescriptions verified on your next DISCOM bill.",
  blogUrl: "/blog",
  contactEmail: "contact@stamped.work",
} as const;

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Blog", href: siteConfig.blogUrl },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: siteConfig.blogUrl },
  ],
  company: [
    { label: "Case Studies", href: "/case-studies" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
