import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({
    title = "Judul Halaman",
    subtitle = "Deskripsi singkat halaman di sini.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png",
    heroRef,
}) {
    return (
        <section 
            key={title} /* Memaksa animasi jalan ulang saat ganti halaman */
            ref={heroRef} 
            className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-[520px] sm:min-h-[580px] md:min-h-screen flex flex-col justify-center items-center pt-20 pb-20 md:py-0"
        >
            {/* 1. FOTO GEDUNG (KANAN) - ZOOM & FADE IN */}
            <motion.div 
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute top-0 right-0 w-full sm:w-3/4 md:w-3/5 h-full z-0 pointer-events-none"
            >
                <img
                    src={mosqueImage}
                    alt={title}
                    className="w-full h-full object-cover object-center opacity-70 md:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] via-[#07327F]/75 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#07327F] via-transparent to-[#07327F]/40"></div>
            </motion.div>

            {/* 2. ISLAMIC ARCH FRAME (KIRI) - SLIDE IN DARI KIRI */}
            <motion.div 
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 -left-20 sm:-left-16 md:left-0 h-full w-[120%] sm:w-full md:w-7/12 z-10 pointer-events-none overflow-hidden opacity-85 md:opacity-100"
            >
                <img
                    src={patternImage}
                    alt="Islamic Arch Frame"
                    className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,black_65%,transparent_100%)]"
                />
            </motion.div>

            {/* 3. KONTEN TEKS HERO */}
            <div className="relative z-20 container mx-auto px-5 sm:px-6 text-center flex flex-col items-center justify-center max-w-2xl lg:max-w-4xl">
                
                {/* Tagline */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex items-center space-x-2 mb-2"
                >
                    <span className="text-[#FFC72C] text-[10px] sm:text-xs drop-shadow">✦</span>
                    <p className="text-[#FFC72C] font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                        {tagline}
                    </p>
                    <span className="text-[#FFC72C] text-[10px] sm:text-xs drop-shadow">✦</span>
                </motion.div>

                {/* Sun Icon */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[#FFC72C] my-1 drop-shadow"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto fill-current" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </motion.div>

                {/* Judul Utama */}
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl sm:text-4xl md:text-6xl font-normal text-white tracking-tight leading-tight my-2 max-w-3xl drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]"
                >
                    {title}
                </motion.h1>

                {/* Divider Line Emas */}
                <motion.div 
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="flex items-center space-x-2 my-2 opacity-90"
                >
                    <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]"></div>
                    <span className="text-[#FFC72C] text-[10px]">☀️</span>
                    <div className="w-8 md:w-12 h-[1px] bg-[#D4AF37]"></div>
                </motion.div>

                {/* Subtitle */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-blue-100 text-xs sm:text-sm md:text-base font-light max-w-md md:max-w-xl leading-relaxed mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                >
                    {subtitle}
                </motion.p>
            </div>

            {/* 4. GELOMBANG SVG BAWAH */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-[1px]"
            >
                <svg
                    viewBox="0 0 1440 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-14 sm:h-20 md:h-32 block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 C240,140 480,150 720,70 C940,-5 1200,-10 1440,55 L1440,160 L0,160 Z"
                        fill="#D4AF37"
                    />
                    <path
                        d="M0,66 C240,146 480,156 720,76 C940,1 1200,-4 1440,61 L1440,160 L0,160 Z"
                        fill="#FAF4EB"
                    />
                </svg>
            </motion.div>

        </section>
    );
}