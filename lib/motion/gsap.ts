import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

export function registerGsap(): void {
  if (isRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  isRegistered = true;
}

export { gsap, ScrollTrigger, useGSAP };
