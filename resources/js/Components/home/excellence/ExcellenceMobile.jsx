import React, { useRef } from "react";
import {
  motion,
  transform,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import Reveal from "@/Components/home/Reveal";
import PhotoFrame from "@/Components/home/journey/PhotoFrame";
import { excellenceSlides } from "@/data/excellenceSlides";
import { EXCELLENCE_BG_SRC, EXCELLENCE_ICONS } from "./excellenceShared";

const LAST = excellenceSlides.length - 1;
const FADE = 0.08;

const ORBIT = { cx: 0.5, cy: 0.9, rx: 0.4, ry: 0.7 };
const STOP_ANGLES = excellenceSlides.map((_, i) => (i / LAST) * Math.PI);
const SUN_SIZE = 44;
const BACKDROP_OPACITY = 0.22;

function orbitPoint(theta) {
  return {
    x: ORBIT.cx + ORBIT.rx * Math.cos(theta),
    y: ORBIT.cy - ORBIT.ry * Math.sin(theta),
  };
}

function slideKeyframes(i) {
  const mid = (k) => (k + 0.5) / LAST;
  const fadeIn = i === 0 ? null : [mid(i - 1), mid(i - 1) + FADE];
  const fadeOut = i === LAST ? null : [mid(i) - FADE, mid(i)];
  if (!fadeIn) return { input: fadeOut, opacity: [1, 0], y: [0, -28] };
  if (!fadeOut) return { input: fadeIn, opacity: [0, 1], y: [28, 0] };
  return { input: [...fadeIn, ...fadeOut], opacity: [0, 1, 1, 0], y: [28, 0, 0, -28] };
}

const SLIDE_OPACITY = excellenceSlides.map((_, i) => {
  const k = slideKeyframes(i);
  return transform(k.input, k.opacity);
});
const SLIDE_Y = excellenceSlides.map((_, i) => {
  const k = slideKeyframes(i);
  return transform(k.input, k.y);
});

export default function ExcellenceMobile() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative bg-ivory">
      <div className="relative z-20 mx-auto max-w-2xl px-6 pt-16 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Keunggulan Attaufiq
          </p>
          <h2 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Fondasi kuat yang menjadi alasan orang tua percaya, dan anak-anak
            tumbuh luar biasa.
          </h2>
        </Reveal>
      </div>

      {reduceMotion ? <StaticSlides /> : <OrbitScene />}
    </section>
  );
}

function OrbitScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sunX = useTransform(scrollYProgress, (p) => `${orbitPoint(clampUnit(p) * Math.PI).x * 100}%`);
  const sunY = useTransform(scrollYProgress, (p) => `${orbitPoint(clampUnit(p) * Math.PI).y * 100}%`);
  const sunScale = useTransform(scrollYProgress, (p) => 1 + 0.08 * Math.sin(clampUnit(p) * Math.PI * LAST * 2));

  return (
    <div ref={containerRef} className="relative mt-4" style={{ height: "400svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <Backdrop progress={scrollYProgress} />

        <div className="relative flex h-full flex-col pb-5 pt-20">
          {/* Orbit */}
          <div aria-hidden="true" className="relative mx-auto h-[22%] w-full max-w-md shrink-0">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                d={`M ${(ORBIT.cx + ORBIT.rx) * 100},${ORBIT.cy * 100} A ${ORBIT.rx * 100},${ORBIT.ry * 100} 0 0,0 ${(ORBIT.cx - ORBIT.rx) * 100},${ORBIT.cy * 100}`}
                fill="none"
                stroke="#FDD000"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                vectorEffect="non-scaling-stroke"
                opacity={0.7}
              />
            </svg>
            {STOP_ANGLES.map((theta, i) => {
              const pt = orbitPoint(theta);
              return (
                <span
                  key={i}
                  className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80"
                  style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
                />
              );
            })}
            <motion.div className="absolute inset-0" style={{ x: sunX }}>
              <motion.div className="absolute inset-0" style={{ y: sunY }}>
                <motion.div
                  className="absolute left-0 top-0 rounded-full"
                  style={{
                    width: SUN_SIZE,
                    height: SUN_SIZE,
                    marginLeft: -SUN_SIZE / 2,
                    marginTop: -SUN_SIZE / 2,
                    scale: sunScale,
                    background:
                      "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                    boxShadow: "0 0 28px 8px rgba(253,208,0,0.45)",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Slides */}
          <div className="relative mx-auto w-full max-w-md flex-1">
            {excellenceSlides.map((slide, i) => (
              <Slide key={slide.title} index={i} progress={scrollYProgress} />
            ))}
          </div>

          <Dots progress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

function Slide({ index, progress }) {
  const slide = excellenceSlides[index];
  const Icon = EXCELLENCE_ICONS[slide.icon];
  const opacity = useTransform(progress, SLIDE_OPACITY[index]);
  const y = useTransform(progress, SLIDE_Y[index]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ opacity, y }}
    >
      <PhotoFrame
        src={slide.photo}
        alt={slide.title}
        className="aspect-[4/5] h-[clamp(120px,24svh,220px)]"
      />
      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/25 text-navy">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="text-left text-xl font-bold leading-tight text-navy">{slide.title}</h3>
      </div>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy/75">{slide.description}</p>
    </motion.div>
  );
}

function Backdrop({ progress }) {
  const slotOpacity = (slot, p) =>
    Math.max(0, ...excellenceSlides.map((s, i) => (s.bg === slot ? SLIDE_OPACITY[i](p) : 0))) *
    BACKDROP_OPACITY;
  const bgA = useTransform(progress, (p) => slotOpacity("a", p));
  const bgB = useTransform(progress, (p) => slotOpacity("b", p));

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <motion.div className="absolute inset-0" style={{ opacity: bgA }}>
        <img src={EXCELLENCE_BG_SRC} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: bgB }}>
        <div className="relative h-full w-full -scale-x-100">
          <img src={EXCELLENCE_BG_SRC} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-transparent to-ivory/80" />
    </div>
  );
}

function Dots({ progress }) {
  return (
    <div aria-hidden="true" className="flex shrink-0 justify-center gap-3 pt-3">
      {excellenceSlides.map((slide, i) => (
        <Dot key={slide.title} index={i} progress={progress} />
      ))}
    </div>
  );
}

function Dot({ index, progress }) {
  const opacity = useTransform(progress, SLIDE_OPACITY[index]);
  const scale = useTransform(opacity, (o) => 0.6 + 0.4 * o);
  return (
    <span className="relative block h-2.5 w-2.5 rounded-full bg-navy/20">
      <motion.span
        className="absolute -inset-0.5 rounded-full bg-gold shadow-[0_0_8px_rgba(253,208,0,0.8)]"
        style={{ opacity, scale }}
      />
    </span>
  );
}

function StaticSlides() {
  const end = orbitPoint(Math.PI);
  return (
    <div className="px-6 pb-16 pt-8">
      <div aria-hidden="true" className="relative mx-auto h-24 w-full max-w-xs">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            d={`M ${(ORBIT.cx + ORBIT.rx) * 100},${ORBIT.cy * 100} A ${ORBIT.rx * 100},${ORBIT.ry * 100} 0 0,0 ${(ORBIT.cx - ORBIT.rx) * 100},${ORBIT.cy * 100}`}
            fill="none"
            stroke="#FDD000"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            opacity={0.7}
          />
        </svg>
        <span
          className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${end.x * 100}%`,
            top: `${end.y * 100}%`,
            background: "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
            boxShadow: "0 0 24px 6px rgba(253,208,0,0.45)",
          }}
        />
      </div>
      <div className="mt-8 flex flex-col gap-14">
        {excellenceSlides.map((slide) => {
          const Icon = EXCELLENCE_ICONS[slide.icon];
          return (
            <div key={slide.title} className="flex flex-col items-center gap-4 text-center">
              <PhotoFrame src={slide.photo} alt={slide.title} className="aspect-[4/5] w-48" />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold/20 text-navy">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-navy">{slide.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-navy/75">{slide.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function clampUnit(v) {
  return Math.min(Math.max(v, 0), 1);
}

