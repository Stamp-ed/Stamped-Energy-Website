"use client";

import { useRef } from "react";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BlogPostListItem } from "@/lib/blog/posts";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type BlogRelatedArticlesProps = {
  posts: BlogPostListItem[];
};

export function BlogRelatedArticles({ posts }: BlogRelatedArticlesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || posts.length === 0) {
        return;
      }

      gsap.from("[data-blog-related]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
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
    <section ref={sectionRef} className="border-t border-outline-variant/40 bg-surface-low py-8 md:section-y">
      <Container>
        <SectionHeading
          eyebrow="Keep reading"
          title="Related articles"
          description="More perspectives from the same topic area."
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mx-auto mt-6 grid max-w-6xl gap-4 sm:gap-5 md:mt-12 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} dataAttr="data-blog-related" />
          ))}
        </div>
      </Container>
    </section>
  );
}
