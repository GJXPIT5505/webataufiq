"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";


// Order here is the display order for both the pill row and the
// "Semua" list — Deenul Islam sits right after Akademik, and
// Lifeskills right after Deenul Islam, per instruction.
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
  { category: "adab-keseharian", caption: "Mengucapkan Salam" },
  { category: "adab-keseharian", caption: "Mendoakan Teman" },
  { category: "adab-keseharian", caption: "Naik Turun Tangga" },
  { category: "adab-keseharian", caption: "Meletakkan Tas" },
  { category: "adab-keseharian", caption: "Meletakkan Sepatu" },
  { category: "adab-keseharian", caption: "Antri" },
  { category: "adab-keseharian", caption: "Merapihkan Mainan" },
  { category: "adab-keseharian", caption: "Mengangkat Tangan" },
  { category: "adab-keseharian", caption: "Adab Kamar Mandi" },
  { category: "adab-keseharian", caption: "Menjaga Kebersihan" },
  { category: "adab-keseharian", caption: "Berdoa" },
  { category: "adab-keseharian", caption: "Membuang Sampah" },
  // Akademik
  { category: "akademik", caption: "Math" },
  { category: "akademik", caption: "Science" },
  { category: "akademik", caption: "Technology" },
  { category: "akademik", caption: "Engineering" },
  { category: "akademik", caption: "Membaca" },
  { category: "akademik", caption: "Menulis" },
  { category: "akademik", caption: "Public Speaking" },
  { category: "akademik", caption: "Motorik Halus" },
  { category: "akademik", caption: "Kognitif" },
  { category: "akademik", caption: "Sensory" },
  // Deenul Islam
  { category: "deenul-islam", caption: "Mengenal Doa Harian" },
  { category: "deenul-islam", caption: "Qissoh Sahabat & Rasul" },
  { category: "deenul-islam", caption: "Praktik Wudhu" },
  { category: "deenul-islam", caption: "Praktik Sholat" },
  { category: "deenul-islam", caption: "Doa Pendek" },
  { category: "deenul-islam", caption: "Surat Pendek" },
  { category: "deenul-islam", caption: "Murojaah" },
  { category: "deenul-islam", caption: "Infaq" },
  { category: "deenul-islam", caption: "Sholat Dhuha" },
  { category: "deenul-islam", caption: "Tahsin" },
  { category: "deenul-islam", caption: "Aqidah & Akhlak" },
  { category: "deenul-islam", caption: "Hafalan Hadits" },
  // Lifeskills
  { category: "lifeskills", caption: "Fun Cooking" },
  { category: "lifeskills", caption: "Makan & Minum Sendiri" },
  { category: "lifeskills", caption: "Toilet Training" },
  { category: "lifeskills", caption: "Cuci Tangan" },
  { category: "lifeskills", caption: "Memakai Sepatu" },
  { category: "lifeskills", caption: "Menyiapkan Alat Makan" },
  { category: "lifeskills", caption: "Melipat Baju" },
  { category: "lifeskills", caption: "Menjaga Kebersihan Diri" },
  { category: "lifeskills", caption: "Menyapu" },
  // Kreativitas
  { category: "kreativitas", caption: "Painting" },
  { category: "kreativitas", caption: "Kolase" },
  { category: "kreativitas", caption: "Menggambar" },
  { category: "kreativitas", caption: "Mewarnai" },
  { category: "kreativitas", caption: "Roleplay" },
  { category: "kreativitas", caption: "Building Block" },
  { category: "kreativitas", caption: "Arts" },
  // Outdoor
  { category: "outdoor", caption: "Playground Time" },
  { category: "outdoor", caption: "Sports and Games" },
  { category: "outdoor", caption: "Bermain Sepeda" },
  { category: "outdoor", caption: "Permainan Tradisional" },
  { category: "outdoor", caption: "Aqua Play" },
  { category: "outdoor", caption: "Fieldtrip" },
  { category: "outdoor", caption: "Outbound" },
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
