import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';
import {
    Calendar,
    ChevronRight,
    FileText,
    UploadCloud,
    Users,
    Megaphone,
    CheckCircle,
    ShieldCheck,
    Lock,
    Clock,
    HeartHandshake,
    PhoneCall,
    Plus,
    HelpCircle,
    MessageCircle,
    GraduationCap,
    BookOpen,
    Building2,
    FileCheck,
    Info,
    ArrowRight,
    Sparkles,
    Lightbulb,
    Gift,
    Shirt,
    Award,
    UserCheck,
    FileCode
} from 'lucide-react';

/* ==========================================
   HOOK INTERSECTION OBSERVER
   ========================================== */
function useInView(options = { threshold: 0.15 }) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return [ref, isInView];
}

export default function AdmissionIndex({
    title = "Penerimaan Murid Baru",
    subtitle = "Mulai perjalanan pendidikan Islami terbaik untuk Ananda bersama SIT At-Taufiq Jambi.",
    tagline = "PENDAFTARAN ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [heroRef, heroInView] = useInView();

    // STATE MANAGEMENT
    const [activeStep, setActiveStep] = useState(1);
    const [activeLevel, setActiveLevel] = useState('SMP');
    const [openFaq, setOpenFaq] = useState(0);

    /* ==========================================
       DATA STRUCTURES
       ========================================== */
    const periods = [
        {
            id: 1,
            wave: "GELOMBANG 1",
            title: "Early Admission",
            date: "1 Januari – 31 Maret 2026",
            desc: "Kesempatan istimewa untuk bergabung lebih awal dan mendapatkan berbagai keuntungan terbaik.",
            benefits: [
                { text: "Potongan biaya pendaftaran 25%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Prioritas kelas pilihan", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
            ],
            status: "open",
            statusText: "SEDANG DIBUKA"
        },
        {
            id: 2,
            wave: "GELOMBANG 2",
            title: "Regular Admission",
            date: "1 April – 30 Juni 2026",
            desc: "Periode reguler dengan kuota terbatas. Pastikan Ananda tidak kehabisan kesempatan.",
            benefits: [
                { text: "Potongan biaya pendaftaran 15%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Prioritas kelas (sesuai kuota)", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
            ],
            status: "open",
            statusText: "SEDANG DIBUKA"
        },
        {
            id: 3,
            wave: "GELOMBANG 3",
            title: "Last Admission",
            date: "1 Juli – 31 Agustus 2026",
            desc: "Periode terakhir dengan kuota sangat terbatas sebelum tahun ajaran baru dimulai.",
            benefits: [
                { text: "Potongan biaya pendaftaran 10%", icon: Gift },
                { text: "Free seragam sekolah", icon: Shirt },
                { text: "Kelas menyesuaikan ketersediaan", icon: Award },
                { text: "Free konsultasi tumbuh kembang", icon: UserCheck }
            ],
            status: "upcoming",
            statusText: "AKAN DIBUKA"
        }
    ];

    const steps = [
        {
            id: 1,
            title: "Isi Formulir",
            icon: FileText,
            detailTitle: "Isi Formulir Pendaftaran",
            detailDesc: "Lengkapi data Ananda melalui formulir pendaftaran online. Pastikan semua informasi yang diisi sudah benar.",
            prepList: [
                "Data pribadi Ananda",
                "Data orang tua/wali",
                "Informasi kontak aktif",
                "Pilih jenjang dan program",
                "Periode pendaftaran yang dipilih"
            ],
            note: "Anda dapat menyimpan data sementara dan melanjutkan kembali kapan saja."
        },
        {
            id: 2,
            title: "Upload Berkas",
            icon: UploadCloud,
            detailTitle: "Unggah Berkas Persyaratan",
            detailDesc: "Unggah dokumen persyaratan yang diperlukan secara digital untuk verifikasi berkas awal.",
            prepList: [
                "Scan Akta Kelahiran & KK",
                "Scan KTP Orang Tua",
                "Pasfoto berwarna terbaru",
                "Rapor semester terakhir"
            ],
            note: "Format berkas PDF/JPG maksimal berukuran 2MB per file."
        },
        {
            id: 3,
            title: "Observasi / Tes",
            icon: Users,
            detailTitle: "Pelaksanaan Observasi & Tes",
            detailDesc: "Jadwal pemetaan potensi dan bacaan Al-Qur'an Ananda bersama tim penguji profesional.",
            prepList: [
                "Hadir tepat waktu sesuai jadwal",
                "Membawa kartu peserta tes",
                "Wawancara orang tua/wali"
            ],
            note: "Jadwal tes akan dikirimkan via WhatsApp setelah verifikasi berkas."
        },
        {
            id: 4,
            title: "Pengumuman",
            icon: Megaphone,
            detailTitle: "Pengumuman Hasil Seleksi",
            detailDesc: "Hasil seleksi dapat dilihat melalui portal resmi atau pesan WhatsApp terverifikasi.",
            prepList: [
                "Cek status kelulusan di portal",
                "Unduh surat keputusan hasil seleksi"
            ],
            note: "Pengumuman diterbitkan maksimal 3 hari setelah pelaksanaan tes."
        },
        {
            id: 5,
            title: "Daftar Ulang",
            icon: FileCheck,
            detailTitle: "Konfirmasi & Daftar Ulang",
            detailDesc: "Lakukan pembayaran biaya masuk dan konfirmasi daftar ulang untuk mengamankan kuota Ananda.",
            prepList: [
                "Pembayaran registrasi ulang",
                "Pengukuran seragam sekolah",
                "Pengambilan buku & perlengkapan"
            ],
            note: "Batas waktu daftar ulang adalah 7 hari kerja setelah pengumuman."
        }
    ];

    const levels = [
        { id: 'PG-TK', title: 'PG-TK', desc: 'Playgroup & Taman Kanak-kanak', icon: BookOpen },
        { id: 'SD', title: 'SD', desc: 'Sekolah Dasar', icon: GraduationCap },
        { id: 'SMP', title: 'SMP', desc: 'Sekolah Menengah Pertama', icon: Building2 },
        { id: 'SMA', title: 'SMA', desc: 'Sekolah Menengah Atas', icon: Building2 },
        { id: 'PKBM', title: 'PKBM', desc: 'Pusat Kegiatan Belajar Masyarakat', icon: Users }
    ];

    const levelRequirements = {
        'PG-TK': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
        ],
        'SD': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Ijazah TK / Surat Keterangan TK", sub: "1 lembar (jika ada)" }
        ],
        'SMP': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Fotokopi Rapor Semester Terakhir", sub: "Kelas 5 SD (legalisir)" },
            { label: "Surat Keterangan Lulus", sub: "Asli dari sekolah asal" },
            { label: "Surat Keterangan Sehat", sub: "Dari dokter/klinik" },
            { label: "Surat Keterangan Bebas Narkoba", sub: "Jika diperlukan" }
        ],
        'SMA': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP Orang Tua", sub: "Ayah & Ibu masing-masing 1 lembar" },
            { label: "Pas Foto Terbaru", sub: "Berwarna ukuran 3x4 (2 lembar)" },
            { label: "Fotokopi Rapor Semester Terakhir", sub: "Kelas 8 SMP (legalisir)" },
            { label: "Surat Keterangan Lulus SMP", sub: "Asli dari sekolah asal" }
        ],
        'PKBM': [
            { label: "Fotokopi Akta Kelahiran", sub: "1 lembar" },
            { label: "Fotokopi Kartu Keluarga (KK)", sub: "1 lembar" },
            { label: "Fotokopi KTP / KTP Orang Tua", sub: "1 lembar" },
            { label: "Ijazah Terakhir", sub: "Legalisir (2 lembar)" }
        ]
    };

    const faqs = [
        {
            q: "Apa saja jenjang pendidikan yang tersedia di Attaufiq?",
            a: "Attaufiq memiliki jenjang pendidikan lengkap mulai dari PG, TK, SD, SMP, SMA, hingga PKBM. Setiap jenjang dirancang untuk mendampingi tumbuh kembang Ananda secara optimal, dengan kurikulum terpadu berbasis nilai-nilai Islam dan karakter care."
        },
        {
            q: "Bagaimana sistem pembelajaran di Attaufiq?",
            a: "Kami menerapkan Kurikulum Merdeka yang dipadukan dengan nilai keislaman, program pembiasaan adab harian, serta penguatan hafalan Al-Qur'an (Tahfiz) dengan metode pembelajaran interaktif berbasis teknologi."
        },
        {
            q: "Apakah Attaufiq memiliki program Tahfizh?",
            a: "Ya, kami memiliki program khusus Tahfizh Al-Qur'an dengan target mutqin yang dibimbing langsung oleh Asatidz teruji dan tersertifikasi."
        },
        {
            q: "Apakah ada program beasiswa?",
            a: "Tersedia beasiswa khusus untuk jalur prestasi akademik, non-akademik, serta program beasiswa khusus bagi para Penghafal Al-Qur'an (Hafiz)."
        },
        {
            q: "Bagaimana cara tahu hasil seleksi?",
            a: "Hasil seleksi dapat diakses secara transparan melalui portal penerimaan siswa baru ini di menu Cek Kelulusan atau pemberitahuan langsung via WhatsApp."
        },
        {
            q: "Apakah orang tua bisa melihat perkembangan Ananda di sekolah?",
            a: "Sangat bisa. Kami menyediakan laporan perkembangan berkala serta portal informasi wali murid yang terhubung langsung dengan guru pembimbing."
        }
    ];

    return (
        <AppLayout title="Penerimaan Murid Baru - SIT At-Taufiq">
            <Head title="Admission & Pendaftaran PMB | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION (SESUAI HERO BANNER PRESISI)
            ========================================== */}
            <HeroSection 
                title="Penerimaan Murid Baru"
                subtitle="Mulai perjalanan pendidikan Islami terbaik untuk Ananda bersama SIT At-Taufiq Jambi."
                tagline="PENDAFTARAN ATTAUFIQ"
                mosqueImage="/images/hero/building-attaufiq.png"
            />


            {/* CANVAS UTAMA - Warm Sand Background */}
            <div className="bg-[#FAF4EB] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden space-y-28">
                
                {/* Background Pattern Ornament Dots */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                {/* ==========================================
                    2. PERIODE PENDAFTARAN (GELOMBANG CARD)
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-12 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>PERIODE PENDAFTARAN</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pilih Periode Pendaftaran
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                            Setiap langkah besar dimulai dari keputusan hari ini.<br className="hidden sm:inline" />
                            Pilih periode terbaik untuk memulai perjalanan Ananda di Attaufiq.
                        </p>
                    </div>

                    {/* Podium Stand Cards Grid */}
                    <div className="relative pt-6 pb-4">
                        {/* 3D Stand Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10">
                            {periods.map((item) => (
                                <div key={item.id} className="relative group flex flex-col justify-between bg-[#FAF8F3] border border-[#E8DFC8] rounded-[36px] p-6 md:p-8 shadow-xl hover:shadow-2xl transition duration-500">
                                    
                                    {/* Golden Binding Rings (Top Decor) */}
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className="w-2.5 h-6 rounded-full bg-gradient-to-b from-[#F3E5AB] via-[#D4AF37] to-[#8B6B13] border border-amber-200 shadow-md"></div>
                                        ))}
                                    </div>

                                    <div className="pt-5 space-y-6 text-center flex-1">
                                        {/* Sun Star Decor & Title */}
                                        <div className="space-y-1">
                                            <div className="text-[#D4AF37] text-xs">☀️</div>
                                            <span className="text-[10px] font-black tracking-[0.2em] text-[#8B6B13] uppercase">
                                                {item.wave}
                                            </span>
                                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051736]">
                                                {item.title}
                                            </h3>
                                        </div>

                                        {/* Date Badge */}
                                        <div className="inline-flex items-center space-x-2 bg-[#F3EBDD] border border-[#E8DFC8] px-4 py-1.5 rounded-full text-xs text-[#051736] font-medium shadow-sm">
                                            <Calendar size={13} className="text-[#8B6B13]" />
                                            <span>{item.date}</span>
                                        </div>

                                        <p className="text-xs text-slate-500 font-light leading-relaxed px-2">
                                            {item.desc}
                                        </p>

                                        {/* Benefits List */}
                                        <div className="pt-5 border-t border-[#E8DFC8]/70 text-left space-y-3 text-xs text-slate-700">
                                            {item.benefits.map((b, idx) => {
                                                const IconComp = b.icon || CheckCircle;
                                                return (
                                                    <div key={idx} className="flex items-center space-x-3">
                                                        <div className="p-1.5 rounded-lg bg-[#F3EBDD] text-[#8B6B13] flex-shrink-0">
                                                            <IconComp size={14} />
                                                        </div>
                                                        <span className="font-light">{b.text}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Action & Status */}
                                    <div className="pt-8 space-y-3">
                                        <div className="flex justify-center">
                                            <span className={`inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                                                item.status === 'open' 
                                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                                    : 'bg-slate-200 text-slate-600 border border-slate-300'
                                            }`}>
                                                <span className={`w-2 h-2 rounded-full ${item.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                                <span>{item.statusText}</span>
                                            </span>
                                        </div>

                                        {item.status === 'open' ? (
                                            <Link
                                                href="#alur-pendaftaran"
                                                className="w-full flex items-center justify-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white py-3.5 rounded-full text-xs font-bold transition shadow-md group-hover:scale-[1.02]"
                                            >
                                                <span>Daftar Sekarang</span>
                                                <ChevronRight size={14} />
                                            </Link>
                                        ) : (
                                            <button
                                                disabled
                                                className="w-full flex items-center justify-center space-x-2 bg-[#E8DFC8] text-slate-600 py-3.5 rounded-full text-xs font-bold cursor-not-allowed"
                                            >
                                                <span>Nantikan Informasi</span>
                                                <ChevronRight size={14} />
                                            </button>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* White Marble Podium Bottom Bar Decor */}
                        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#FAF8F3] via-white to-[#FAF8F3] border border-[#E8DFC8] p-4 shadow-md text-center flex justify-center items-center">
                            <span className="text-[#D4AF37] text-xs mr-2">☀️</span>
                            <span className="text-[11px] font-bold text-[#8B6B13] tracking-widest uppercase">
                                Pilihan Terbaik Untuk Masa Depan Ananda
                            </span>
                            <span className="text-[#D4AF37] text-xs ml-2">☀️</span>
                        </div>
                    </div>

                    {/* Bottom Info Banner */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex items-center space-x-4">
                            <div className="p-3.5 bg-[#051736] text-[#D4AF37] rounded-xl flex-shrink-0">
                                <Calendar size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Kuota terbatas di setiap gelombang</h4>
                                <p className="text-[11px] text-slate-500 font-light">Daftarkan Ananda lebih awal untuk mendapatkan kesempatan dan benefit terbaik.</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-[#E8DFC8] pt-4 md:pt-0 md:pl-6">
                            <div className="p-3.5 bg-[#F3EBDD] text-[#8B6B13] rounded-xl flex-shrink-0">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Butuh bantuan?</h4>
                                <p className="text-[11px] text-slate-500 font-light">Hubungi tim kami untuk informasi lebih lanjut melalui WhatsApp atau email.</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ==========================================
                    3. ALUR PENDAFTARAN (ROYAL BLUE CONTAINER)
                ========================================== */}
                <section id="alur-pendaftaran" className="max-w-7xl mx-auto rounded-[36px] bg-[#051736] text-white p-8 md:p-14 relative overflow-hidden space-y-12 shadow-2xl">
                    
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

                    <div className="text-center space-y-2 max-w-2xl mx-auto relative z-10">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>ALUR PENDAFTARAN</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-white">
                            5 Langkah Mudah Menuju Attaufiq
                        </h2>
                        <p className="text-blue-100/80 text-xs md:text-sm font-light">
                            Ikuti tahapan pendaftaran berikut dengan mudah dan pastikan Ananda menjadi bagian dari keluarga besar Attaufiq.
                        </p>
                    </div>

                    {/* Stepper Interactive Nodes */}
                    <div className="relative z-10 flex items-center justify-between max-w-3xl mx-auto py-4">
                        {/* Horizontal Connecting Glow Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 -translate-y-1/2 z-0"></div>

                        {steps.map((s) => {
                            const IconComp = s.icon;
                            const isActive = activeStep === s.id;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveStep(s.id)}
                                    className="relative z-10 flex flex-col items-center group focus:outline-none"
                                >
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                                        isActive 
                                            ? 'bg-gradient-to-b from-[#F3E5AB] to-[#D4AF37] text-[#051736] ring-4 ring-[#D4AF37]/40 scale-110 shadow-lg' 
                                            : 'bg-[#07327F] text-blue-200 border border-[#D4AF37]/40 hover:border-[#D4AF37]'
                                    }`}>
                                        <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                                            isActive ? 'bg-[#051736] text-[#D4AF37]' : 'bg-[#D4AF37] text-[#051736]'
                                        }`}>
                                            {s.id}
                                        </span>
                                        <IconComp size={22} />
                                    </div>
                                    <span className={`text-[11px] font-bold mt-2.5 transition ${isActive ? 'text-[#F3E5AB]' : 'text-blue-200/60'}`}>
                                        {s.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Detail Card */}
                    {(() => {
                        const current = steps.find(s => s.id === activeStep) || steps[0];
                        return (
                            <div className="bg-[#FAF8F3] text-[#051736] rounded-[28px] p-6 md:p-10 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-2xl">
                                
                                {/* Step Badge */}
                                <div className="absolute top-0 left-8 bg-[#D4AF37] text-[#051736] text-[10px] font-black uppercase px-5 py-1.5 rounded-b-xl tracking-wider shadow-sm">
                                    LANGKAH 0{current.id}
                                </div>

                                {/* Illustration Area (3D Clipboard Placeholder / Fallback Icon) */}
                                <div className="md:col-span-4 flex justify-center pt-6 md:pt-0">
                                    <div className="w-44 h-44 md:w-52 md:h-52 rounded-3xl bg-gradient-to-b from-[#FAF8F3] to-[#F3EBDD] border border-[#E8DFC8] flex flex-col items-center justify-center text-[#8B6B13] shadow-inner relative overflow-hidden group">
                                        {/* Tempat Gambar Ilustrasi 3D: /images/admission/clipboard-3d.png */}
                                        <img 
                                            src="/images/admission/clipboard-3d.png" 
                                            alt="Ilustrasi Langkah" 
                                            className="w-36 h-36 object-contain group-hover:scale-110 transition duration-500"
                                            onError={(e) => {
                                                // Fallback ke Lucide Icon jika foto belum diunggah
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div className="hidden flex-col items-center justify-center space-y-2">
                                            <current.icon size={64} strokeWidth={1.5} className="text-[#8B6B13]" />
                                            <span className="text-[10px] text-slate-400 font-mono">/images/admission/clipboard-3d.png</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="md:col-span-8 space-y-5 pt-2">
                                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051736]">
                                        {current.detailTitle}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-600 font-light leading-relaxed">
                                        {current.detailDesc}
                                    </p>

                                    {/* Checklist Prep */}
                                    <div className="bg-[#F3EBDD]/60 border border-[#E8DFC8] rounded-2xl p-5 space-y-3">
                                        <p className="text-xs font-bold text-[#051736] flex items-center space-x-1.5">
                                            <FileCode size={14} className="text-[#8B6B13]" />
                                            <span>Yang Perlu Disiapkan:</span>
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                                            {current.prepList.map((item, i) => (
                                                <div key={i} className="flex items-center space-x-2">
                                                    <CheckCircle size={14} className="text-[#8B6B13] flex-shrink-0" />
                                                    <span className="font-light text-slate-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Note & CTA */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="p-3.5 bg-blue-50/80 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center space-x-3 max-w-md">
                                            <Lightbulb size={18} className="text-amber-500 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-[11px]">Catatan:</p>
                                                <p className="font-light text-[11px]">{current.note}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href="#"
                                            className="inline-flex items-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white px-6 py-3.5 rounded-xl text-xs font-bold transition shadow-md flex-shrink-0"
                                        >
                                            <span>Isi Formulir Sekarang</span>
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        );
                    })()}

                    {/* Key Value Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-blue-800/60 text-xs text-blue-100">
                        <div className="flex items-center space-x-3">
                            <ShieldCheck size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Proses Mudah & Transparan</p>
                                <p className="text-[10px] text-blue-200/60">Setiap tahapan terstruktur dengan jelas.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Lock size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Data Aman & Terjaga</p>
                                <p className="text-[10px] text-blue-200/60">Informasi Anda terenkripsi aman.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Clock size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Hemat Waktu</p>
                                <p className="text-[10px] text-blue-200/60">Daftar kapan saja melalui perangkat Anda.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <HeartHandshake size={20} className="text-[#D4AF37]" />
                            <div>
                                <p className="font-bold">Didampingi Sepenuh Hati</p>
                                <p className="text-[10px] text-blue-200/60">Tim siap membantu setiap langkah.</p>
                            </div>
                        </div>
                    </div>

                </section>


                {/* ==========================================
                    4. PERSYARATAN PENDAFTARAN (JENJANG TAB)
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-12 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>PERSYARATAN PENDAFTARAN</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pilih Jenjang Pendidikan
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light">
                            Setiap jenjang memiliki persyaratan yang berbeda.<br className="hidden sm:inline" />
                            Silakan pilih jenjang yang sesuai untuk melihat detail persyaratan.
                        </p>
                    </div>

                    {/* Arch Level Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {levels.map((lvl) => {
                            const isSel = activeLevel === lvl.id;
                            return (
                                <button
                                    key={lvl.id}
                                    onClick={() => setActiveLevel(lvl.id)}
                                    className={`p-6 rounded-t-[50px] rounded-b-2xl border text-center flex flex-col items-center justify-between space-y-3 transition duration-300 relative overflow-hidden ${
                                        isSel 
                                            ? 'bg-[#051736] text-white border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/50 -translate-y-1' 
                                            : 'bg-[#FAF8F3] text-[#051736] border-[#E8DFC8] hover:border-[#D4AF37]'
                                    }`}
                                >
                                    <div className={`p-3.5 rounded-full ${isSel ? 'bg-[#07327F] text-[#D4AF37]' : 'bg-[#F3EBDD] text-[#8B6B13]'}`}>
                                        <lvl.icon size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold">{lvl.title}</h3>
                                        <p className={`text-[10px] mt-0.5 ${isSel ? 'text-blue-200' : 'text-slate-500'}`}>{lvl.desc}</p>
                                    </div>
                                    <span className={`text-[11px] font-bold inline-flex items-center space-x-1 ${isSel ? 'text-[#D4AF37]' : 'text-slate-600'}`}>
                                        <span>Lihat Persyaratan</span>
                                        <ChevronRight size={12} />
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Requirement Panel Container */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-10 shadow-lg space-y-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#E8DFC8] pb-6 gap-6">
                            
                            {/* Left Badge Info */}
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-24 rounded-t-[30px] bg-[#051736] text-[#D4AF37] flex flex-col items-center justify-center p-2 text-center shadow-md flex-shrink-0">
                                    <Building2 size={24} />
                                    <span className="font-bold text-xs mt-1">{activeLevel}</span>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#051736]">
                                        Persyaratan Pendaftaran {activeLevel}
                                    </h3>
                                    <p className="text-xs text-slate-500 italic">"Membina generasi berilmu, berakhlak, dan berprestasi untuk masa depan yang gemilang."</p>
                                </div>
                            </div>

                            {/* Right Catatan Important Card */}
                            <div className="bg-[#F3EBDD]/60 border border-[#E8DFC8] p-4 rounded-2xl max-w-sm text-xs space-y-2">
                                <p className="font-bold text-[#051736] flex items-center space-x-1">
                                    <Sparkles size={14} className="text-[#8B6B13]" />
                                    <span>Catatan Penting</span>
                                </p>
                                <ul className="text-[11px] text-slate-600 space-y-1 font-light">
                                    <li>• Semua berkas wajib dalam format PDF/JPG (max 2MB per file).</li>
                                    <li>• Berkas asli wajib dibawa saat verifikasi langsung di sekolah.</li>
                                </ul>
                            </div>
                        </div>

                        {/* List Grid Requirements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(levelRequirements[activeLevel] || levelRequirements['SMP']).map((req, idx) => (
                                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8DFC8] flex items-start space-x-3.5 shadow-sm">
                                    <div className="p-2.5 bg-[#F3EBDD] text-[#8B6B13] rounded-xl mt-0.5">
                                        <FileText size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-[#051736]">{req.label}</h4>
                                        <p className="text-[11px] text-slate-500 font-light">{req.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="#alur-pendaftaran"
                                className="bg-[#051736] hover:bg-[#07327F] text-white px-8 py-3.5 rounded-full text-xs font-bold transition shadow-md flex items-center space-x-2"
                            >
                                <span>Register Now</span>
                                <ChevronRight size={14} />
                            </Link>
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noreferrer"
                                className="border border-[#051736] text-[#051736] hover:bg-[#051736] hover:text-white px-8 py-3.5 rounded-full text-xs font-bold transition flex items-center space-x-2"
                            >
                                <PhoneCall size={14} />
                                <span>Chat Admin</span>
                            </a>
                        </div>
                    </div>
                </section>


                {/* ==========================================
                    5. FAQ ACCORDION SECTION
                ========================================== */}
                <section className="max-w-7xl mx-auto space-y-12 relative z-10">
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs uppercase font-extrabold tracking-[0.2em]">
                            <span>◆</span>
                            <span>FAQ</span>
                            <span>◆</span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#051736]">
                            Pertanyaan yang Sering Diajukan
                        </h2>
                        <p className="text-slate-600 text-xs md:text-sm font-light">
                            Kami memahami setiap pertanyaan Bunda/Ayah.<br className="hidden sm:inline" />
                            Berikut jawaban atas hal-hal yang paling sering ditanyakan tentang Attaufiq.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Side Help Card */}
                        <div className="lg:col-span-4 bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 text-center space-y-6 shadow-md">
                            <div className="w-16 h-16 rounded-full bg-[#F3EBDD] text-[#8B6B13] border border-[#E8DFC8] flex items-center justify-center mx-auto shadow-inner">
                                <HelpCircle size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-serif text-2xl font-bold text-[#051736]">
                                    Masih Punya Pertanyaan?
                                </h3>
                                <p className="text-xs text-slate-500 font-light leading-relaxed">
                                    Jika pertanyaan Bunda/Ayah belum terjawab di sini, jangan ragu untuk menghubungi tim kami. Kami siap membantu.
                                </p>
                            </div>
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center space-x-2 bg-[#051736] hover:bg-[#07327F] text-white py-3.5 rounded-full text-xs font-bold transition shadow-md"
                            >
                                <MessageCircle size={16} />
                                <span>Hubungi Tim Kami</span>
                            </a>
                        </div>

                        {/* Accordion List */}
                        <div className="lg:col-span-8 space-y-3">
                            {faqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={index} 
                                        className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl overflow-hidden shadow-sm transition"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                            className="w-full text-left p-5 flex items-center justify-between space-x-4 focus:outline-none"
                                        >
                                            <span className="font-bold text-xs md:text-sm text-[#051736]">
                                                {faq.q}
                                            </span>
                                            <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#051736] text-white rotate-180' : 'bg-[#F3EBDD] text-[#8B6B13]'}`}>
                                                <Plus size={14} />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5 pt-1 text-xs text-slate-600 font-light leading-relaxed border-t border-[#E8DFC8]/50 bg-white/40">
                                                {faq.a}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                    {/* Bottom Contact Help Banner */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3.5 bg-[#051736] text-[#D4AF37] rounded-xl flex-shrink-0">
                                <PhoneCall size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-[#051736]">Butuh Bantuan Lebih Lanjut?</h4>
                                <p className="text-[11px] text-slate-500 font-light">Tim Attaufiq siap membantu menjawab setiap pertanyaan Bunda/Ayah.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <a
                                href="https://wa.me/628123456789"
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 sm:flex-none border border-[#051736] text-[#051736] hover:bg-[#051736] hover:text-white px-6 py-3 rounded-xl text-xs font-bold transition text-center"
                            >
                                Chat Admin
                            </a>
                            <a
                                href="tel:0821xxxx"
                                className="flex-1 sm:flex-none bg-[#051736] hover:bg-[#07327F] text-white px-6 py-3 rounded-xl text-xs font-bold transition text-center"
                            >
                                Hubungi Kami
                            </a>
                        </div>
                    </div>

                </section>

            </div>
        </AppLayout>
    );
}