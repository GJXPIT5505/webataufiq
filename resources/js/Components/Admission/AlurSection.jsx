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
      "Dapatkan informasi lengkap mengenai kurikulum, program unggulan, fasilitas, dan biaya pendidikan di Sekolah Islam Plus Tahfizh Attaufiq.",
    checklistLeft: ["Biaya pendaftaran & SPP", "Brosur & kurikulum sekolah", "Jadwal dan alur pendaftaran"],
    checklistRight: ["Pilihan program & jenjang", "Informasi program beasiswa"],
    note: "Hubungi tim kami jika ada pertanyaan sebelum mendaftar.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-1-v2.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    icon: FileText,
    label: "Registration",
    badge: "LANGKAH 02",
    title: "Registration",
    description:
      "Lakukan registrasi dengan melengkapi formulir pendaftaran online. Pastikan semua informasi yang diisi sudah benar.",
    checklistLeft: ["Data pribadi Ananda", "Data orang tua/wali", "Periode pendaftaran yang dipilih"],
    checklistRight: ["Pilihan jenjang pendidikan", "Kontak aktif yang dapat dihubungi"],
    note: "Anda dapat menyimpan data registrasi sementara dan melanjutkan kembali kapan saja.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-2-v2.png",
    imageWidth: 1536,
    imageHeight: 1024,
  },
  {
    icon: Users,
    label: "Observation & Interview",
    badge: "LANGKAH 03",
    title: "Observation & Interview",
    description:
      "Ananda akan mengikuti sesi observasi dan wawancara sesuai jadwal yang ditentukan oleh tim Attaufiq.",
    checklistLeft: ["Jadwal observasi & wawancara", "Lokasi pelaksanaan tes"],
    checklistRight: ["Hal yang perlu dibawa", "Pendampingan orang tua/wali"],
    note: "Jadwal sesi observasi dan wawancara akan dikonfirmasi melalui WhatsApp resmi tim admission.",
    cta: "Registrasi Sekarang",
    image: "/images/admission/alur-icon-3-v2.png",
    imageWidth: 1536,
    imageHeight: 1024,
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
    imageWidth: 1536,
    imageHeight: 1024,
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
    imageWidth: 1536,
    imageHeight: 1024,
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

  const stepperRef = useRef(null);
  useEffect(() => {
    const scroller = stepperRef.current;
    const button = scroller?.querySelectorAll("button")[active];
    if (!scroller || !button || scroller.scrollWidth <= scroller.clientWidth) return;
    const offset = button.getBoundingClientRect().left - scroller.getBoundingClientRect().left;
    scroller.scrollTo({
      left: scroller.scrollLeft + offset - (scroller.clientWidth - button.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

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
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 w-full">
        <img
          src="/images/admission/alur-pattern-frame.png"
          alt=""
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-navy/70" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="relative mx-auto max-w-4xl">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Alur Pendaftaran
            </span>
            <h2 className="font-heading mt-4 text-3xl leading-[1.1] text-white sm:text-4xl md:whitespace-nowrap md:text-5xl">
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

        <Reveal delay={0.1} className="relative mt-10 sm:mt-16">
          <div
            ref={stepperRef}
            className="pt-3 sm:pt-0"
          >
            <div className="relative flex items-start justify-between">
              <div
                className="absolute inset-x-[10%] top-6 bg-gold/30 sm:inset-x-10 sm:top-12"
                style={{ height: "3px" }}
              />
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-none sm:gap-3 cursor-pointer"
                  >
                    <span
                      className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-white transition-colors sm:h-24 sm:w-24 ${
                        isActive ? "border-gold" : "border-gold/40"
                      }`}
                      style={{ aspectRatio: "1 / 1" }}
                    >
                      <s.icon
                        aria-hidden="true"
                        className="h-5 w-5 text-navy sm:h-8 sm:w-8"
                      />
                      <span className="absolute left-1/2 top-0 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-[10px] font-bold text-navy sm:h-6 sm:w-6 sm:text-[11px]">
                        {i + 1}
                      </span>
                    </span>
                    <span
                      className={`text-center text-[10px] leading-tight sm:text-sm sm:leading-snug ${
                        isActive ? "text-white" : "text-white/60"
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

        <Reveal
          key={active}
          delay={0.05}
          className="mt-6 sm:mt-10 lg:-mx-[min(3cm,calc((100vw-100%)/2-1rem))]"
        >
          <div
            className="relative overflow-hidden rounded-3xl bg-white px-5 pt-12 shadow-2xl sm:px-8 sm:pt-14"
            style={{ paddingBottom: isDesktop ? "32px" : "20px" }}
          >
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
              className="grid gap-4 md:items-start md:gap-8"
              style={{ gridTemplateColumns: cardGridColumns }}
            >
              <div
                className="absolute right-4 top-3 h-20 w-20 shrink-0 overflow-hidden rounded-full bg-lightblue/10 sm:right-6 md:relative md:right-auto md:top-auto md:mx-0 md:h-[166px] md:w-[166px]"
                style={{ alignSelf: "center" }}
              >
                <img
                  src={step.image}
                  alt=""
                  className="h-full w-full object-contain p-2 md:p-3"
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
                  className="font-heading pr-20 text-2xl leading-tight text-navy sm:text-3xl md:pr-0"
                >
                  {step.title}
                </h3>
                <p
                  ref={descRef}
                  className="mt-2 text-sm leading-relaxed text-navy/70 sm:text-base"
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
                    <ClipboardList aria-hidden="true" className="h-7 w-7 shrink-0 text-gold" />
                    <p className="text-sm font-semibold text-navy">Yang Perlu Disiapkan</p>
                  </div>
                  <div
                    ref={checklistGridRef}
                    className="relative mt-3 grid grid-cols-1 gap-y-2"
                    style={{
                      gridTemplateColumns: isDesktop ? "calc(50% + 1cm) 1fr" : "1fr 1fr",
                      columnGap: isDesktop ? undefined : "0.75rem",
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
                      style={{ paddingLeft: isDesktop ? "40px" : undefined }}
                    >
                      {checklistLeft.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-1.5 text-sm leading-snug text-navy/80 md:items-center md:gap-2 md:leading-normal"
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
                          className="flex items-start gap-1.5 text-sm leading-snug text-navy/80 md:items-center md:gap-2 md:leading-normal"
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
                className="shrink-0"
                style={isDesktop ? { position: "relative", alignSelf: "stretch" } : undefined}
              >
                <div
                  ref={catatanBoxRef}
                  className="flex items-start gap-3 rounded-2xl p-3"
                  style={{
                    backgroundColor: "rgba(0, 161, 233, 0.1)",
                    marginTop: isDesktop ? refHeights.titleOffset : undefined,
                    ...(isDesktop && refHeights.catatanBox ? { minHeight: refHeights.catatanBox } : undefined),
                  }}
                >
                  <Lightbulb
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                    style={{ color: "#0b1a63" }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy">Catatan</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy/70 md:text-xs">{step.note}</p>
                  </div>
                </div>
                <a
                  href="#hubungi-admin"
                  className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                >
                  {step.cta}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Langkah sebelumnya"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10 cursor-pointer"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <div className="flex items-center">
            {steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Lihat langkah ${s.label}`}
                aria-current={i === active}
                className="grid h-11 place-items-center px-1 cursor-pointer"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-gold" : "w-2.5 bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Langkah berikutnya"
            className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-gold transition-colors hover:bg-gold/10 cursor-pointer"
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
