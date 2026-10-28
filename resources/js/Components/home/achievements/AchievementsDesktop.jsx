import { useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import { Building2, Calendar, ChevronDown } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/Components/home/Reveal";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import { achievements as staticAchievements } from "@/data/achievements";

const BG_SRC = "/images/achievements/prestasi-bg-sky.png";
const STAR_SRC = "/images/achievements/prestasi-star.png";

const CENTER = { x: 50, y: 38 };

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}

const DEPART_SOURCE = { x: CENTER.x / 100, y: CENTER.y / 100 };
const HANDOFF_TO_CLOSING_WINDOW = 700;

const CARD_POSITIONS = [
  { x: 14, y: 28 },
  { x: 23, y: 44 },
  { x: 11, y: 63 },
  { x: 26, y: 87 },
  { x: 50, y: 94 },
  { x: 74, y: 87 },
  { x: 86, y: 28 },
  { x: 80, y: 44 },
  { x: 89, y: 63 },
];

const STAR_FRACTION = 1;
const POSITIONS = CARD_POSITIONS.map((card) => ({
  card,
  star: {
    x: CENTER.x + (card.x - CENTER.x) * STAR_FRACTION,
    y: CENTER.y + (card.y - CENTER.y) * STAR_FRACTION,
  },
}));

const COUNT = POSITIONS.length;

function handDrawnPath(from, to, index) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const side = index % 2 === 0 ? 1 : -1;
  const bend = dist * 0.09 * side;
  const midX = (from.x + to.x) / 2 + nx * bend;
  const midY = (from.y + to.y) / 2 + ny * bend;
  return `M ${from.x},${from.y} Q ${midX},${midY} ${to.x},${to.y}`;
}

function burstProgress(t) {
  if (t < 0.3) return t / 0.3;
  if (t < 0.7) return 1;
  if (t < 1) return 1 - (t - 0.7) / 0.3;
  return 0;
}

function backEaseOut(x) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function cardLocalT(bp, index) {
  const stagger = 0.06;
  const span = 1 - stagger * (COUNT - 1);
  const start = stagger * index;
  return Math.min(Math.max((bp - start) / span, 0), 1);
}

const TWINKLES = [
  { x: 10, y: 12, size: 16, delay: "0s" },
  { x: 90, y: 14, size: 14, delay: "0.8s" },
  { x: 6, y: 66, size: 12, delay: "1.5s" },
  { x: 94, y: 68, size: 13, delay: "0.4s" },
  { x: 50, y: 6, size: 11, delay: "1.1s" },
];

const BURST_SVH = 220;
const HOLD_SVH = 15;
const PINNED_SVH = BURST_SVH + HOLD_SVH;

function scrollToBurstT(p) {
  return clamp((p * PINNED_SVH) / BURST_SVH, 0, 1);
}

