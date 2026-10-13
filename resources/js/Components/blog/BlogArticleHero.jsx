import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";

const ASSET_NAVY = "#002672";
const WAVE_D = "M0,55 Q720,100 1440,55";

export default function BlogArticleHero({
  photoLabel,
  photoSrc,
  categoryLabel,
  title,
  excerpt,
  readingTime,
  dateLabel,
  author,
}) {
  const reduceMotion = useReducedMotion();
  const textInitial = reduceMotion ? undefined : { opacity: 0, y: 16 };
  const textAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: ASSET_NAVY }}>
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-y-0 right-0 hidden w-1/2 md:block overflow-hidden"
        style={{
          backgroundColor: ASSET_NAVY,
          maskImage: "linear-gradient(to right, transparent, black 32%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 32%)",
        }}
      >
        {photoSrc ? (
          <img src={photoSrc} alt={title} className="h-full w-full object-cover" />
        ) : (
          <ImagePlaceholder label={photoLabel || `[ISI: Foto ${title}]`} className="h-full w-full" />
        )}
      </motion.div>

      <div className="absolute inset-0 md:hidden overflow-hidden">
        {photoSrc ? (
          <img src={photoSrc} alt={title} className="h-full w-full object-cover opacity-35" />
        ) : (
          <ImagePlaceholder label={photoLabel || `[ISI: Foto ${title}]`} className="h-full w-full opacity-35" />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: ASSET_NAVY, opacity: 0.8 }} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[calc(5rem+2cm)] w-1/2 sm:h-[calc(6rem+2cm)] md:block"
        style={{
          background: `linear-gradient(to bottom, ${ASSET_NAVY}, transparent)`,
          opacity: 0.4,
        }}
      />

      <div className="relative flex min-h-[420px] flex-col justify-center px-6 py-20 text-left sm:min-h-[480px] md:min-h-[520px] md:w-[calc(50%+7cm)]">
        <div className="max-w-xl md:ml-8 lg:ml-12" style={{ marginLeft: "clamp(0px, 4vw, 2cm)" }}>
          {categoryLabel && (
            <motion.span
              initial={textInitial}
              animate={textAnimate}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              className="inline-flex w-fit items-center rounded-full border border-gold/60 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold"
            >
              {categoryLabel}
            </motion.span>
          )}

          <motion.h1
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="font-heading mt-4 max-w-[calc(32rem+7cm)] text-3xl leading-[1.15] text-white sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>

          {excerpt && (
            <motion.p
              initial={textInitial}
              animate={textAnimate}
              transition={{ duration: 0.6, delay: 0.27, ease: "easeOut" }}
              className="mt-4 max-w-[calc(32rem+7cm)] text-sm leading-relaxed text-white/80 sm:text-base"
            >
              {excerpt}
            </motion.p>
          )}

          <motion.div
            initial={textInitial}
            animate={textAnimate}
            transition={{ duration: 0.6, delay: 0.39, ease: "easeOut" }}
            className="mt-6 flex flex-wrap items-center gap-5 text-xs text-white/70 sm:text-sm"
          >
            {readingTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {readingTime}
              </span>
            )}
            {dateLabel && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {dateLabel}
              </span>
            )}
            {author && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
                {author}
              </span>
            )}
          </motion.div>
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
    </section>
  );
}

