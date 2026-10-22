"use client";

import { useRef, useState } from "react";
import { Calendar, ChevronRight, FileText, Gift, Shirt, Sun, Users } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

// Three-layer composition: full-bleed wall photo (arched window, geometric shadow)
// as section background, marble podium standing on top of it, and three calendar cards
// standing on top of the podium — one per registration wave.
const periods = [
  {
    wave: "GELOMBANG 1",
    title: "Early Admission",
    dateRange: "1 Januari – 31 Maret 2026",
    description:
      "Kesempatan istimewa untuk bergabung lebih awal dan mendapatkan berbagai keuntungan terbaik.",
    benefits: [
      { icon: Gift, text: "Potongan biaya pendaftaran 25%" },
      { icon: Shirt, text: "Free seragam sekolah" },
      { icon: Users, text: "Prioritas kelas pilihan" },
      { icon: FileText, text: "Free konsultasi tumbuh kembang" },
    ],
    statusLabel: "Sedang Dibuka",
    statusOpen: true,
    cta: "Daftar Sekarang",
  },
  {
    wave: "GELOMBANG 2",
    title: "Regular Admission",
    dateRange: "1 April – 30 Juni 2026",
    description:
      "Periode reguler dengan kuota terbatas. Pastikan Ananda tidak kehabisan kesempatan.",
    benefits: [
      { icon: Gift, text: "Potongan biaya pendaftaran 15%" },
      { icon: Shirt, text: "Free seragam sekolah" },
      { icon: Users, text: "Prioritas kelas (sesuai kuota)" },
      { icon: FileText, text: "Free konsultasi tumbuh kembang" },
    ],
    statusLabel: "Sedang Dibuka",
    statusOpen: true,
    cta: "Daftar Sekarang",
  },
  {
    wave: "GELOMBANG 3",
    title: "Last Admission",
    dateRange: "1 Juli – 31 Agustus 2026",
    description:
      "Periode terakhir dengan kuota sangat terbatas sebelum tahun ajaran baru dimulai.",
    benefits: [
      { icon: Gift, text: "Potongan biaya pendaftaran 10%" },
      { icon: Shirt, text: "Free seragam sekolah" },
      { icon: Users, text: "Kelas menyesuaikan ketersediaan" },
      { icon: FileText, text: "Free konsultasi tumbuh kembang" },
    ],
    statusLabel: "Akan Dibuka",
    statusOpen: false,
    cta: "Nantikan Informasi",
  },
];

function CalendarCard({ period, delay, isMobile = false }) {
  return (
    <Reveal
      delay={delay}
      className="shrink-0"
      style={!isMobile ? { width: "clamp(19.44rem, 18vw + 13.5rem, 24.84rem)" } : { width: "100%" }}
    >
      <div
        className="relative w-full drop-shadow-xl"
        style={{ aspectRatio: "1102 / 1427" }}
      >
        <img
          src="/images/admission/periode-calendar-v2.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />

        <div
          className="absolute inset-x-0 flex flex-col items-center text-center"
          style={{
            top: "calc(16% + 1.6cm)",
            paddingLeft: isMobile ? "calc(8% + 0.5cm)" : "calc(9% + 1cm)",
            paddingRight: isMobile ? "calc(8% + 0.5cm)" : "calc(9% + 1cm)",
          }}
        >
          {/* Sun icon, wave label, and title, raised 1cm as one unit */}
          <div className="relative flex flex-col items-center" style={{ top: "-1cm" }}>
            <Sun aria-hidden="true" className="h-4 w-4 text-gold" />

            <span className="mt-2 text-[11px] font-bold uppercase tracking-wide text-gold sm:text-xs">
              {period.wave}
            </span>
            <h3 className="font-heading mt-0.5 text-base leading-tight text-navy sm:text-xl">
              {period.title}
            </h3>
          </div>

          <span
            className="relative mt-2 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold text-navy sm:text-[11px]"
            style={{ top: "-0.8cm" }}
          >
            <Calendar aria-hidden="true" className="h-3 w-3 text-gold" />
            {period.dateRange}
          </span>

          {/* Description through benefits list, raised 0.2cm as one unit */}
          <div className="relative flex w-full flex-col items-center" style={{ top: "-0.2cm" }}>
            <p
              className="mt-2 leading-snug text-navy/70"
              style={{
                marginLeft: isMobile ? "-0.1cm" : "-0.3cm",
                marginRight: isMobile ? "-0.1cm" : "-0.3cm",
                fontSize: isMobile ? "12px" : "13.5px",
              }}
            >
              {period.description}
            </p>

            <div className="mt-2 flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-gold/30" />
              <Sun aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-gold/60" />
              <span className="h-px flex-1 bg-gold/30" />
            </div>

            <ul
              className="mt-2 w-full space-y-0.5 text-left"
              style={{
                paddingLeft: isMobile ? "0.2cm" : "0.4cm",
                paddingRight: isMobile ? "0.2cm" : "0.4cm",
              }}
            >
              {period.benefits.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-1.5 leading-tight text-navy/80"
                  style={{ fontSize: isMobile ? "11.5px" : "12.5px" }}
                >
                  <b.icon aria-hidden="true" className="h-3 w-3 shrink-0 text-gold" />
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA — pinned to a fixed spot on the card */}
        <span
          className="absolute inset-x-0 flex items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2 text-[11px] font-semibold text-white sm:text-xs"
          style={{
            bottom: "calc(8% + 0.8cm)",
            left: isMobile ? "calc(8% + 0.6cm)" : "calc(9% + 1cm)",
            right: isMobile ? "calc(8% + 0.6cm)" : "calc(9% + 1cm)",
          }}
        >
          Daftar Sekarang
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </div>
    </Reveal>
  );
}

