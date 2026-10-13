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
    label: "Registration",
    badge: "LANGKAH 02",
    title: "Registration",
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
    label: "Observation & Interview",
    badge: "LANGKAH 03",
    title: "Observation & Interview",
    description:
      "Ananda akan mengikuti sesi observasi dan wawancara sesuai jadwal yang ditentukan oleh tim Attaufiq.",
    checklistLeft: ["[ISI: Jadwal observasi & wawancara]", "[ISI: Lokasi pelaksanaan]"],
    checklistRight: ["[ISI: Hal yang perlu dibawa]"],
    note: "[ISI: catatan seputar sesi observasi & wawancara]",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-3-v2.png",
  },
  {
    icon: Megaphone,
    label: "Admission",
    badge: "LANGKAH 04",
    title: "Admission",
    description:
      "Hasil penerimaan (admission) Ananda akan diumumkan melalui kontak yang telah didaftarkan sebelumnya.",
    checklistLeft: ["[ISI: Tanggal pengumuman penerimaan]"],
    checklistRight: ["[ISI: Cara melihat hasil]"],
    note: "[ISI: catatan tentang pengumuman penerimaan]",
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
    checklistLeft: ["[ISI: Berkas daftar ulang]", "[ISI: Jadwal orientasi]"],
    checklistRight: ["[ISI: Perlengkapan sekolah]"],
    note: "[ISI: catatan tentang persiapan sekolah]",
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
    const mq = window.matchMedia("(min-width: 768px)");
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
    <section className="relative overflow-hidden bg-[#102380] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 w-full">
        <img
          src="/images/admission/alur-pattern-frame.png"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[#102380]/70" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative mx-auto max-w-4xl">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-[#fdd000]" />
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#fdd000]">
              Alur Pendaftaran
            </span>
            <h2 className="font-serif mt-4 whitespace-nowrap text-4xl leading-[1.1] text-white md:text-5xl">
              5 Langkah Mudah Menuju Attaufiq
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Ikuti tahapan pendaftaran berikut dengan mudah
              <br />
              dan pastikan Ananda menjadi bagian dari keluarga besar Attaufiq.
            </p>
            <div className="mx-auto mt-6 flex max-w-[220px] items-center gap-3">
              <span
                className="h-px flex-1"
                style={{ background: "linear-gradient(to right, transparent, #fdd000)" }}
              />
              <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#fdd000]" />
              <span
                className="h-px flex-1"
                style={{ background: "linear-gradient(to right, #fdd000, transparent)" }}
              />
            </div>
          </Reveal>
        </div>

        {/* Stepper */}
        <Reveal delay={0.1} className="relative mt-16">
          <div
            className="absolute inset-x-6 top-10 bg-[#fdd000]/30 sm:inset-x-10 sm:top-12"
            style={{ height: "3px" }}
          />
          <div className="relative flex items-start justify-between">
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3"
                >
                  <span
                    className={`relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 bg-white transition-colors sm:h-24 sm:w-24 ${
                      isActive ? "border-[#fdd000]" : "border-[#fdd000]/40"
                    }`}
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    <s.icon
                      aria-hidden="true"
                      className="h-7 w-7 text-[#102380] sm:h-8 sm:w-8"
                    />
                    <span className="absolute left-1/2 top-0 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fdd000] text-[11px] font-bold text-[#102380]">
                      {i + 1}
                    </span>
                  </span>
                  <span
                    className={`text-center text-[11px] sm:text-sm ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active step detail card */}
        <Reveal
          key={active}
          delay={0.05}
          className="mt-10"
          style={{ marginLeft: "-3cm", marginRight: "-3cm" }}
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-white px-5 pt-10 shadow-2xl sm:px-8 sm:pt-14"
            style={{ paddingBottom: isDesktop ? "32px" : "20px" }}
          >
            <span
              className="absolute left-5 top-0 inline-flex bg-[#fdd000] font-bold uppercase tracking-wide text-[#102380] sm:left-8"
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
              className="grid gap-8 md:items-start"
              style={{ gridTemplateColumns: cardGridColumns }}
            >
              <div
                className="relative mx-auto shrink-0 overflow-hidden rounded-full bg-[#00a1e9]/10 md:mx-0"
                style={{ width: "166px", height: "166px", alignSelf: "center" }}
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
                  className="font-serif text-2xl leading-tight text-[#102380] sm:text-3xl"
                >
                  {step.title}
                </h3>
                <p
                  ref={descRef}
                  className="mt-2 text-sm leading-relaxed text-[#102380]/70 sm:text-base"
                  style={refHeights.desc ? { minHeight: refHeights.desc } : undefined}
                >
                  {step.description}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-px flex-1 bg-[#fdd000]/30" />
                  <Sun aria-hidden="true" className="h-3 w-3 shrink-0 text-[#fdd000]" />
                  <span className="h-px flex-1 bg-[#fdd000]/30" />
                </div>

                <div
                  ref={checklistBoxRef}
                  className="mt-4 rounded-2xl border border-[#fdd000]/40 p-4"
                  style={
                    refHeights.checklistBox
                      ? { minHeight: refHeights.checklistBox - CM_PX }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-3">
                    <ClipboardList aria-hidden="true" className="h-7 w-7 shrink-0 text-[#fdd000]" />
                    <p className="text-sm font-semibold text-[#102380]">Yang Perlu Disiapkan</p>
                  </div>
                  <div
                    ref={checklistGridRef}
                    className="relative mt-3 grid grid-cols-1 gap-y-2"
                    style={{
                      gridTemplateColumns: isDesktop ? "calc(50% + 1cm) 1fr" : "1fr",
                      minHeight: refHeights.checklistGrid
                        ? refHeights.checklistGrid - CM_PX
                        : undefined,
                    }}
                  >
                    {isDesktop && (
                      <div
                        className="absolute bottom-0 top-0 w-px bg-[#fdd000]/30"
                        style={{ left: "calc(50% + 1cm - 12px)" }}
                      />
                    )}
                    <ul
                      className="flex flex-col gap-2"
                      style={{ paddingLeft: "40px" }}
                    >
                      {checklistLeft.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-[#102380]/80"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#fdd000]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className="flex flex-col gap-2">
                      {checklistRight.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-[#102380]/80"
                        >
                          <CheckCircle2
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-[#fdd000]"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="shrink-0"
                style={isDesktop ? { position: "relative", alignSelf: "stretch" } : undefined}
              >
                <div
                  ref={catatanBoxRef}
                  className="flex items-start gap-3 rounded-2xl p-3 bg-[#00a1e9]/10"
                  style={{
                    marginTop: refHeights.titleOffset,
                    ...(refHeights.catatanBox ? { minHeight: refHeights.catatanBox } : undefined),
                  }}
                >
                  <Lightbulb
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#102380]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#102380]">Catatan</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#102380]/70">{step.note}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#102380] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {step.cta}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Prev/next + dots */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Langkah sebelumnya"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#fdd000]/50 text-[#fdd000] transition-colors hover:bg-[#fdd000]/10"
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
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-[#fdd000]" : "w-2.5 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Langkah berikutnya"
            className="grid h-10 w-10 place-items-center rounded-full border border-[#fdd000]/50 text-[#fdd000] transition-colors hover:bg-[#fdd000]/10"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}