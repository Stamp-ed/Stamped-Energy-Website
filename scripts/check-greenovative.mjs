const res = await fetch("https://greenovative.com/platform/");
const html = await res.text();

const libs = [
  "gsap",
  "ScrollTrigger",
  "webflow",
  "lenis",
  "framer",
  "aos",
  "splide",
  "swiper",
  "locomotive",
];

for (const lib of libs) {
  if (html.toLowerCase().includes(lib.toLowerCase())) {
    console.log("found:", lib);
  }
}

const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)].map((m) => m[1]);
console.log("script count:", scripts.length);
console.log(scripts.slice(0, 25).join("\n"));
