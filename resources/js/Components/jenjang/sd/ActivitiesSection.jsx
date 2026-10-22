"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";


const CATEGORIES = [
  { key: "adab-keseharian", label: "Adab dan Keseharian" },
  { key: "akademik", label: "Akademik" },
  { key: "deenul-islam", label: "Deenul Islam" },
  { key: "lifeskills", label: "Lifeskills" },
  { key: "kreativitas", label: "Kreativitas" },
  { key: "outdoor", label: "Outdoor" },
];

// Every kegiatan photo, tagged by pill category. "Semua" is just the
// union of all of these (no separate curated list) — filtering narrows
// this same array down instead of swapping in different data.
const ACTIVITIES = [
  // Adab dan Keseharian
  { category: "adab-keseharian", caption: "Morning Tilawah" },
  { category: "adab-keseharian", caption: "Adab Masuk & Keluar Kelas" },
  { category: "adab-keseharian", caption: "Adab Belajar" },
  { category: "adab-keseharian", caption: "Adab Berteman" },
  { category: "adab-keseharian", caption: "Adab Makan & Minum" },
  { category: "adab-keseharian", caption: "Adab Kamar Mandi" },
  { category: "adab-keseharian", caption: "Adab Kebersihan" },
  { category: "adab-keseharian", caption: "Merapikan Barang Pribadi" },
  { category: "adab-keseharian", caption: "Adab Naik & Turun Tangga" },
  { category: "adab-keseharian", caption: "Antri" },
  { category: "adab-keseharian", caption: "Disiplin Waktu" },
  { category: "adab-keseharian", caption: "Classroom Duty" },
  { category: "adab-keseharian", caption: "Bebas Komibah" },
  // Akademik
  { category: "akademik", caption: "ITC" },
  { category: "akademik", caption: "Fun & Creative Learning" },
  { category: "akademik", caption: "Project Based Learning" },
  { category: "akademik", caption: "Robotik" },
  { category: "akademik", caption: "Coding" },
  { category: "akademik", caption: "Literasi dan Membaca" },
  { category: "akademik", caption: "Writing" },
  { category: "akademik", caption: "Science" },
  { category: "akademik", caption: "Engineering" },
  { category: "akademik", caption: "Math" },
  { category: "akademik", caption: "Presentasi" },
  { category: "akademik", caption: "Discussions" },
  { category: "akademik", caption: "Group Work" },
  { category: "akademik", caption: "Problem Solving" },
  { category: "akademik", caption: "Eksperimen" },
  // Deenul Islam
  { category: "deenul-islam", caption: "Qiblati" },
  { category: "deenul-islam", caption: "Eidul Jumuah" },
  { category: "deenul-islam", caption: "Lil Banaat" },
  { category: "deenul-islam", caption: "Tahfizh Camp" },
  { category: "deenul-islam", caption: "Murojaah" },
  { category: "deenul-islam", caption: "Tilawah" },
  { category: "deenul-islam", caption: "Tahsin" },
  { category: "deenul-islam", caption: "Doa Harian" },
  { category: "deenul-islam", caption: "Hafalan Hadits" },
  { category: "deenul-islam", caption: "Hafalan Dzikir" },
  { category: "deenul-islam", caption: "Fiqih Pubertas" },
  { category: "deenul-islam", caption: "Sirah Nabawiyah" },
  { category: "deenul-islam", caption: "Islamic Stories" },
  { category: "deenul-islam", caption: "Praktik Ibadah" },
  { category: "deenul-islam", caption: "Praktik Wudhu" },
  { category: "deenul-islam", caption: "Praktik Shalat" },
  { category: "deenul-islam", caption: "Shalat Berjamaah" },
  { category: "deenul-islam", caption: "Dzikir Pagi dan Petang" },
  { category: "deenul-islam", caption: "Sholat Dhuha" },
  { category: "deenul-islam", caption: "Tarhib Ramadhan" },
  { category: "deenul-islam", caption: "Infaq" },
  // Lifeskills
  { category: "lifeskills", caption: "Melipat Pakaian" },
  { category: "lifeskills", caption: "Menyetrika" },
  { category: "lifeskills", caption: "Merapihkan Kelas" },
  { category: "lifeskills", caption: "Merapihkan Lemari" },
  { category: "lifeskills", caption: "Fun Cooking" },
  { category: "lifeskills", caption: "Basic Sewing" },
  { category: "lifeskills", caption: "Cleaning" },
  { category: "lifeskills", caption: "Menyapu" },
  { category: "lifeskills", caption: "Mengepel" },
  { category: "lifeskills", caption: "Time Management" },
  { category: "lifeskills", caption: "Teamwork" },
  // Kreativitas
  { category: "kreativitas", caption: "Menggambar" },
  { category: "kreativitas", caption: "Mewarnai" },
  { category: "kreativitas", caption: "Craft" },
  { category: "kreativitas", caption: "Kolase" },
  { category: "kreativitas", caption: "Prakarya dari Bahan Bekas" },
  { category: "kreativitas", caption: "Karya 3D" },
  { category: "kreativitas", caption: "Creative Writing" },
  { category: "kreativitas", caption: "Storytelling" },
  { category: "kreativitas", caption: "Roleplay" },
  { category: "kreativitas", caption: "Display" },
  { category: "kreativitas", caption: "Vlog" },
  // Outdoor
  { category: "outdoor", caption: "Sport & Games" },
  { category: "outdoor", caption: "Morning Exercise" },
  { category: "outdoor", caption: "Outdoor Games" },
  { category: "outdoor", caption: "Fun Games" },
  { category: "outdoor", caption: "Team Games" },
  { category: "outdoor", caption: "Traditional Games" },
  { category: "outdoor", caption: "Outing" },
  { category: "outdoor", caption: "Field Trip" },
  { category: "outdoor", caption: "Outdoor Learning" },
];

