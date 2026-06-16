"use client";

import { useEffect, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";

interface HeroVideoProps {
  webm: string;
  poster: string;
  label: string;
}

const VISIBILITY_THRESHOLD = 0.4;

/** Hero loop video — plays when ≥40% visible, pauses when off-screen or below threshold. */
export function HeroVideo({ webm, poster, label }: HeroVideoProps) {
  const { prefersReducedMotion } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= VISIBILITY_THRESHOLD) {
          void video.play().catch(() => {
            /* Autoplay may be blocked until user gesture */
          });
        } else {
          video.pause();
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 1] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const mediaClassName = "absolute inset-0 h-full w-full object-contain object-center";

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt={label} className={mediaClassName} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`${mediaClassName} z-0`}
        decoding="async"
      />
      <video
        ref={videoRef}
        className={`${mediaClassName} z-10 bg-transparent`}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
        src={webm}
      />
    </div>
  );
}
