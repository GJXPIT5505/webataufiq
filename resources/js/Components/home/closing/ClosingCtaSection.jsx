import React from 'react';
import { Link } from "@inertiajs/react";
import { motion, useReducedMotion } from "framer-motion";
import { UserRound, CalendarDays, ArrowRight, Sparkle } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

const BG_SRC = "/images/closing/closing-cta-bg.png";

const RING_CENTER = { x: 47, y: 63 };
const SUN_FRACTION = { x: 47.5, y: 46.9 };

const RING_SPARKLES = [
  { x: -8, y: -6, size: 14, delay: "0s" },
  { x: 104, y: 8, size: 11, delay: "0.6s" },
  { x: 96, y: 92, size: 12, delay: "1.2s" },
];

function CornerOrnament() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-10 h-36 w-36 overflow-hidden rounded-br-[4rem] sm:h-44 sm:w-44 md:h-52 md:w-52"
    >
      <div className="absolute inset-0 bg-navy/15 backdrop-blur-[1px]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <defs>
          <pattern
            id="closing-corner-star"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20,4 L24,16 L36,20 L24,24 L20,36 L16,24 L4,20 L16,16 Z"
              fill="none"
              stroke="#FDD000"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#closing-corner-star)" />
      </svg>
      <div className="absolute inset-0 rounded-br-[4rem] border-b border-r border-gold/40" />
    </div>
  );
}

export default function ClosingCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <img
          src={BG_SRC}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-ivory/85 via-ivory/25 to-transparent" />

        <div
          id="closing-sun-handoff"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
          style={{ left: `${SUN_FRACTION.x}%`, top: `${SUN_FRACTION.y}%` }}
        />
      </div>

      <CornerOrnament />

      <div
        className="pointer-events-none absolute aspect-square w-[38%] max-w-[440px]"
        style={{
          left: `${RING_CENTER.x}%`,
          top: `${RING_CENTER.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-gold/60"
          style={{ boxShadow: "0 0 40px 6px rgba(253,208,0,0.35)" }}
          animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          aria-hidden="true"
          className="absolute -inset-3 rounded-full border border-gold/25"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 50, repeat: Infinity, ease: "linear" }
          }
        />
        {RING_SPARKLES.map((s, i) => (
          <Sparkle
            key={i}
            aria-hidden="true"
            className="animate-pulse absolute -translate-x-1/2 -translate-y-1/2 text-gold drop-shadow-[0_0_4px_rgba(253,208,0,0.8)]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto flex min-h-[560px] max-w-3xl flex-col items-center px-6 pb-14 pt-16 text-center sm:min-h-[640px] md:min-h-[760px] md:pb-20 md:pt-20">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-gold sm:text-base">
            ✦ Perjalanan Hebat Dimulai di Sini ✦
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-heading mt-4 text-4xl leading-[1.15] text-navy sm:text-5xl md:text-6xl">
            Saatnya Memulai Perjalanan{" "}
            <span className="text-gold">Ananda</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-5 flex max-w-[200px] items-center gap-3">
            <span className="h-px flex-1 bg-gold/50" />
            <Sparkle aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
            <span className="h-px flex-1 bg-gold/50" />
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-navy/80 sm:text-base">
            Bersama Attaufiq, tumbuh dalam ilmu, akhlak, dan prestasi untuk
            masa depan yang gemilang.
          </p>
        </Reveal>

        <div className="mt-auto flex w-full flex-col gap-3 pt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Reveal delay={0.32}>
            <Link
              href="/admission"
              className="flex items-center gap-3 rounded-full bg-navy py-2 pl-2 pr-5 shadow-lg shadow-navy/20 transition-colors duration-200 hover:bg-navy-dark"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <UserRound aria-hidden="true" className="h-5 w-5 text-white" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-white">
                  Daftarkan Ananda
                </span>
                <span className="block text-xs text-white/70">
                  Mulai Perjalanan Hebatnya
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 shrink-0 text-white" />
            </Link>
          </Reveal>

          <Reveal delay={0.4}>
            <Link
              href="/admission"
              className="flex items-center gap-3 rounded-full border border-gold/50 bg-ivory/90 py-2 pl-2 pr-5 shadow-lg shadow-navy/10 backdrop-blur-sm transition-colors duration-200 hover:bg-ivory"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10">
                <CalendarDays aria-hidden="true" className="h-5 w-5 text-navy" />
              </span>
              <span className="text-left">
                <span className="block text-sm font-bold leading-tight text-navy">
                  Jadwalkan Kunjungan
                </span>
                <span className="block text-xs text-navy/60">
                  Lihat Sekolah Lebih Dekat
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="ml-1 h-4 w-4 shrink-0 text-navy" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
