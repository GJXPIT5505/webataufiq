import React, { useEffect, useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Sun } from "lucide-react";
import { blogArticles as staticArticles, blogCategories as staticCategories, getBlogCategory } from "@/data/blog";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import BlogCategoryIcon from "./BlogCategoryIcon";
import ArchPhotoFrame from "./ArchPhotoFrame";

const PER_PAGE = 10;

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const withGaps = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) withGaps.push("gap");
    withGaps.push(p);
  });
  return withGaps;
}

function useColumnCount() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(mqLg.matches ? 5 : mqSm.matches ? 3 : 2);
    update();
    mqSm.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqSm.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

function chunk(items, size) {
  const rows = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

function ShelfStrip({ decorLeft, decorRight }) {
  return (
    <div
      className="relative z-0 -mt-[41px] sm:-mt-[51px]"
      style={{ perspective: 500, marginLeft: "-3cm", marginRight: "-3cm" }}
    >
      <div
        aria-hidden="true"
        className="h-12 w-full sm:h-14"
        style={{
          backgroundColor: "#B78B52",
          transform: "rotateX(72deg)",
          transformOrigin: "bottom",
          boxShadow: "inset 0 -8px 12px rgba(0,0,0,0.18)",
        }}
      />
      <div
        aria-hidden="true"
        className="relative h-7 w-full sm:h-8"
        style={{
          backgroundColor: "#5A3A1E",
          borderRadius: "0 0 10% 10%",
          boxShadow: "0 10px 18px rgba(35,20,8,0.35), 0 3px 6px rgba(35,20,8,0.25)",
        }}
      />

      {decorLeft && (
        <div
          aria-hidden="true"
          className="absolute bottom-7 left-[calc(0.5rem+0.5cm)] z-20 h-[195px] w-[137px] sm:bottom-8 sm:left-[calc(1.5rem+0.5cm)] sm:h-[285px] sm:w-[200px]"
        >
          <img
            src="/images/footer/footer-lantern.png"
            alt=""
            className="h-full w-full object-contain object-bottom drop-shadow-lg"
          />
        </div>
      )}

      {decorRight && (
        <div
          aria-hidden="true"
          className="absolute bottom-[calc(1.75rem-0.5cm)] right-[calc(0.5rem-0.5cm)] z-20 h-[180px] w-[187px] sm:bottom-[calc(2rem-0.5cm)] sm:right-[calc(1.5rem-0.5cm)] sm:h-[260px] sm:w-[270px]"
        >
          <img
            src="/images/hero/bgPot-right.png"
            alt=""
            className="h-full w-full object-contain object-bottom drop-shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

function resolveImg(item) {
  if (item.image) {
    if (item.image.startsWith("http") || item.image.startsWith("/images")) return item.image;
    return `/storage/${item.image}`;
  }
  return null;
}

function BookCard({ article, isNavy, delay }) {
  const c = typeof article.category === "object" && article.category !== null
    ? article.category
    : getBlogCategory(article.category);
  const catLabel = c?.name || c?.label || (typeof article.category === "string" ? article.category : "");
  const imgSrc = resolveImg(article);

  return (
    <motion.div
      className="group relative z-20 mx-auto block w-full max-w-[170px] text-left"
      style={{ rotateY: -18, transformPerspective: 500 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      <Link href={`/blog/${article.slug}`} className="block">
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 -right-2 z-0 w-3 rounded-r-sm"
          style={{
            background: "linear-gradient(to right, #E4D6B8, #F6EFDC)",
            boxShadow: "inset -1px 0 2px rgba(0,0,0,0.15)",
          }}
        />

        <div
          className={`relative z-10 rounded-md border-2 border-gold/70 p-2.5 shadow-xl transition-transform group-hover:-translate-y-1 ${
            isNavy ? "bg-navy" : "bg-[#FBF6EA]"
          }`}
        >
          <ArchPhotoFrame id={article.slug} gold={isNavy ? "#FDD000" : "#102380"}>
            {imgSrc ? (
              <img src={imgSrc} alt={article.title} className="h-full w-full object-cover" />
            ) : (
              <ImagePlaceholder label={`[ISI: Foto ${article.title}]`} className="h-full w-full" />
            )}
          </ArchPhotoFrame>

          {catLabel && (
            <span
              className={`mt-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                isNavy ? "bg-gold text-navy" : "border border-gold/60 bg-gold/10 text-navy"
              }`}
            >
              {catLabel}
            </span>
          )}

          <h3
            className={`mt-2 line-clamp-3 min-h-[3.75rem] text-sm font-bold leading-snug ${
              isNavy ? "text-white" : "text-navy"
            }`}
          >
            {article.title}
          </h3>

          <p
            className={`mt-2 flex items-center gap-1 text-[11px] ${
              isNavy ? "text-white/60" : "text-navy/50"
            }`}
          >
            <Clock className="h-3 w-3" aria-hidden="true" />
            {article.readingTime || "5 menit membaca"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogGridSection({ posts = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [page, setPage] = useState(1);
  const cols = useColumnCount();

  // Unified items list: DB posts if available, else static
  const allArticles = useMemo(() => {
    if (posts && posts.length > 0) return posts;
    return staticArticles;
  }, [posts]);

  // Unified categories
  const categoryList = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        slug: c.slug,
        label: c.name || c.label,
        icon: c.icon || "Newspaper",
      }));
    }
    return staticCategories;
  }, [categories]);

  const featured = allArticles.find((a) => a.featured) || (allArticles.length > 0 ? allArticles[0] : null);
  const gridArticles = useMemo(() => {
    if (featured) {
      return allArticles.filter((a) => a.slug !== featured.slug);
    }
    return allArticles;
  }, [allArticles, featured]);

  const filtered = useMemo(() => {
    if (activeCategory === "semua") return gridArticles;
    return gridArticles.filter((a) => {
      const catSlug = typeof a.category === "object" && a.category !== null ? a.category.slug : a.category;
      return catSlug === activeCategory;
    });
  }, [gridArticles, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  const featuredImg = featured ? resolveImg(featured) : null;
  const featuredCatObj = featured
    ? typeof featured.category === "object" && featured.category !== null
      ? featured.category
      : getBlogCategory(featured.category)
    : null;
  const featuredCatLabel = featuredCatObj?.name || featuredCatObj?.label || (typeof featured?.category === "string" ? featured.category : "");

  return (
    <section className="bg-ivory px-6 py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        {/* Featured article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="grid w-full gap-6 overflow-hidden rounded-3xl border border-navy/10 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md sm:grid-cols-2 sm:p-5"
          >
            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-full sm:min-h-[22rem]">
              {featuredImg ? (
                <img src={featuredImg} alt={featured.title} className="h-full w-full object-cover" />
              ) : (
                <ImagePlaceholder label={`[ISI: Foto ${featured.title}]`} className="h-full w-full" />
              )}
              <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Featured Article
              </span>
            </div>

            <div className="flex flex-col justify-center py-2 sm:py-4">
              {featuredCatLabel && (
                <span className="inline-flex w-fit items-center rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-navy">
                  {featuredCatLabel}
                </span>
              )}
              <h2 className="font-heading mt-3 text-2xl leading-tight text-navy sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy/60">
                {featured.excerpt || (featured.content ? (typeof featured.content === "string" ? featured.content.replace(/<[^>]*>?/gm, "").slice(0, 160) : "") : "")}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-navy/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {featured.readingTime || "5 menit membaca"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {formatDate(featured.date || featured.created_at)}
                </span>
                <span className="ml-auto flex items-center gap-1 font-semibold text-lightblue">
                  Baca Selengkapnya
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Category pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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
          {categoryList.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActiveCategory(c.slug)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === c.slug
                  ? "bg-navy text-white shadow-md"
                  : "border border-navy/15 text-navy/70 hover:bg-navy/5"
              }`}
            >
              <BlogCategoryIcon name={c.icon} className="h-3.5 w-3.5" />
              {c.label}
            </button>
          ))}
        </div>

        {/* Heading — fade-in line, sun, text, sun, fade-out line */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-16 shrink-0 bg-gradient-to-r from-transparent to-gold/60 sm:w-24" />
          <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
          <h2 className="font-heading whitespace-nowrap text-2xl text-navy sm:text-3xl">
            Artikel Terbaru
          </h2>
          <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
          <span className="h-px w-16 shrink-0 bg-gradient-to-l from-transparent to-gold/60 sm:w-24" />
        </div>

        {/* Book grid on wooden shelves */}
        <div className="mt-10 overflow-hidden py-4">
          {chunk(pageItems, cols).map((row, rowIndex) => (
            <div key={row[0]?.slug ?? rowIndex} className="mb-10">
              <div
                className="relative z-20 grid gap-x-6"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  transform: cols > 2 ? `translateX(${rowIndex % 2 === 0 ? "2.5cm" : "-2.5cm"})` : undefined,
                }}
              >
                {row.map((article, i) => {
                  const globalIndex = rowIndex * cols + i;
                  return (
                    <BookCard
                      key={article.slug}
                      article={article}
                      isNavy={globalIndex % 2 === 0}
                      delay={i * 0.06}
                    />
                  );
                })}
              </div>
              <ShelfStrip decorLeft={rowIndex === 0} decorRight={rowIndex === 1} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-navy/60">Belum ada artikel di kategori ini.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Halaman sebelumnya"
              className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy/60 transition-colors hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>

            {pageNumbers(page, totalPages).map((p, i) =>
              p === "gap" ? (
                <span key={`gap-${i}`} className="px-1 text-navy/40">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  aria-current={p === page}
                  className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors ${
                    p === page ? "bg-navy text-white shadow-md" : "text-navy/60 hover:bg-navy/5"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Halaman berikutnya"
              className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 text-navy/60 transition-colors hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

