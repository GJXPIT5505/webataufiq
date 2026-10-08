import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import {
    Check, Sparkles, ChevronLeft,
    ChevronRight,
    School,
    Gamepad2,
    BookOpen,
    Building2,
    Trees,
    HeartPulse,
    Users,
    ClipboardList,
    Quote,
    ArrowRight, X, Image as ImageIcon

} from 'lucide-react';

const pillars = [
    {
        id: 1,
        title: 'Ilmu',
        description:
            'Menumbuhkan rasa ingin tahu dan kecintaan pada ilmu melalui pembelajaran yang menyenangkan dan bermakna.',
        icon: '/images/jenjang/ilmu.png',
        textColor: 'text-white',
        isYellow: false,
    },
    {
        id: 2,
        title: 'Akhlak',
        description:
            'Membiasakan nilai-nilai Islam dan akhlak mulia dalam keseharian dengan keteladanan dan kasih sayang.',
        icon: '/images/jenjang/akhlak.png',
        textColor: 'text-[#0B1E3D]',
        isYellow: true,
    },
    {
        id: 3,
        title: 'Kemandirian',
        description:
            'Melatih kemandirian, percaya diri, dan kemampuan sosial untuk menjadi pribadi yang siap tumbuh dan berkontribusi.',
        icon: '/images/jenjang/mandiri.png',
        textColor: 'text-white',
        isYellow: false,
    },
];

const features = [
    "Lingkungan Islami yang aman, bersih, dan penuh kasih sayang",
    "Guru profesional dan berpengalaman di bidang PAUD Islam",
    "Kurikulum terpadu: nilai Islam, akademik, dan life skill",
    "Pembiasaan ibadah dan karakter sejak dini",
    "Kolaborasi erat antara sekolah dan orang tua",
];

const facilitiesData = [
    {
        id: 0,
        title: 'Ruang Kelas Nyaman',
        description: 'Ruang kelas dirancang hangat dan aman dengan pencahayaan alami, AC, karpet bermain, dan media belajar yang merangsang kreativitas anak.',
        image: '/images/jenjang/exfasilitas.jfif', // Ganti dengan path foto Anda
        icon: School,
    },
    {
        id: 1,
        title: 'Indoor Playground',
        description: 'Area bermain dalam ruangan yang dilengkapi wahana aman untuk melatih motorik kasar anak saat cuaca tidak mendukung.',
        image: '/images/indoor-playground.jpg',
        icon: Gamepad2,
    },
    {
        id: 2,
        title: 'Perpustakaan Anak',
        description: 'Koleksi buku cerita bergambar Islami dan edukatif untuk menumbuhkan minat baca dan imajinasi anak sejak usia dini.',
        image: '/images/perpustakaan.jpg',
        icon: BookOpen,
    },
    {
        id: 3,
        title: 'Masjid Anak',
        description: 'Sarana latihan ibadah harian yang didesain khusus agar ramah anak, bersih, dan nyaman untuk pembelajaran sholat berjamaah.',
        image: '/images/masjid.jpg',
        icon: Building2,
    },
    {
        id: 4,
        title: 'Area Bermain Outdoor',
        description: 'Taman bermain luar ruangan dengan rumput sintetis, perosotan, dan ayunan untuk eksplorasi fisik dan sosialisasi anak.',
        image: '/images/outdoor.jpg',
        icon: Trees,
    },
    {
        id: 5,
        title: 'UKS & Ruang Kesehatan',
        description: 'Ruang pertolongan pertama yang bersih dan dilengkapi fasilitas medis dasar untuk penanganan awal kesehatan anak.',
        image: '/images/uks.jpg',
        icon: HeartPulse,
    },
];

const categories = [
    "Semua",
    "Pembiasaan Islami",
    "Akademik",
    "Kreativitas",
    "Life Skill",
    "Outdoor",
    "Tahfidz",
];

const activitiesData = [
    {
        id: 1,
        title: "Morning Circle",
        category: "Pembiasaan Islami",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Tilawah & Doa Harian",
        category: "Pembiasaan Islami",
        image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Belajar Sambil Bermain",
        category: "Akademik",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Kegiatan Seni",
        category: "Kreativitas",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Bermain Outdoor",
        category: "Outdoor",
        image: "https://images.unsplash.com/photo-1472162072142-d544e7784670?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Tahfidz Quran",
        category: "Tahfidz",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=500&auto=format&fit=crop",
    },
    {
        id: 7,
        title: "Mandiri & Cooking Class",
        category: "Life Skill",
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=500&auto=format&fit=crop",
    },
];

const stepsData = [
    {
        number: "1",
        title: "Pendaftaran",
        description: "Isi formulir pendaftaran secara online atau datang langsung ke sekolah.",
        icon: <ClipboardList className="w-8 h-8 text-[#0B1A30]" />
    },
    {
        number: "2",
        title: "Observasi & Interview",
        description: "Ananda akan mengikuti observasi bermain dan wawancara orang tua.",
        icon: <Users className="w-8 h-8 text-[#0B1A30]" />
    },
    {
        number: "3",
        title: "Konfirmasi & Awal Belajar",
        description: "Setelah konfirmasi, Ananda siap memulai pengalaman belajar menyenangkan di Attaufiq!",
        icon: <Sparkles className="w-8 h-8 text-[#0B1A30]" />
    }
];

const testimonials = [
    {
        id: 1,
        quote: "Anak kami sekarang lebih mandiri, berani, dan senang beribadah. Terima kasih TK Attaufiq yang membimbing dengan penuh cinta.",
        name: "Bunda Aisyah",
        role: "Orang Tua dari Aqeela (TK B)",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" // Ganti dengan URL foto Bunda Aisyah
    },
    {
        id: 2,
        quote: "Lingkungannya sangat Islami dan guru-gurunya luar biasa sabar. Anak kami betah setiap hari berangkat sekolah.",
        name: "Bunda Rina",
        role: "Orang Tua dari Zayn (TK A)",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" // Ganti dengan URL foto Bunda Rina
    },
    {
        id: 3,
        quote: "Programnya seimbang antara belajar dan bermain. Anak kami berkembang pesat di sini.",
        name: "Bunda Nana",
        role: "Orang Tua dari Khalid (TK B)",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200" // Ganti dengan URL foto Bunda Nana
    }
];

