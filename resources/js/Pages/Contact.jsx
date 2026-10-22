import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import { motion } from 'framer-motion';
import { 
    Clock, 
    Zap, 
    Users, 
    MapPin, 
    ExternalLink, 
    ChevronRight 
} from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

export default function Contact() {
    return (
        <AppLayout title="Hubungi Kami - SIT At-Taufiq">
            <Head title="Hubungi Kami | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <HeroSection 
                title="Hubungi Kami"
                subtitle="Kami siap membantu Bunda/Ayah untuk informasi pendaftaran, program, & lokasi kampus."
                tagline="PUSAT INFORMASI ATTAUFIQ"
                mosqueImage="/images/hero/building-attaufiq.png"
            />

            {/* ==========================================
                2. SECTION: HUBUNGI KAMI (3 CARDS)
            ========================================== */}
            <section className="py-20 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                    
                    {/* Header Section */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#051736]">
                            Hubungi Kami
                        </h2>
                        
                        <div className="flex items-center justify-center space-x-3 my-3">
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                            <span className="text-[#C9972E] text-xs">☀️</span>
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                        </div>
                    </motion.div>

                    {/* Grid 3 Cards */}
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
                    >

                        {/* CARD 1: PG-TK-SD ATTAUFIQ */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-[#051736] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFC72C] flex-shrink-0 shadow-md">
                                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-4a3 3 0 0 1 6 0v4" />
                                            <circle cx="12" cy="8" r="1.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#051736]">
                                            PG-TK-SD Attaufiq
                                        </h3>
                                        <p className="text-xs text-slate-500 font-light leading-snug mt-0.5">
                                            Kami siap membantu kebutuhan informasi untuk jenjang PG, TK dan SD.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-6">
                                    <a 
                                        href="https://wa.me/6285268797915" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E8DFC8] hover:border-emerald-500 hover:shadow-md transition group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shadow-xs font-bold">
                                                💬
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp</p>
                                                <p className="text-xs font-mono font-bold text-[#051736]">0812-XXXX-XXXX</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                                    </a>

                                    <a 
                                        href="tel:0741000000" 
                                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E8DFC8] hover:border-[#C9972E] hover:shadow-md transition group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-[#C9972E] text-white flex items-center justify-center text-sm shadow-xs font-bold">
                                                📞
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Telepon / HP</p>
                                                <p className="text-xs font-mono font-bold text-[#051736]">0741-XXXXXXX</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-400 group-hover:text-[#C9972E] group-hover:translate-x-1 transition" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 2: SMP-SMA ATTAUFIQ */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-[#051736] border-2 border-[#D4AF37] flex items-center justify-center text-[#FFC72C] flex-shrink-0 shadow-md">
                                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3c-4 4-7 7.5-7 12a7 7 0 0 0 14 0c0-4.5-3-8-7-12z" />
                                            <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#051736]">
                                            SMP-SMA Attaufiq
                                        </h3>
                                        <p className="text-xs text-slate-500 font-light leading-snug mt-0.5">
                                            Kami siap membantu kebutuhan informasi untuk jenjang SMP dan SMA.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-6">
                                    <a 
                                        href="https://wa.me/6281927421650" 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E8DFC8] hover:border-emerald-500 hover:shadow-md transition group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shadow-xs font-bold">
                                                💬
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">WhatsApp</p>
                                                <p className="text-xs font-mono font-bold text-[#051736]">0821-XXXX-XXXX</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                                    </a>

                                    <a 
                                        href="tel:0741000000" 
                                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E8DFC8] hover:border-[#C9972E] hover:shadow-md transition group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-[#C9972E] text-white flex items-center justify-center text-sm shadow-xs font-bold">
                                                📞
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Telepon / HP</p>
                                                <p className="text-xs font-mono font-bold text-[#051736]">0741-XXXXXXX</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-slate-400 group-hover:text-[#C9972E] group-hover:translate-x-1 transition" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 3: INFORMASI & OPERASIONAL */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-6 sm:p-8 shadow-xs flex flex-col justify-between divide-y divide-dashed divide-[#E8DFC8]"
                        >
                            <div className="flex items-start space-x-3.5 pb-4">
                                <div className="w-10 h-10 rounded-full bg-[#051736] text-[#FFC72C] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-[#051736]">Jam Operasional</h4>
                                    <p className="text-xs text-slate-600 mt-1 font-light">Senin - Jumat : 07.00 - 16.00 WIB</p>
                                    <p className="text-xs text-slate-600 font-light">Sabtu : 07.00 - 12.00 WIB</p>
                                    <p className="text-[10px] text-slate-400 italic mt-1">*Minggu dan hari libur nasional tutup</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5 py-4">
                                <div className="w-10 h-10 rounded-full bg-[#051736] text-[#FFC72C] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-[#051736]">Respon Cepat</h4>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed mt-0.5">
                                        Tim kami akan merespon pesan Anda secepat mungkin di jam operasional.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5 pt-4">
                                <div className="w-10 h-10 rounded-full bg-[#051736] text-[#FFC72C] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm text-[#051736]">Konsultasi Langsung</h4>
                                    <p className="text-xs text-slate-500 font-light leading-relaxed mt-0.5">
                                        Bunda/Ayah juga dapat berkonsultasi langsung dengan tim kami di sekolah dengan membuat janji terlebih dahulu.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ==========================================
                3. SECTION: LOKASI SEKOLAH KAMI (2 MAP CARDS)
            ========================================== */}
            <section className="py-20 bg-[#FAF8F5] relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                    
                    {/* Header Section */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-14"
                    >
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#051736]">
                            Lokasi Sekolah Kami
                        </h2>

                        <div className="flex items-center justify-center space-x-3 my-3">
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                            <span className="text-[#C9972E] text-xs">☀️</span>
                            <div className="w-12 h-[1.5px] bg-[#C9972E]"></div>
                        </div>
                    </motion.div>

                    {/* Grid 2 Map Cards */}
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                    >
                        
                        {/* MAP CARD 1: PG-TK-SD ATTAUFIQ */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-4 sm:p-5 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                        >
                            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-200">
                                <div className="absolute top-4 left-4 z-20 bg-[#051736] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg border border-[#D4AF37]/50">
                                    <span className="text-[#FFC72C] text-xs">☀️</span>
                                    <span>PG-TK-SD ATTAUFIQ</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-[#E8DFC8] text-center max-w-[220px]">
                                    <h4 className="font-serif text-xs font-bold text-[#051736]">PG-TK-SD Attaufiq</h4>
                                    <p className="text-[10px] text-slate-500 font-light mt-1 leading-snug">
                                        Jl. Attaufiq No.1, Simpang IV Sipin, Kec. Telanaipura, Kota Jambi, Jambi 36124
                                    </p>
                                </div>

                                <iframe 
                                    title="Map PG-TK-SD"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8094!2d103.5934!3d-1.6025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzYnMDkuMCJTIDEwM8KwMzUnMzYuMiJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid" 
                                    className="w-full h-full border-0 contrast-105 opacity-90"
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="pt-5 space-y-4">
                                <div className="flex items-start space-x-3 text-slate-600 px-2">
                                    <MapPin size={18} className="text-[#051736] flex-shrink-0 mt-0.5" />
                                    <p className="text-xs sm:text-sm font-light leading-relaxed">
                                        Jl. Attaufiq No.1, Simpang IV Sipin, Kec. Telanaipura, Kota Jambi, Jambi 36124
                                    </p>
                                </div>

                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full bg-[#051736] hover:bg-[#07327F] text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md"
                                >
                                    <MapPin size={14} className="text-[#FFC72C]" />
                                    <span>Lihat di Google Maps</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>

                        {/* MAP CARD 2: SMP-SMA ATTAUFIQ */}
                        <motion.div 
                            variants={fadeInUp}
                            className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-4 sm:p-5 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                        >
                            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-200">
                                <div className="absolute top-4 left-4 z-20 bg-[#051736] text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg border border-[#D4AF37]/50">
                                    <span className="text-[#FFC72C] text-xs">☀️</span>
                                    <span>SMP-SMA ATTAUFIQ</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-[#E8DFC8] text-center max-w-[220px]">
                                    <h4 className="font-serif text-xs font-bold text-[#051736]">SMP-SMA Attaufiq</h4>
                                    <p className="text-[10px] text-slate-500 font-light mt-1 leading-snug">
                                        Jl. Sunan Gunung Jati No.88, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36139
                                    </p>
                                </div>

                                <iframe 
                                    title="Map SMP-SMA"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8094!2d103.6120!3d-1.6150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzYnNTQuMCJTIDEwM8KwMzYnNDMuMiJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid" 
                                    className="w-full h-full border-0 contrast-105 opacity-90"
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="pt-5 space-y-4">
                                <div className="flex items-start space-x-3 text-slate-600 px-2">
                                    <MapPin size={18} className="text-[#051736] flex-shrink-0 mt-0.5" />
                                    <p className="text-xs sm:text-sm font-light leading-relaxed">
                                        Jl. Sunan Gunung Jati No.88, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36139
                                    </p>
                                </div>

                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full bg-[#051736] hover:bg-[#07327F] text-white py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md"
                                >
                                    <MapPin size={14} className="text-[#FFC72C]" />
                                    <span>Lihat di Google Maps</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ==========================================
                4. SECTION: BOTTOM BANNER CALLOUT & SOSMED
            ========================================== */}
            <section className="py-12 bg-[#FAF8F5] pb-24">
                <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-[#051736] text-white rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden"
                    >
                        
                        {/* Hiasan Kubah Mihrab Islami Emas */}
                        <div className="absolute right-0 bottom-0 top-0 w-64 md:w-80 border-2 border-[#D4AF37]/20 rounded-t-full pointer-events-none hidden sm:flex items-center justify-center translate-x-10 translate-y-6">
                            <div className="w-48 h-64 border border-[#D4AF37]/15 rounded-t-full flex items-center justify-center">
                                <span className="text-[#FFC72C]/30 text-3xl">☀️</span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                            
                            {/* Kiri: Butuh Bantuan & Tombol Chat Admin */}
                            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                                    Butuh Bantuan Lainnya?
                                </h3>
                                <p className="text-xs sm:text-sm text-blue-100/90 font-light max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    Tim Attaufiq siap membantu menjawab pertanyaan Bunda/Ayah seputar sekolah, program, dan pendaftaran.
                                </p>
                                <div className="pt-2">
                                    <a 
                                        href="https://wa.me/6285268797915" 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center space-x-2 bg-[#FFC72C] hover:bg-[#ffd34d] text-[#051736] px-6 sm:px-7 py-3.5 rounded-2xl font-bold text-xs transition duration-300 shadow-lg hover:scale-105"
                                    >
                                        <span>💬</span>
                                        <span>Chat Admin Sekarang</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Ikuti Kami di Media Sosial (SVG Murni) */}
                            <div className="lg:col-span-6 space-y-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-white/15 pt-6 lg:pt-0 lg:pl-10">
                                <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                                    Ikuti Kami di Media Sosial
                                </h4>

                                <div className="flex items-center justify-center lg:justify-start space-x-3">
                                    {/* Instagram */}
                                    <a 
                                        href="https://instagram.com" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-blue-300/30 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm"
                                        title="Instagram"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>

                                    {/* Facebook */}
                                    <a 
                                        href="https://facebook.com" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-blue-300/30 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm"
                                        title="Facebook"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>

                                    {/* YouTube */}
                                    <a 
                                        href="https://youtube.com" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-blue-300/30 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm"
                                        title="YouTube"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                    </a>

                                    {/* TikTok */}
                                    <a 
                                        href="https://tiktok.com" 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full border border-blue-300/30 hover:border-[#D4AF37] bg-white/10 hover:bg-[#FFC72C] text-white hover:text-[#051736] flex items-center justify-center transition shadow-sm"
                                        title="TikTok"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                        </svg>
                                    </a>
                                </div>

                                <p className="text-xs text-blue-200/80 font-light leading-relaxed">
                                    Dapatkan informasi terbaru tentang kegiatan dan program Attaufiq.
                                </p>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

        </AppLayout>
    );
}