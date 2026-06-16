import Image from "next/image";

export function HeroIsometricVisual() {
  return (
    <div
      data-hero-animate="visual"
      className="relative min-w-0 lg:flex lg:justify-end lg:items-center"
      aria-hidden
    >
      <div className="relative mx-auto w-full max-w-[640px] sm:max-w-[720px] lg:mx-0 lg:w-[118%] lg:max-w-none xl:w-[128%] 2xl:w-[135%]">
        <Image
          src="/images/hero/energy-facility-isometric.png"
          alt=""
          width={2048}
          height={1152}
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="h-auto w-full object-contain"
        />
      </div>
    </div>
  );
}