export default function PeriodeSection() {
  const [activeMobileWave, setActiveMobileWave] = useState(0);
  const scrollRef = useRef(null);

  const scrollToWave = (index) => {
    setActiveMobileWave(index);
    if (scrollRef.current && scrollRef.current.children[index]) {
      const targetCard = scrollRef.current.children[index];
      targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-28">
      {/* Raised 6cm above this section's own top edge */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: "-6cm" }}>
        <img
          src="/images/admission/periode-bg-wall.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {/* Light ivory wash */}
      <div className="absolute inset-x-0 bottom-0 bg-ivory/55" style={{ top: "-6cm" }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="relative top-0 md:-top-[2cm] lg:-top-[4cm]">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Periode Pendaftaran
            </span>
            <h2 className="font-heading mt-3 text-3xl leading-[1.1] text-navy sm:text-4xl md:text-5xl">
              Pilih Periode Pendaftaran
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-navy/70 sm:mt-4 sm:text-sm md:text-base">
              Setiap langkah besar dimulai dari keputusan hari ini.
              <br className="hidden sm:inline" />
              {" "}Pilih periode terbaik untuk memulai perjalanan Ananda di Attaufiq.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Mobile/Tablet View (< 1024px) */}
      <div className="relative mt-8 block w-full px-4 sm:mt-12 lg:hidden">
        {/* Wave quick switcher on mobile */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {periods.map((p, i) => (
            <button
              key={p.wave}
              type="button"
              onClick={() => scrollToWave(i)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all cursor-pointer ${
                activeMobileWave === i
                  ? "bg-navy text-gold shadow-sm scale-105"
                  : "bg-white/80 text-navy/70 border border-gold/30 hover:bg-gold/10"
              }`}
            >
              {p.wave}
            </button>
          ))}
        </div>

        {/* Swipeable cards container */}
        <div
          ref={scrollRef}
          onScroll={(e) => {
            const el = e.currentTarget;
            const scrollLeft = el.scrollLeft;
            const itemWidth = el.scrollWidth / periods.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            if (newIndex >= 0 && newIndex < periods.length && newIndex !== activeMobileWave) {
              setActiveMobileWave(newIndex);
            }
          }}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none justify-start sm:justify-center items-end"
        >
          {periods.map((p, i) => (
            <div key={p.wave} className="snap-center shrink-0 w-[285px] sm:w-[320px]">
              <CalendarCard period={p} delay={0.1 * i} isMobile />
            </div>
          ))}
        </div>

        {/* Podium base */}
        <div className="relative mx-auto mt-2 aspect-[1460/270] w-full max-w-2xl">
          <img
            src="/images/admission/periode-podium-v2.png"
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Desktop View (>= 1024px): 100% original pixel-perfect layout */}
      <div
        className="relative left-1/2 hidden w-screen -translate-x-1/2 lg:block"
        style={{ marginTop: "21rem" }}
      >
        <div className="relative mx-auto max-w-[96vw]">
          <Reveal delay={0.15} className="w-full">
            <div className="relative aspect-[1460/270] w-full">
              <img
                src="/images/admission/periode-podium-v2.png"
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </Reveal>

          <div
            className="absolute inset-x-0 z-10 flex items-end justify-center gap-4 sm:gap-6"
            style={{ bottom: "calc(85% - 0.5cm)" }}
          >
            {periods.map((p, i) => (
              <CalendarCard key={p.wave} period={p} delay={0.25 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
