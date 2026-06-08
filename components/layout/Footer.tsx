import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerLinks, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-inverse-surface text-inverse-on-surface">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-inverse-on-surface/75">
              {siteConfig.tagline}
            </p>
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
                      className="text-sm text-inverse-on-surface/80 transition-colors hover:text-inverse-on-surface"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-inverse-on-surface/80 transition-colors hover:text-inverse-on-surface"
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
                    className="text-sm text-inverse-on-surface/80 transition-colors hover:text-inverse-on-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-inverse-on-surface/10 pt-6 text-sm text-inverse-on-surface/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
