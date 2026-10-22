"use client";


import { motion, useReducedMotion } from "framer-motion";
import { Users } from "lucide-react";

// Same badge silhouette as VisiMisiSection's ArchBadge (the arch used as
// the background for the Visi/Misi icons on the About Us page) — reused
// verbatim per instruction, rather than a new shape.
const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

// "Usia" badge — straddles the boundary between the hero photo and the
// wave/cream section below, bottom-right. The person icon is a plain,
// commonly-used SVG glyph (lucide's Users), not a hand-traced one.
function UsiaBadge({ ageLabel }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="absolute bottom-0 right-6 z-20 h-48 w-32 translate-y-1/3 drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] sm:right-10 md:right-14">
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill="#102380" />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth="5"
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
      </svg>
      {/* Content: lowered 1cm, then raised 0.5cm back, netting 0.5cm down. */}
      <div
        className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-4 pb-4 text-center"
        style={{ transform: "translateY(0.5cm)" }}
      >
        <Users aria-hidden="true" className="h-8 w-8 text-gold" strokeWidth={1.6} />
        <div>
          <p className="text-sm font-semibold text-white">Usia</p>
          <p className="text-sm font-semibold text-white">{ageLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Photo-right / navy-left / blend-in-the-middle, same technique as
// PageHeroBanner (About Us's hero) — EXCEPT per correction:
// - the blend point sits at the true horizontal center (50/50 split,
//   not PageHeroBanner's 58/42), so the photo panel is w-1/2 here.
// - PageHeroBanner's zellige/cartouche ARCH asset is NOT used on this
//   page, and neither is any texture at all — plain solid navy, per
//   instruction to remove the zellige effect entirely.
// The bottom wave divider is still the simplified "1 wave per side,
// mirrored" version (vs. the Footer's 2-waves-per-side rhythm).
const ASSET_NAVY = "#002672";

// Catmull-Rom → cubic Bézier, passing exactly through every point — the
// same helper Footer.tsx uses to build its own bottom edge (a plain
// midpoint-quadratic smoothing undershoots sharp interior points, which
// is exactly wrong for a genuine sharp peak).
function catmullRomPath(pts) {
  if (pts.length < 2) return "";
  let d = `L${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

// Same bottom-edge RHYTHM as Footer's own wave (corner → valley → sharp
// center peak), just with the "bump" step Footer has between valley and
// corner removed — that's the whole difference: Footer oscillates twice
// per side (corner→bump→valley→peak), this is once per side
// (corner→valley→peak). Two separate catmullRomPath calls sharing the
// peak point (rather than one continuous curve through it) is what gives
// Footer's peak its genuine sharp vertex instead of a rounded crest —
// reused here for the same reason.
//
// Flipped vertically (y → 100−y) from the first pass: the peak and both
// waves now point UP into the navy (cream rises to a point at center)
// instead of the navy pointing down into the cream.
const RIGHT_BOTTOM = [1440, 55];
const VALLEY_RIGHT = [936, 80];
const PEAK = [720, 10];
const VALLEY_LEFT = [504, 80];
const LEFT_BOTTOM = [0, 55];

// Each catmullRomPath() call returns "L{start} C...{end}" — the leading
// "L{start}" of both calls is redundant here (the path already starts at
// that exact point via the initial M, or arrives there from the previous
// curve), so both are stripped down to just their "C..." portion.
const leftCurve = catmullRomPath([LEFT_BOTTOM, VALLEY_LEFT, PEAK]);
const rightCurve = catmullRomPath([PEAK, VALLEY_RIGHT, RIGHT_BOTTOM]);
const WAVE_D = `M${LEFT_BOTTOM[0]},${LEFT_BOTTOM[1]} ${leftCurve.slice(leftCurve.indexOf(" C"))} ${rightCurve.slice(rightCurve.indexOf(" C"))}`;

// No overflow-hidden on the section below — the photo and wave are both
// sized to stay within the section's own bounds anyway (inset-y-0/
// inset-x-0), so nothing relied on the clipping, and the Usia badge
// needs to safely overflow below the section into the content area
// underneath without getting cut off.
export default function JenjangDetailHero({
  photoSrc,
  heading = "SMP (Sekolah Menengah Pertama)",
  headingSizeClassName = "text-3xl sm:text-4xl",
  tagline = "Tempat terbaik untuk membentuk jati diri mereka.",
  description = "Lingkungan belajar yang islami dan suportif untuk mengembangkan potensi akademik, kepemimpinan, dan kepribadian remaja yang tangguh.",
  ageLabel = "12 - 15 Tahun",
}) {
  const reduceMotion = useReducedMotion();
  const textInitial = reduceMotion ? undefined : { opacity: 0, y: 16 };
  const textAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section className="relative" style={{ backgroundColor: ASSET_NAVY }}>
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 hidden w-1/2 md:block"
        style={{ backgroundColor: ASSET_NAVY }}
      >
        <img src={photoSrc} alt="" className="h-full w-full object-cover" style={{ maskImage: "linear-gradient(to right, transparent, black 32%)", WebkitMaskImage: "linear-gradient(to right, transparent, black 32%)" }} />
      </motion.div>

      <div className="absolute inset-0 md:hidden">
        <img src={photoSrc} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ backgroundColor: ASSET_NAVY, opacity: 0.8 }} />
      </div>

      {/* Centered between the left edge and the true center point — NOT
          mx-auto (that was the earlier bug: mx-auto centers this w-1/2
          box within the FULL section, i.e. the 25%-75% middle, instead
          of pinning it to the true left half at 0%-50%). Dropping
          mx-auto lets it sit naturally at the section's own left edge,
          so items-center then correctly centers the text block within
          just that left half (0-50%), landing its center at the 25%
          mark like requested. Text itself stays left-aligned. */}
      <div className="relative flex min-h-[420px] flex-col items-center justify-center px-6 py-20 text-left sm:min-h-[480px] md:min-h-[560px] md:w-1/2">
        {/* Single wrapping block so items-center centers the whole group
            as one unit — heading/tagline/description share one left
            edge. Without this wrapper, items-center centers each of the
            three lines INDIVIDUALLY (since they're separate flex
            children with different natural widths), which is exactly
            why a short heading like "TK (Taman Kanak-Kanak)" drifted out
            of alignment with the wider tagline/description below it. */}
        <div>
          <motion.h1
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className={`font-heading leading-[1.1] text-white ${headingSizeClassName}`}
          >
            {heading}
          </motion.h1>
          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
            className="font-heading mt-4 max-w-lg text-3xl leading-snug text-gold sm:text-4xl"
          >
            {tagline}
          </motion.p>
          <motion.p
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full sm:h-20 md:h-24"
      >
        <path d={`${WAVE_D} L1440,100 L0,100 Z`} fill="#FBF6EA" />
        <path d={WAVE_D} fill="none" stroke="#FDD000" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>

      <UsiaBadge ageLabel={ageLabel} />
    </section>
  );
}
