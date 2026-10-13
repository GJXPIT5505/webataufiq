import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Link2,
  Newspaper,
  Quote,
  Share2,
  Sun,
} from "lucide-react";
import BlogArticleHero from "@/Components/blog/BlogArticleHero";
import BlogCategoryIcon from "@/Components/blog/BlogCategoryIcon";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import { LinkButton } from "@/Components/ui/Button";
import { blogArticles, getBlogArticleBySlug, getBlogCategory } from "@/data/blog";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function resolveImg(item) {
  if (!item) return null;
  if (item.image) {
    if (item.image.startsWith("http") || item.image.startsWith("/images")) return item.image;
    return `/storage/${item.image}`;
  }
  return null;
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.5 7.4L22 21h-6.4l-5-6.5L4.7 21H2.6l6.9-7.9L2 3h6.6l4.5 5.9L18.9 3Zm-1.1 16.2h1.2L7.3 4.7H6l11.8 14.5Z" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.274-.47-2.427-1.498c-.897-.799-1.503-1.787-1.679-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.636-.929-2.242-.244-.59-.493-.51-.678-.52l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.512 1.079 2.913 1.23 3.114c.15.2 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.721.229 1.377.197 1.895.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.04 2C6.524 2 2.04 6.485 2.04 12c0 1.99.584 3.844 1.597 5.41L2 22l4.733-1.595A9.957 9.957 0 0 0 12.04 22c5.514 0 10-4.485 10-10s-4.486-10-10-10z" />
    </svg>
  );
}

