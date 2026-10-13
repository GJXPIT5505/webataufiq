"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronUp,
  HelpCircle,
  Headphones,
  Minus,
  Plus,
  Sun,
} from "lucide-react";
import Reveal from "@/Components/home/Reveal";

// Dome-cap outline points (normalized)
const LEFT_DOME_OUTER = [
  [0.5, 0.0011], [0.4685, 0.0371], [0.4258, 0.0708], [0.3708, 0.1022], [0.2517, 0.1551],
  [0.2236, 0.1708], [0.1865, 0.1978], [0.1584, 0.227], [0.1393, 0.2562], [0.1281, 0.2831],
  [0.1225, 0.318], [0.1, 0.3213], [0.0798, 0.3281], [0.0528, 0.3438], [0.0348, 0.3607],
  [0.0124, 0.3944], [0.0045, 0.4157], [0, 0.4416],
];
const RIGHT_DOME_OUTER = [
  [1, 0.4404], [0.9966, 0.4191], [0.9899, 0.3989], [0.9685, 0.364], [0.9528, 0.3483],
  [0.9315, 0.3337], [0.9079, 0.3236], [0.8798, 0.3191], [0.8775, 0.3169], [0.873, 0.2843],
  [0.8584, 0.2506], [0.8404, 0.2247], [0.818, 0.2011], [0.7843, 0.1753], [0.7472, 0.1539],
  [0.6416, 0.1079], [0.582, 0.0753], [0.5348, 0.0393], [0.5146, 0.0191], [0.5011, 0.0011],
];
const RIGHT_DOME_INNER = [
  [0.4989, 0.0146], [0.536, 0.0506], [0.5809, 0.0831], [0.6393, 0.1146], [0.7528, 0.1652],
  [0.7831, 0.1831], [0.8067, 0.2011], [0.8337, 0.2281], [0.8551, 0.2596], [0.8685, 0.2955],
  [0.8708, 0.3258], [0.8865, 0.3258], [0.9124, 0.3326], [0.9438, 0.3506], [0.9607, 0.3663],
  [0.9775, 0.3899], [0.9865, 0.4101], [0.9921, 0.4348],
];
const LEFT_DOME_INNER = [
  [0.0079, 0.436], [0.0169, 0.4022], [0.0315, 0.3764], [0.0461, 0.3596], [0.0798, 0.336],
  [0.1067, 0.327], [0.1292, 0.3258], [0.1337, 0.2899], [0.1483, 0.2551], [0.1674, 0.2281],
  [0.1966, 0.1989], [0.2461, 0.1663], [0.3494, 0.1202], [0.4146, 0.0865], [0.4663, 0.0494],
  [0.4989, 0.0157],
];

function keelArchOuterPoints(w, h) {
  const toPx = (pts) => pts.map(([x, y]) => [x * w, y * w]);
  const lo = toPx(LEFT_DOME_OUTER);
  const ro = toPx(RIGHT_DOME_OUTER);
  const bottomOuterY = h;
  return { lo, ro, outerPts: [...lo, [0, bottomOuterY], [w, bottomOuterY], ...ro.slice(1)] };
}

const toPath = (pts) => `M ${pts.map(([x, y]) => `${x},${y}`).join(" L ")} Z`;

function keelFillPath(w, h) {
  if (w <= 0 || h <= 0) return "";
  return toPath(keelArchOuterPoints(w, h).outerPts);
}

function keelArchPath(w, h) {
  if (w <= 0 || h <= 0) return "";
  const toPx = (pts) => pts.map(([x, y]) => [x * w, y * w]);
  const { lo, ro, outerPts } = keelArchOuterPoints(w, h);
  const ri = toPx(RIGHT_DOME_INNER);
  const li = toPx(LEFT_DOME_INNER);

  const domeOuterY = (lo[lo.length - 1][1] + ro[0][1]) / 2;
  const domeInnerY = (li[0][1] + ri[ri.length - 1][1]) / 2;
  const ringInset = domeOuterY - domeInnerY;

  const bottomInnerY = h - ringInset;

  const innerPts = [
    ...ri,
    [ri[ri.length - 1][0], bottomInnerY],
    [li[0][0], bottomInnerY],
    ...li,
  ];

  return `${toPath(outerPts)} ${toPath(innerPts)}`;
}

function FaqWhatsappIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(12,12) scale(1.38) translate(-12,-12)"
        d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.5 20.5l4.4-1.3A8.4 8.4 0 1 0 12 3.5z"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M9.1 7.9c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.07-.8.37-.27.27-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.1 3.3 5.2 4.5.72.3 1.28.5 1.72.6.72.24 1.38.2 1.9.13.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.34-.3-.16-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.16-.2.3-.78.98-.96 1.18-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.14-.17.19-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.68-1.65-.95-2.24z"
      />
    </svg>
  );
}

const FAQS = [
  {
    q: "Apa saja jenjang pendidikan yang tersedia di Attaufiq?",
    a: "Attaufiq memiliki jenjang pendidikan lengkap mulai dari PG, TK, SD, SMP, SMA, hingga PKBM. Setiap jenjang dirancang untuk mendampingi tumbuh kembang Ananda secara optimal, dengan kurikulum terpadu berbasis nilai-nilai Islam dan karakter care.",
  },
  {
    q: "Bagaimana sistem pembelajaran di Attaufiq?",
    a: "[ISI: jawaban tentang sistem pembelajaran]",
  },
  {
    q: "Apakah Attaufiq memiliki program Tahfizh?",
    a: "[ISI: jawaban tentang program Tahfizh]",
  },
  {
    q: "Apakah ada program beasiswa?",
    a: "[ISI: jawaban tentang program beasiswa]",
  },
  {
    q: "Bagaimana cara tahu hasil seleksi?",
    a: "[ISI: jawaban tentang cara mengetahui hasil seleksi]",
  },
  {
    q: "Apakah orang tua bisa melihat perkembangan Ananda di sekolah?",
    a: "[ISI: jawaban tentang pemantauan perkembangan Ananda]",
  },
];

