import type { NavLink } from "./types";

export const siteConfig = {
  name: "Stamped Energy",
  tagline: "Precision energy intelligence. Verified savings. Built for manufacturers.",
  description:
    "Prescriptive energy software for Indian auto component manufacturers. Connect existing meters and SCADA, get rupee-denominated fixes for your team, verify savings on the next electricity bill.",
  blogUrl: "/blog",
  contactEmail: "hello@stampedenergy.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries", megaMenu: "industries" },
  { label: "Blog", href: siteConfig.blogUrl },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
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
    { label: "Contact", href: "#contact" },
  ],
} as const;
