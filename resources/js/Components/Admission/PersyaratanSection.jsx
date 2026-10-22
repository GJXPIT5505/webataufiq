"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Blocks, CheckCircle2, ChevronRight, Sun } from "lucide-react";
import Reveal from "@/Components/home/Reveal";
import { ARCH_PATH, PgtkIcon, SdIcon, SmaIcon, SmpIcon } from "@/Components/about/FaqSection";
import { FooterArchLineArt } from "@/Components/Footer";
import SectionBox from "@/Components/jenjang/SectionBox";

function PgIcon() {
  return <Blocks aria-hidden="true" className="h-full w-full" strokeWidth={1.6} />;
}

const JENJANG = [
  { name: "PG", subtitle: "Playgroup", icon: PgIcon },
  { name: "TK", subtitle: "Taman Kanak-kanak", icon: PgtkIcon },
  { name: "SD", subtitle: "Sekolah Dasar", icon: SdIcon },
  { name: "SMP", subtitle: "Sekolah Menengah Pertama", icon: SmpIcon },
  { name: "SMA", subtitle: "Sekolah Menengah Atas", icon: SmaIcon },
];

const CATATAN_PENTING = [
  {
    title: "Semua berkas",
    description: "Wajib dalam format PDF atau JPG, ukuran max 2MB per file.",
  },
  {
    title: "Pastikan data",
    description: "Yang diunggah jelas dan dapat dibaca dengan baik.",
  },
  {
    title: "Berkas asli",
    description: "Wajib dibawa saat verifikasi di sekolah.",
  },
];

const REQUIREMENTS_BY_JENJANG = {
  PG: {
    left: [
      { name: "Fotokopi Akta Kelahiran", description: "1 lembar dokumen resmi yang jelas dan terbaca" },
      { name: "Fotokopi Kartu Keluarga (KK)", description: "1 lembar Kartu Keluarga domisili terbaru" },
      { name: "Fotokopi KTP Orang Tua", description: "Ayah dan Ibu masing-masing 1 lembar" },
    ],
    right: [
      { name: "Pas Foto Berwarna Terbaru", description: "Ukuran 3x4 berwarna sebanyak 2 lembar" },
      { name: "Formulir Pendaftaran", description: "Telah diisi lengkap secara online atau fisik" },
      { name: "Buku KIA / Riwayat Tumbuh Kembang", description: "Catatan imunisasi dan kesehatan tumbuh kembang anak" },
    ],
  },
  TK: {
    left: [
      { name: "Fotokopi Akta Kelahiran", description: "1 lembar (usia minimal 4 tahun TK-A, 5 tahun TK-B)" },
      { name: "Fotokopi Kartu Keluarga (KK)", description: "1 lembar Kartu Keluarga domisili terbaru" },
      { name: "Fotokopi KTP Orang Tua", description: "Ayah dan Ibu masing-masing 1 lembar" },
    ],
    right: [
      { name: "Pas Foto Berwarna Terbaru", description: "Ukuran 3x4 berwarna sebanyak 2 lembar" },
      { name: "Surat Keterangan Playgroup", description: "1 lembar dari sekolah asal (jika sebelumnya PG)" },
      { name: "Formulir Pendaftaran", description: "Telah diisi lengkap dan ditandatangani orang tua" },
    ],
  },
  SD: {
    left: [
      { name: "Fotokopi Akta Kelahiran", description: "1 lembar (usia minimal 6 tahun per 1 Juli tahun berjalan)" },
      { name: "Fotokopi Kartu Keluarga (KK)", description: "1 lembar Kartu Keluarga domisili terbaru" },
      { name: "Fotokopi KTP Orang Tua", description: "Ayah dan Ibu masing-masing 1 lembar" },
    ],
    right: [
      { name: "Pas Foto Berwarna Terbaru", description: "Ukuran 3x4 berwarna sebanyak 3 lembar" },
      { name: "Ijazah TK / Surat Keterangan", description: "Fotokopi ijazah atau surat keterangan lulus TK" },
      { name: "Surat Keterangan Sehat", description: "Dari dokter atau klinik/puskesmas terdekat" },
    ],
  },
  SMP: {
    left: [
      { name: "Fotokopi Akta Kelahiran & KK", description: "Masing-masing 1 lembar dokumen legalisir" },
      { name: "Fotokopi KTP Orang Tua", description: "Ayah dan Ibu masing-masing 1 lembar" },
      { name: "Rapor SD Kelas 4 - 5", description: "Fotokopi rapor semester terakhir yang dilegalisir" },
    ],
    right: [
      { name: "Pas Foto Berwarna Terbaru", description: "Ukuran 3x4 latar biru/merah sebanyak 3 lembar" },
      { name: "Surat Keterangan Lulus / Ijazah SD", description: "Asli dan fotokopi legalisir dari SD asal" },
      { name: "Sertifikat Prestasi & Tahfidz", description: "Piagam penghargaan atau hafalan Qur'an (jika ada)" },
    ],
  },
  SMA: {
    left: [
      { name: "Fotokopi Akta Kelahiran & KK", description: "Masing-masing 1 lembar dokumen legalisir" },
      { name: "Fotokopi KTP Orang Tua", description: "Ayah dan Ibu masing-masing 1 lembar" },
      { name: "Rapor SMP Kelas 7 - 8", description: "Fotokopi rapor semester terakhir yang dilegalisir" },
    ],
    right: [
      { name: "Pas Foto Berwarna Terbaru", description: "Ukuran 3x4 latar belakang merah sebanyak 3 lembar" },
      { name: "Surat Keterangan Lulus / Ijazah SMP", description: "Asli dan fotokopi legalisir dari SMP asal" },
      { name: "Sertifikat Prestasi & Tahfidz", description: "Dokumen sertifikat jalur prestasi atau beasiswa" },
    ],
  },
};

