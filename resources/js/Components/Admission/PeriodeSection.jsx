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
      "Periode reguler dengan kuota yang mulai terbatas. Pastikan Ananda tidak melewatkan kesempatan ini.",
    benefits: [
      { icon: Gift, text: "Potongan biaya pendaftaran 15%" },
      { icon: Shirt, text: "Free seragam sekolah" },
      { icon: Users, text: "Prioritas kelas (selama kuota ada)" },
      { icon: FileText, text: "Free konsultasi tumbuh kembang" },
    ],
    statusLabel: "Akan Dibuka",
    statusOpen: false,
    cta: "Daftar Sekarang",
  },
  {
    wave: "GELOMBANG 3",
    title: "Late Admission",
    dateRange: "1 Juli – 31 Juli 2026",
    description:
      "Periode terakhir untuk mengisi sisa kuota yang tersedia di setiap jenjang pendidikan.",
    benefits: [
      { icon: Gift, text: "Sesuai ketersediaan sisa kuota" },
      { icon: Shirt, text: "Free seragam sekolah" },
      { icon: Users, text: "Penempatan kelas oleh sekolah" },
      { icon: FileText, text: "Free konsultasi tumbuh kembang" },
    ],
    statusLabel: "Akan Dibuka",
    statusOpen: false,
    cta: "Nantikan Informasi",
  },
];

const CALENDAR_FRAME_SRC = "/images/admission/periode-calendar-v2.png";

function CalendarCard({ period, delay }) {
  return (
    <Reveal
      delay={delay}
      className="w-[min(100vw-3rem,22rem)] shrink-0 lg:w-[min(clamp(19.44rem,18vw+13.5rem,24.84rem),calc((100vw-4rem)/3))]"
    >
      <div
        className="periode-calendar relative w-full drop-shadow-xl lg:aspect-[1102/1427]"
        style={{ "--calendar-frame": `url(${CALENDAR_FRAME_SRC})` }}
      >
        <img
          src="/images/admission/periode-calendar-v2.png"
          alt=""
          className="hidden h-full w-full object-contain lg:block"
        />

        <div className="relative flex flex-col items-center px-2 pb-1 text-center lg:absolute lg:inset-x-0 lg:top-[calc(16%+1.6cm)] lg:px-[calc(9%+1cm)] lg:pb-0">
          <div className="relative flex flex-col items-center lg:top-[-1cm]">
            <Sun aria-hidden="true" className="h-4 w-4 text-gold" />

            <span className="mt-2 text-xs font-bold uppercase tracking-wide text-gold">
              {period.wave}
            </span>
            <h3 className="font-heading mt-0.5 text-xl leading-tight text-navy">
              {period.title}
            </h3>
          </div>

          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[13px] font-semibold text-navy lg:mt-2 lg:top-[-0.8cm] lg:px-2.5 lg:text-[11px]">
            <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-gold lg:h-3 lg:w-3" />
            {period.dateRange}
          </span>

          <div className="relative flex w-full flex-col items-center lg:top-[-0.2cm]">
            <p className="mt-3 text-[15px] leading-snug text-navy/70 lg:-mx-[0.3cm] lg:mt-2 lg:text-[13.5px]">
              {period.description}
            </p>

            <div className="mt-3 flex w-full items-center gap-2 lg:mt-2">
              <span className="h-px flex-1 bg-gold/30" />
              <Sun aria-hidden="true" className="h-2.5 w-2.5 shrink-0 text-gold/60" />
              <span className="h-px flex-1 bg-gold/30" />
            </div>

            <ul className="mt-3 w-full space-y-1.5 text-left lg:mt-2 lg:space-y-0.5 lg:px-[0.4cm]">
              {period.benefits.map((b) => (
                <li
                  key={b.text}
                  className="flex items-start gap-2 text-[15px] leading-snug text-navy/80 lg:items-center lg:gap-1.5 lg:text-[12.5px] lg:leading-tight"
                >
                  <b.icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold lg:mt-0 lg:h-3 lg:w-3" />
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a
          href="#hubungi-admin"
          className="relative mx-2 mt-5 flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white lg:absolute lg:inset-x-[calc(9%+1cm)] lg:bottom-[calc(8%+0.8cm)] lg:mx-0 lg:mt-0 lg:min-h-0 lg:text-xs"
        >
          Daftar Sekarang
          <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </Reveal>
  );
}

export default function PeriodeSection() {
  return (
    <section className="relative pt-20 md:pt-28">
      <div className="absolute inset-x-0 bottom-0" style={{ top: "-6cm" }}>
        <img
          src="/images/admission/periode-bg-wall.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-ivory/55" style={{ top: "-6cm" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="relative lg:top-[-4cm]">
            <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-gold" />
            <span className="mt-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Periode Pendaftaran
            </span>
            <h2 className="font-heading mt-4 text-4xl leading-[1.1] text-navy md:text-5xl">
              Pilih Periode Pendaftaran
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-navy/70 sm:text-base">
              Setiap langkah besar dimulai dari keputusan hari ini.
              <br />
              Pilih periode terbaik untuk memulai perjalanan Ananda di Attaufiq.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 lg:mt-[21rem]">
        <div className="relative mx-auto max-w-[96vw]">
          <Reveal delay={0.15} className="hidden lg:block">
            <div className="relative aspect-[1460/270] w-full">
              <img
                src="/images/admission/periode-podium-v2.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </Reveal>

          <div className="relative z-10 flex flex-col items-center gap-6 lg:absolute lg:inset-x-0 lg:bottom-[calc(85%-0.5cm)] lg:flex-row lg:items-end lg:justify-center">
            {periods.map((p, i) => (
              <CalendarCard key={p.wave} period={p} delay={0.25 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
