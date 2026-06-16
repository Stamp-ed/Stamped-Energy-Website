"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ArticleAuthorCard } from "@/components/blog/ArticleAuthorCard";
import { RichArticleBody } from "@/components/rich-content/RichArticleBody";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import type { BlogPostDTO, BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type BlogArticleViewProps = {
  post: BlogPostDTO;
  related: BlogPostListItem[];
};

const BLOG_CTA = {
  eyebrow: "See it on your plant",
  title: "Turn insights into verified savings",
  description:
    "Book a discovery call. We connect to existing plant data and verify savings on your next electricity bill.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
};

/** Main column + sidebar — matches site container width without extra centering gutters. */
const ARTICLE_LAYOUT =
  "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(17.5rem,20rem)] lg:items-start lg:gap-12 xl:gap-14";

export function BlogArticleView({ post, related }: BlogArticleViewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-blog-article]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <>
      <section className="border-b border-outline-variant/40 bg-surface pt-28 pb-10 md:pt-32 md:pb-14">
        <Container>
          <div className={ARTICLE_LAYOUT}>
            <div data-blog-article className="min-w-0">
              <Link
                href="/blog"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant hover:text-primary"
              >
                ← All blogs
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
                <span className="rounded-full bg-secondary-container px-2.5 py-1 font-semibold uppercase tracking-wide text-on-secondary-container">
                  {post.categoryLabel}
                </span>
                <span>
                  {formatBlogDate(post.publishedAt)} · {post.readTimeMin} min read · {post.author.name}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-on-surface">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-on-surface-variant md:text-xl md:leading-9">
                {post.excerpt}
              </p>
              {post.tags.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-outline-variant/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      {post.coverImage ? (
        <section className="bg-surface pb-8">
          <Container>
            <div className={ARTICLE_LAYOUT}>
              <div data-blog-article className="min-w-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, calc(100vw - 22rem)"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section ref={sectionRef} className="section-y bg-surface pb-20">
        <Container>
          <div className={ARTICLE_LAYOUT}>
            <article data-blog-article className="min-w-0">
              <RichArticleBody
                contentFormat={post.contentFormat}
                bodyJson={post.bodyJson}
                content={post.content}
                className="blog-article-prose"
              />
            </article>

            <aside data-blog-article className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <ArticleAuthorCard author={post.author} />

              {related.length > 0 ? (
                <div className="rounded-2xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm">
                  <p className="text-sm font-bold text-on-surface">More to read</p>
                  <ul className="mt-4 space-y-4">
                    {related.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className="group block text-sm font-semibold leading-6 text-on-surface hover:text-primary"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs text-on-surface-variant">
                          {formatBlogDate(item.publishedAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-outline-variant/40 bg-surface-low section-y">
        <Container>
          <div className={ARTICLE_LAYOUT}>
            <div className="min-w-0 lg:col-span-1">
              <h2 className="font-display text-2xl font-extrabold text-on-surface">
                Related Articles
              </h2>
              <ul className="mt-6 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-base font-semibold leading-7 text-on-surface hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/industries/automotive#die-casting"
                    className="text-base font-semibold leading-7 text-on-surface hover:text-primary"
                  >
                    Auto component energy cost reduction — die casting, forging, heat treatment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-base font-semibold leading-7 text-on-surface hover:text-primary"
                  >
                    See how Stamped Energy closes the loop on verified DISCOM bill savings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <IndustryPageCta content={BLOG_CTA} />
    </>
  );
}
