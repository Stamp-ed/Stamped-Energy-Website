import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerLinks, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-secondary text-on-secondary">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-on-secondary/75">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-block text-sm text-inverse-primary transition-colors hover:text-on-secondary"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-on-secondary/10 pt-6 text-sm text-on-secondary/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
