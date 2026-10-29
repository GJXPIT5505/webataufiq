import HeroOrbit, { DEFAULT_ORBIT, MOBILE_DEFAULT_ORBIT } from "./HeroOrbit";
import MoroccanPattern from "./MoroccanPattern";

const NAVY = "16, 35, 128";

const EDGE_VIGNETTE = [
  `linear-gradient(to bottom, rgba(${NAVY},0.85) 0%, rgba(${NAVY},0) 32%)`,
  `linear-gradient(to top, rgba(${NAVY},0.88) 0%, rgba(${NAVY},0) 42%)`,
  `linear-gradient(to right, rgba(${NAVY},0.75) 0%, rgba(${NAVY},0) 40%)`,
  `linear-gradient(to left, rgba(${NAVY},0.5) 0%, rgba(${NAVY},0) 28%)`,
  `radial-gradient(ellipse 65% 60% at 0% 100%, rgba(${NAVY},0.5) 0%, rgba(${NAVY},0) 78%)`,
].join(", ");

const TOP_RIGHT_GLOW = `radial-gradient(ellipse 60% 65% at 100% 0%, rgba(${NAVY},0.75) 0%, rgba(${NAVY},0) 75%)`;

export default function HeroSlideContent({
  slide,
  priority = false,
  active = true,
}) {
  return (
    <>
      {/* Layer 1 — photo */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.imageAlt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      {/* Layer 2 — overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: EDGE_VIGNETTE }} />
      <div className="absolute inset-0 hidden md:block" style={{ backgroundImage: TOP_RIGHT_GLOW }} />
      <div className="absolute inset-0 bg-navy/45 md:hidden" />

      {/* Layer 3 — decorative orbit + sun dots */}
      <HeroOrbit orbit={slide.orbit ?? DEFAULT_ORBIT} className="hidden md:block" />
      <HeroOrbit orbit={slide.mobileOrbit ?? MOBILE_DEFAULT_ORBIT} className="opacity-45 md:hidden" />

      {/* Layer 4 — Moroccan lattice */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-40 w-40 opacity-35 md:h-64 md:w-64 md:opacity-45 lg:h-80 lg:w-80"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at 0% 100%, black 0%, black 55%, transparent 85%)",
        }}
      >
        <MoroccanPattern className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-10 h-40 w-40 opacity-35 md:h-64 md:w-64 md:opacity-45 lg:h-80 lg:w-80"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at 100% 0%, black 0%, black 55%, transparent 85%)",
        }}
      >
        <MoroccanPattern className="h-full w-full" />
      </div>

      {/* Layer 5 — heading + description */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-[92px] md:px-10 md:pb-[104px]">
        <div className={`max-w-full md:max-w-[65%] lg:max-w-[60%] ${active ? "hero-in" : ""}`}>
          <h1 className="font-heading text-2xl font-bold leading-snug md:whitespace-nowrap md:text-3xl md:leading-tight lg:text-4xl xl:text-5xl">
            <span className="text-white">{slide.headingWhite} </span>
            <span className="text-gold">{slide.headingGold}</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
            {slide.description}
          </p>
        </div>
      </div>
    </>
  );
}