// Section 4 — "Kegiatan Ananda". Same elevated SectionBox shell as the
// other sections, with a pill filter row (Semua + 6 kategori) above a
// horizontally-scrolling photo strip, matching Facilities/Gallery's
// scroller mechanics. Photos are placeholders for now — no real
// activity photos supplied yet.
export default function ActivitiesSection() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const scrollerRef = useRef(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [activeCategory]);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  const items =
    activeCategory === "semua"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === activeCategory);

  return (
    <section className="bg-ivory px-6 py-14">
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal>
          <SectionBox>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center gap-3">
                <ScallopBadge n={4} />
                <h2 className="font-heading text-2xl text-navy sm:text-3xl">Kegiatan Ananda</h2>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCategory("semua")}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeCategory === "semua"
                      ? "bg-navy text-white shadow-md"
                      : "border border-navy/15 text-navy/70 hover:bg-navy/5"
                  }`}
                >
                  Semua
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActiveCategory(c.key)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === c.key
                        ? "bg-navy text-white shadow-md"
                        : "border border-navy/15 text-navy/70 hover:bg-navy/5"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="relative mt-8">
                <button
                  type="button"
                  aria-label="Geser ke kiri"
                  onClick={() => scrollBy(-1)}
                  className="absolute top-[40%] left-0 z-10 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  ref={scrollerRef}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((item) => (
                    <div key={`${item.category}-${item.caption}`} className="w-44 shrink-0 snap-start sm:w-48">
                      <ImagePlaceholder
                        label={`[ISI: Foto ${item.caption}]`}
                        className="h-36 w-44 rounded-2xl sm:h-40 sm:w-48"
                      />
                      <p className="mt-2 text-center text-sm font-medium text-navy">{item.caption}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Geser ke kanan"
                  onClick={() => scrollBy(1)}
                  className="absolute top-[40%] right-0 z-10 grid h-10 w-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </SectionBox>
        </Reveal>
      </div>
    </section>
  );
}