export default function AchievementsDesktop({ achievements = staticAchievements }) {
  const containerRef = useRef(null);
  const starRefs = useRef([]);
  const lineRefs = useRef([]);
  const cardRefs = useRef([]);
  const reduceMotion = useReducedMotion();
  const progressRef = useRef(0);

  const applyFrame = (progress) => {
    const t = Math.min(Math.max(progress, 0), 1);
    progressRef.current = t;
    const bp = burstProgress(t);

    POSITIONS.forEach((pos, i) => {
      const localT = cardLocalT(bp, i);
      const eased = backEaseOut(localT);

      const starEl = starRefs.current[i];
      if (starEl) {
        const x = CENTER.x + (pos.star.x - CENTER.x) * localT;
        const y = CENTER.y + (pos.star.y - CENTER.y) * localT;
        starEl.style.left = `${x}%`;
        starEl.style.top = `${y}%`;
        starEl.style.opacity = String(Math.min(localT * 3, 1));
        starEl.style.transform = `translate(-50%, -50%) scale(${0.5 + 0.6 * localT})`;
      }

      const lineEl = lineRefs.current[i];
      if (lineEl) {
        lineEl.style.strokeDashoffset = String(1 - localT);
        lineEl.style.opacity = String(Math.min(localT * 2, 1) * 0.7);
      }

      const cardEl = cardRefs.current[i];
      if (cardEl) {
        cardEl.style.opacity = String(Math.min(localT * 2.5, 1));
        cardEl.style.transform = `translate(-50%, -50%) scale(${0.8 + 0.2 * eased})`;
        cardEl.style.pointerEvents = localT > 0.4 ? "auto" : "none";
      }
    });
  };

  const positionSun = () => {
    const sticky = document.getElementById("achievements-sticky-container");
    const sun = document.getElementById("prestasi-sun-handoff");
    const closingAnchor = document.getElementById("closing-sun-handoff");
    if (!sticky || !sun || !closingAnchor) return;

    const stickyRect = sticky.getBoundingClientRect();
    const stickyTop = stickyRect.top;

    if (stickyTop >= 0) {
      sun.style.position = "fixed";
      sun.style.left = `${stickyRect.left + (CENTER.x / 100) * stickyRect.width}px`;
      sun.style.top = `${stickyRect.top + (CENTER.y / 100) * stickyRect.height}px`;
      sun.style.transform = "translate(-50%, -50%)";
      sun.style.opacity = "1";
      return;
    }

    if (progressRef.current !== 1) applyFrame(1);

    const raw = -stickyTop;
    const t = clamp(raw / HANDOFF_TO_CLOSING_WINDOW, 0, 1);

    const sourceX = stickyRect.left + DEPART_SOURCE.x * stickyRect.width;
    const sourceY = stickyRect.top + DEPART_SOURCE.y * stickyRect.height;

    const closingRect = closingAnchor.getBoundingClientRect();
    const targetX = closingRect.left;
    const targetY = closingRect.top;

    sun.style.position = "fixed";
    sun.style.left = `${lerp(sourceX, targetX, t)}px`;
    sun.style.top = `${lerp(sourceY, targetY, t)}px`;
    sun.style.transform = "translate(-50%, -50%)";
    sun.style.opacity = t < 0.6 ? "1" : String(Math.max(0, 1 - (t - 0.6) / 0.4));
  };

  useEffect(() => {
    if (reduceMotion) return;

    const maybePositionSun = () => {
      const sticky = document.getElementById("achievements-sticky-container");
      if (!sticky) return;
      if (sticky.getBoundingClientRect().top >= 0) return;
      positionSun();
    };

    maybePositionSun();
    window.addEventListener("scroll", maybePositionSun, { passive: true });
    window.addEventListener("resize", maybePositionSun);
    return () => {
      window.removeEventListener("scroll", maybePositionSun);
      window.removeEventListener("resize", maybePositionSun);
    };
  }, [reduceMotion]);

  return (
    <section className="relative bg-navy-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${BG_SRC})` }}
      />
      {reduceMotion ? (
        <SkyDecor />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-14"
          style={{ background: "linear-gradient(to bottom, rgb(0 0 0 / 0.35), rgb(0 0 0 / 0.282))" }}
        />
      )}

      <div className="relative z-10 flex justify-center pt-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/70">
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>

      {reduceMotion && (
        <div className="relative z-10 mx-auto max-w-2xl px-6 pb-4 pt-4 text-center">
          <Reveal>
            <h2 className="font-heading text-3xl text-white md:text-4xl">
              Prestasi Siswa
            </h2>
            <p className="mt-3 text-sm text-white/70 md:text-base">
              Mendukung setiap siswa untuk berkembang, berprestasi, dan tumbuh
              menjadi generasi yang cerdas, mandiri, serta berlandaskan
              nilai-nilai Islami.
            </p>
          </Reveal>
        </div>
      )}

      {!reduceMotion && (
        <>
          <div
            ref={containerRef}
            className="relative"
            style={{ height: `${100 + PINNED_SVH}svh` }}
          >
            <div
              id="achievements-sticky-container"
              className="sticky top-0 h-svh overflow-hidden"
            >
              <SkyDecor offsetTop="3.5rem" />

              <div className="absolute inset-x-0 top-24 z-20 mx-auto max-w-2xl px-6 text-center">
                <p className="font-heading text-4xl text-white lg:text-5xl">
                  Prestasi Siswa
                </p>
                <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 lg:text-base">
                  Mendukung setiap siswa untuk berkembang, berprestasi, dan
                  tumbuh menjadi generasi yang cerdas, mandiri, serta
                  berlandaskan nilai-nilai Islami.
                </p>
              </div>

              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ filter: "drop-shadow(0 0 2px rgba(253,208,0,0.8))" }}
              >
                {POSITIONS.map((pos, i) => (
                  <path
                    key={i}
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    d={handDrawnPath(CENTER, pos.card, i)}
                    fill="none"
                    stroke="#FDD000"
                    strokeWidth="0.15"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    opacity={0}
                  />
                ))}
              </svg>

              {POSITIONS.map((_, i) => (
                <img
                  key={i}
                  ref={(el) => {
                    starRefs.current[i] = el;
                  }}
                  src={STAR_SRC}
                  alt=""
                  aria-hidden="true"
                  width={96}
                  height={96}
                  className="pointer-events-none absolute h-16 w-16 opacity-0 lg:h-20 lg:w-20"
                  style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
                />
              ))}

              {achievements.map((item, i) => (
                <div
                  key={item.title || i}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute w-64 rounded-2xl border border-gold bg-navy-dark/90 p-3 backdrop-blur-sm lg:w-72"
                  style={{
                    left: `${POSITIONS[i].card.x}%`,
                    top: `${POSITIONS[i].card.y}%`,
                    opacity: 0,
                    boxShadow:
                      "0 0 6px rgba(253,208,0,0.9), 0 0 22px rgba(253,208,0,0.55), 0 0 44px rgba(253,208,0,0.28)",
                  }}
                >
                  <Link href={item.href || "/blog"} className="flex items-center gap-3">
                    <ImagePlaceholder
                      label={item.unit}
                      className="h-16 w-20 shrink-0 rounded-lg lg:h-20 lg:w-24"
                    />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-bold leading-snug text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-gold">
                        {item.level}
                      </p>
                      <div className="mt-1.5 space-y-0.5 text-[11px] text-white/60">
                        <div className="flex items-center gap-1">
                          <Building2 aria-hidden="true" className="h-3 w-3 shrink-0" />
                          <span className="truncate">{item.unit}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar aria-hidden="true" className="h-3 w-3 shrink-0" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div
              id="prestasi-sun-handoff"
              aria-hidden="true"
              className="pointer-events-none absolute z-10 h-20 w-20 rounded-full opacity-0"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                boxShadow: "0 0 48px 14px rgba(253,208,0,0.45)",
              }}
            />
          </div>
          <BurstDriver target={containerRef} onProgress={applyFrame} />
        </>
      )}

      {reduceMotion && (
        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 pb-16 pt-2 md:grid-cols-4">
          {achievements.map((item, i) => (
            <Reveal key={item.title || i} delay={i * 0.05}>
              <Link
                href={item.href || "/blog"}
                className="block rounded-xl border border-gold bg-navy-dark/90 p-3 backdrop-blur-sm"
                style={{
                  boxShadow:
                    "0 0 5px rgba(253,208,0,0.85), 0 0 16px rgba(253,208,0,0.45)",
                }}
              >
                <ImagePlaceholder
                  label={item.unit}
                  className="aspect-video w-full rounded-lg"
                />
                <p className="mt-2 text-sm font-bold leading-snug text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs font-semibold text-gold">
                  {item.level}
                </p>
                <p className="text-xs text-white/60">
                  {item.unit} &middot; {item.date}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function BurstDriver({ target, onProgress }) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, scrollToBurstT);
  useMotionValueEvent(progress, "change", onProgress);
  useEffect(() => {
    onProgress(progress.get());
  }, []);
  return null;
}

function SkyDecor({ offsetTop }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={
        offsetTop
          ? { top: `calc(-1 * ${offsetTop})`, bottom: "auto", height: "calc(115svh + 3.5rem)" }
          : undefined
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-black/35 to-transparent"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {TWINKLES.map((s, i) => (
          <img
            key={i}
            src={STAR_SRC}
            alt=""
            width={64}
            height={64}
            className="motion-safe:animate-pulse absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: "3.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

