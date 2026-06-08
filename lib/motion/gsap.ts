"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGsap(): void {
  if (isRegistered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  gsap.defaults({
    duration: 0.8,
    ease: "power3.out",
  });

  isRegistered = true;
}

export { gsap, ScrollTrigger, useGSAP };
