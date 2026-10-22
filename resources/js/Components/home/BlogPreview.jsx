import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  SquarePen,
} from "lucide-react";
import { LinkButton } from "@/Components/ui/Button";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import Reveal from "@/Components/home/Reveal";
import { dummyBlogPosts } from "@/data/blog";

const BG_SRC = "/images/blog/blog-preview-bg.png";

/* ==========================================
   HELPERS (Disamakan persis dengan BlogIndex)
   ========================================== */

function resolveImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http") || imagePath.startsWith("/images")) {
    return imagePath;
  }
  return `/storage/${imagePath}`;
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPreview({ posts = [] }) {
  const hasPosts = Array.isArray(posts)
    ? posts.length > 0
    : Boolean(posts?.data && posts.data.length > 0);

  const effectivePosts = hasPosts
    ? (Array.isArray(posts) ? posts : posts.data)
    : dummyBlogPosts;

  const [activeIndex, setActiveIndex] = useState(0);

  // Jika data posts belum ada atau array kosong
  if (!effectivePosts || effectivePosts.length === 0) {
    return (
      <section className="relative overflow-hidden py-20 text-center font-sans">
        <p className="font-medium text-[#102380]/70">
          Belum ada berita terbaru saat ini.
        </p>
      </section>
    );
  }

  const count = effectivePosts.length;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  const active = effectivePosts[activeIndex] || {};
  const prev = effectivePosts[prevIndex] || {};
  const next = effectivePosts[nextIndex] || {};

  return (
    <section className="relative overflow-hidden py-20 font-sans md:py-28">
      {/* Background Image Standard */}
      <img
        src={BG_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
        {/* Left: Heading block */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 -top-10 h-72 w-72 md:-right-2 md:h-80 md:w-80"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#FDD000"
                strokeWidth="0.6"
                opacity="0.45"
              />
            </svg>
            {[
              { x: 88, y: 30 },
              { x: 62, y: 92 },
              { x: 8, y: 58 },
            ].map((p, i) => (
              <Sparkles
                key={i}
                className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-amber-400"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              />
            ))}
            <div
              className="absolute left-1/2 top-[6%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                boxShadow: "0 0 46px 16px rgba(253,208,0,0.45)",
              }}
            />
          </div>

          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#102380]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#102380]">
                <SquarePen aria-hidden="true" className="h-3.5 w-3.5" />
                Sekolah Islam Attaufiq
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 font-['Playfair_Display',Georgia,serif] text-[42px] font-semibold leading-[1.1] text-[#102380] md:text-[54px] md:leading-[1.05]">
                <span className="block text-[#102380]">Berita</span>
                <span className="block text-amber-400">Terbaru</span>
                <span className="block text-[#102380]">Attaufiq</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="my-6 flex max-w-[220px] items-center gap-3">
                <span className="h-px flex-1 border-t border-dashed border-amber-400/50" />
                <Sparkles
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-amber-400"
                />
                <span className="h-px flex-1 border-t border-dashed border-amber-400/50" />
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="max-w-xs text-sm text-[#102380]/70 md:text-base">
                Ikuti kegiatan, informasi, dan kabar terbaru dari keluarga
                besar At-Taufiq.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8">
                <LinkButton href="/blog" variant="navy">
                  Lihat Berita Lainnya
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </LinkButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: Carousel */}
        <Reveal delay={0.2}>
          <div className="relative mx-auto my-4 flex w-full max-w-lg items-center justify-center">
            {/* Card Kiri (Prev) */}
            <button
              type="button"
              onClick={() => setActiveIndex(prevIndex)}
              aria-label={`Lihat berita sebelumnya: ${prev?.title}`}
              className="group absolute -left-10 top-1/2 z-0 w-36 -translate-y-1/2 text-left opacity-40 transition-all duration-300 hover:opacity-100 sm:-left-16 sm:w-44 md:-left-20 md:w-48"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-[#102380]/10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full bg-slate-200">
                  {prev?.image ? (
                    <img
                      src={resolveImageUrl(prev.image)}
                      alt={prev.title || "Berita"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label="" className="h-full w-full" />
                  )}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-[#102380] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
                    {prev?.category?.name || "UMUM"}
                  </span>
                  <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#102380] shadow sm:right-3 sm:top-3 sm:h-8 sm:w-8">
                    <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-500 sm:text-xs">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(prev?.created_at)}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs font-bold leading-snug text-[#102380] sm:mt-2 sm:text-sm">
                    {prev?.title}
                  </p>
                </div>
              </div>
            </button>

            {/* Card Tengah (Active) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id || activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 w-52 shrink-0 sm:w-60 md:w-64"
              >
                <Link
                  href={
                    typeof route === "function"
                      ? route("blog.show", active?.slug || "slug-berita")
                      : `/blog/${active?.slug || "slug-berita"}`
                  }
                  className="block overflow-hidden rounded-[1.75rem] border-2 border-amber-400 bg-[#102380] shadow-xl shadow-[#102380]/20"
                >
                  <div className="relative aspect-[4/5] w-full bg-slate-200">
                    {active?.image ? (
                      <img
                        src={resolveImageUrl(active.image)}
                        alt={active.title || "Berita"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlaceholder label="" className="h-full w-full" />
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#102380]">
                      {active?.category?.name || "UMUM"}
                    </span>
                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-400 shadow">
                      <Sparkles aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="bg-[#102380] p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                      <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                      {formatDate(active?.created_at)}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base">
                      {active?.title}
                    </p>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-3 h-4 w-4 text-white sm:mt-4"
                    />
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Card Kanan (Next) */}
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              aria-label={`Lihat berita berikutnya: ${next?.title}`}
              className="group absolute -right-10 top-1/2 z-0 w-36 -translate-y-1/2 text-left opacity-40 transition-all duration-300 hover:opacity-100 sm:-right-16 sm:w-44 md:-right-20 md:w-48"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-[#102380]/10 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full bg-slate-200">
                  {next?.image ? (
                    <img
                      src={resolveImageUrl(next.image)}
                      alt={next.title || "Berita"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label="" className="h-full w-full" />
                  )}
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-[#102380] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
                    {next?.category?.name || "UMUM"}
                  </span>
                  <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#102380] shadow sm:right-3 sm:top-3 sm:h-8 sm:w-8">
                    <ChevronRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-500 sm:text-xs">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatDate(next?.created_at)}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs font-bold leading-snug text-[#102380] sm:mt-2 sm:text-sm">
                    {next?.title}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            {posts.map((post, i) => (
              <button
                key={post.id || i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Lihat berita ${post.title}`}
                aria-current={i === activeIndex}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-amber-400"
                    : "w-2.5 bg-[#102380]/20"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}