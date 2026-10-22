import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sun } from 'lucide-react';

// Warna navy hasil sample PNG agar tidak ada garis batas (seamless) antara gambar frame & background
const ASSET_NAVY = '#002672';

export default function HeroSection({
    title = "Judul Halaman",
    subtitle = "Deskripsi singkat halaman di sini.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero-banner/hero-banner-bg-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png",
    heroRef,
    revealNotchBehind = false,
}) {
    const reduceMotion = useReducedMotion();

    // Handling animasi opsional jika user mengaktifkan reduced motion di OS
    const textInitial = reduceMotion ? undefined : { opacity: 0, y: 16 };
    const textAnimate = reduceMotion ? undefined : { opacity: 1, y: 0 };

    // Format subtitle menjadi array jika berupa string berbaris
    const subtitleLines = Array.isArray(subtitle) ? subtitle : [subtitle];

    return (
        <section
            key={title} /* Memaksa animasi jalan ulang saat ganti halaman */
            ref={heroRef}
            className="relative overflow-hidden w-full text-white"
            style={{ backgroundColor: ASSET_NAVY }}
        >
            {/* 1. FRAME / PATTERN ISLAMI (DESKTOP) */}
            <div
                className="absolute inset-y-0 left-0 hidden w-full md:block pointer-events-none"
                style={{ backgroundColor: ASSET_NAVY }}
            >
                <img
                    src={patternImage}
                    alt=""
                    className="h-full w-full object-contain object-left"
                />
            </div>

            {/* 2. FOTO GEDUNG (DESKTOP - KANAN WITH MASK) */}
            <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-y-0 right-0 hidden w-[42%] md:block pointer-events-none"
                style={{ backgroundColor: ASSET_NAVY }}
            >
                <img
                    src={mosqueImage}
                    alt={title}
                    className="h-full w-full object-cover"
                    style={{
                        maskImage: "linear-gradient(to right, transparent, black 32%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 32%)",
                    }}
                />
            </motion.div>

            {/* 3. TAMPILAN MOBILE (FULL-WIDTH BACKDROP & OVERLAY) */}
            <div className="absolute inset-0 md:hidden pointer-events-none">
                <img
                    src={mosqueImage}
                    alt={title}
                    className="h-full w-full object-cover opacity-35"
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: ASSET_NAVY, opacity: 0.8 }}
                />
            </div>

            {/* 4. KONTEN TEKS HERO */}
            <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-6 py-20 sm:min-h-[480px] md:min-h-[560px] md:pl-[14rem] lg:min-h-[640px] lg:pl-[17rem] xl:min-h-[680px] xl:pl-[20rem]">
                <div className="max-w-[25rem] text-center sm:text-left md:pr-4">
                    
                    {/* Tagline */}
                    <motion.p
                        initial={textInitial}
                        animate={textAnimate}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFC72C] sm:text-sm"
                    >
                        {tagline}
                    </motion.p>

                    {/* Icon Sun Atas */}
                    <motion.div
                        initial={textInitial}
                        animate={textAnimate}
                        transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
                        className="mt-3 flex justify-center sm:justify-start"
                    >
                        <Sun aria-hidden="true" className="h-5 w-5 text-[#FFC72C]" />
                    </motion.div>

                    {/* Judul Utama */}
                    <motion.h1
                        initial={textInitial}
                        animate={textAnimate}
                        transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
                        className="font-serif mt-3 text-4xl leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight"
                    >
                        {title}
                    </motion.h1>

                    {/* Divider Sun Tengah */}
                    <motion.div
                        initial={textInitial}
                        animate={textAnimate}
                        transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
                        className="mx-auto mt-6 flex max-w-[220px] items-center gap-3 sm:mx-0"
                    >
                        <span className="h-px flex-1 bg-[#FFC72C]/50" />
                        <Sun aria-hidden="true" className="h-4 w-4 shrink-0 text-[#FFC72C]" />
                        <span className="h-px flex-1 bg-[#FFC72C]/50" />
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={textInitial}
                        animate={textAnimate}
                        transition={{ duration: 0.6, delay: 0.52, ease: "easeOut" }}
                        className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base"
                    >
                        {subtitleLines.map((line, i) => (
                            <span key={i} className="block">
                                {line}
                            </span>
                        ))}
                    </motion.p>
                </div>
            </div>

            {/* 5. SVG WAVE DIVIDER EMAS DI BAWAH */}
            <svg
                aria-hidden="true"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full sm:h-20 md:h-24 z-20"
            >
                {!revealNotchBehind && (
                    <path
                        d="M0,12 C180,12 180,92 360,92 C540,92 540,12 720,12 C900,12 900,92 1080,92 C1260,92 1260,12 1440,12 L1440,100 L0,100 Z"
                        fill="#FAF7F0"
                    />
                )}
                <path
                    d="M0,12 C180,12 180,92 360,92 C540,92 540,12 720,12 C900,12 900,92 1080,92 C1260,92 1260,12 1440,12"
                    fill="none"
                    stroke="#FFC72C"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </section>
    );
}