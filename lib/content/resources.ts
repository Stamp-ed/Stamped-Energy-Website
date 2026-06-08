import type { ResourceCard } from "./types";

const RESOURCE_IMAGES = {
  dieCasting: "/industries/die-casting.jpeg",
  forging: "/industries/forging.jpg",
  heatTreatment: "/industries/heat-treatment.webp",
} as const;

export const resourcesContent = {
  eyebrow: "Proof & insights",
  title: "Case studies & industry insights",
  description:
    "Published outcomes and field notes from energy-intensive manufacturing — starting with automotive-adjacent process plants.",
  items: [
    {
      id: "auto-case-placeholder",
      type: "case-study",
      title: "Automotive & pump manufacturing: 18% SEC reduction",
      description:
        "16 verified measures across compressors, furnaces, and shift-start sequencing — IPMVP-style M&V with ₹34L+ monthly energy savings (reference benchmark).",
      href: "/case-studies",
      tag: "Case study — coming soon",
      imageSrc: RESOURCE_IMAGES.forging,
      imageAlt: "Automotive component manufacturing facility",
    },
    {
      id: "die-cast-blog",
      type: "blog",
      title: "Why shift-start kills die casting margins",
      description:
        "Furnace pre-heat overlap, holding loads, and the MD spike your incomer meter sees every morning.",
      href: "https://blog.stampedenergy.com",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.dieCasting,
      imageAlt: "Die casting molten metal process",
    },
    {
      id: "ht-blog",
      type: "blog",
      title: "Weekend furnace holding: the silent cost",
      description:
        "How batch heat treatment plants lose 15–25% of furnace energy with no parts scheduled.",
      href: "https://blog.stampedenergy.com",
      tag: "Blog",
      imageSrc: RESOURCE_IMAGES.heatTreatment,
      imageAlt: "Industrial heat treatment furnace",
    },
  ] satisfies ResourceCard[],
} as const;
