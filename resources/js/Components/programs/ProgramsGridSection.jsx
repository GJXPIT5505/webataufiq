import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { programsList as defaultPrograms } from "@/data/programs";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import ProgramModal from "./ProgramModal";

export default function ProgramsGridSection({ items }) {
  const list = (items && items.length > 0) ? items : defaultPrograms;
  const [activeSlug, setActiveSlug] = useState(null);

  // Deep link support via ?program=<slug>
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("program");
      if (slug && list.some((p) => p.slug === slug)) {
        setActiveSlug(slug);
      }
    }
  }, [list]);

  useEffect(() => {
    document.body.style.overflow = activeSlug ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSlug]);

  const openProgram = useCallback((slug) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("program", slug);
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const closeProgram = useCallback(() => {
    setActiveSlug(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("program");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const activeProgram = list.find((p) => p.slug === activeSlug) ?? null;

  const goToNext = useCallback(() => {
    if (!activeProgram) return;
    const currentIndex = list.findIndex((p) => p.slug === activeProgram.slug);
    const next = list[(currentIndex + 1) % list.length];
    openProgram(next.slug);
  }, [activeProgram, list, openProgram]);

  return (
    <section className="relative bg-ivory px-6 py-16 md:py-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-base font-medium text-navy sm:text-lg">
            Pilih kegiatan untuk melihat informasi selengkapnya
          </p>
          <ChevronDown className="h-5 w-5 text-gold" aria-hidden="true" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((program, i) => (
            <motion.button
              key={program.slug}
              type="button"
              onClick={() => openProgram(program.slug)}
              className="group mx-auto"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
            >
              {/* Desain kartu lingkaran presisi */}
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-gold/40 shadow-md sm:h-64 sm:w-64">
                <div className="absolute inset-x-0 top-0 h-1/2">
                  {program.image ? (
                    <img
                      src={
                        program.image.startsWith("http") || program.image.startsWith("/storage") || program.image.startsWith("/images")
                          ? program.image
                          : `/storage/${program.image}`
                      }
                      alt={program.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label={`[ISI: Foto ${program.title}]`} className="h-full w-full" />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center bg-white px-8 pt-3 text-center sm:px-10">
                  <h3 className="line-clamp-1 font-heading text-sm text-navy sm:text-base">
                    {program.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-navy/60 sm:text-xs">
                    {program.summary}
                  </p>
                  <span className="mb-3 mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-navy shadow transition-transform group-hover:scale-110 sm:mb-4">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeProgram && (
        <ProgramModal
          key={activeProgram.slug}
          program={activeProgram}
          onClose={closeProgram}
          onNext={goToNext}
        />
      )}
    </section>
  );
}

