import React, { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/Components/home/Reveal";
import PhotoFrame from "@/Components/home/journey/PhotoFrame";
import { excellenceSlides } from "@/data/excellenceSlides";
import { EXCELLENCE_BG_SRC, EXCELLENCE_ICONS as ICONS } from "./excellenceShared";

const ORBIT_POINTS = [
  { x: 82, y: 75 },
  { x: 62.75, y: 41.66 },
  { x: 24.25, y: 41.66 },
  { x: 5, y: 75 },
];

const ORBIT_ARC_D = [
  `M ${ORBIT_POINTS[0].x},${ORBIT_POINTS[0].y} A 38.5,38.5 0 0,0 ${ORBIT_POINTS[1].x},${ORBIT_POINTS[1].y}`,
  `M ${ORBIT_POINTS[1].x},${ORBIT_POINTS[1].y} A 38.5,38.5 0 0,0 ${ORBIT_POINTS[2].x},${ORBIT_POINTS[2].y}`,
  `M ${ORBIT_POINTS[2].x},${ORBIT_POINTS[2].y} A 38.5,38.5 0 0,0 ${ORBIT_POINTS[3].x},${ORBIT_POINTS[3].y}`,
];

const ORBIT_END = ORBIT_POINTS[ORBIT_POINTS.length - 1];
const PRESTASI_CENTER = { x: 0.5, y: 0.38 };
const HANDOFF_WINDOW = 900;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

const SEQUENCE_MAX = ORBIT_POINTS.length - 1;

const STEP_SVH = 90;
const HOLD_SVH = 15;
const PINNED_SVH = SEQUENCE_MAX * STEP_SVH + HOLD_SVH;

function progressToSequence(p) {
  return clamp((p * PINNED_SVH) / STEP_SVH, 0, SEQUENCE_MAX);
}

export default function ExcellenceDesktop() {
  const containerRef = useRef(null);
  const arcRefs = useRef([]);
  const arcLengthsRef = useRef([null, null, null]);
  const sunRef = useRef(null);
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const slideRefs = useRef([]);
  const photoRefs = useRef([]);
  const reduceMotion = useReducedMotion();

  const applyFrame = (sequence) => {
    const clamped = clamp(sequence, 0, SEQUENCE_MAX);
    const step = Math.min(Math.floor(clamped), ORBIT_POINTS.length - 1);
    const localT = clamped - step;

    if (step < ORBIT_POINTS.length - 1) {
      const arcEl = arcRefs.current[step];
      if (arcEl) {
        if (arcLengthsRef.current[step] === null) {
          arcLengthsRef.current[step] = arcEl.getTotalLength();
        }
        const length = arcLengthsRef.current[step] ?? 0;
        const point = arcEl.getPointAtLength(length * localT);
        if (sunRef.current) {
          sunRef.current.style.left = `${point.x}%`;
          sunRef.current.style.top = `${point.y}%`;
        }
      }
    } else if (sunRef.current) {
      sunRef.current.style.left = `${ORBIT_END.x}%`;
      sunRef.current.style.top = `${ORBIT_END.y}%`;
    }

    let alphaA = 0;
    let alphaB = 0;
    excellenceSlides.forEach((slide, i) => {
      let alpha = 0;
      if (i === step) alpha = 1 - localT;
      else if (i === step + 1) alpha = localT;

      if (slide.bg === "a") alphaA = Math.max(alphaA, alpha);
      else alphaB = Math.max(alphaB, alpha);

      const el = slideRefs.current[i];
      if (el) {
        const slideOffset = (1 - alpha) * (i <= step ? -16 : 16);
        el.style.opacity = String(alpha);
        el.style.transform = `translateY(calc(-50% + ${slideOffset}px))`;
        el.style.pointerEvents = alpha > 0.5 ? "auto" : "none";
      }
      const photoEl = photoRefs.current[i];
      if (photoEl) {
        photoEl.style.transform = `scale(${0.95 + 0.05 * alpha})`;
      }
    });
    if (bgARef.current) bgARef.current.style.opacity = String(alphaA);
    if (bgBRef.current) bgBRef.current.style.opacity = String(alphaB);
  };

  useEffect(() => {
    if (reduceMotion) return;

    const applyHandoff = () => {
      const container = containerRef.current;
      const sun = document.getElementById("prestasi-sun-handoff");
      if (!container || !sun) return;

      const containerRect = container.getBoundingClientRect();
      if (containerRect.width === 0 && containerRect.height === 0) {
        sun.style.opacity = "0";
        return;
      }

      const V = window.innerHeight;
      const W = window.innerWidth;

      const raw = V - containerRect.bottom;
      if (raw <= 0) {
        sun.style.opacity = "0";
        return;
      }
      const t = clamp(raw / HANDOFF_WINDOW, 0, 1);

      const sourceX = (ORBIT_END.x / 100) * W;
      const sourceY = (ORBIT_END.y / 100) * V;

      const achievementsEl = document.getElementById("achievements-sticky-container");
      const achievementsRect = achievementsEl ? achievementsEl.getBoundingClientRect() : null;

      const dockTargetX =
        achievementsRect && achievementsRect.top < V
          ? achievementsRect.left + PRESTASI_CENTER.x * achievementsRect.width
          : PRESTASI_CENTER.x * W;
      const dockTargetY =
        achievementsRect && achievementsRect.top < V
          ? achievementsRect.top + PRESTASI_CENTER.y * achievementsRect.height
          : PRESTASI_CENTER.y * V;

      sun.style.position = "fixed";
      sun.style.left = `${lerp(sourceX, dockTargetX, t)}px`;
      sun.style.top = `${lerp(sourceY, dockTargetY, t)}px`;
      sun.style.transform = "translate(-50%, -50%)";

      sun.style.opacity = t < 0.05 ? String(t / 0.05) : "1";
    };

    applyHandoff();
    window.addEventListener("scroll", applyHandoff, { passive: true });
    window.addEventListener("resize", applyHandoff);
    return () => {
      window.removeEventListener("scroll", applyHandoff);
      window.removeEventListener("resize", applyHandoff);
    };
  }, [reduceMotion]);

  return (
    <section className="relative bg-ivory">
      {reduceMotion && (
        <div className="relative z-20 mx-auto max-w-5xl px-6 pt-20 text-center md:pt-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Keunggulan Attaufiq
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              Fondasi kuat yang menjadi alasan orang tua percaya, dan anak-anak
              tumbuh luar biasa.
            </h2>
          </Reveal>
        </div>
      )}

      {!reduceMotion && (
        <>
          <div
            ref={containerRef}
            className="relative mt-8"
            style={{ height: `${100 + PINNED_SVH}svh` }}
          >
            <div
              id="excellence-sticky-container"
              className="sticky top-0 flex h-svh items-center overflow-hidden"
            >
              {/* Background architecture */}
              <div className="absolute inset-0 -z-10">
                <div ref={bgARef} className="absolute inset-0" style={{ opacity: 1 }}>
                  <img
                    src={EXCELLENCE_BG_SRC}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div ref={bgBRef} className="absolute inset-0" style={{ opacity: 0 }}>
                  <div style={{ transform: "scaleX(-1)" }} className="relative h-full w-full">
                    <img
                      src={EXCELLENCE_BG_SRC}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/50 to-ivory/85" />
              </div>

              {/* In-scene heading */}
              <div className="absolute inset-x-0 top-20 z-20 mx-auto max-w-5xl px-6 text-center md:top-24">
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Keunggulan Attaufiq
                </p>
                <h2
                  id="keunggulan-heading"
                  className="mt-3 text-3xl font-bold text-navy md:text-4xl"
                >
                  Fondasi kuat yang menjadi alasan orang tua percaya, dan
                  anak-anak tumbuh luar biasa.
                </h2>
              </div>

              {/* Empty anchor for Journey sun handoff */}
              <div
                id="journey-sun-handoff"
                aria-hidden="true"
                className="pointer-events-none absolute h-20 w-20 rounded-full opacity-0 md:h-28 md:w-28"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                  boxShadow: "0 0 56px 16px rgba(253,208,0,0.5)",
                }}
              />

              {/* Orbit arcs + sun */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {ORBIT_ARC_D.map((d, i) => (
                  <path
                    key={i}
                    ref={(el) => {
                      arcRefs.current[i] = el;
                    }}
                    d={d}
                    fill="none"
                    stroke="#FDD000"
                    strokeWidth="0.3"
                    strokeDasharray="1.5 1.5"
                    opacity={0.5}
                  />
                ))}
                {ORBIT_POINTS.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="0.7"
                    fill="#FDD000"
                    opacity={0.8}
                  />
                ))}
              </svg>
              {!reduceMotion && (
                <div
                  ref={sunRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-20 md:w-20"
                  style={{
                    left: "82%",
                    top: "75%",
                    background:
                      "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                    boxShadow: "0 0 40px 12px rgba(253,208,0,0.45)",
                  }}
                />
              )}

              {/* 4 slide contents */}
              <div className="absolute inset-0 mx-auto w-full max-w-5xl px-6">
                {excellenceSlides.map((slide, i) => {
                  const Icon = ICONS[slide.icon];
                  const alignRight = slide.side === "right";
                  return (
                    <div
                      key={slide.title}
                      ref={(el) => {
                        slideRefs.current[i] = el;
                      }}
                      className="absolute inset-x-6 top-[76%] flex -translate-y-1/2 flex-col items-center gap-8 md:flex-row md:gap-14"
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        flexDirection: alignRight ? "row-reverse" : "row",
                      }}
                    >
                      <div
                        ref={(el) => {
                          photoRefs.current[i] = el;
                        }}
                        className="w-full max-w-[240px] shrink-0"
                      >
                        <PhotoFrame
                          src={slide.photo}
                          alt={slide.title}
                          className="aspect-[4/5] w-full"
                        />
                      </div>
                      <div
                        className={`flex flex-col ${alignRight ? "md:items-end md:text-right" : ""}`}
                      >
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-navy">
                          <Icon aria-hidden="true" className="h-6 w-6" />
                        </span>
                        <h3 className="text-2xl font-bold text-navy md:text-3xl">
                          {slide.title}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/75 md:text-base">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <SequenceDriver target={containerRef} onSequence={applyFrame} />
        </>
      )}

      {/* Reduced-motion fallback */}
      {reduceMotion && (
        <div className="flex flex-col gap-14 px-6 py-16">
          {excellenceSlides.map((slide) => {
            const Icon = ICONS[slide.icon];
            return (
              <Reveal key={slide.title} className="flex flex-col gap-5">
                <PhotoFrame
                  src={slide.photo}
                  alt={slide.title}
                  className="aspect-[4/5] w-full max-w-xs self-center"
                />
                <div className="flex flex-col items-center text-center">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-navy">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold text-navy">{slide.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-navy/75">
                    {slide.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}

function SequenceDriver({ target, onSequence }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const sequence = useTransform(scrollYProgress, progressToSequence);
  useMotionValueEvent(sequence, "change", onSequence);

  useEffect(() => {
    onSequence(sequence.get());
  }, []);
  return null;
}