function PersyaratanTab({ active, Icon, name, subtitle, isDesktop }) {
  const archWidth = isDesktop ? 195 : 160;
  const archHeight = isDesktop ? 220 : 185;
  const iconSize = isDesktop ? 41 : 32;
  const sunSize = isDesktop ? 18 : 14;
  const nameSize = isDesktop ? 18 : 15;
  const subtitleSize = isDesktop ? 12 : 10.5;

  return (
    <div
      className="relative shrink-0"
      style={{
        width: archWidth,
        height: archHeight,
        filter: "drop-shadow(0 12px 22px rgba(16,35,128,0.28))",
      }}
    >
      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d={ARCH_PATH} fill={active ? "#102380" : "#FBF6EA"} />
        <path
          d={ARCH_PATH}
          fill="none"
          stroke="#FDD000"
          strokeWidth={4}
          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
        />
      </svg>

      <div className="relative flex h-full flex-col items-center px-2 text-center" style={{ paddingTop: "24%" }}>
        {active && (
          <Sun
            aria-hidden="true"
            className="relative mb-1.5 shrink-0 text-gold"
            style={{ width: sunSize, height: sunSize, top: isDesktop ? "-0.5cm" : "-0.3cm" }}
          />
        )}
        <div
          className="shrink-0"
          style={{ width: iconSize, height: iconSize, color: active ? "#ffffff" : "#8B7048" }}
        >
          <Icon />
        </div>
        <span
          className="font-heading mt-2 font-bold leading-none"
          style={{ fontSize: nameSize, color: active ? "#ffffff" : "#102380" }}
        >
          {name}
        </span>
        <span
          className="mt-1.5 leading-tight"
          style={{
            fontSize: subtitleSize,
            color: active ? "rgba(255,255,255,0.7)" : "rgba(16,35,128,0.5)",
          }}
        >
          {subtitle}
        </span>
      </div>

      <span
        className={`absolute inline-flex items-center gap-1.5 whitespace-nowrap font-semibold ${
          active ? "bg-gold text-navy" : "border border-gold/40 text-navy"
        }`}
        style={{
          bottom: "calc(7% + 0.3cm)",
          left: "50%",
          transform: "translateX(-50%)",
          paddingLeft: 9.64,
          paddingRight: 9.64,
          paddingTop: 4.82,
          paddingBottom: 4.82,
          fontSize: isDesktop ? 9.64 : 8.36,
          borderRadius: 8,
        }}
      >
        Lihat Persyaratan
        <ChevronRight aria-hidden="true" style={{ width: 9.64, height: 9.64 }} />
      </span>
    </div>
  );
}