export default function BlogDetail({
  post,
  slug,
  relatedPosts = [],
  prevPost,
  nextPost,
}) {
  const [copied, setCopied] = useState(false);

  // Fallback to static data if post not in DB
  const staticFallback = getBlogArticleBySlug(slug || post?.slug);
  const article = post || staticFallback || blogArticles[0];

  const catObj =
    typeof article.category === "object" && article.category !== null
      ? article.category
      : getBlogCategory(article.category);
  const catLabel =
    catObj?.label || catObj?.name || (typeof article.category === "string" ? article.category : "");

  // Fallback related posts
  let related = relatedPosts;
  if (!related || related.length === 0) {
    const others = blogArticles.filter((a) => a.slug !== article.slug);
    const sameCategory = others.filter((a) => a.category === article.category);
    const rest = others.filter((a) => a.category !== article.category);
    related = [...sameCategory, ...rest].slice(0, 3);
  }

  // Fallback prev & next
  let prevArticle = prevPost;
  let nextArticle = nextPost;
  if (!prevArticle || !nextArticle) {
    const index = blogArticles.findIndex((a) => a.slug === article.slug);
    if (index !== -1) {
      if (!prevArticle) prevArticle = blogArticles[(index - 1 + blogArticles.length) % blogArticles.length];
      if (!nextArticle) nextArticle = blogArticles[(index + 1) % blogArticles.length];
    }
  }

  const shareUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://www.attaufiq.sch.id/blog/${article.slug}`;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const heroImg = resolveImg(article);
  const prevImg = resolveImg(prevArticle);
  const nextImg = resolveImg(nextArticle);

  return (
    <AppLayout title={`${article.title} - SIT At-Taufiq Jambi`}>
      <Head title={`${article.title} | SIT At-Taufiq Jambi`} />

      <BlogArticleHero
        photoLabel={`[ISI: Foto Utama ${article.title}]`}
        photoSrc={heroImg}
        categoryLabel={catLabel}
        title={article.title}
        excerpt={article.excerpt}
        readingTime={article.readingTime || "5 menit membaca"}
        dateLabel={formatDate(article.date || article.created_at)}
        author={article.author || "Tim Attaufiq"}
      />

      <div className="bg-ivory min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy/60 transition-colors hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Blog
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 md:grid-cols-[1fr_20rem]">
          {/* Main Article Content */}
          <article className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl shadow-sm">
              {heroImg ? (
                <img
                  src={heroImg}
                  alt={article.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : (
                <ImagePlaceholder
                  label={`[ISI: Foto ${article.title}]`}
                  className="aspect-[16/9] w-full"
                />
              )}
            </div>

            {/* If content is an array of structured blocks */}
            {Array.isArray(article.content) ? (
              <div className="mt-8 space-y-6">
                {article.content.map((block, i) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={i}
                        className={`text-sm leading-relaxed text-navy/80 sm:text-base ${
                          i === 0
                            ? "first-letter:float-left first-letter:mr-2 first-letter:font-heading first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold"
                            : ""
                        }`}
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "heading") {
                    return (
                      <h2 key={i} className="font-heading mt-8 text-xl text-navy sm:text-2xl">
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <div
                        key={i}
                        className="my-6 flex items-start gap-4 rounded-2xl border border-gold/30 bg-gold/10 p-5 sm:p-6"
                      >
                        <Quote
                          className="h-6 w-6 shrink-0 -scale-x-100 text-gold"
                          fill="currentColor"
                          aria-hidden="true"
                        />
                        <p className="font-heading text-lg leading-snug text-navy sm:text-xl">
                          {block.text}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="my-6 flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm sm:p-6"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy/5 text-gold">
                        <Sun className="h-4.5 w-4.5" aria-hidden="true" />
                      </span>
                      <p className="text-sm leading-relaxed text-navy/80 sm:text-base">{block.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : typeof article.content === "string" ? (
              <div
                className="prose prose-navy max-w-none mt-8 text-navy/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : null}

            {/* Prev / next articles */}
            <div className="mt-12 flex items-center justify-between gap-3 border-t border-navy/10 pt-6">
              {prevArticle ? (
                <Link
                  href={`/blog/${prevArticle.slug}`}
                  className="group flex min-w-0 items-center gap-3 text-left"
                >
                  {prevImg ? (
                    <img src={prevImg} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <ImagePlaceholder label="" className="h-12 w-12 shrink-0 rounded-lg" />
                  )}
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-xs text-navy/50">
                      <ArrowLeft
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                        aria-hidden="true"
                      />
                      Artikel Sebelumnya
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-navy group-hover:text-lightblue transition-colors">
                      {prevArticle.title}
                    </span>
                  </span>
                </Link>
              ) : <div />}

              {nextArticle ? (
                <Link
                  href={`/blog/${nextArticle.slug}`}
                  className="group flex min-w-0 items-center justify-end gap-3 text-right ml-auto"
                >
                  <span className="min-w-0">
                    <span className="flex items-center justify-end gap-1 text-xs text-navy/50">
                      Artikel Selanjutnya
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-semibold text-navy group-hover:text-lightblue transition-colors">
                      {nextArticle.title}
                    </span>
                  </span>
                  {nextImg ? (
                    <img src={nextImg} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <ImagePlaceholder label="" className="h-12 w-12 shrink-0 rounded-lg" />
                  )}
                </Link>
              ) : null}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* About author */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-sm">
              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-navy">
                <Sun className="h-4 w-4 text-gold" aria-hidden="true" />
                Tentang Penulis
              </p>
              <div
                className="mx-auto mt-4 grid h-16 w-16 place-items-center rounded-full"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #FFF6D6, #FDD000 55%, #F5B300 100%)",
                }}
              >
                <Sun className="h-7 w-7 text-navy" aria-hidden="true" />
              </div>
              <p className="font-heading mt-3 text-base text-navy">{article.author || "Tim Attaufiq"}</p>
              <p className="text-xs text-navy/50">Attaufiq Islamic School</p>
              <p className="mt-3 text-xs leading-relaxed text-navy/60">
                Tim konten Attaufiq berkomitmen untuk berbagi informasi dan inspirasi seputar
                pendidikan Islam, parenting, dan pengembangan anak.
              </p>
            </div>

            {/* Share buttons */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Share2 className="h-4 w-4 text-gold" aria-hidden="true" /> Bagikan Artikel Ini
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${article.title} ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke WhatsApp"
                  className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition-opacity hover:opacity-80"
                >
                  <WhatsappIcon className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Facebook"
                  className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition-opacity hover:opacity-80"
                >
                  <FacebookIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke Twitter"
                  className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition-opacity hover:opacity-80"
                >
                  <TwitterIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Salin Link"
                  className="grid h-9 w-9 place-items-center rounded-full bg-navy text-white transition-opacity hover:opacity-80 cursor-pointer"
                >
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              {copied && (
                <p className="mt-2 text-xs font-medium text-emerald-600">Link berhasil disalin!</p>
              )}
            </div>

            {/* Related articles */}
            <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Newspaper className="h-4 w-4 text-gold" aria-hidden="true" /> Artikel Terkait
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {related.map((r) => {
                  const rCategory = typeof r.category === "object" && r.category !== null
                    ? r.category
                    : getBlogCategory(r.category);
                  const rCatLabel = rCategory?.label || rCategory?.name || (typeof r.category === "string" ? r.category : "");
                  const rImg = resolveImg(r);

                  return (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="group flex items-start gap-3 text-left"
                    >
                      {rImg ? (
                        <img src={rImg} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                      ) : (
                        <ImagePlaceholder label="" className="h-14 w-14 shrink-0 rounded-lg" />
                      )}
                      <div>
                        {rCatLabel && (
                          <span className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-navy">
                            {rCategory?.icon && <BlogCategoryIcon name={rCategory.icon} className="mr-1 h-2.5 w-2.5" />}
                            {rCatLabel}
                          </span>
                        )}
                        <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-navy group-hover:text-lightblue transition-colors">
                          {r.title}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-navy/50">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {formatDate(r.date || r.created_at)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Admission CTA card */}
            <div className="rounded-2xl bg-navy p-6 text-white shadow-md">
              <p className="font-heading text-lg">Tertarik Bergabung dengan Attaufiq?</p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">
                Mari tumbuh dan belajar bersama dalam lingkungan Islam yang amanah dan penuh cinta.
              </p>
              <LinkButton href="/admission" variant="gold" size="sm" className="mt-4 w-fit px-4 text-xs">
                Lihat Halaman Admission
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </LinkButton>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}