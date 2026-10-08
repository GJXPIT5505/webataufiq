import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import { motion } from 'framer-motion';

// Varian Animasi Framer Motion untuk Scroll Reveal
const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -45 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 45 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

export default function Sejarah() {
    return (
        <AppLayout title="Sejarah - SIT At-Taufiq">
            <Head title="Sejarah & Perjalanan | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <HeroSection 
                title="Sejarah Perjalanan"
                subtitle="Mengenal awal mula dedikasi, rekam jejak, dan komitmen Attaufiq dalam mencetak generasi Robbani sejak 1982."
                tagline="SEKOLAH ISLAM ATTAUFIQ"
                mosqueImage="/images/hero/building-attaufiq.png"
            />

            {/* ==========================================
                2. AWAL SEBUAH AMANAH (1982)
            ========================================== */}
            <section className="py-24 bg-[#FAF4EB] relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                    
                    {/* Section Header */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <div className="text-[#C9972E] text-2xl mb-2 animate-pulse">☀️</div>
                        
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <span className="w-10 h-[1px] bg-[#C9972E]/60"></span>
                            <span className="text-[#C9972E] font-bold text-xs uppercase tracking-[0.25em]">TENTANG ATTAUFIQ</span>
                            <span className="w-10 h-[1px] bg-[#C9972E]/60"></span>
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#07327F] font-bold tracking-tight mb-3">
                            Awal Sebuah Amanah
                        </h2>

                        <div className="flex items-center justify-center space-x-3 text-[#C9972E]">
                            <span className="w-12 h-[1px] bg-[#C9972E]"></span>
                            <span className="text-xs">✦</span>
                            <span className="font-serif italic text-base sm:text-lg font-bold text-[#07327F]">1982</span>
                            <span className="text-xs">✦</span>
                            <span className="w-12 h-[1px] bg-[#C9972E]"></span>
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
                        
                        {/* Foto Vintage 1982 dengan Selotip */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInLeft}
                            className="md:col-span-6 relative mx-auto w-full max-w-md"
                        >
                            {/* Selotip / Masking Tape Atas */}
                            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#E8DFC8]/90 backdrop-blur-xs z-20 rotate-[-2deg] shadow-xs border border-white/40"></div>
                            
                            <div className="bg-white p-4 sm:p-5 rounded-[28px] shadow-xl border border-[#E8DFC8] transform -rotate-1 hover:rotate-0 transition duration-500">
                                <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-amber-950/10 shadow-inner">
                                    <img
                                        src="/images/hero/sejarah-1982.jpg"
                                        alt="Yayasan Pendidikan Attaufiq 1982"
                                        className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-700"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop";
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Teks Sejarah */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInRight}
                            className="md:col-span-6 space-y-5 text-slate-700 font-light text-sm sm:text-base leading-relaxed"
                        >
                            <p>
                                Attaufiq berawal dari sebuah amanah dan kepedulian untuk menghadirkan pendidikan Islam yang tidak hanya mengajarkan ilmu, tetapi juga menanamkan nilai-nilai Al-Qur'an dan Sunnah dalam kehidupan anak.
                            </p>
                            <p>
                                Pada tahun <strong className="font-bold text-[#07327F]">1982</strong>, lahirlah <strong className="font-bold text-[#07327F]">Yayasan Pendidikan Attaufiq</strong> dengan cita-cita besar membentuk generasi beriman, berakhlak mulia, dan berprestasi yang mampu memberi manfaat bagi umat dan bangsa.
                            </p>

                            <div className="pt-2 flex justify-center md:justify-start">
                                <div className="flex items-center space-x-2 text-[#C9972E]">
                                    <span className="w-8 h-[1px] bg-[#C9972E]/60"></span>
                                    <span className="text-xs">☀️</span>
                                    <span className="w-8 h-[1px] bg-[#C9972E]/60"></span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                3. ATTAUFIQ HARI INI
            ========================================== */}
            <section className="py-24 bg-[#051736] text-white relative overflow-hidden">
                {/* Background Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                    
                    {/* Header */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="text-[#FFC72C] text-2xl mb-2 animate-pulse">☀️</div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                            Attaufiq Hari Ini
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-[#FFC72C]">
                            <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs">◆</span>
                            <span className="w-10 h-[1px] bg-[#D4AF37]"></span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        
                        {/* Galeri Gambar Bertingkat */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInLeft}
                            className="lg:col-span-7 relative flex items-center justify-center"
                        >
                            {/* Gambar Utama (Gedung Sekolah Modern) */}
                            <div className="w-full sm:w-5/6 rounded-[32px] overflow-hidden shadow-2xl border border-[#D4AF37]/40 h-[340px] sm:h-[400px] relative z-10 group bg-slate-800">
                                <img
                                    src="/images/hero/building-attaufiq.png"
                                    alt="Attaufiq Modern"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
                                    }}
                                />
                            </div>

                            {/* 2 Gambar Thumbnail Santri Melayang di Kanan */}
                            <div className="hidden sm:flex flex-col space-y-3.5 absolute -right-2 md:right-0 z-20 w-44 lg:w-48">
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#051736] h-28 transform translate-x-3 hover:translate-x-0 transition duration-500 bg-slate-700">
                                    <img
                                        src="/images/hero/santri-1.jpg"
                                        alt="Santriwati Attaufiq"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop";
                                        }}
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#051736] h-28 transform translate-x-1 hover:translate-x-0 transition duration-500 bg-slate-700">
                                    <img
                                        src="/images/hero/santri-2.jpg"
                                        alt="Santri Attaufiq"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop";
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* 3 Poin Keunggulan Attaufiq Hari Ini */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={staggerContainer}
                            className="lg:col-span-5 space-y-6"
                        >
                            {/* Poin 1: Bertumbuh dengan Amanah (Ikon Kubah Masjid) */}
                            <motion.div variants={fadeInUp} className="flex items-start space-x-4 pb-5 border-b border-blue-400/20">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center flex-shrink-0 bg-[#07327F]/60 text-[#FFC72C] mt-0.5 shadow-md">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 3c-4 4-7 7.5-7 12a7 7 0 0 0 14 0c0-4.5-3-8-7-12z" />
                                        <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                                        <path d="M12 2v1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-base md:text-lg text-white mb-1">
                                        Bertumbuh dengan Amanah
                                    </h3>
                                    <p className="text-blue-100/80 font-light text-xs sm:text-sm leading-relaxed">
                                        Hingga hari ini, Attaufiq terus bertumbuh dengan amanah yang sama: menghadirkan pendidikan Islam yang berkualitas, relevan dengan zaman, dan tetap berlandaskan Al-Qur'an dan Sunnah.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Poin 2: Melayani dengan Hati (Ikon Guru & Murid) */}
                            <motion.div variants={fadeInUp} className="flex items-start space-x-4 pb-5 border-b border-blue-400/20">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center flex-shrink-0 bg-[#07327F]/60 text-[#FFC72C] mt-0.5 shadow-md">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-base md:text-lg text-white mb-1">
                                        Melayani dengan Hati
                                    </h3>
                                    <p className="text-blue-100/80 font-light text-xs sm:text-sm leading-relaxed">
                                        Attaufiq menaungi jenjang PG-TK, SD, SMP, hingga SMA dengan lingkungan belajar yang aman, nyaman, dan kondusif. Didukung oleh guru dan tenaga pendidik profesional yang peduli dan berkompeten.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Poin 3: Mempersiapkan Generasi Terbaik (Ikon Bintang) */}
                            <motion.div variants={fadeInUp} className="flex items-start space-x-4">
                                <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center flex-shrink-0 bg-[#07327F]/60 text-[#FFC72C] mt-0.5 shadow-md">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-base md:text-lg text-white mb-1">
                                        Mempersiapkan Generasi Terbaik
                                    </h3>
                                    <p className="text-blue-100/80 font-light text-xs sm:text-sm leading-relaxed">
                                        Kami mempersiapkan generasi yang berilmu, berakhlak, berdaya saing global, dan siap menjadi pemimpin masa depan yang membawa kebaikan bagi umat, bangsa, dan dunia.
                                    </p>
                                </div>
                            </motion.div>

                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                4. QUOTE SECTION DENGAN KUBAH MIHRAB EMAS
            ========================================== */}
            <section className="py-24 text-white relative overflow-hidden bg-[#07162C]">
                {/* Background Sunset Silhouette */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero/mesjid-about-us.png"
                        alt="Mosque Sunset Background"
                        className="w-full h-full object-cover object-bottom opacity-40 brightness-90 contrast-110"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1200&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07162C]/95 via-[#07162C]/80 to-[#07162C]/95"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07162C] via-transparent to-[#07162C]"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                        
                        {/* Kiri: Kotak Quote Kubah Mihrab Islami */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInLeft}
                            className="lg:col-span-6 relative p-8 sm:p-12 text-center flex flex-col justify-center items-center min-h-[380px]"
                        >
                            {/* SVG Dobel Garis Kubah Mihrab */}
                            <svg viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-xl" preserveAspectRatio="none">
                                {/* Border Luar Emas */}
                                <path
                                    d="M200 12 C110 65 20 120 20 220 L20 460 C20 468 28 472 36 472 L364 472 C372 472 380 468 380 460 L380 220 C380 120 290 65 200 12 Z"
                                    stroke="#D4AF37"
                                    strokeWidth="2.5"
                                    fill="#051736"
                                    fillOpacity="0.55"
                                />
                                {/* Border Dalam Emas Tipis */}
                                <path
                                    d="M200 24 C118 73 32 125 32 220 L32 452 C32 456 36 460 40 460 L360 460 C364 460 368 456 368 452 L368 220 C368 125 282 73 200 24 Z"
                                    stroke="#D4AF37"
                                    strokeWidth="1.2"
                                    strokeOpacity="0.75"
                                />
                            </svg>

                            <div className="relative z-10 py-6 px-4">
                                {/* Double Quote Atas */}
                                <div className="flex items-center justify-center space-x-3 mb-6">
                                    <span className="w-10 h-[1.5px] bg-[#D4AF37]"></span>
                                    <span className="text-[#FFC72C] font-serif text-3xl font-bold">“</span>
                                    <span className="w-10 h-[1.5px] bg-[#D4AF37]"></span>
                                </div>

                                <p className="font-serif text-xl sm:text-2xl md:text-[26px] text-white font-normal leading-relaxed tracking-wide drop-shadow-md">
                                    Setiap anak adalah amanah,<br />
                                    setiap langkah pendidikan adalah kesempatan<br />
                                    untuk memberi arti.
                                </p>

                                {/* Double Quote Bawah */}
                                <div className="flex items-center justify-center space-x-3 mt-6">
                                    <span className="w-10 h-[1.5px] bg-[#D4AF37]"></span>
                                    <span className="text-[#FFC72C] font-serif text-3xl font-bold">”</span>
                                    <span className="w-10 h-[1.5px] bg-[#D4AF37]"></span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Kanan: Branding Memberi Arti Itu Attaufiq */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInRight}
                            className="lg:col-span-6 text-center lg:text-left space-y-6"
                        >
                            <p className="text-blue-200 font-bold text-xs sm:text-sm uppercase tracking-[0.25em]">
                                ITULAH SEBABNYA KAMI HADIR,
                            </p>

                            <div className="space-y-1">
                                <p
                                    className="text-4xl sm:text-5xl md:text-6xl text-[#F3E5AB] font-normal tracking-wide drop-shadow-lg italic"
                                    style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}
                                >
                                    Memberi Arti itu
                                </p>
                                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#D4AF37] tracking-wider uppercase drop-shadow-2xl">
                                    ATTAUFIQ
                                </h2>
                            </div>

                            <div className="flex justify-center lg:justify-start my-2 text-[#FFC72C] text-xl">
                                <span>☀️</span>
                            </div>

                            <p className="text-blue-100 font-light text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 drop-shadow">
                                Attaufiq berkomitmen untuk terus menjadi rumah pendidikan Islam yang memberikan arti, membimbing, dan mengantarkan setiap anak menuju masa depan terbaiknya.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

        </AppLayout>
    );
}