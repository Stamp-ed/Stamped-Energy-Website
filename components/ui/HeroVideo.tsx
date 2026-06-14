"use client";

import { useMotion } from "@/components/motion/MotionProvider";

interface HeroVideoProps {
  webm: string;
  poster: string;
  label: string;
}

/** Autoplaying hero loop — WebM only. Poster stays as a permanent base layer. */
export function HeroVideo({ webm, poster, label }: HeroVideoProps) {
  const { prefersReducedMotion } = useMotion();

  const mediaClassName = "absolute inset-0 h-full w-full object-contain object-center";

  if (prefersReducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt={label} className={mediaClassName} />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`${mediaClassName} z-0`}
        decoding="async"
      />
      <video
        className={`${mediaClassName} z-10 bg-transparent`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={label}
        src={webm}
      />
    </>
  );
}
