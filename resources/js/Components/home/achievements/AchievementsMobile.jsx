import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Calendar, ChevronDown, Trophy } from "lucide-react";
import {
  motion,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import Reveal from "@/Components/home/Reveal";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import { achievements as staticAchievements } from "@/data/achievements";

const BG_SRC = "/images/achievements/prestasi-bg-sky.png";
const STAR_SRC = "/images/achievements/prestasi-star.png";

const MAX_CARDS = 6;

const DEPART_START = 0.03;
const DEPART_STAGGER = 0.07;
const TRAVEL = 0.1;
const EXIT_START = 0.82;
const EXIT_STAGGER = 0.012;
const EXIT_TRAVEL = 0.12;

const landAt = (i) => DEPART_START + DEPART_STAGGER * i + TRAVEL;
const exitAt = (i, count) => EXIT_START + EXIT_STAGGER * (count - 1 - i);

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;

function starTravel(i, p, count) {
  const out = easeOutCubic(clamp01((p - (DEPART_START + DEPART_STAGGER * i)) / TRAVEL));
  const back = easeInCubic(clamp01((p - exitAt(i, count)) / EXIT_TRAVEL));
  return out * (1 - back);
}

function visibleMask(p, count) {
  let mask = 0;
  for (let i = 0; i < count; i++) {
    if (p >= landAt(i) && p < exitAt(i, count)) mask |= 1 << i;
  }
  return mask;
}

export default function AchievementsMobile({ achievements = staticAchievements }) {
  const reduceMotion = usePrefersReducedMotion();
  const items = achievements.slice(0, MAX_CARDS);

  return (
    <section className="relative bg-navy-dark">
      <div className="relative z-10 flex justify-center pt-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white/70">
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-2 pt-4 text-center">
        <Reveal>
          <h2 className="font-heading text-3xl text-white">Prestasi Siswa</h2>
          <p className="mt-3 text-sm text-white/70">
            Mendukung setiap siswa untuk berkembang, berprestasi, dan tumbuh
            menjadi generasi yang cerdas, mandiri, serta berlandaskan
            nilai-nilai Islami.
          </p>
        </Reveal>
      </div>

      <BurstScene items={items} staticMode={!!reduceMotion} />

      {achievements.length > MAX_CARDS && (
        <div className="relative z-10 flex justify-center px-6 pb-14 pt-4">
          <Link
            href="/blog"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-gold bg-gold/10 px-6 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
          >
            Lihat Semua Prestasi
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

function BurstScene({ items, staticMode }) {
  const count = items.length;
  const containerRef = useRef(null);
  const sunRef = useRef(null);
  const rowsRef = useRef(null);
  const slotRefs = useRef([]);

  const [geo, setGeo] = useState(null);
  const [mask, setMask] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [starMV] = useState(() =>
    items.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      scale: motionValue(0.4),
      opacity: motionValue(0),
    }))
  );
  const sunScale = useMotionValue(1);
  const sunOpacity = useMotionValue(1);
  const lineLength = useMotionValue(0);

  const measure = useCallback(() => {
    const sun = sunRef.current;
    const rows = rowsRef.current;
    if (!sun || !rows) return;
    const sunBox = sun.getBoundingClientRect();
    const sunX = sunBox.left + sunBox.width / 2;
    const sunY = sunBox.top + sunBox.height / 2;
    const rowsBox = rows.getBoundingClientRect();
    const centers = slotRefs.current.map((el) => {
      const r = el?.getBoundingClientRect();
      return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 };
    });
    setGeo({
      offsets: centers.map((c) => ({ dx: sunX - c.x, dy: sunY - c.y })),
      line: {
        x: (centers[0]?.x ?? 0) - rowsBox.left,
        y1: (centers[0]?.y ?? 0) - rowsBox.top,
        y2: (centers[count - 1]?.y ?? 0) - rowsBox.top,
      },
    });
  }, [count]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (rowsRef.current) ro.observe(rowsRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const applyFrame = useCallback(
    (raw) => {
      const p = staticMode ? 0.7 : clamp01(raw);
      let travelSum = 0;
      items.forEach((_, i) => {
        const f = starTravel(i, p, count);
        travelSum += f;
        const off = geo?.offsets[i] ?? { dx: 0, dy: 0 };
        const mv = starMV[i];
        if (mv) {
          mv.x.set(off.dx * (1 - f) - Math.sin(Math.PI * f) * 22);
          mv.y.set(off.dy * (1 - f));
          mv.scale.set(0.35 + 0.65 * f);
          mv.opacity.set(Math.min(1, f * 4));
        }
      });
      const spread = count > 0 ? travelSum / count : 0;
      sunScale.set(1 - 0.6 * spread);
      sunOpacity.set(1 - 0.65 * spread);

      const firstLand = landAt(0);
      const lastLand = landAt(Math.max(0, count - 1));
      const drawn = lastLand > firstLand ? clamp01((p - firstLand) / (lastLand - firstLand)) : 1;
      const retract = clamp01((p - EXIT_START) / (exitAt(0, count) + EXIT_TRAVEL * 0.5 - EXIT_START));
      lineLength.set(drawn * (1 - retract));
    },
    [geo, staticMode, starMV, sunScale, sunOpacity, lineLength, count, items]
  );

  useEffect(() => {
    applyFrame(scrollYProgress.get());
  }, [applyFrame, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (staticMode) return;
    applyFrame(p);
    const next = visibleMask(clamp01(p), count);
    setMask((prev) => (prev === next ? prev : next));
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: staticMode ? undefined : "300svh" }}
    >
      <div
        className={`${staticMode ? "relative" : "sticky top-0 h-svh"} overflow-hidden`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img src={BG_SRC} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-dark to-transparent" />
          <div className="absolute inset-0 bg-navy-dark/25" />
          {[
            { x: 12, y: 18, s: 12, d: "0s" },
            { x: 88, y: 26, s: 10, d: "1s" },
            { x: 92, y: 82, s: 11, d: "1.8s" },
          ].map((t, i) => (
            <img
              key={i}
              src={STAR_SRC}
              alt=""
              width={32}
              height={32}
              className="motion-safe:animate-pulse absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.s,
                height: t.s,
                animationDelay: t.d,
                animationDuration: "3.5s",
              }}
            />
          ))}
        </div>

        <div
          className={`relative flex flex-col px-4 pt-20 ${staticMode ? "pb-8" : "h-full pb-5"}`}
        >
          <div className="flex h-[60px] shrink-0 items-center justify-center [@media(max-height:620px)]:h-12">
            <motion.div
              ref={sunRef}
              aria-hidden="true"
              className="h-12 w-12 rounded-full"
              style={{
                scale: sunScale,
                opacity: sunOpacity,
                background:
                  "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                boxShadow: "0 0 36px 12px rgba(253,208,0,0.45)",
              }}
            />
          </div>

          <div
            ref={rowsRef}
            className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-[clamp(6px,1.8svh,16px)]"
          >
            {geo && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              >
                <motion.line
                  x1={geo.line.x}
                  x2={geo.line.x}
                  y1={geo.line.y1}
                  y2={geo.line.y2}
                  stroke="#FDD000"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  opacity={0.75}
                  style={{ pathLength: lineLength }}
                />
              </svg>
            )}

            {items.map((item, i) => (
              <div key={item.title || i} className="relative flex items-center gap-3">
                <span
                  ref={(el) => {
                    slotRefs.current[i] = el;
                  }}
                  className="relative block h-8 w-8 shrink-0"
                >
                  {starMV[i] && <Star mv={starMV[i]} />}
                </span>
                <AchievementCard item={item} visible={staticMode || (mask & (1 << i)) !== 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Star({ mv }) {
  return (
    <motion.span
      className="absolute inset-0 will-change-transform"
      style={{ x: mv.x, y: mv.y, scale: mv.scale, opacity: mv.opacity }}
    >
      <img
        src={STAR_SRC}
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        className="h-full w-full drop-shadow-[0_0_6px_rgba(253,208,0,0.9)]"
      />
    </motion.span>
  );
}

function AchievementCard({ item, visible }) {
  return (
    <motion.div
      className="min-w-0 flex-1 origin-left"
      initial={false}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={
        visible
          ? { opacity: { duration: 0.25 }, scale: { type: "spring", stiffness: 380, damping: 15 } }
          : { duration: 0.2 }
      }
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <Link
        href={item.href || "/blog"}
        tabIndex={visible ? undefined : -1}
        className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-gold/80 bg-navy-dark/90 p-2 shadow-[0_0_10px_rgba(253,208,0,0.45)] [@media(max-height:620px)]:min-h-12 [@media(max-height:620px)]:py-1.5"
      >
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg [@media(max-height:620px)]:h-9 [@media(max-height:620px)]:w-9">
          <ImagePlaceholder label="" className="h-full w-full" />
          <Trophy
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-white/90"
          />
        </span>
        <span className="min-w-0">
          <span className="line-clamp-2 text-[13px] font-bold leading-snug text-white [@media(max-height:620px)]:line-clamp-1">
            {item.title}
          </span>
          <span className="mt-0.5 flex items-center gap-1 text-[11px] text-white/60">
            <span className="truncate font-semibold text-gold">{item.level}</span>
            <span aria-hidden="true">·</span>
            <Calendar aria-hidden="true" className="h-3 w-3 shrink-0" />
            <span className="shrink-0">{item.date}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