export default function PersyaratanSection() {
  const [active, setActive] = useState(0);
  const currentJenjang = JENJANG[active];
  const ActiveIcon = currentJenjang.icon;
  const currentReqs = REQUIREMENTS_BY_JENJANG[currentJenjang.name] || REQUIREMENTS_BY_JENJANG.SD;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const titleRef = useRef(null);
  const [dividerTop, setDividerTop] = useState(undefined);
  useEffect(() => {
    if (titleRef.current) {
      setDividerTop(titleRef.current.offsetTop + titleRef.current.offsetHeight);
    }
  }, [active, isDesktop]);

  return (
    <section className="relative py-16 sm:py-20 md:py-28">
      <style>{`
        .persyaratan-tab-btn { transition: transform 0.2s ease; }
        .persyaratan-tab-btn:hover { transform: translateY(-6px); }
      `}</style>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 w-screen -translate-x-1/2"
            style={{ top: isDesktop ? "-7rem" : "-5rem" }}
          >
            <img
              src="/images/admission/persyaratan-bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>

          <Reveal className="relative mx-auto max-w-2xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Persyaratan Pendaftaran
            </span>
            <h2 className="font-heading mt-4 text-3xl leading-[1.15] text-navy sm:text-4xl md:text-5xl">
              Pilih Jenjang Pendidikan
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-navy/70 sm:text-sm md:text-base">
              Setiap jenjang memiliki persyaratan yang berbeda.
              <br />
              Silakan pilih jenjang yang sesuai untuk melihat detail persyaratan.
            </p>
          </Reveal>

          {/* Arched tabs: horizontally swipeable on mobile/tablet, centered on desktop */}
          <div
            className="relative mx-auto mt-10 sm:mt-12 flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 scrollbar-none snap-x snap-mandatory justify-start lg:justify-center sm:gap-6 lg:gap-8 lg:overflow-visible lg:mx-0 lg:px-0"
            style={{
              marginLeft: isDesktop ? "-4cm" : undefined,
              marginRight: isDesktop ? "-4cm" : undefined,
            }}
          >
            {JENJANG.map((j, i) => {
              const isActive = active === i;
              return (
                <div key={j.name} className="snap-center shrink-0">
                  <Reveal delay={i * 0.08}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      className="persyaratan-tab-btn flex cursor-pointer flex-col items-center"
                    >
                      <PersyaratanTab
                        active={isActive}
                        Icon={j.icon}
                        name={j.name}
                        subtitle={j.subtitle}
                        isDesktop={isDesktop}
                      />
                    </button>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel with 4-column SectionBox */}
        <Reveal
          delay={0.1}
          className="mt-8 sm:mt-10"
          style={{
            marginLeft: isDesktop ? "-4cm" : undefined,
            marginRight: isDesktop ? "-4cm" : undefined,
          }}
        >
          <SectionBox>
            <motion.div
              key={active}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-4">
                {/* Column 1: Left Navy Card */}
                <div className="flex flex-col items-center gap-6 bg-navy px-6 pb-6 pt-8 text-center sm:pb-8 lg:col-span-1">
                  {/* Row 1 — mini arch with active icon */}
                  <div className="flex w-full max-w-[220px] items-center gap-3">
                    <div className="relative shrink-0" style={{ width: 56, height: 68 }}>
                      <svg viewBox="0 0 245 299" className="absolute inset-0 h-full w-full" aria-hidden="true">
                        <path
                          d={ARCH_PATH}
                          fill="none"
                          stroke="#FDD000"
                          strokeWidth={4}
                          transform="translate(122.5,149.5) scale(0.93) translate(-122.5,-149.5)"
                        />
                      </svg>
                      <div
                        className="relative flex h-full items-center justify-center"
                        style={{ paddingTop: "22%" }}
                      >
                        <div style={{ width: 24, height: 24, color: "#ffffff" }}>
                          <ActiveIcon />
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-heading text-2xl font-bold text-white">
                        {currentJenjang.name}
                      </p>
                      <p className="text-sm text-white/60">{currentJenjang.subtitle}</p>
                    </div>
                  </div>

                  {/* Row 2 — fade line / sun / fade line */}
                  <div className="flex w-full max-w-[180px] items-center gap-3">
                    <span
                      className="h-px flex-1"
                      style={{ background: "linear-gradient(to right, transparent, #FDD000)" }}
                    />
                    <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                    <span
                      className="h-px flex-1"
                      style={{ background: "linear-gradient(to right, #FDD000, transparent)" }}
                    />
                  </div>

                  {/* Row 3 — Tagline image */}
                  <div className="relative w-full max-w-[220px]" style={{ aspectRatio: "3192 / 1468" }}>
                    <img
                      src="/images/admission/persyaratan-tagline.png"
                      alt="Memberi Arti itu Attaufiq"
                      className="h-full w-full object-contain"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>

                  {/* Row 4 — FooterArchLineArt */}
                  <FooterArchLineArt domeOnly className="w-full max-w-[160px]" />
                </div>

                {/* Column 2 & 3: Requirements Checklist */}
                <div className="relative p-6 sm:p-8 lg:col-span-2">
                  {isDesktop && (
                    <div
                      className="absolute w-px bg-gold/30"
                      style={{
                        left: "calc(50% + 1cm)",
                        top: dividerTop !== undefined ? dividerTop + 37.7952755906 : undefined,
                        bottom: "1.5cm",
                      }}
                    />
                  )}

                  <h3
                    ref={titleRef}
                    className="font-heading text-2xl text-navy sm:text-3xl text-center sm:text-left"
                  >
                    Persyaratan Pendaftaran {currentJenjang.name}
                  </h3>

                  <div
                    className="flex flex-col sm:flex-row"
                    style={{ marginTop: isDesktop ? "1cm" : "1.5rem", gap: "2rem" }}
                  >
                    <div
                      className="flex flex-col"
                      style={{
                        width: isDesktop ? "calc(50% + 1cm - 1rem)" : "100%",
                        gap: isDesktop ? "calc(1rem + 0.5cm)" : "1rem",
                      }}
                    >
                      {currentReqs.left.map((item) => (
                        <div key={item.name} className="flex items-start gap-2.5">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-navy/70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex flex-col"
                      style={{
                        width: isDesktop ? "calc(50% - 1cm - 1rem)" : "100%",
                        gap: isDesktop ? "calc(1rem + 0.5cm)" : "1rem",
                      }}
                    >
                      {currentReqs.right.map((item) => (
                        <div key={item.name} className="flex items-start gap-2.5">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.name}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-navy/70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 4: Catatan Penting */}
                <div className="p-6 sm:p-8 lg:col-span-1">
                  <div
                    className="relative h-full overflow-hidden rounded-2xl border p-5"
                    style={{ borderColor: "rgba(253, 208, 0, 0.4)", backgroundColor: "#F3ECD9" }}
                  >
                    <img
                      src="/images/about/building-cropped.png"
                      alt=""
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-auto w-full object-cover object-bottom"
                      style={{
                        opacity: 0.4,
                        transform: "scale(1.1) translateY(22px)",
                        transformOrigin: "bottom center",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                      }}
                    />

                    <div className="relative z-10 flex flex-col gap-4">
                      <p className="font-heading text-center text-lg font-bold text-navy">
                        Catatan Penting
                      </p>

                      <div className="flex items-center gap-2">
                        <span
                          className="h-px flex-1"
                          style={{ background: "linear-gradient(to right, transparent, #FDD000)" }}
                        />
                        <Sun aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-gold" />
                        <span
                          className="h-px flex-1"
                          style={{ background: "linear-gradient(to right, #FDD000, transparent)" }}
                        />
                      </div>

                      {CATATAN_PENTING.map((item) => (
                        <div key={item.title} className="flex items-start gap-2.5">
                          <AlertCircle
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          />
                          <div>
                            <p className="text-sm font-semibold text-navy">{item.title}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-navy/70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
