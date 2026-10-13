import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sun,
  X,
} from "lucide-react";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";

const ASSET_NAVY = "#002672";
const GALLERY_COUNT = 5;

function galleryFor(program) {
  if (Array.isArray(program.gallery) && program.gallery.length > 0) {
    return program.gallery;
  }
  return Array.from({ length: GALLERY_COUNT }, (_, i) => `[ISI: Foto ${program.title} #${i + 1}]`);
}

export default function ProgramModal({ program, onClose, onNext }) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = galleryFor(program);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const goPrev = () => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length);
  const goNext = () => setActiveImage((i) => (i + 1) % gallery.length);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center px-6 py-4 sm:px-10"
        style={{ backgroundColor: ASSET_NAVY }}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Daftar Kegiatan
        </button>
      </div>

      {/* Scrim */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-y-auto bg-navy/60 px-4 py-8 sm:px-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-[83rem] gap-10 rounded-3xl bg-ivory p-8 shadow-2xl md:grid-cols-[1.15fr_1fr] md:p-10"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy/5"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-2xl">
              <ImagePlaceholder label={gallery[activeImage]} className="aspect-[4/3] w-full" />

              <button
                type="button"
                aria-label="Perbesar foto"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-gold text-navy shadow"
              >
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Foto sebelumnya"
                className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Foto berikutnya"
                className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-navy/70 text-white transition-colors hover:bg-navy"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <span className="absolute bottom-3 left-3 rounded-full bg-navy/70 px-2.5 py-1 text-xs font-medium text-white">
                {activeImage + 1} / {gallery.length}
              </span>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Lihat ${label}`}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    i === activeImage ? "border-gold" : "border-transparent"
                  }`}
                >
                  <ImagePlaceholder label="" className="h-16 w-20" />
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {gallery.map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeImage ? "w-4 bg-gold" : "w-1.5 bg-navy/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-navy">
              {program.jenjang || "PG–SMA"}
            </span>

            <h2 className="font-heading mt-4 text-4xl text-navy sm:text-5xl">{program.title}</h2>

            <div className="mt-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-gold/50" />
              <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
              <span className="h-px flex-1 bg-gold/50" />
            </div>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-navy/80">
              {Array.isArray(program.description) ? (
                program.description.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{program.description || program.content}</p>
              )}
            </div>

            {Array.isArray(program.highlights) && program.highlights.length > 0 && (
              <ul className="mt-6 space-y-3">
                {program.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-navy">
                      <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={onNext}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-3xl bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-dark md:mt-auto"
            >
              Next Programs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