export default function FaqAdmissionSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const accordionRef = useRef(null);
  const [accordionMinHeight, setAccordionMinHeight] = useState(0);
  useEffect(() => {
    if (accordionRef.current) {
      const measured = accordionRef.current.getBoundingClientRect().height;
      setAccordionMinHeight((prev) => Math.max(prev, measured));
    }
  }, [openIndex, isDesktop]);

  const archWrapRef = useRef(null);
  const [archSize, setArchSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const measure = () => {
      if (archWrapRef.current) {
        const rect = archWrapRef.current.getBoundingClientRect();
        setArchSize({ width: rect.width, height: rect.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [accordionMinHeight, isDesktop]);

  return (
    <section className="relative bg-[#FAF7F0] pb-20 pt-10 md:pb-28 md:pt-14">
      {/* Background Image diganti ke <img> */}
      <img
        src="/images/admission/faq-bg.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Sun aria-hidden="true" className="mx-auto h-5 w-5 text-[#FDD000]" />
          <span className="mt-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#FDD000]">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl leading-[1.1] text-[#0D1B68] md:text-5xl font-['Playfair_Display',serif] font-semibold">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#0D1B68]/70 sm:text-base">
            Kami memahami setiap pertanyaan Bunda/Ayah.
            <br />
            Berikut jawaban atas hal-hal yang paling sering ditanyakan tentang Attaufiq.
          </p>
          <div className="mx-auto mt-6 flex max-w-[220px] items-center gap-3">
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, #FDD000)" }}
            />
            <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#FDD000]" />
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, #FDD000, transparent)" }}
            />
          </div>
        </Reveal>

        <div
          className="mt-12 grid gap-6"
          style={{ gridTemplateColumns: isDesktop ? "18rem 1fr" : "1fr" }}
        >
          {/* Left arch card — "Masih Punya Pertanyaan?" */}
          <Reveal>
            <div
              className="relative mx-auto w-full max-w-xs rounded-2xl border border-[#FDD000]/30 bg-[#FAF7F0] shadow-md"
              style={{
                height: accordionMinHeight || undefined,
                minHeight: accordionMinHeight ? undefined : 380,
              }}
            >
              <div
                ref={archWrapRef}
                className="absolute overflow-hidden"
                style={{ top: "0.5cm", right: "0.5cm", bottom: "0.5cm", left: "0.5cm" }}
              >
                <svg
                  viewBox={`0 0 ${archSize.width} ${archSize.height}`}
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path d={keelFillPath(archSize.width, archSize.height)} fill="#FFFDF7" />
                </svg>

                {/* Building Image diganti ke <img> */}
                <img
                  src="/images/about/building-cropped.png"
                  alt=""
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-auto w-full object-cover object-bottom"
                  style={{
                    opacity: 0.4,
                    transform: "scale(1.1) translateY(22px)",
                    transformOrigin: "bottom center",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                  }}
                />

                <svg
                  viewBox={`0 0 ${archSize.width} ${archSize.height}`}
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <path
                    d={keelArchPath(archSize.width, archSize.height)}
                    fill="#FDD000"
                    fillRule="evenodd"
                  />
                </svg>

                <div
                  className="relative flex h-full flex-col items-center px-6 text-center"
                  style={{ paddingTop: "calc(17% + 1cm)" }}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#FDD000]/50">
                    <HelpCircle aria-hidden="true" className="h-6 w-6 text-[#FDD000]" />
                  </span>
                  <h3 className="mt-4 text-2xl text-[#0D1B68] font-['Playfair_Display',serif] font-semibold">
                    Masih Punya Pertanyaan?
                  </h3>
                  <div className="mt-3 flex w-24 items-center gap-1.5">
                    <span className="h-px flex-1 bg-[#FDD000]/40" />
                    <Sun aria-hidden="true" className="h-3 w-3 shrink-0 text-[#FDD000]" />
                    <span className="h-px flex-1 bg-[#FDD000]/40" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[#0D1B68]/70">
                    Jika pertanyaan Bunda/Ayah belum terjawab di sini, jangan ragu untuk
                    menghubungi tim kami. Kami siap membantu.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FAQ accordion */}
          <div
            ref={accordionRef}
            className="flex flex-col gap-3"
            style={{ minHeight: accordionMinHeight || undefined }}
          >
            {FAQS.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal
                  key={item.q}
                  delay={i * 0.05}
                  className="overflow-hidden rounded-2xl border border-[#FDD000]/30 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0D1B68] text-white">
                      {isOpen ? (
                        <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                      ) : (
                        <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                      )}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-[#0D1B68] sm:text-base">
                      {item.q}
                    </span>
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#0D1B68]/20 text-[#0D1B68]/50">
                      {isOpen ? (
                        <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" />
                      ) : (
                        <Plus aria-hidden="true" className="h-3 w-3" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5" style={{ paddingBottom: "0.5cm" }}>
                      <div
                        className="rounded-xl"
                        style={{
                          backgroundColor: "rgba(243, 236, 217, 0.5)",
                          paddingTop: 16,
                          paddingBottom: 16,
                          paddingLeft: 40,
                          paddingRight: 40,
                        }}
                      >
                        <p className="text-sm leading-relaxed text-[#0D1B68]/70">{item.a}</p>
                      </div>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom help CTA bar */}
        <Reveal delay={0.1} className="mt-10">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#FDD000]/30 bg-white p-6 sm:flex-row sm:p-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#0D1B68] text-[#FDD000]">
                <Headphones aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-lg text-[#0D1B68] font-['Playfair_Display',serif] font-semibold">
                  Butuh Bantuan Lebih Lanjut?
                </p>
                <p className="text-sm text-[#0D1B68]/60">
                  Tim Attaufiq siap membantu menjawab setiap pertanyaan Bunda/Ayah.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row">
              <a
                href="https://wa.link/moeqv3"
                className="flex items-center gap-3 rounded-xl border border-[#FDD000]/40 px-5 py-3 transition-opacity hover:opacity-80"
              >
                <FaqWhatsappIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#FDD000]" />
                <span className="flex-1">
                  <span className="block whitespace-nowrap text-sm font-semibold text-[#0D1B68]">
                    Chat Admin PG-TK-SD
                  </span>
                  <span className="block whitespace-nowrap text-xs text-[#0D1B68]/50">
                    Chat via WA pada jam kerja
                  </span>
                </span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0D1B68]/40" />
              </a>

              <a
                href="https://wa.link/r67nek"
                className="flex items-center gap-3 rounded-xl bg-[#0D1B68] px-5 py-3 text-white transition-opacity hover:opacity-90"
              >
                <FaqWhatsappIcon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#FDD000]" />
                <span className="flex-1">
                  <span className="block whitespace-nowrap text-sm font-semibold">
                    Chat Admin SMP-SMA
                  </span>
                  <span className="block whitespace-nowrap text-xs text-white/60">
                    Chat via WA pada jam kerja
                  </span>
                </span>
                <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-white/60" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}