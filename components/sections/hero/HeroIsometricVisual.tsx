import Image from "next/image";

export function HeroIsometricVisual() {
  return (
    <div
      data-hero-animate="visual"
      className="relative mx-auto w-full max-w-[720px] lg:max-w-none"
      aria-hidden
    >
      <Image
        src="/images/hero/energy-facility-isometric.png"
        alt=""
        width={1024}
        height={576}
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
