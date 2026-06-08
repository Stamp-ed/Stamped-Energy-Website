import type { NavLink } from "./types";

export const siteConfig = {
  name: "Stamped Energy",
  tagline: "Precision energy intelligence. Verified savings. Built for manufacturers.",
  description:
    "Prescriptive energy intelligence for Indian manufacturers. Connect existing plant data, get rupee-denominated prescriptions, and verify savings on your next electricity bill.",
  blogUrl: "https://blog.stampedenergy.com",
  contactEmail: "hello@stampedenergy.com",
} as const;

export const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: siteConfig.blogUrl, external: true },
];

export const footerLinks = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Industries", href: "/industries" },
    { label: "Blog", href: siteConfig.blogUrl, external: true },
  ],
  company: [
    { label: "Contact", href: "#contact" },
  ],
} as const;
