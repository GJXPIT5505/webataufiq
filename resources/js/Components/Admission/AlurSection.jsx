"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  Info,
  Lightbulb,
  Megaphone,
  Sun,
  Users,
} from "lucide-react";
import Reveal from "@/Components/home/Reveal";

const steps = [
  {
    icon: Info,
    label: "Informasi",
    badge: "LANGKAH 01",
    title: "Informasi",
    description:
      "Pelajari informasi lengkap seputar program, jenjang, dan alur pendaftaran sebelum memulai proses pendaftaran Ananda.",
    checklistLeft: ["Profil sekolah & program", "Jenjang yang tersedia", "Jadwal penerimaan"],
    checklistRight: ["Syarat & dokumen", "Biaya pendaftaran"],
    note: "Hubungi tim kami jika ada pertanyaan sebelum mendaftar.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-1-v2.png",
  },
  {
    icon: FileText,
    label: "Registrasi",
    badge: "LANGKAH 02",
    title: "Registrasi",
    description:
      "Lakukan registrasi dengan melengkapi formulir pendaftaran online. Pastikan semua informasi yang diisi sudah benar.",
    checklistLeft: ["Data pribadi Ananda", "Data orang tua/wali", "Periode pendaftaran yang dipilih"],
    checklistRight: ["Informasi kontak aktif", "Pilih jenjang dan program"],
    note: "Anda dapat menyimpan data registrasi sementara dan melanjutkan kembali kapan saja.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-2-v2.png",
  },
  {
    icon: Users,
    label: "Observasi & Wawancara",
    badge: "LANGKAH 03",
    title: "Observasi & Wawancara",
    description:
      "Ananda akan mengikuti sesi observasi dan wawancara sesuai jadwal yang ditentukan oleh tim Attaufiq.",
    checklistLeft: ["Jadwal observasi & wawancara", "Lokasi pelaksanaan tes"],
    checklistRight: ["Hal yang perlu dibawa", "Pendampingan orang tua/wali"],
    note: "Jadwal sesi observasi dan wawancara akan dikonfirmasi melalui WhatsApp resmi tim admission.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-3-v2.png",
  },
  {
    icon: Megaphone,
    label: "Admission",
    badge: "LANGKAH 04",
    title: "Admission",
    description:
      "Hasil penerimaan (admission) Ananda akan diumumkan melalui kontak dan portal yang telah didaftarkan sebelumnya.",
    checklistLeft: ["Tanggal pengumuman penerimaan", "Surat keputusan hasil seleksi"],
    checklistRight: ["Cara melihat hasil di portal", "Notifikasi WhatsApp resmi"],
    note: "Hasil seleksi diterbitkan maksimal 3 hari kerja setelah pelaksanaan tes.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-4-v2.png",
  },
  {
    icon: GraduationCap,
    label: "School Preparation",
    badge: "LANGKAH 05",
    title: "School Preparation",
    description:
      "Selesaikan proses daftar ulang dan persiapkan kebutuhan sekolah agar Ananda siap memulai tahun ajaran di Attaufiq.",
    checklistLeft: ["Berkas daftar ulang", "Jadwal orientasi (MPLS)"],
    checklistRight: ["Perlengkapan sekolah", "Pengukuran & seragam"],
    note: "Batas waktu konfirmasi dan daftar ulang adalah 7 hari kerja setelah pengumuman.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-5-v2.png",
  },
];

