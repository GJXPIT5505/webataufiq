import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Mail, MapPin, Clock, ArrowRight, Lightbulb } from 'lucide-react';

/* ==========================================================================
   DAFTAR PATH FOTO & ASSET (UBAH DI SINI)
   ========================================================================== */
const ASSETS = {
    HERO_BUILDING: '/images/hero/building-attaufiq.png',
    
    // Foto Kegiatan Jenjang
    PGTK_PHOTO: '/images/hero/pgtk-kids.jpg',
    SD_PHOTO:   '/images/hero/sd-kids.jpg',
    SMP_PHOTO:  '/images/hero/smp-kids.jpg',
    SMA_PHOTO:  '/images/hero/sma-kids.jpg',
};

/* ==========================================================================
   KOMPONEN TAB KUBAH MASJID ASLI (ISLAMIC MIHRAB ARCH TAB)
   ========================================================================== */
function IslamicArchTab({ id, label, sub, iconSvg, isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative w-full h-[140px] sm:h-[165px] transition-all duration-300 transform flex flex-col items-center justify-end pb-4 sm:pb-6 px-2 group focus:outline-none ${
                isActive
                    ? '-translate-y-2 sm:-translate-y-4 z-30 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]'
                    : 'hover:-translate-y-1 opacity-95 hover:opacity-100 z-10'
            }`}
        >
            {/* 1. SVG SHAPE KUBAH ISLAMI DENGAN DOUBLE BORDER */}
            <svg 
                viewBox="0 0 140 180" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
            >
                {/* Layer 1: Body Tab Fill */}
                <path
                    d="M70 4 C42 22 10 44 10 78 L10 180 L130 180 L130 78 C130 44 98 22 70 4 Z"
                    fill={isActive ? '#07327F' : '#FFFDF9'}
                    stroke={isActive ? '#D4AF37' : '#E8DFC8'}
                    strokeWidth="2.5"
                />

                {/* Layer 2: Double Inner Border Emas (Khusus Tab Aktif) */}
                {isActive && (
                    <path
                        d="M70 14 C48 30 20 50 20 80 L20 174 L120 174 L120 80 C120 50 92 30 70 14 Z"
                        stroke="#D4AF37"
                        strokeWidth="1.2"
                        strokeOpacity="0.8"
                    />
                )}
            </svg>

            {/* 2. KONTEN DI DALAM TAB */}
            <div className="relative z-10 text-center flex flex-col items-center space-y-1 w-full pt-4">
                
                {/* Sun Accent di pucuk kubah saat aktif */}
                {isActive ? (
                    <span className="text-[#FFC72C] text-xs animate-pulse">☀️</span>
                ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 mb-1"></span>
                )}
                
                {/* Ikon Vektor Line-Art Emas */}
                <div className={`my-0.5 sm:my-1 transition-transform duration-300 ${isActive ? 'text-[#FFC72C] scale-110' : 'text-[#C9972E]'}`}>
                    {iconSvg}
                </div>

                {/* Label Jenjang (PG-TK, SD, SMP, SMA) */}
                <h3 className={`font-serif text-lg sm:text-2xl font-bold tracking-wide leading-none ${isActive ? 'text-white' : 'text-[#07327F]'}`}>
                    {label}
                </h3>
                
                {/* Subtitle */}
                <p className={`text-[9px] sm:text-[11px] font-light leading-tight px-1 ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>
                    {sub}
                </p>
            </div>
        </button>
    );
}

