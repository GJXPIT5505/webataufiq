"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion, useMotionValueEvent } from "framer-motion";
import { journeySteps } from "@/data/journeySteps";
import JourneyCard from "./JourneyCard";

const DESKTOP_PATH_HEIGHT = 1750;
const ROAD_WIDTH_FRACTION = 0.11;
const WAYPOINT_X = [50, 62, 38, 62, 38, 62, 50];
const CHARACTER_FADE_START = 0.92;

function smoothstep(t) {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
}

function pathXPercent(progress, fractions) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const last = fractions.length - 1;
  if (clamped <= fractions[0]) return WAYPOINT_X[0];
  if (clamped >= fractions[last]) return WAYPOINT_X[last];
  for (let i = 0; i < last; i++) {
    if (clamped >= fractions[i] && clamped <= fractions[i + 1]) {
      const span = fractions[i + 1] - fractions[i] || 1;
      const t = smoothstep((clamped - fractions[i]) / span);
      return WAYPOINT_X[i] + t * (WAYPOINT_X[i + 1] - WAYPOINT_X[i]);
    }
  }
  return WAYPOINT_X[last];
}

function buildRoadCenterline(fractions, width, height) {
  const N = 120;
  const pts = Array.from({ length: N }, (_, i) => {
    const t = i / (N - 1);
    return {
      x: (pathXPercent(t, fractions) / 100) * width,
      y: t * height,
    };
  });
  const toSeg = (p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  return `M ${toSeg(pts[0])} ` + pts.slice(1).map((p) => `L ${toSeg(p)}`).join(" ");
}

export default function JourneyPath() {
  const pathZoneRef = useRef(null);
  const desktopBlockRef = useRef(null);
  const characterRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const cardRefs = useRef([]);
  const cardSlidRef = useRef(journeySteps.map(() => false));
  const reduceMotion = useReducedMotion();

  const [fractions, setFractions] = useState(null);
  const [road, setRoad] = useState(null);

  const { scrollYProgress } = useScroll({
    target: pathZoneRef,
    offset: ["start 25%", "end end"],
  });

  const measure = useCallback(() => {
    const zone = pathZoneRef.current;
    const block = desktopBlockRef.current;
    const startEl = startMarkerRef.current;
    const endEl = endMarkerRef.current;
    if (!zone || !block || !startEl || !endEl) return;
    const H = zone.getBoundingClientRect().height;
    const W = block.getBoundingClientRect().width;
    if (!H || !W) return;
    const zoneTop = zone.getBoundingClientRect().top;

    const points = [startEl, ...cardRefs.current, endEl];
    const nextFractions = points.map((el) => {
      if (!el) return 0;
      const rel = el.getBoundingClientRect().top - zoneTop;
      return Math.min(Math.max(rel / H, 0), 1);
    });
    setFractions(nextFractions);
    setRoad({ d: buildRoadCenterline(nextFractions, W, H), width: W });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (pathZoneRef.current) ro.observe(pathZoneRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const positionCharacter = useCallback(
    (progress) => {
      const charEl = characterRef.current;
      if (!charEl || !fractions) return;
      const clamped = Math.min(Math.max(progress, 0), 1);

      charEl.style.top = `${clamped * 100}%`;
      charEl.style.left = `${pathXPercent(clamped, fractions)}%`;

      const fadeOpacity =
        clamped < CHARACTER_FADE_START
          ? 1
          : Math.max(0, 1 - (clamped - CHARACTER_FADE_START) / (1 - CHARACTER_FADE_START));
      charEl.style.opacity = String(fadeOpacity);
    },
    [fractions]
  );

  const updateCards = useCallback(
    (progress) => {
      if (!fractions) return;
      journeySteps.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const visible = progress >= fractions[i + 1];
        el.style.opacity = visible ? "1" : "0";
        if (visible && !cardSlidRef.current[i]) {
          cardSlidRef.current[i] = true;
          el.style.transform = "translateY(-50%)";
        }
      });
    },
    [fractions]
  );

  useEffect(() => {
    if (!fractions) return;
    if (reduceMotion) {
      positionCharacter(1);
      journeySteps.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(-50%)";
      });
      return;
    }
    positionCharacter(scrollYProgress.get());
    updateCards(scrollYProgress.get());
  }, [fractions, reduceMotion, positionCharacter, updateCards, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduceMotion || !fractions) return;
    positionCharacter(progress);
    updateCards(progress);
  });

  return (
    // 'overflow-hidden' dihapus dan ditambahkan 'pt-12' agar kepala orang memiliki ruang di bagian atas
    <div ref={pathZoneRef} className="relative pt-12">
      
      {/* Background Ornaments */}
      <div className="pointer-events-none absolute left-10 top-1/6 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-96 w-96 rounded-full bg-[#102380]/10 blur-3xl" />

      {/* Floating Clouds */}
      <svg className="pointer-events-none absolute left-[5%] top-[10%] h-12 w-28 text-white/70" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
      <svg className="pointer-events-none absolute right-[8%] top-[45%] h-16 w-36 text-white/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Islamic Sparkles */}
      <div className="pointer-events-none absolute right-[22%] top-[18%] animate-pulse text-[#D4AF37]/60">✦</div>
      <div className="pointer-events-none absolute left-[18%] top-[38%] animate-pulse text-[#D4AF37]/70 text-xl">✦</div>

      <div
        ref={desktopBlockRef}
        className="relative mx-auto hidden max-w-5xl px-6 md:block"
        style={{ height: DESKTOP_PATH_HEIGHT }}
      >
        {/* Titik Penanda Kembali Asli (top-0) */}
        <div ref={startMarkerRef} className="absolute inset-x-0 top-0 h-px" />
        <div ref={endMarkerRef} className="absolute inset-x-0 h-px" style={{ top: "96%" }} />

        {/* SVG Jalan Asli */}
        {road &&
          (() => {
            const roadWidth = road.width * ROAD_WIDTH_FRACTION;
            const fadeMask =
              "linear-gradient(to bottom, transparent 0%, black 5%, black 93%, transparent 100%)";
            return (
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${road.width} ${DESKTOP_PATH_HEIGHT}`}
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                style={{
                  WebkitMaskImage: fadeMask,
                  maskImage: fadeMask,
                }}
              >
                <defs>
                  <filter id="journey-road-glow" x="-60%" y="-20%" width="220%" height="140%">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                </defs>

                <path
                  d={road.d}
                  fill="none"
                  stroke="#FBE7B0"
                  strokeWidth={roadWidth * 1.5}
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  opacity="0.5"
                  filter="url(#journey-road-glow)"
                />

                <path
                  d={road.d}
                  fill="none"
                  stroke="#F6E9C9"
                  strokeWidth={roadWidth}
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  opacity="0.85"
                />

                <path
                  d={road.d}
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  strokeDasharray="10 14"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            );
          })()}

        {/* Waypoint Checkpoints */}
        {fractions &&
          journeySteps.map((_, i) => {
            const frac = fractions[i + 1];
            if (!frac) return null;
            const xPct = pathXPercent(frac, fractions);
            return (
              <div
                key={`waypoint-${i}`}
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ top: `${frac * 100}%`, left: `${xPct}%` }}
              >
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-30" />
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#D4AF37] shadow-md" />
                </span>
              </div>
            );
          })}

        {/* Character Animator Asli */}
        {!reduceMotion && (
          <div
            ref={characterRef}
            aria-hidden="true"
            className="pointer-events-none absolute z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 md:h-28 md:w-28"
            style={{ left: "50%", top: "0%", opacity: fractions ? undefined : 0 }}
          >
            <div className="absolute bottom-2 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-[#102380]/20 blur-sm" />
            <img
              src="/images/journey/karakter-jalan.png"
              alt=""
              className="h-full w-full object-contain drop-shadow-xl"
            />
          </div>
        )}

        {/* Cards */}
        {journeySteps.map((step, i) => (
          <div
            key={step.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={`absolute w-[46%] transition-[opacity,transform] duration-[450ms] ease-out ${
              step.side === "left" ? "left-0" : "right-0"
            }`}
            style={{
              top: `${9 + i * 20.5}%`,
              opacity: reduceMotion ? 1 : 0,
              transform: reduceMotion
                ? "translateY(-50%)"
                : "translateY(calc(-50% + 32px))",
            }}
          >
            <JourneyCard step={step} />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-12 px-6 py-16 md:hidden">
        {journeySteps.map((step) => (
          <JourneyCard key={step.slug} step={step} />
        ))}
      </div>
    </div>
  );
}