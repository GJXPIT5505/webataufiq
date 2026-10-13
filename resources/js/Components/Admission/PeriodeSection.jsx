"use client";

import { Calendar, ChevronRight, FileText, Gift, Shirt, Sun, Users } from "lucide-react";
import Reveal from "@/Components/home/Reveal";

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

function CalendarCard({ period, delay }) {
  return (
    <Reveal
      delay={delay}
      className="w-full max-w-[320px] shrink-0 sm:max-w-[360px] lg:max-w-[380px]"
    >
      <div className="relative aspect-[1102/1427] w-full drop-shadow-md">
        <img
          src="/images/admission/periode-calendar-v2.png"
          alt=""
          className="h-full w-full object-contain"
        />

        <div className="absolute inset-x-0 top-[16%] flex flex-col items-center px-6 text-center sm:px-8">
          {/* Header Card */}
          <div className="flex flex-col items-center">
            <Sun aria-hidden="true" className="h-4 w-4 text-[#fdd000]" />
            <span className="mt-1.5 text-[11px] font-bold uppercase tracking-wide text-[#fdd000] sm:text-xs">
              {period.wave}
            </span>
            <h3 className="font-serif mt-0.5 text-lg font-bold leading-tight text-[#102380] sm:text-xl">
              {period.title}
            </h3>
          </div>

          {/* Date Badge */}
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#fdd000]/50 bg-[#fdd000]/10 px-2.5 py-1 text-[10px] font-semibold text-[#102380] sm:text-[11px]">
            <Calendar aria-hidden="true" className="h-3 w-3 text-[#fdd000]" />
            {period.dateRange}
          </span>

          {/* Description & Benefits */}
          <div className="mt-2 flex w-full flex-col items-center">
            <p className="text-[12px] leading-snug text-[#102380]/70 sm:text-[13.5px]">
              {period.description}
            </p>

            <div className="my-2 flex w-full items-center gap-2">
              <span className="h-px flex-1 bg-[#fdd000]/40" />
              <Sun aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-[#fdd000]/70" />
              <span className="h-px flex-1 bg-[#fdd000]/40" />
            </div>

            <ul className="w-full space-y-1 px-1 text-left">
              {period.benefits.map((b) => (
                <li
                  key={b.text}
                  className="flex items-center gap-1.5 text-[11px] leading-tight text-[#102380]/85 sm:text-[12.5px]"
                >
                  <b.icon aria-hidden="true" className="h-3 w-3 shrink-0 text-[#fdd000]" />
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Button Link */}
        <a
          href="#"
          className="group absolute bottom-[8%] left-8 right-8 flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-[#102380] px-4 py-2 text-[11px] font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1830A8] hover:shadow-lg hover:shadow-[#102380]/25 active:translate-y-0 sm:text-xs"
        >
          {period.cta}
          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </Reveal>
  );
}

export default function PeriodeSection() {
  return (
    <section className="relative -mt-40 pt-48 pb-16 md:-mt-64 md:pt-72 md:pb-24">
      {/* Background Wall Image - Menggunakan object-fill/left agar motif kubah kiri tidak terpotong */}
      <div className="absolute inset-x-0 -top-40 bottom-0 z-0 md:-top-64">
        <img
          src="/images/admission/periode-bg-wall.png"
          alt=""
          className="h-full w-full object-fill object-left opacity-90"
        />
      </div>

      {/* Light Tint Overlay yang sangat tipis agar tekstur wall & kubah jelas terlihat */}
      <div className="absolute inset-x-0 -top-40 bottom-0 z-0 bg-[#FFFDF5]/20 md:-top-64" />

      {/* Header Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <div>
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-[#fdd000]" />
            <span className="mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#fdd000]">
              Periode Pendaftaran
            </span>
            <h2 className="font-serif mt-3 text-3xl font-bold leading-[1.15] text-[#102380] sm:text-4xl md:text-5xl">
              Pilih Periode Pendaftaran
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#102380]/70 sm:text-base">
              Setiap langkah besar dimulai dari keputusan hari ini.
              <br className="hidden sm:inline" />
              Pilih periode terbaik untuk memulai perjalanan Ananda di Attaufiq.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Podium + Calendar Cards */}
      <div className="relative z-10 mx-auto mt-8 max-w-7xl px-4 md:mt-12">
        <div className="relative w-full">
          {/* Calendar Row */}
          <div className="relative z-10 flex flex-wrap items-end justify-center gap-4 sm:gap-6">
            {periods.map((p, i) => (
              <CalendarCard key={p.wave} period={p} delay={0.25 + i * 0.1} />
            ))}
          </div>

          {/* Podium Image */}
          <div className="-mt-12 relative aspect-[1460/270] w-full md:-mt-20">
            <Reveal delay={0.15}>
              <img
                src="/images/admission/periode-podium-v2.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
