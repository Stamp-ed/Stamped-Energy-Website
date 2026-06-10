"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { contactContent } from "@/lib/content/contact";
import { siteConfig } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function ContactPageView() {
  const formRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const { hero, stats, pilotSection, formSection, quickContact, onSite, office } = contactContent;

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-contact-reveal]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: formRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <>
      <section className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-secondary">
        <div className="absolute inset-0">
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--brand-secondary)_92%,transparent)_0%,color-mix(in_srgb,var(--brand-secondary)_78%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,color-mix(in_srgb,var(--brand-primary)_18%,transparent),transparent_55%)]" />
        </div>

        <Container className="relative z-10">
          <p data-contact-reveal className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
            {hero.eyebrow}
          </p>
          <h1
            data-contact-reveal
            className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-on-secondary md:text-4xl lg:text-[2.75rem]"
          >
            {hero.title}
          </h1>
          <p data-contact-reveal className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/85 md:text-base">
            {hero.description}
          </p>

          <dl
            data-contact-reveal
            className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3 md:mt-10"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-xl border border-on-secondary/15 bg-on-secondary/5 px-4 py-3"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-on-secondary/70">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-base font-bold text-inverse-primary md:text-lg">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section ref={formRef} id="contact-form" className="scroll-mt-24 bg-surface section-y md:scroll-mt-28">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {formSection.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-on-surface md:text-3xl">
                  {formSection.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                  {formSection.description}
                </p>
              </Reveal>

              <Reveal from="left" className="mt-8">
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm sm:p-6 md:p-8">
                  <h3 className="text-lg font-bold text-on-surface">{contactContent.contactForm.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {contactContent.contactForm.description}
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <Reveal from="right">
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-low p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    {quickContact.eyebrow}
                  </p>
                  <a
                    href={`mailto:${quickContact.email}`}
                    className="mt-3 block text-base font-bold text-primary transition-colors hover:text-primary/80"
                  >
                    {quickContact.email}
                  </a>
                </div>
              </Reveal>

              <Reveal from="right">
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5">
                  <p className="text-sm font-bold text-on-surface">{quickContact.responseTitle}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">We get back fast.</p>
                  <ul className="mt-4 space-y-3">
                    {quickContact.responseItems.map((item) => (
                      <li key={item.label} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-on-surface-variant">{item.label}</span>
                        <span className="font-semibold text-on-surface">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal from="right">
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-low p-5">
                  <p className="text-sm font-bold text-on-surface">{onSite.title}</p>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{onSite.description}</p>
                  <Link
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    Email us to coordinate →
                  </Link>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-outline-variant/40 bg-surface-low py-10 md:section-y">
        <Container>
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {pilotSection.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-on-surface md:text-3xl">
                {pilotSection.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
                {pilotSection.description}
              </p>
            </Reveal>

            <Reveal from="right">
              <div className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  {office.eyebrow}
                </p>
                <h3 className="mt-2 text-lg font-bold text-on-surface">{office.title}</h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{office.description}</p>
                <p className="mt-4 text-sm font-semibold text-primary">{office.locationLabel}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
