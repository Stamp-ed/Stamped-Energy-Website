"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { formatBlogDate } from "@/lib/blog/utils";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type BlogFeaturedProps = {
  posts: BlogPostListItem[];
};

export function BlogFeatured({ posts }: BlogFeaturedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || posts.length === 0) {
        return;
      }

      gsap.from("[data-blog-featured]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion, posts.length] },
  );

  if (posts.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface py-10 md:section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Featured"
            title="Latest perspectives"
            description="Shift-start MD, furnace holding, compressor waste, practical notes for plant heads."
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="mt-6 grid gap-4 sm:gap-5 md:mt-10 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              data-blog-featured
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-secondary/10 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                    {post.categoryLabel}
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-secondary">
                  {post.categoryLabel}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {formatBlogDate(post.publishedAt)} · {post.readTimeMin} min read
                </p>
                <h3 className="mt-1 text-base font-bold leading-snug text-on-surface group-hover:text-primary md:text-lg">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-on-surface-variant line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 text-sm font-semibold text-primary">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