const GALLERY_DATA = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', 
    title: 'Bermain & Eksplorasi Motorik' 
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', 
    title: 'Belajar Kelompok Bersama Guru' 
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop', 
    title: 'Membaca & Literasi Al-Qur\'an' 
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop', 
    title: 'Aktivitas Kelas Interaktif' 
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', 
    title: 'Seni & Mewarnai Kreatif' 
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop', 
    title: 'Bermain Blok & Puzzle' 
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop', 
    title: 'Keceriaan Bersama Teman' 
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop', 
    title: 'Praktek Sains & Eksplorasi Mini' 
  }
];


// Custom Hook Animasi Scroll Reveal
function useInView(options = { threshold: 0.15 }) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target); // Animasi cuma jalan sekali pas pertama keliatan
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isInView];
}





export default function Tk({
    title = "TK Page",
    subtitle = "Setiap jenjang, satu perjalanan. Bersama membangun generasi beradab.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/jenjang/heroTk.png",
    bgpilar = "/images/jenjang/bgpilar.png",
    bgpilarYellow = "/images/jenjang/bgpilaryellow.png",
    bgsection = "/images/jenjang/bgsection.png",
    bgsection2 = "/images/jenjang/bgsection2.png",
    whysection = "/images/jenjang/whysection.png",
    bgOrnament = "/images/jenjang/bgOrnament.png",
}, { onViewMore }) {
    const [activeTab, setActiveTab] = useState('PG-TK');
    const [activeIndex, setActiveIndex] = useState(0);
    // Fungsi Navigasi
    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? facilitiesData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === facilitiesData.length - 1 ? 0 : prev + 1));
    };

    const currentFacility = facilitiesData[activeIndex];

    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [pillarRef, pillarInView] = useInView();

    // Kegiatan section
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollContainerRef = useRef(null);
    const cardRef = useRef(null);

    // Trigger animasi masuk setelah komponen di-mount
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const filteredActivities = activeCategory === "Semua"
        ? activitiesData
        : activitiesData.filter((item) => item.category === activeCategory);

    // Scroll persis sejauh lebar 1 kartu + gap
    const handleScroll = (direction) => {
        if (scrollContainerRef.current && cardRef.current) {
            const cardWidth = cardRef.current.offsetWidth;
            const gap = 24; // gap-6 di tailwind bernilai 24px
            const scrollDistance = cardWidth + gap;

            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollDistance : scrollDistance,
                behavior: 'smooth',
            });
        }
    };

    // Galery
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <AppLayout title="Jenjang At-Taufiq">
            <Head title="Jenjang At-Taufiq Jambi | Mencetak Generasi Robbani" />

            {/* ==========================================
                1. HERO SECTION (FADE IN SANTAI)
            ========================================== */}
            <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[600px] flex items-center">

                {/* Background Image */}
                <img
                    src={patternImage}
                    alt="Hero TK"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Overlay Biru */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(
                90deg,
                rgba(8,43,102,0.98) 0%,
                rgba(8,43,102,0.95) 30%,
                rgba(8,43,102,0.82) 45%,
                rgba(8,43,102,0.55) 58%,
                rgba(8,43,102,0.15) 72%,
                rgba(8,43,102,0) 100%
            )`,
                    }}
                />

                {/* Elemen Aesthetic Tambahan 1: Ambient Golden Light Bulb */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

                {/* Content */}
                <div className="relative z-20 container mx-auto px-8 lg:px-20 py-20">

                    <div className="max-w-2xl relative">

                        {/* Sparkle 1 (Kiri Atas Besar) */}
                        <div className="absolute -left-10 -top-10 text-[#D4AF37] text-3xl animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] pointer-events-none">
                            ✦
                        </div>

                        {/* Sparkle 2 (Kanan Atas Kecil) */}
                        <div className="absolute right-12 -top-6 text-amber-300/80 text-xl animate-ping pointer-events-none" style={{ animationDuration: '3s' }}>
                            ✦
                        </div>

                        {/* Elemen Aesthetic Tambahan 2: Garis Aksen Vertikal + Konten Teks */}
                        <div className="pl-6 border-l-2 border-gradient-to-b border-[#D4AF37] relative">

                            {/* Glow Line effect */}
                            <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-amber-200 to-transparent shadow-[0_0_12px_#D4AF37]" />

                            <h1 className="font-serif text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-wide">
                                TK (Taman Kanak)
                            </h1>

                            {/* Subtitle dengan Text-Gradient Emas */}
                            <h2 className="mt-6 text-3xl font-serif leading-snug bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent drop-shadow-sm">
                                Pijakan Kokoh Menuju
                                <br />
                                Masa Depan Cemerlang.
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-gray-200 font-light">
                              Wadah tumbuh kembang anak yang menyenangkan untuk mengasah rasa ingin tahu, sosialisasi, dan pembiasaan akhlak terpuji sebelum melangkah ke jenjang sekolah dasar.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Wave di bagian bawah Hero Section */}
                <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[120px]"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            {/* Pattern Gambar */}
                            <pattern
                                id="bgSectionPattern"
                                patternUnits="userSpaceOnUse"
                                width="100%"
                                height="120"
                            >
                                <image
                                    href={bgsection2}
                                    width="1440"
                                    height="120"
                                    preserveAspectRatio="none"
                                    className="bg-bottom"
                                />
                            </pattern>
                        </defs>

                        {/* Path Garis Emas */}
                        <path
                            fill="#D4AF37"
                            d="M0,55 C350,120 1100,0 1440,55 L1440,120 L0,120 Z"
                        />

                        {/* Perbaikan Path Lengkungan Bawah */}
                        <path
                            fill="url(#bgSectionPattern)"
                            d="M0,70 C350,135 1100,15 1440,70 L1440,120 L0,120 Z"
                        />
                    </svg>
                </div>

            </section>

            {/* ==========================================
                2. PILAR SECTION
            ========================================== */}
            <section ref={pillarRef} className="relative w-full bg-[#FAF5EE] z-10 pt-16 mt-[-30px] px-4 font-serif bg-cover" style={{
                backgroundImage: `url(${bgsection2})`, // Variabel gambar background kamu
            }}>
                <div className="max-w-6xl mx-auto flex flex-col items-center">

                    <div
                        className={`
        text-center
        transition-all duration-1000
        ${pillarInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                            }
    `}
                    >

                        <span className="text-[#D4AF37] uppercase tracking-[5px] text-sm font-semibold">
                            Nilai Pendidikan
                        </span>


                        <h2 className="mt-3 text-4xl font-bold text-[#0B1E3D]">
                            3 Pilar Utama Kami
                        </h2>

                        <div className="w-24 h-1 rounded-full bg-[#D4AF37] mx-auto mt-5"></div>

                    </div>

                    {/* Grid 3 Pilar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full items-end justify-center">
                        {pillars.map((pillar) => {
                            const IconComponent = pillar.icon;
                            // Pilih background image sesuai properti isYellow
                            const currentBg = pillar.isYellow ? bgpilarYellow : bgpilar;

                            return (
                                <div
                                    key={pillar.id}
                                    className={`
        relative flex flex-col items-center mx-auto
        w-full max-w-[320px]

        transition-all duration-1000

        ${pillarInView
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-16"
                                        }

        hover:-translate-y-4
    `}
                                    style={{
                                        transitionDelay: `${pillar.id * 180}ms`,
                                    }}
                                >
                                    {/* Container Kubah Menggunakan Background Image Dinamis */}
                                    <div
                                        className={`w-full min-h-[420px] p-6 flex flex-col items-center justify-center text-center ${pillar.textColor} bg-contain bg-no-repeat bg-center`}
                                        style={{
                                            backgroundImage: `url(${currentBg})`,
                                        }}
                                    >
                                        {/* Container Konten */}
                                        <div className="w-full h-full pt-10 pb-6 px-4 flex flex-col items-center justify-center">
                                            {/* Icon SVG */}
                                            <div className="mb-5 flex justify-center">
                                                <img
                                                    src={pillar.icon}
                                                    alt={pillar.title}
                                                    className="
                                w-20
                                h-20
                                object-contain

                                transition-transform
                                duration-500

                                group-hover:scale-110
                                animate-[float_4s_ease-in-out_infinite]
                            "
                                                />
                                            </div>

                                            {/* Judul Pilar */}
                                            <h3 className="text-2xl font-bold mb-3 tracking-wider">
                                                {pillar.title}
                                            </h3>

                                            {/* Garis */}
                                            <div
                                                className={`
                            h-1
                            rounded-full
                            mb-5
                            transition-all
                            duration-500

                            ${pillar.isYellow
                                                        ? "bg-[#0B1E3D]"
                                                        : "bg-[#D4AF37]"
                                                    }

                            w-10
                            group-hover:w-20
                        `}
                                            />

                                            {/* Deskripsi */}
                                            <p className="text-sm leading-relaxed opacity-90 max-w-[220px]">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==========================================
                3. WHY ATTAUFIQ SECTION
            ========================================== */}
            <section className="w-full flex flex-col items-center mx-auto p-8 sm:p-6 md:p-8 bg-[#FAF6F0] relative overflow-hidden font-sans">

                {/* 1. Warm Golden Ambient Glow Orbs */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-10 left-10 w-64 h-64 bg-amber-300/15 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#0F223D]/5 rounded-full blur-[100px] pointer-events-none" />

                {/* 2. Floating Aesthetic Sparkles */}
                <div className="absolute top-12 left-12 text-amber-500/30 text-xl pointer-events-none animate-pulse">✦</div>
                <div className="absolute top-24 right-16 text-amber-600/30 text-lg pointer-events-none">✨</div>
                <div className="absolute bottom-12 left-16 text-amber-500/30 text-xl pointer-events-none animate-pulse" style={{ animationDuration: '3.5s' }}>✦</div>

                {/* Outer Card Container */}
                <div className="relative max-w-6xl w-full overflow-hidden bg-[#FFFBF5]/90 backdrop-blur-md border border-[#F1E4D5] rounded-3xl p-6 sm:p-8 md:p-14 shadow-xl shadow-amber-900/5 my-6 transition-all duration-300 z-10">

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute top-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>

                    {/* Gambar Hiasan Ornamen Background */}
                    {bgOrnament && (
                        <img
                            src={bgOrnament}
                            alt="Islamic Ornament Background"
                            className="absolute right-0 bottom-0 w-80 h-auto pointer-events-none opacity-15 translate-x-6 translate-y-6 select-none mix-blend-multiply"
                        />
                    )}

                    {/* Hiasan Sparkles Melayang di Dalam Container */}
                    <div className="absolute right-12 bottom-28 text-amber-500/60 pointer-events-none select-none animate-bounce duration-1000">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="absolute right-28 bottom-12 text-amber-500/40 pointer-events-none select-none animate-pulse">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="absolute right-16 bottom-44 text-amber-500/50 pointer-events-none select-none animate-spin-slow">
                        <Sparkles className="w-5 h-5" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                        {/* Gambar Sisi Kiri dengan Style Frame Kubah Islami */}
                        <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-[400px] overflow-hidden rounded-2xl shadow-md border border-amber-500/20 bg-gray-900 group">

                            {/* Inner Border Frame Gold */}
                            <div className="absolute inset-3 border border-amber-300/30 rounded-xl z-10 pointer-events-none group-hover:border-amber-300/60 transition-colors duration-500" />

                            {/* Visual Gambar */}
                            {whysection && (
                                <img
                                    src={whysection}
                                    alt="Anak-anak belajar bersama guru"
                                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            )}

                            {/* Gradient Overlay Bawah Gambar */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D]/70 via-transparent to-transparent z-10" />

                            {/* Floating Badge di atas Gambar */}
                            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-[#0F223D]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-400/30 text-xs text-amber-300 font-semibold shadow-lg">
                                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                                <span>Keunggulan Utama TK Attaufiq</span>
                            </div>
                        </div>

                        {/* Konten Teks Sisi Kanan */}
                        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-2">

                            {/* Header / Judul */}
                            <div className="flex flex-col items-start gap-2 group">
                                <div className="flex items-center gap-3.5">

                                    {/* Star Badge Icon dengan Efek Glow & Rotasi Smooth */}
                                    <div className="relative flex items-center justify-center group/badge">
                                        <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover/badge:blur-lg transition-all duration-500" />
                                        <div className="relative flex items-center justify-center w-11 h-11 bg-[#0F223D] text-amber-400 font-bold rounded-xl rotate-45 flex-shrink-0 shadow-lg border border-amber-300/40 transition-transform duration-500 group-hover/badge:rotate-[225deg]">
                                            <span className="-rotate-45 text-base font-extrabold transition-transform duration-500 group-hover/badge:-rotate-[225deg]">
                                                2
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F223D] tracking-wide">
                                        Mengapa Memilih TK Attaufiq?
                                    </h2>
                                </div>

                                {/* Decorative Divider Line */}
                                {/* <div className="flex items-center gap-2 mt-1 pl-1">
                                    <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                                </div> */}
                            </div>

                            {/* Daftar Poin Keunggulan (Card List) */}
                            <ul className="space-y-3 pt-1">
                                {features.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-[#FAF0E6] border border-[#F3E2D4]/70 hover:border-amber-300/60 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:translate-x-1 group/item"
                                    >
                                        {/* Circle Check Icon dengan Glow Emas */}
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                            <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 text-[#0F223D] rounded-xl shadow-sm transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
                                                <Check className="w-4 h-4 stroke-[3]" />
                                            </div>
                                        </div>

                                        <span className="text-gray-800 text-xs sm:text-sm font-semibold transition-colors duration-200 group-hover/item:text-[#0F223D]">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                        </div>

                    </div>

                </div>
            </section>

            {/* ==========================================
                4. Facility ATTAUFIQ SECTION
            ========================================== */}
            <section className="w-full flex flex-col items-center mx-auto p-4 sm:p-6 md:p-8 bg-[#FAF6F0] relative overflow-hidden font-sans">

                {/* 1. Warm Golden Ambient Glow Orbs */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-amber-300/15 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#0F223D]/5 rounded-full blur-[100px] pointer-events-none" />

                {/* 2. Floating Aesthetic Sparkles */}
                <div className="absolute top-12 left-10 text-amber-500/30 text-xl pointer-events-none animate-pulse">✦</div>
                <div className="absolute top-24 right-12 text-amber-600/30 text-lg pointer-events-none">✨</div>
                <div className="absolute bottom-12 right-16 text-amber-500/30 text-xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}>✦</div>

                {/* Outer Card Container */}
                <div className="relative max-w-6xl mx-auto w-full overflow-hidden bg-[#FFFBF5]/90 backdrop-blur-md border border-[#F1E4D5] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-amber-900/5 my-6 transition-all duration-300 z-10">

                    {/* Corner Ornaments */}
                    <div className="absolute top-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute top-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>

                    {/* Header Section */}
                    <div className="flex flex-col items-center justify-center mb-10 group cursor-default text-center">

                        {/* Badge Number dengan Efek Rotasi & Glow saat Hover */}
                        <div className="relative mb-3 flex items-center justify-center">
                            <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />
                            <div className="relative flex items-center justify-center w-11 h-11 bg-[#0F223D] text-amber-400 font-bold rounded-xl rotate-45 flex-shrink-0 shadow-lg border border-amber-300/40 transition-transform duration-500 group-hover:rotate-[225deg]">
                                <span className="-rotate-45 font-extrabold text-base transition-transform duration-500 group-hover:-rotate-[225deg]">
                                    3
                                </span>
                            </div>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F223D] tracking-wide">
                            Fasilitas Kami
                        </h2>

                        {/* Decorative Divider Line */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </div>

                    {/* Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                        {/* 1. Tombol Daftar Fasilitas (Sisi Kiri) */}
                        <div className="lg:col-span-3 flex flex-col justify-center space-y-3">
                            {facilitiesData.map((item, index) => {
                                const IconComponent = item.icon;
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all duration-300 ease-out w-full group relative ${isActive
                                                ? 'bg-[#0F223D] text-white shadow-lg shadow-blue-950/20 translate-x-2 border border-amber-400/30'
                                                : 'bg-[#FFFBF7] text-gray-700 hover:bg-[#FAF0E6] border border-[#F3E2D4] hover:border-amber-300/60 hover:translate-x-1'
                                            }`}
                                    >
                                        {/* Indicator Dot Aktif */}
                                        {isActive && (
                                            <span className="absolute left-1.5 w-1.5 h-6 bg-amber-400 rounded-full" />
                                        )}

                                        <div
                                            className={`p-2 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100/60 text-[#0F223D]'
                                                }`}
                                        >
                                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </div>

                                        <span className="truncate font-medium flex-1">{item.title}</span>

                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-amber-300 translate-x-0.5' : 'text-gray-400 opacity-0 group-hover:opacity-100'
                                            }`} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* 2. Display Gambar Utama (Tengah) */}
                        <div className="lg:col-span-5 relative w-full h-64 sm:h-80 lg:h-[390px] overflow-hidden rounded-2xl shadow-md border border-amber-500/20 bg-gray-900 group">

                            {/* Overlay Inner Gold Frame */}
                            <div className="absolute inset-3 border border-amber-300/30 rounded-xl z-10 pointer-events-none group-hover:border-amber-300/60 transition-colors duration-500" />

                            {/* Gambar Utama */}
                            <img
                                key={currentFacility.id}
                                src={currentFacility.image}
                                alt={currentFacility.title}
                                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 animate-fadeIn"
                            />

                            {/* Gradient Overlay Bawah Gambar */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D]/80 via-transparent to-transparent z-10" />

                            {/* Badge Indicator Nomor Gambar di Dalam Visual */}
                            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-[#0F223D]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/30 text-xs text-amber-300 font-semibold">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>0{activeIndex + 1} / 0{facilitiesData.length}</span>
                            </div>
                        </div>

                        {/* 3. Panel Informasi & Control Carousel (Sisi Kanan) */}
                        <div className="lg:col-span-4 relative flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-[#FFFBF7] via-[#FFF8F0] to-[#FAF2E8] border border-[#F3E2D4] rounded-2xl shadow-sm overflow-hidden">

                            {/* Ambient Corner Light */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />

                            {/* Hiasan Vector Kubah / Islamic Arch Background */}
                            <div className="absolute top-4 right-4 text-[#D9A04B]/15 pointer-events-none select-none">
                                <svg viewBox="0 0 100 120" className="w-20 h-24 stroke-current" fill="none" strokeWidth="1.2">
                                    <path d="M50 5 C30 25 10 35 10 65 L10 115 L90 115 L90 65 C90 35 70 25 50 5 Z" />
                                </svg>
                            </div>

                            {/* Sparkles Hiasan Tambahan */}
                            <div className="absolute top-8 right-12 text-[#D9A04B]/60 pointer-events-none select-none">
                                <Sparkles className="w-4 h-4 animate-bounce" />
                            </div>

                            {/* Deskripsi Teks dengan Key Animation */}
                            <div key={currentFacility.id} className="relative z-10 space-y-3.5 my-auto animate-fadeIn">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-700 font-semibold text-xs uppercase tracking-wider">
                                    <span>✦</span> Detail Fasilitas
                                </div>

                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0F223D] transition-colors duration-300">
                                    {currentFacility.title}
                                </h3>

                                <div className="w-10 h-0.5 bg-amber-400/60 rounded-full" />

                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                    {currentFacility.description}
                                </p>
                            </div>

                            {/* Navigasi Carousel (Panah Left/Right & Indicator Dots) */}
                            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-[#F3E2D4]">

                                {/* Button Prev */}
                                <button
                                    onClick={handlePrev}
                                    className="p-2.5 rounded-xl border border-[#F3E2D4] bg-white text-gray-700 hover:bg-[#0F223D] hover:text-amber-400 hover:border-[#0F223D] active:scale-95 transition-all duration-200 shadow-sm"
                                    aria-label="Previous Facility"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Indicator Dots */}
                                <div className="flex items-center gap-2">
                                    {facilitiesData.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveIndex(idx)}
                                            className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                                                    ? 'w-7 bg-[#0F223D] shadow-sm'
                                                    : 'w-2 bg-amber-300/50 hover:bg-amber-400'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Button Next */}
                                <button
                                    onClick={handleNext}
                                    className="p-2.5 rounded-xl border border-[#F3E2D4] bg-white text-gray-700 hover:bg-[#0F223D] hover:text-amber-400 hover:border-[#0F223D] active:scale-95 transition-all duration-200 shadow-sm"
                                    aria-label="Next Facility"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ==========================================
                5. ACTIVITY SECTION
            ========================================== */}
            <section className="w-full bg-[#FAF6F0] py-20 px-4 md:px-8 font-sans relative overflow-hidden">

                {/* 1. Ambient Golden Glow Orbs (Soft Lighting Background) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-300/15 rounded-full blur-[100px] pointer-events-none" />

                {/* 2. Sparkles Ornaments Background Melayang */}
                <div className="absolute top-12 left-10 text-amber-500/30 text-2xl pointer-events-none animate-pulse">✦</div>
                <div className="absolute top-20 right-14 text-amber-600/30 text-xl pointer-events-none">✨</div>
                <div className="absolute bottom-16 right-20 text-amber-500/30 text-2xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}>✦</div>
                <div className="absolute bottom-24 left-16 text-amber-600/25 text-lg pointer-events-none">✨</div>

                {/* Container utama dengan animasi fade-in-up */}
                <div
                    className={`max-w-7xl mx-auto bg-[#FFFBF5]/90 backdrop-blur-md rounded-3xl border border-[#F1E4D5] p-6 md:p-12 shadow-xl shadow-amber-900/5 transition-all duration-1000 ease-out transform relative ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    {/* Corner Ornaments di Dalam Container */}
                    <div className="absolute top-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute top-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-10 text-center relative z-10">

                        {/* Badge Icon 4 dengan Sentuhan Aesthetic Light/Glow */}
                        <div className="relative mb-4 flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />
                            <div className="relative w-11 h-11 bg-[#0B1A30] rotate-45 rounded-xl flex items-center justify-center shadow-lg border border-amber-300/40 transition-transform duration-500 group-hover:rotate-[225deg]">
                                <span className="-rotate-45 group-hover:-rotate-[225deg] text-amber-400 font-extrabold text-base transition-transform duration-500 group-hover:scale-110">
                                    4
                                </span>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B1A30] tracking-wide flex items-center gap-2">
                            Kegiatan Ananda
                        </h2>

                        {/* Decorative Divider Line */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </div>

                    {/* Filter Categories */}
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 relative z-10">
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform active:scale-95 ${isActive
                                        ? 'bg-[#0B1A30] text-amber-300 shadow-md shadow-navy-900/20 scale-105 border border-amber-400/30'
                                        : 'bg-[#FAF0E6] text-[#5A5A5A] border border-[#E8D7C5] hover:bg-[#F3E3D3] hover:text-[#0B1A30]'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>

                    {/* Carousel Container */}
                    <div className="relative px-2 md:px-10 z-10">

                        {/* Tombol Prev */}
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 w-11 h-11 bg-white/90 backdrop-blur-sm border border-[#E8D7C5] rounded-full flex items-center justify-center shadow-lg text-[#0B1A30] hover:bg-[#0B1A30] hover:text-amber-300 hover:border-[#0B1A30] transition-all duration-300 transform hover:scale-110 active:scale-90"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={22} />
                        </button>

                        {/* Wrapper Scroll */}
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth py-6 px-2 snap-x snap-mandatory"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                            }}
                        >
                            {filteredActivities.map((item, index) => (
                                <div
                                    key={item.id}
                                    ref={index === 0 ? cardRef : null}
                                    className="flex-shrink-0 w-[240px] sm:w-[260px] md:w-[280px] snap-start flex flex-col items-center group/card transition-all duration-500 hover:-translate-y-2"
                                >
                                    {/* Frame Gambar Aesthetic dengan Corner Border Accent */}
                                    <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] rounded-2xl overflow-hidden shadow-md shadow-amber-950/10 border border-[#EFE5D9] bg-[#FAF0E6]">

                                        {/* Outer Inner Frame Ornament (Aksentuasi Garis Tipis Emas) */}
                                        <div className="absolute inset-2 border border-amber-300/40 rounded-xl z-10 pointer-events-none group-hover/card:border-amber-400/80 transition-colors duration-500" />

                                        {/* Ornaments Sparkle di Pojok Kartu */}
                                        <div className="absolute top-3 left-3 text-amber-300/80 text-[10px] z-20 pointer-events-none">✦</div>
                                        <div className="absolute top-3 right-3 text-amber-300/80 text-[10px] z-20 pointer-events-none">✦</div>

                                        {/* Overlay Gradien Halus */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A30]/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10" />

                                        {/* Gambar Utama */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                                        />

                                        {/* Badge Category Tag di Atas Foto */}
                                        {item.category && (
                                            <span className="absolute bottom-3 left-3 z-20 px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-md text-[10px] font-semibold text-[#0B1A30] shadow-sm border border-white/50">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title dengan Efek Glow Underline saat Hover */}
                                    <div className="relative mt-4 flex flex-col items-center">
                                        <p className="text-sm md:text-base font-semibold text-[#0B1A30] text-center group-hover/card:text-amber-700 transition-colors duration-300">
                                            {item.title}
                                        </p>
                                        <div className="w-0 group-hover/card:w-8 h-0.5 bg-amber-500 rounded-full transition-all duration-300 mt-1" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tombol Next */}
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 w-11 h-11 bg-white/90 backdrop-blur-sm border border-[#E8D7C5] rounded-full flex items-center justify-center shadow-lg text-[#0B1A30] hover:bg-[#0B1A30] hover:text-amber-300 hover:border-[#0B1A30] transition-all duration-300 transform hover:scale-110 active:scale-90"
                            aria-label="Next image"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>

                </div>
            </section>

            {/* ==========================================
                6. JOIN SECTION
            ========================================== */}
            <section className="w-full bg-[#FAF6F0] py-20 px-4 md:px-8 font-sans relative overflow-hidden">

                {/* 1. Warm Golden Ambient Glow Orbs */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-200/20 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-amber-300/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-900/5 rounded-full blur-[120px] pointer-events-none" />

                {/* 2. Floating Aesthetic Sparkles */}
                <div className="absolute top-14 left-12 text-amber-500/30 text-2xl pointer-events-none animate-pulse">✦</div>
                <div className="absolute top-28 right-16 text-amber-600/30 text-xl pointer-events-none">✨</div>
                <div className="absolute bottom-16 right-24 text-amber-500/30 text-2xl pointer-events-none animate-pulse" style={{ animationDuration: '3.5s' }}>✦</div>
                <div className="absolute bottom-20 left-20 text-amber-600/25 text-lg pointer-events-none">✨</div>

                {/* Container Utama dengan Animasi Smooth Fade-In */}
                <div
                    className={`max-w-7xl mx-auto bg-[#FFFBF5]/90 backdrop-blur-md rounded-3xl border border-[#F1E4D5] p-6 md:p-12 shadow-xl shadow-amber-900/5 relative transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    {/* Corner Ornaments di Dalam Container */}
                    <div className="absolute top-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute top-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
                    <div className="absolute bottom-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-12 text-center relative z-10">

                        {/* Badge Icon 5 dengan Glow Effect & Rotasi Bingkai */}
                        <div className="relative mb-4 flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />

                            <div className="relative w-11 h-11 bg-[#0B1A30] rotate-45 rounded-xl flex items-center justify-center shadow-lg border border-amber-300/40 transition-transform duration-500 group-hover:rotate-[225deg]">
                                <span className="-rotate-45 group-hover:-rotate-[225deg] text-amber-400 font-extrabold text-base transition-transform duration-500 group-hover:scale-110">
                                    5
                                </span>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B1A30] tracking-wide">
                            Cara Bergabung di TK Attaufiq
                        </h2>

                        {/* Decorative Divider Line */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </div>

                    {/* Content Layout Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">

                        {/* Langkah 1-3 Container (Kiri) */}
                        <div className="lg:col-span-7 bg-[#FFFBF5] rounded-2xl border border-[#E8D7C5]/70 p-4 md:p-6 flex flex-col gap-6 justify-between relative shadow-sm">

                            {stepsData.map((step, index) => (
                                <div
                                    key={index}
                                    style={{ transitionDelay: `${(index + 1) * 150}ms` }}
                                    className={`group relative flex flex-row items-center gap-5 p-4 md:p-5 rounded-2xl transition-all duration-500 ease-out transform hover:-translate-y-1 hover:shadow-md hover:shadow-amber-900/5 hover:bg-gradient-to-r hover:from-[#FAF0E6] hover:to-[#FFFBF5] border border-transparent hover:border-[#E8D7C5] bg-white/40 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                                        }`}
                                >
                                    {/* SISI KIRI: SVG Frame Kubah dengan Inner Accent */}
                                    <div className="relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 flex items-center justify-center">

                                        {/* Glow lembut di belakang kubah saat hover */}
                                        <div className="absolute inset-0 bg-amber-300/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <svg
                                            viewBox="0 0 100 120"
                                            className="absolute inset-0 w-full h-full text-[#E8D7C5] group-hover:text-amber-500/70 transition-colors duration-500 filter drop-shadow-sm"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Frame Luar */}
                                            <path
                                                d="M50 5 C30 25 10 35 10 65 L10 115 L90 115 L90 65 C90 35 70 25 50 5 Z"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                fill="none"
                                            />
                                            {/* Frame Dalam Halus */}
                                            <path
                                                d="M50 12 C35 29 18 38 18 65 L18 108 L82 108 L82 65 C82 38 65 29 50 12 Z"
                                                stroke="currentColor"
                                                strokeWidth="1"
                                                strokeDasharray="2 2"
                                                opacity="0.6"
                                                fill="none"
                                            />
                                        </svg>

                                        {/* Icon di dalam Frame Kubah */}
                                        <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* SISI KANAN: Text Content */}
                                    <div className="flex-1 text-left">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-amber-600 font-extrabold text-xs md:text-sm tracking-wider uppercase">
                                                Langkah 0{step.number}
                                            </span>
                                            <span className="text-amber-400 text-xs">✦</span>
                                        </div>
                                        <h3 className="font-bold text-[#0B1A30] text-base md:text-xl leading-snug mb-1.5 group-hover:text-amber-800 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#5A5A5A] text-xs md:text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Banner Admission (Kanan) dengan Gradien & Ornaments */}
                        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1A30] via-[#102544] to-[#081324] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl border border-amber-500/30 group min-h-[340px]">

                            {/* Inner Border Line Gold */}
                            <div className="absolute inset-3 border border-amber-400/20 rounded-xl pointer-events-none group-hover:border-amber-400/40 transition-colors duration-500" />

                            {/* Ambient Animated Light Background */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />

                            {/* Sparkles Ornaments di Atas Banner */}
                            <div className="absolute top-6 right-6 text-amber-300/40 text-sm pointer-events-none">✨</div>
                            <div className="absolute top-12 right-12 text-amber-300/30 text-xs pointer-events-none">✦</div>

                            {/* Teks Informasi */}
                            <div className="relative z-10 max-w-xs mb-6 mt-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold text-xs tracking-wider uppercase mb-4 backdrop-blur-sm shadow-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                    Pendaftaran Siswa Baru
                                </span>
                                <p className="text-xl md:text-2xl font-serif font-medium leading-relaxed text-slate-100">
                                    Info lengkap & pendaftaran kunjungi halaman <span className="text-amber-300 italic">Admission</span>
                                </p>
                            </div>

                            {/* Tombol Action Shimmering */}
                            <div className="relative z-10 mb-2">
                                <a
                                    href="#admission"
                                    className="relative overflow-hidden inline-flex items-center justify-between gap-3 w-full sm:w-auto bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-[#0B1A30] font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 group/btn"
                                >
                                    <span className="relative z-10">Lihat Halaman Admission</span>
                                    <ChevronRight size={18} className="relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300" />

                                    {/* Effect kilatan cahaya pada button */}
                                    <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                </a>
                            </div>

                            {/* Decorative Masjid Line Art Background */}
                            <div className="absolute right-0 bottom-0 top-0 opacity-20 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none flex items-center justify-end pr-2">
                                <svg
                                    viewBox="0 0 160 200"
                                    className="h-full w-auto text-amber-300 stroke-current transform group-hover:scale-105 transition-transform duration-700"
                                    fill="none"
                                    strokeWidth="1.5"
                                >
                                    <path d="M100 40 C70 70 40 85 40 130 L40 200 L160 200 L160 130 C160 85 130 70 100 40 Z" />
                                    <path d="M100 120 C85 135 70 145 70 170 L70 200 L130 200 L130 170 C130 145 115 135 100 120 Z" />
                                    <path d="M100 25 L100 35 M95 30 L105 30" />
                                </svg>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ==========================================
                7. Testimoni SECTION
            ========================================== */}
            <section className="w-full bg-gradient-to-b from-[#0B1A30] via-[#0E223F] to-[#071324] py-24 px-4 md:px-8 font-sans relative overflow-hidden text-white">

                {/* 1. Ambient Golden Glow Orbs (Bikin Background Hidup) */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

                {/* 2. Sparkle Decor Melayang */}
                <div className="absolute top-12 right-12 text-amber-300/40 animate-bounce pointer-events-none" style={{ animationDuration: '5s' }}>
                    <Sparkles size={28} />
                </div>
                <div className="absolute bottom-20 left-10 text-amber-400/30 animate-pulse pointer-events-none">
                    ✦
                </div>

                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-16 text-center">

                        {/* Badge Icon 6 dengan Effect Glow & Double Ring */}
                        <div className="relative mb-4 flex items-center justify-center group cursor-pointer">
                            <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover:blur-xl transition-all duration-500" />

                            {/* Outer Box Emas Berputar */}
                            <div className="relative w-12 h-12 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-200/50 transition-transform duration-700 group-hover:rotate-[225deg]">

                                {/* Angka 6 Tetap Tegak Lurus */}
                                <span className="-rotate-45 -group-hover:rotate-[225deg] text-[#0B1A30] font-extrabold text-lg transition-transform duration-500 group-hover:scale-110">
                                    6
                                </span>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-wide drop-shadow-sm">
                            Apa Kata Orang Tua?
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full mt-3" />
                    </div>

                    {/* Grid Testimoni */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-[#FFFBF5] rounded-t-[100px] rounded-b-3xl p-7 lg:p-9 flex flex-col justify-between transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] border border-amber-200/50"
                            >

                                {/* SVG Ornaments - Kubah Islami Presisi */}
                                <div className="absolute inset-0 pointer-events-none">
                                    <svg
                                        viewBox="0 0 300 380"
                                        className="w-full h-full text-[#E8D7C5] group-hover:text-amber-500 transition-colors duration-500"
                                        fill="none"
                                        preserveAspectRatio="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10 120 C10 40, 60 10, 150 10 C240 10, 290 40, 290 120 L290 370 L10 370 Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M18 122 C18 46, 65 18, 150 18 C235 18, 282 46, 282 122"
                                            stroke="currentColor"
                                            strokeWidth="0.8"
                                            strokeOpacity="0.6"
                                        />
                                    </svg>
                                </div>

                                {/* Top Content: Quote & Teks */}
                                <div className="relative z-10 pt-4">

                                    {/* Quote Icon dengan Efek Hover Scale */}
                                    <div className="mb-5 text-amber-500 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 origin-left">
                                        <Quote size={40} className="rotate-180 fill-amber-500/20 stroke-amber-500" />
                                    </div>

                                    <p className="text-[#2C3E50] text-sm lg:text-base leading-relaxed font-normal italic group-hover:text-[#0B1A30] transition-colors">
                                        "{item.quote}"
                                    </p>
                                </div>

                                {/* Bottom Content: Profile Person */}
                                <div className="relative z-10 flex items-center gap-4 mt-8 pt-5 border-t border-[#F3E5D8]">

                                    {/* Avatar dengan Pulsing Ring */}
                                    <div className="relative w-14 h-14 flex-shrink-0">
                                        <div className="absolute inset-0 bg-amber-400/30 rounded-full opacity-75 group-hover:opacity-100" />
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="relative w-full h-full object-cover rounded-full border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Profile Detail */}
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-[#0B1A30] text-base group-hover:text-amber-700 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {item.role}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ==========================================
                8. Gallery SECTION
            ========================================== */}
            <section className="w-full flex flex-col items-center mx-auto p-4 sm:p-6 md:p-8 bg-[#FAF6F0] relative overflow-hidden font-sans">
      
      {/* Ambient Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-amber-300/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0F223D]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Aesthetic Sparkles */}
      <div className="absolute top-12 left-10 text-amber-500/30 text-xl pointer-events-none animate-pulse">✦</div>
      <div className="absolute top-24 right-12 text-amber-600/30 text-lg pointer-events-none">✨</div>
      <div className="absolute bottom-12 right-16 text-amber-500/30 text-xl pointer-events-none animate-pulse" style={{ animationDuration: '3s' }}>✦</div>

      {/* Outer Container Card */}
      <div className="relative max-w-6xl w-full overflow-hidden bg-[#FFFBF5]/90 backdrop-blur-md border border-[#F1E4D5] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-amber-900/5 my-6 transition-all duration-300 z-10">

        {/* Corner Ornaments */}
        <div className="absolute top-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
        <div className="absolute top-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
        <div className="absolute bottom-4 left-4 text-amber-400/40 text-xs pointer-events-none">✦</div>
        <div className="absolute bottom-4 right-4 text-amber-400/40 text-xs pointer-events-none">✦</div>

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-10 text-center group">
          
          {/* Badge Number 7 */}
          <div className="relative mb-3 flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-md group-hover:blur-lg transition-all duration-500" />
            <div className="relative flex items-center justify-center w-11 h-11 bg-[#0F223D] text-amber-400 font-bold rounded-xl rotate-45 flex-shrink-0 shadow-lg border border-amber-300/40 transition-transform duration-500 group-hover:rotate-[225deg]">
              <span className="-rotate-45 font-extrabold text-base transition-transform duration-500 group-hover:-rotate-[225deg]">
                7
              </span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#0F223D] tracking-wide">
            Galeri Kegiatan Ananda
          </h2>

          {/* Decorative Divider Line */}
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {/* Multi-Row Photo Grid (2 Baris x 4 Kolom di Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {GALLERY_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-amber-500/20 bg-gray-900 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-900/10"
            >
              {/* Gold Inner Frame Border */}
              <div className="absolute inset-2.5 border border-amber-300/30 rounded-xl z-10 pointer-events-none group-hover:border-amber-300/70 transition-colors duration-500" />

              {/* Photo Image Unsplash */}
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D]/90 via-[#0F223D]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300 z-10" />

              {/* Content Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-white text-xs sm:text-sm font-semibold line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h4>
              </div>

              {/* Hover Zoom Icon Indicator */}
              <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#0F223D]/80 border border-amber-400/40 text-amber-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <ImageIcon className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={onViewMore}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#0F223D] hover:bg-[#162d4d] text-amber-300 hover:text-amber-200 font-semibold text-sm sm:text-base rounded-2xl border border-amber-400/40 shadow-lg shadow-blue-950/20 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 overflow-hidden"
          >
            {/* Light Sweep Animation Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out" />

            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Lihat Galeri Lainnya</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

      </div>

      {/* Lightbox / Modal Perbesar Foto */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#0F223D] rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 text-amber-300 hover:text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative h-[60vh] sm:h-[70vh] w-full bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Description */}
            <div className="p-6 bg-[#0F223D] flex items-center justify-between border-t border-amber-400/20">
              <h3 className="text-white text-lg font-serif font-bold">
                {selectedImage.title}
              </h3>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>
      )}

    </section>

        </AppLayout>
    );
}