export default function Faq() {
    const [activeTab, setActiveTab] = useState('PG-TK');
    const [openFaq, setOpenFaq] = useState(0);

    const tabsConfig = [
        {
            id: 'PG-TK',
            label: 'PG-TK',
            sub: '(Playgroup – TK)',
            iconSvg: (
                <svg className="w-7 h-7 sm:w-9 sm:h-9 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                    <circle cx="10" cy="14" r="2" />
                    <path d="M14 17l3-6" />
                </svg>
            )
        },
        {
            id: 'SD',
            label: 'SD',
            sub: '(Sekolah Dasar)',
            iconSvg: (
                <svg className="w-7 h-7 sm:w-9 sm:h-9 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            )
        },
        {
            id: 'SMP',
            label: 'SMP',
            sub: '(Sekolah Menengah Pertama)',
            iconSvg: (
                <svg className="w-7 h-7 sm:w-9 sm:h-9 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a3 3 0 0 1 6 0v4" />
                    <line x1="12" y1="3" x2="12" y2="7" />
                </svg>
            )
        },
        {
            id: 'SMA',
            label: 'SMA',
            sub: '(Sekolah Menengah Atas)',
            iconSvg: (
                <svg className="w-7 h-7 sm:w-9 sm:h-9 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c-4 4-7 7.5-7 12a7 7 0 0 0 14 0c0-4.5-3-8-7-12z" />
                    <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
                    <circle cx="12" cy="7" r="1.5" />
                </svg>
            )
        }
    ];

    const faqData = {
        'PG-TK': {
            title: 'PG-TK (Playgroup – TK)',
            desc: 'Tahap awal pendidikan yang menyenangkan untuk menumbuhkan iman, akhlak, dan kemandirian sejak dini.',
            image: ASSETS.PGTK_PHOTO,
            badgeText: 'Lingkungan belajar yang aman, nyaman, dan penuh kasih sayang untuk tumbuh kembang optimal.',
            faqs: [
                { q: 'Berapa usia minimal untuk masuk PG-TK Attaufiq?', a: 'Untuk Playgroup minimal berusia 3 tahun, sedangkan untuk TK-A minimal berusia 4 tahun per bulan Juli tahun berjalan.' },
                { q: 'Apakah ada proses seleksi untuk PG-TK?', a: 'Tidak ada tes akademik. Seleksi berupa pemetaan tumbuh kembang dan kesiapan anak melalui observasi ramah anak.' },
                { q: 'Bagaimana kurikulum yang digunakan di PG-TK Attaufiq?', a: 'Kami mengintegrasikan Kurikulum Merdeka dengan nilai-nilai Keislaman, pembelajaran berbasis bermain (play-based learning), dan pembiasaan adab.' },
                { q: 'Apakah anak harus sudah bisa membaca atau menulis?', a: 'Tidak wajib. Kemampuan calistung diajarkan secara bertahap dan menyenangkan sesuai dengan tahap perkembangan usia anak.' },
                { q: 'Bagaimana jam belajar dan jam pulang di PG-TK?', a: 'Jam belajar dimulai pukul 07.30 - 11.00 WIB untuk Playgroup, dan 07.30 - 12.00 WIB untuk TK.' },
                { q: 'Apakah ada program Tahfizh di PG-TK?', a: 'Ada, fokus pada hafalan Juz Amma (Juz 30) pilihan, doa harian, dan hadits-hadits pendek dengan metode talaqqi.' },
                { q: 'Bagaimana fasilitas yang tersedia untuk PG-TK?', a: 'Tersedia ruang kelas ber-AC, area bermain indoor & outdoor, pojok baca, serta ruang audiovisual.' },
                { q: 'Bagaimana komunikasi antara sekolah dan orang tua?', a: 'Kami menggunakan Buku Penghubung harian, grup WhatsApp kelas, dan pertemuan berkala Parent Teacher Meeting (PTM).' }
            ]
        },
        'SD': {
            title: 'SD IT Attaufiq',
            desc: 'Membangun fondasi akademik yang kuat, pemahaman Al-Qur\'an, dan pembentukan karakter adab yang kokoh.',
            image: ASSETS.SD_PHOTO,
            badgeText: 'Pendidikan integratif yang mencetak generasi bertakwa, cerdas, dan berkarakter.',
            faqs: [
                { q: 'Berapa usia minimal masuk SD IT Attaufiq?', a: 'Minimal berusia 6 tahun pada bulan Juli tahun ajaran baru.' },
                { q: 'Apakah ada program target Tahfizh di SD?', a: 'Ya, target kelulusan SD adalah minimal hafal 2-3 Juz Al-Qur\'an beserta tartil membaca.' },
                { q: 'Bagaimana jam operasional sekolah SD?', a: 'Pembelajaran Full Day dari Senin - Jumat, pukul 07.15 hingga 15.30 WIB.' },
                { q: 'Bagaimana metode pembiasaan ibadah di sekolah?', a: 'Siswa dibiasakan Sholat Dhuha bersama, Sholat Dzuhur & Ashar berjamaah, serta dzikir pagi petang.' }
            ]
        },
        'SMP': {
            title: 'SMP IT Attaufiq',
            desc: 'Mengembangkan potensi kepemimpinan, kritis berpikir, serta pemantapan hafalan dan pemahaman Islam.',
            image: ASSETS.SMP_PHOTO,
            badgeText: 'Menyiapkan remaja berdaya saing global dengan pijakan akidah yang lurus.',
            faqs: [
                { q: 'Apa saja ekstrakurikuler unggulan di SMP?', a: 'Pramuka IT, Archery (Panahan), Pencak Silat, Robotik, Karya Tulis Ilmiah, dan English/Arabic Club.' },
                { q: 'Apakah ada kelas persiapan program beasiswa/lanjutan?', a: 'Ya, terdapat bimbingan akademik intensif untuk persiapan sekolah kedinasan maupun SMA unggulan.' },
                { q: 'Bagaimana target hafalan Al-Qur\'an jenjang SMP?', a: 'Target minimal 3-5 Juz dengan sertifikasi tasmi’ Al-Qur’an berkala.' }
            ]
        },
        'SMA': {
            title: 'SMA IT Attaufiq',
            desc: 'Masa matang untuk penguatan akademik perguruan tinggi, kepemimpinan, dan kesiapan berkontribusi pada masyarakat.',
            image: ASSETS.SMA_PHOTO,
            badgeText: 'Menghantarkan peserta didik menuju Perguruan Tinggi Terbaik dan karir impian.',
            faqs: [
                { q: 'Bagaimana rekam jejak kelulusan SMA Attaufiq ke PTN?', a: 'Alhamdulillah, mayoritas lulusan terserap di Perguruan Tinggi Negeri (PTN) unggulan, sekolah kedinasan, dan kampus luar negeri.' },
                { q: 'Apakah ada bimbingan SNBT dan Kedinasan di sekolah?', a: 'Tersedia Klinik Akademik dan Try Out rutin persiapan UTBK/SNBT mulai dari kelas XI dan XII.' }
            ]
        }
    };

    const currentContent = faqData[activeTab];

    return (
        <AppLayout title="FAQ - SIT At-Taufiq">
            <Head title="FAQ | Pertanyaan yang Sering Diajukan - SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <HeroSection 
                title="FAQ"
                subtitle="Temukan jawaban lengkap seputar proses pembelajaran, kurikulum, fasilitas, dan pendaftaran di SIT At-Taufiq."
                tagline="PUSAT INFORMASI ATTAUFIQ"
                mosqueImage={ASSETS.HERO_BUILDING}
            />

            {/* ==========================================
                2. FAQ MAIN WRAPPER SECTION (NAVY BACKGROUND)
            ========================================== */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#071938] text-white">
                {/* Texture Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    
                    {/* Header Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-14 sm:mb-18 space-y-3"
                    >
                        <div className="flex items-center justify-center space-x-2 text-[#FFC72C]">
                            <span className="text-xs">◆</span>
                            <span className="font-bold text-xs uppercase tracking-[0.3em]">FAQ</span>
                            <span className="text-xs">◆</span>
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-blue-200/80 font-light text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Temukan jawaban atas pertanyaan Bunda/Ayah tentang Attaufiq sesuai jenjang pendidikan yang diminati.
                        </p>

                        <div className="pt-2 text-[#FFC72C] text-xl">
                            <span>☀️</span>
                        </div>
                    </motion.div>

                    {/* =========================================================
                        CONTAINER GABUNGAN: TAB KUBAH MENANCAP DI ATAS CARD PUTIH
                    ========================================================= */}
                    <div className="relative max-w-5xl mx-auto">
                        
                        {/* 1. LAYER ATAS: TAB KUBAH MASJID */}
                        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto items-end px-2 sm:px-6 relative z-20">
                            {tabsConfig.map((tab) => (
                                <IslamicArchTab
                                    key={tab.id}
                                    id={tab.id}
                                    label={tab.label}
                                    sub={tab.sub}
                                    iconSvg={tab.iconSvg}
                                    isActive={activeTab === tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setOpenFaq(0);
                                    }}
                                />
                            ))}
                        </div>

                        {/* 2. LAYER BAWAH: CARD BESAR PUTIH KREM BERBORDER EMAS */}
                        <div className="bg-[#FAF8F5] text-slate-800 rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 md:p-14 shadow-2xl border-2 border-[#E8DFC8] -mt-4 relative z-10">
                            
                            {/* Ornamen Simbol Matahari Pusat Atas */}
                            <div className="text-center mb-8">
                                <span className="text-[#C9972E] text-2xl animate-pulse">☀️</span>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                
                                {/* KIRI: Informasi Jenjang + Frame Foto + Badge */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div>
                                        <h3 className="font-serif text-2xl sm:text-3xl text-[#07327F] font-bold mb-2">
                                            {currentContent.title}
                                        </h3>
                                        <div className="flex items-center space-x-2 my-2.5">
                                            <div className="w-10 h-[1.5px] bg-[#C9972E]"></div>
                                            <span className="text-[#C9972E] text-[10px]">☀️</span>
                                            <div className="w-10 h-[1.5px] bg-[#C9972E]"></div>
                                        </div>
                                        <p className="text-slate-600 font-light text-xs sm:text-sm leading-relaxed">
                                            {currentContent.desc}
                                        </p>
                                    </div>

                                    {/* Frame Foto Jenjang */}
                                    <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[4/3] relative bg-slate-200 group">
                                        <img
                                            src={currentContent.image}
                                            alt={currentContent.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop";
                                            }}
                                        />
                                    </div>

                                    {/* Quote Box Navy Bawah */}
                                    <div className="bg-[#051736] text-white p-5 rounded-2xl border border-[#D4AF37]/50 shadow-md flex items-start space-x-3.5">
                                        <span className="text-[#FFC72C] text-lg flex-shrink-0 mt-0.5">✦</span>
                                        <p className="text-xs font-light leading-relaxed text-blue-100/90">
                                            {currentContent.badgeText}
                                        </p>
                                    </div>
                                </div>

                                {/* KANAN: Accordion Pertanyaan & Jawaban */}
                                <div className="lg:col-span-7 space-y-3">
                                    {currentContent.faqs.map((faq, index) => {
                                        const isOpen = openFaq === index;
                                        return (
                                            <div
                                                key={index}
                                                className="bg-white rounded-2xl border border-[#E8DFC8]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenFaq(isOpen ? null : index)}
                                                    className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between space-x-3 hover:bg-slate-50/80 transition"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        {/* Badge Bulat Tanda Tanya Cokelat Emas */}
                                                        <div className="w-7 h-7 rounded-full bg-[#C9972E] text-white flex items-center justify-center font-serif text-xs font-bold flex-shrink-0 shadow-xs">
                                                            ?
                                                        </div>
                                                        <span className="font-serif text-xs sm:text-sm font-semibold text-[#07327F] leading-snug">
                                                            {faq.q}
                                                        </span>
                                                    </div>
                                                    <ChevronDown 
                                                        size={18} 
                                                        className={`text-slate-400 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#C9972E]' : ''}`} 
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="px-5 pb-5 pt-1 text-slate-600 font-light text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-[#FAF8F5]/60 pl-13"
                                                        >
                                                            {faq.a}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ==========================================
                        3. CTA BANNER
                    ========================================== */}
                    <div className="mt-10 max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#FFFDF9] border border-[#C9972E]/40 text-[#C9972E] flex items-center justify-center flex-shrink-0 shadow-xs">
                                <Lightbulb size={24} />
                            </div>
                            <div>
                                <h3 className="font-serif text-base sm:text-lg font-bold text-[#07327F]">
                                    Tidak menemukan jawaban yang Bunda/Ayah cari?
                                </h3>
                                <p className="text-xs text-slate-500 font-light mt-0.5">
                                    Silakan hubungi tim kami, SIT At-Taufiq siap membantu seluruh pertanyaan Anda.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/contact"
                            className="bg-[#051736] hover:bg-[#07327F] text-white px-7 py-3.5 rounded-2xl text-xs font-bold transition shadow-md flex items-center space-x-2 whitespace-nowrap"
                        >
                            <span>Hubungi Kami</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* ==========================================
                        4. BUTUH BANTUAN LEBIH LANJUT (4 KOLOM)
                    ========================================== */}
                    <div className="mt-16 text-center max-w-5xl mx-auto">
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                            Butuh Bantuan Lebih Lanjut?
                        </h3>
                        <div className="flex items-center justify-center space-x-2 text-[#FFC72C] mb-10">
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs">☀️</span>
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                            
                            {/* WhatsApp */}
                            <a 
                                href="https://wa.me/6285268797915" 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-[#051736]/70 border border-[#D4AF37]/30 rounded-2xl p-5 hover:border-[#FFC72C] transition group flex items-start space-x-3.5"
                            >
                                <div className="w-10 h-10 rounded-full border border-[#D4AF37] text-[#FFC72C] flex items-center justify-center flex-shrink-0 bg-[#07327F]/40 group-hover:bg-[#FFC72C] group-hover:text-[#051736] transition">
                                    <MessageSquare size={18} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-white">Chat WhatsApp</h4>
                                    <p className="text-[11px] text-blue-200/80 font-mono">0852-6879-7915</p>
                                    <p className="text-[10px] text-[#FFC72C] font-bold pt-1 flex items-center space-x-1">
                                        <span>Chat Sekarang</span>
                                        <span>›</span>
                                    </p>
                                </div>
                            </a>

                            {/* Email */}
                            <a 
                                href="mailto:smpakislamattaufiq@gmail.com"
                                className="bg-[#051736]/70 border border-[#D4AF37]/30 rounded-2xl p-5 hover:border-[#FFC72C] transition group flex items-start space-x-3.5"
                            >
                                <div className="w-10 h-10 rounded-full border border-[#D4AF37] text-[#FFC72C] flex items-center justify-center flex-shrink-0 bg-[#07327F]/40 group-hover:bg-[#FFC72C] group-hover:text-[#051736] transition">
                                    <Mail size={18} />
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                    <h4 className="text-xs font-bold text-white">Email Kami</h4>
                                    <p className="text-[11px] text-blue-200/80 truncate">smpakislamattaufiq@gmail.com</p>
                                    <p className="text-[10px] text-[#FFC72C] font-bold pt-1 flex items-center space-x-1">
                                        <span>Kirim Email</span>
                                        <span>›</span>
                                    </p>
                                </div>
                            </a>

                            {/* Kunjungi Kami */}
                            <a 
                                href="#footer-location"
                                className="bg-[#051736]/70 border border-[#D4AF37]/30 rounded-2xl p-5 hover:border-[#FFC72C] transition group flex items-start space-x-3.5"
                            >
                                <div className="w-10 h-10 rounded-full border border-[#D4AF37] text-[#FFC72C] flex items-center justify-center flex-shrink-0 bg-[#07327F]/40 group-hover:bg-[#FFC72C] group-hover:text-[#051736] transition">
                                    <MapPin size={18} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-white">Kunjungi Kami</h4>
                                    <p className="text-[11px] text-blue-200/80">Jambi Timur, Kota Jambi</p>
                                    <p className="text-[10px] text-[#FFC72C] font-bold pt-1 flex items-center space-x-1">
                                        <span>Lihat di Maps</span>
                                        <span>›</span>
                                    </p>
                                </div>
                            </a>

                            {/* Jam Operasional */}
                            <div className="bg-[#051736]/70 border border-[#D4AF37]/30 rounded-2xl p-5 flex items-start space-x-3.5">
                                <div className="w-10 h-10 rounded-full border border-[#D4AF37] text-[#FFC72C] flex items-center justify-center flex-shrink-0 bg-[#07327F]/40">
                                    <Clock size={18} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-xs font-bold text-white">Jam Operasional</h4>
                                    <p className="text-[11px] text-blue-200/80">Senin - Jumat</p>
                                    <p className="text-[10px] text-slate-300">07.30 - 15.30 WIB</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </AppLayout>
    );
}