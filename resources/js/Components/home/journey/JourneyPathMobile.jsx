import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { LinkButton } from "@/Components/ui/Button";
import { journeySteps } from "@/data/journeySteps";
import PhotoFrame from "./PhotoFrame";

const ROAD_COL_W = 64;
const ROAD_AMPLITUDE = 13;
const ROAD_PERIOD = 460;
const CHARACTER_SIZE = 46;
const CHARACTER_FADE_START = 0.94;
const CARD_ANCHOR_PX = 96;

function roadX(y) {
  return ROAD_COL_W / 2 + ROAD_AMPLITUDE * Math.sin((2 * Math.PI * y) / ROAD_PERIOD);
}

function clamp01(v) {
  return Math.min(Math.max(v, 0), 1);
}

function buildRoad(height) {
  const step = 12;
  const pts = [];
  for (let y = 0; y <= height; y += step) {
    pts.push(`${roadX(y).toFixed(1)},${y.toFixed(1)}`);
  }
  pts.push(`${roadX(height).toFixed(1)},${height.toFixed(1)}`);
  return `M ${pts[0]} L ${pts.slice(1).join(" L ")}`;
}

export default function JourneyPathMobile() {
  const zoneRef = useRef(null);
  const cardRefs = useRef([]);
  const reduceMotion = usePrefersReducedMotion();

  const [layout, setLayout] = useState(null);
  const [revealed, setRevealed] = useState(0);

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start 85%", "end 45%"],
  });

  const height = layout?.height ?? 0;
  const charY = useTransform(scrollYProgress, (p) => (reduceMotion ? 1 : clamp01(p)) * height);
  const charX = useTransform(charY, (y) => roadX(y) - CHARACTER_SIZE / 2);
  const charTop = useTransform(charY, (y) => y - CHARACTER_SIZE / 2);
  const charRotate = useTransform(charY, (y) => (reduceMotion ? 0 : Math.sin(y / 14) * 5));
  const charOpacity = useTransform(scrollYProgress, (p) =>
    reduceMotion || p < CHARACTER_FADE_START
      ? 1
      : Math.max(0, 1 - (p - CHARACTER_FADE_START) / (1 - CHARACTER_FADE_START))
  );

  const measure = useCallback(() => {
    const zone = zoneRef.current;
    if (!zone) return;
    const zoneTop = zone.getBoundingClientRect().top;
    const h = zone.offsetHeight;
    const anchors = cardRefs.current.map((el) =>
      el ? el.getBoundingClientRect().top - zoneTop + CARD_ANCHOR_PX : 0
    );
    const y = clamp01(scrollYProgress.get()) * h;
    const count = anchors.filter((a) => y >= a).length;
    setRevealed((prev) => (prev === count ? prev : count));
    setLayout((prev) =>
      prev &&
      prev.height === h &&
      prev.anchors.every((a, i) => Math.abs(a - anchors[i]) < 1)
        ? prev
        : { height: h, anchors }
    );
  }, [scrollYProgress]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (zoneRef.current) ro.observe(zoneRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!layout) return;
    const y = clamp01(p) * layout.height;
    const count = layout.anchors.filter((a) => y >= a).length;
    setRevealed((prev) => (prev === count ? prev : count));
  });

  return (
    <div ref={zoneRef} className="relative mx-auto max-w-xl px-4 pb-10 pt-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-4 top-0"
        style={{ width: ROAD_COL_W }}
      >
        {layout && (
          <svg
            viewBox={`0 0 ${ROAD_COL_W} ${layout.height}`}
            width={ROAD_COL_W}
            height={layout.height}
            className="absolute inset-0 overflow-visible"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 4%, black 94%, transparent 100%)",
            }}
          >
            <path
              d={buildRoad(layout.height)}
              fill="none"
              stroke="#FBE7B0"
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.45}
            />
            <path
              d={buildRoad(layout.height)}
              fill="none"
              stroke="#F6E9C9"
              strokeWidth={18}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
            <path
              d={buildRoad(layout.height)}
              fill="none"
              stroke="#FDD000"
              strokeWidth={1.5}
              strokeDasharray="2 9"
              strokeLinecap="round"
              opacity={0.6}
            />
          </svg>
        )}

        {layout && (
          <motion.div
            className="absolute left-0 top-0 z-20 will-change-transform"
            style={{
              width: CHARACTER_SIZE,
              height: CHARACTER_SIZE,
              x: charX,
              y: charTop,
              rotate: charRotate,
              opacity: charOpacity,
            }}
          >
            <img
              src="/images/journey/karakter-jalan.png"
              alt=""
              width={CHARACTER_SIZE}
              height={CHARACTER_SIZE}
              className="h-full w-full object-contain drop-shadow-md"
            />
          </motion.div>
        )}
      </div>

      <div className="flex flex-col gap-12" style={{ paddingLeft: ROAD_COL_W + 12 }}>
        {journeySteps.map((step, i) => (
          <div
            key={step.slug}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <MobileJourneyCard step={step} visible={reduceMotion || !layout ? true : i < revealed} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileJourneyCard({ step, visible }) {
  return (
    <motion.div
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative flex flex-col rounded-3xl bg-white/60 p-4 shadow-sm ring-1 ring-gold/25"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <PhotoFrame
        src={step.photo}
        alt={step.name}
        className="aspect-[2/3] w-36 self-center"
      />
      <span className="mt-3 inline-block w-max rounded-full border border-gold/70 bg-ivory px-3 py-1 text-xs font-semibold tracking-wide text-[#A87C2C]">
        Langkah {step.order}
      </span>
      <h3 className="mt-2 text-2xl font-bold text-navy">{step.name}</h3>
      <p className="mt-0.5 text-sm font-medium text-navy/60">{step.ageRange}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy/75">{step.description}</p>
      <div className="mt-4">
        <LinkButton href={step.ctaHref}>
          {step.ctaLabel} →
        </LinkButton>
      </div>
    </motion.div>
  );
}

