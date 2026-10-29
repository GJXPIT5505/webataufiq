import React from "react";
import { Link } from "@inertiajs/react";
import { Sun, ChevronRight, Plus, Blocks, ImageIcon } from "lucide-react";
import PageHeroBanner from "@/Components/PageHeroBanner";

// Import AppLayout dari komponen layout Anda (sesuaikan jalur import jika berbeda)
import AppLayout from "@/Layouts/AppLayout";

// Jika komponen ikon FaqSection belum tersedia, bisa disesuaikan jalurnya atau diganti
import { PgtkIcon, SdIcon, SmpIcon, SmaIcon } from "@/Components/about/FaqSection";

const JENJANG_DISPLAY = [
  {
    slug: "pg",
    name: "PG",
    subtitle: "Playgroup",
    fullLabel: "PG (Playgroup)",
    description:
      "Mendampingi anak usia dini untuk belajar melalui bermain, menumbuhkan kemandirian, rasa ingin tahu, dan kecintaan pada Islam sejak awal.",
    Icon: null,
    photo: null,
  },
  {
    slug: "tk",
    name: "TK",
    subtitle: "Taman Kanak-Kanak",
    fullLabel: "TK (Taman Kanak-Kanak)",
    description:
      "Membentuk karakter dan keterampilan dasar melalui pembelajaran yang menyenangkan dan bermakna sesuai tahap perkembangan anak.",
    Icon: PgtkIcon,
    photo: "/images/about/faq-pgtk.jpg",
  },
  {
    slug: "sd",
    name: "SD",
    subtitle: "Sekolah Dasar",
    fullLabel: "SD (Sekolah Dasar)",
    description:
      "Menguatkan pondasi ilmu pengetahuan dan agama, mengembangkan potensi, serta membentuk kebiasaan belajar yang baik.",
    Icon: SdIcon,
    photo: "/images/about/faq-sd.jpg",
  },
  {
    slug: "smp",
    name: "SMP",
    subtitle: "Sekolah Menengah Pertama",
    fullLabel: "SMP (Sekolah Menengah Pertama)",
    description:
      "Membimbing remaja dalam pencarian jati diri, penguatan akhlak, serta penguasaan ilmu untuk siap melangkah ke jenjang berikutnya.",
    Icon: SmpIcon,
    photo: "/images/about/faq-smp.jpg",
  },
  {
    slug: "sma",
    name: "SMA",
    subtitle: "Sekolah Menengah Atas",
    fullLabel: "SMA (Sekolah Menengah Atas)",
    description:
      "Menyiapkan generasi pemimpin masa depan yang berilmu, berdaya saing global, dan berkomitmen memberi manfaat untuk umat dan bangsa.",
    Icon: SmaIcon,
    photo: "/images/about/faq-sma.jpg",
  },
];

function SectionHeading({ children }) {
  return (
    <div className="text-center">
      <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#102380] sm:text-4xl">
        {children}
      </h2>
      <div className="mx-auto mt-3 flex max-w-[140px] items-center gap-3">
        <span className="h-px flex-1 bg-[#F1B23A]/50" />
        <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#F1B23A]" />
        <span className="h-px flex-1 bg-[#F1B23A]/50" />
      </div>
    </div>
  );
}

export default function JenjangPage() {
  return (
    <AppLayout title="Jenjang Pendidikan">
         <PageHeroBanner
        heading="Program Pendidikan"
        subheading={["Setiap jenjang, satu perjalanan.", "Bersama membangun generasi beradab."]}
        photoSrc="/images/hero-banner/hero-banner-photo-example.jpg"
      />
      <section className="bg-[#FAF8F5] px-6 py-16 md:py-20">
        
        <div className="mx-auto max-w-6xl">
          <SectionHeading>Pilih Jenjang Pendidikan</SectionHeading>

          {/* 5 Jenjang Cards (Mihrab Shaped) */}
          <div className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
            {JENJANG_DISPLAY.map((j) => (
              <Link
                key={j.slug}
                href={`/jenjang/${j.slug}`}
                className="group flex w-36 shrink-0 snap-start flex-col items-center gap-3 rounded-t-full rounded-b-2xl border border-[#F1B23A]/30 bg-white px-4 py-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:w-auto"
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#102380]">
                  <span className="h-8 w-8 text-[#F1B23A]">
                    {j.Icon ? <j.Icon /> : <Blocks className="h-full w-full" strokeWidth={1.6} />}
                  </span>
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-[#102380]">
                    {j.name}
                  </span>
                  <span className="text-xs text-[#102380]/60">{j.subtitle}</span>
                </span>
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#102380]/15 text-[#102380]/40 transition-colors group-hover:border-[#F1B23A] group-hover:bg-[#F1B23A] group-hover:text-white">
                  <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {/* Continuity heading + list */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-3">
              <Sun aria-hidden="true" className="h-5 w-5 shrink-0 text-[#F1B23A]" />
              <h3 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#102380]">
                Satu Kesinambungan, Satu Tujuan
              </h3>
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-[#102380]/70">
              Setiap jenjang di Attaufiq dirancang untuk saling melengkapi, membimbing
              anak menjadi pribadi berilmu, berakhlak, dan berprestasi.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {JENJANG_DISPLAY.map((j) => (
              <Link
                key={j.slug}
                href={`/jenjang/${j.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#102380]/10 bg-white shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-stretch sm:gap-5"
              >
                <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-[calc(11rem+5cm)]">
                  {j.photo ? (
                    <img
                      src={j.photo}
                      alt={j.fullLabel}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-[#102380]/5">
                      <ImageIcon aria-hidden="true" className="h-6 w-6 text-[#102380]/20" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 items-center gap-4 p-4 sm:gap-5 sm:pl-0">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#102380] sm:h-14 sm:w-14">
                    <span className="h-6 w-6 text-[#F1B23A] sm:h-7 sm:w-7">
                      {j.Icon ? <j.Icon /> : <Blocks className="h-full w-full" strokeWidth={1.6} />}
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#102380]">
                      {j.fullLabel}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-[#102380]/70">
                      {j.description}
                    </p>
                  </div>

                  <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full border border-[#102380]/15 text-[#102380]/40 transition-colors group-hover:border-[#F1B23A] group-hover:bg-[#F1B23A] group-hover:text-white sm:grid">
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
