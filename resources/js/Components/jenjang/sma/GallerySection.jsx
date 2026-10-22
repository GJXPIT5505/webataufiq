"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScallopBadge } from "@/Components/about/VisiMisiSection";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import SectionBox from "../SectionBox";
import Reveal from "@/Components/home/Reveal";

const GALLERY_COUNT = 6;

// Section 7 — "Galeri Kegiatan Ananda". Same elevated SectionBox shell
// and title placement as Facilities (section 3). Below the title is a
// horizontally-scrolling photo strip with arrow buttons at each end;
// the mockup's "Lihat Galeri Lainnya" CTA under the strip is dropped
// per instruction.
export default function GallerySection() {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="bg-ivory px-6 py-14">
      <div className="mx-auto" style={{ maxWidth: "calc(72rem + 6cm)" }}>
        <Reveal>
        <SectionBox>
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-center gap-3">
              <ScallopBadge n={7} />
              <h2 className="font-heading text-2xl text-navy sm:text-3xl">Galeri Kegiatan Ananda</h2>
            </div>

            <div className="relative mt-8">
              <button
                type="button"
                aria-label="Geser ke kiri"
                onClick={() => scrollBy(-1)}
                className="absolute top-1/2 left-0 z-10 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div
                ref={scrollerRef}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {Array.from({ length: GALLERY_COUNT }).map((_, i) => (
                  <ImagePlaceholder
                    key={i}
                    label={`[ISI: Foto galeri #${i + 1}]`}
                    className="h-56 w-64 shrink-0 snap-start rounded-2xl"
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Geser ke kanan"
                onClick={() => scrollBy(1)}
                className="absolute top-1/2 right-0 z-10 grid h-10 w-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-md transition-colors hover:bg-navy hover:text-white"
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