export default function AlurSection() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  const go = (dir) => setActive((p) => (p + dir + steps.length) % steps.length);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const cardGridColumns = isDesktop ? "13rem 1fr 16rem" : "1fr";

  const checklistLeft = step.checklistLeft;
  const checklistRight = step.checklistRight;

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const checklistBoxRef = useRef(null);
  const checklistGridRef = useRef(null);
  const catatanBoxRef = useRef(null);
  const [refHeights, setRefHeights] = useState({});

  useEffect(() => {
    if (active === 0) {
      const titleHeight = titleRef.current?.getBoundingClientRect().height;
      setRefHeights({
        titleOffset: titleHeight !== undefined ? titleHeight + 8 : undefined,
        desc: descRef.current?.getBoundingClientRect().height,
        checklistBox: checklistBoxRef.current?.getBoundingClientRect().height,
        checklistGrid: checklistGridRef.current?.getBoundingClientRect().height,
        catatanBox: catatanBoxRef.current?.getBoundingClientRect().height,
      });
    }
  }, [active, isDesktop]);

  const CM_PX = 37.7952755906;

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20 md:py-28">
      {/* Background decorative lattice frame */}
      <div className="pointer-events-none absolute inset-x-0 top-0 w-full">
        <img
          src="/images/admission/alur-pattern-frame.png"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-navy/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative mx-auto max-w-4xl">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Alur Pendaftaran
            </span>
            <h2 className="font-heading mt-4 text-3xl leading-[1.15] text-white sm:text-4xl md:text-5xl sm:whitespace-nowrap">
              5 Langkah Mudah Menuju Attaufiq
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-white/70 sm:text-sm md:text-base">
              Ikuti tahapan pendaftaran berikut dengan mudah
              <br />
              dan pastikan Ananda menjadi bagian dari keluarga besar Attaufiq.
            </p>
            <div className="mx-auto mt-6 flex max-w-[220px] items-center gap-3">
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
          </Reveal>
        </div>

        {/* Stepper with connecting line - horizontally responsive */}
        <Reveal delay={0.1} className="relative mt-12 sm:mt-16">
          <div className="overflow-x-auto pb-4 pt-3 -mx-4 px-4 scrollbar-none sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="relative flex min-w-[500px] sm:min-w-0 items-start justify-between">
              <div
                className="absolute inset-x-6 top-8 bg-gold/30 sm:inset-x-10 sm:top-10 md:top-12"
                style={{ height: "3px" }}
              />
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-2.5 sm:gap-3 cursor-pointer z-10"
                  >
                    <span
                      className={`relative grid h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 place-items-center rounded-full border-2 bg-white transition-all ${
                        isActive ? "border-gold shadow-lg scale-105" : "border-gold/40 hover:border-gold/70"
                      }`}
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <s.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-navy sm:h-7 sm:w-7 md:h-8 md:w-8"
                      />
                      <span className="absolute left-1/2 top-0 grid h-5 w-5 sm:h-6 sm:w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-[10px] sm:text-[11px] font-bold text-navy">
                        {i + 1}
                      </span>
                    </span>
                    <span
                      className={`text-center text-xs sm:text-sm font-medium transition-colors ${
                        isActive ? "text-gold font-bold" : "text-white/70"
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Active step detail card */}
        <Reveal
          key={active}
          delay={0.05}
          className="mt-8 sm:mt-10"
          style={{
            marginLeft: isDesktop ? "-3cm" : undefined,
            marginRight: isDesktop ? "-3cm" : undefined,
          }}
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-white px-5 pt-12 shadow-2xl sm:px-8 sm:pt-14"
            style={{ paddingBottom: isDesktop ? "32px" : "24px" }}
          >
            {/* Pill top edge sits flush with card top edge */}
            <span
              className="absolute left-5 top-0 inline-flex bg-gold font-bold uppercase tracking-wide text-navy sm:left-8"
              style={{
                paddingLeft: "19.2px",
                paddingRight: "19.2px",
                paddingTop: "7.2px",
                paddingBottom: "7.2px",
                fontSize: "14.4px",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: "24px",
                borderBottomRightRadius: "24px",
              }}
            >
              {step.badge}
            </span>

            <div
              className="grid gap-6 md:gap-8 items-start"
              style={{ gridTemplateColumns: cardGridColumns }}
            >
              <div
                className="relative mx-auto shrink-0 overflow-hidden rounded-full bg-lightblue/10 md:mx-0"
                style={{ width: "166px", height: "166px", alignSelf: isDesktop ? "center" : "auto" }}
              >
                <img
                  src={step.image}
                  alt=""
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div
                className="min-w-0"
                style={
                  isDesktop
                    ? {
                        borderRight: "1px solid rgba(253, 208, 0, 0.3)",
                        paddingRight: "2rem",
                      }
                    : undefined
                }
              >
                <h3
                  ref={titleRef}
                  className="font-heading text-2xl leading-tight text-navy sm:text-3xl text-center md:text-left"
                >
                  {step.title}
                </h3>
                <p
                  ref={descRef}
                  className="mt-2 text-xs leading-relaxed text-navy/70 sm:text-sm md:text-base text-center md:text-left"
                  style={isDesktop && refHeights.desc ? { minHeight: refHeights.desc } : undefined}
                >
                  {step.description}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-gold/30" />
                  <Sun aria-hidden="true" className="h-3 w-3 shrink-0 text-gold" />
                  <span className="h-px flex-1 bg-gold/30" />
                </div>

                <div
                  ref={checklistBoxRef}
                  className="mt-4 rounded-2xl border border-gold/40 p-4"
                  style={
                    isDesktop && refHeights.checklistBox
                      ? { minHeight: refHeights.checklistBox - CM_PX }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 text-gold" />
                    <p className="text-sm font-semibold text-navy">Yang Perlu Disiapkan</p>
                  </div>
                  <div
                    ref={checklistGridRef}
                    className="relative mt-3 grid grid-cols-1 gap-y-2 sm:grid-cols-2"
                    style={{
                      gridTemplateColumns: isDesktop ? "calc(50% + 1cm) 1fr" : undefined,
                      minHeight: isDesktop && refHeights.checklistGrid
                        ? refHeights.checklistGrid - CM_PX
                        : undefined,
                    }}
                  >
                    {isDesktop && (
                      <div
                        className="absolute bottom-0 top-0 w-px bg-gold/30"
                        style={{ left: "calc(50% + 1cm - 12px)" }}
                      />
                    )}
                    <ul
                      className="flex flex-col gap-2"
                      style={{ paddingLeft: isDesktop ? "40px" : "0" }}
                    >
                      {checklistLeft.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs sm:text-sm text-navy/80"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-gold"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-2">
                      {checklistRight.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs sm:text-sm text-navy/80"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-gold"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="shrink-0 w-full md:w-auto"
                style={isDesktop ? { position: "relative", alignSelf: "stretch" } : undefined}
              >
                <div
                  ref={catatanBoxRef}
                  className="flex items-start gap-3 rounded-2xl p-3.5"
                  style={{
                    backgroundColor: "rgba(0, 161, 233, 0.1)",
                    marginTop: isDesktop ? refHeights.titleOffset : 0,
                    ...(isDesktop && refHeights.catatanBox ? { minHeight: refHeights.catatanBox } : undefined),
                  }}
                >
                  <Lightbulb
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-navy mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy">Catatan</p>
                    <p className="mt-1 text-xs leading-relaxed text-navy/70">{step.note}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  {step.cta}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Prev/next + dot pagination */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Langkah sebelumnya"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10 cursor-pointer"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat langkah ${s.label}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === active ? "w-6 bg-gold" : "w-2.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Langkah berikutnya"
            className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10 cursor-pointer"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
