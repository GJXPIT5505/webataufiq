// resources/js/Pages/Home.jsx

import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import CharacterActivitySection from "@/Components/home/CharacterActivitySection";
import JourneySection from "@/Components/home/journey/JourneySection";

import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Heart,
    Cloud,
    Sun,
    Star,
    Smile,
    Compass,
    UserPlus,
    Calendar,
    ArrowRight,
    ArrowUpRight,
    BookOpenText, Lightbulb, Target, Handshake,
} from 'lucide-react';

// ==========================================
// DATA ORNAMEN BACKGROUND (Parallax)
// ==========================================
const BACKGROUND_ORNAMENTS = [
    {
        id: 1,
        Icon: Sparkles,
        size: 28,
        color: "text-amber-400/60",
        top: "6%",
        left: "8%",
        depth: 0.1,
    },
    {
        id: 2,
        Icon: Cloud,
        size: 48,
        color: "text-amber-200/50",
        top: "18%",
        right: "6%",
        depth: 0.15,
    },
    {
        id: 3,
        Icon: BookOpen,
        size: 34,
        color: "text-amber-600/30",
        top: "32%",
        left: "5%",
        depth: 0.08,
    },
    {
        id: 4,
        Icon: Smile,
        size: 30,
        color: "text-amber-400/40",
        top: "45%",
        right: "10%",
        depth: 0.12,
    },
    {
        id: 5,
        Icon: Heart,
        size: 32,
        color: "text-rose-400/35",
        top: "58%",
        left: "7%",
        depth: 0.18,
    },
    {
        id: 6,
        Icon: Compass,
        size: 36,
        color: "text-amber-500/25",
        top: "72%",
        right: "8%",
        depth: 0.1,
    },
    {
        id: 7,
        Icon: GraduationCap,
        size: 44,
        color: "text-amber-700/25",
        top: "84%",
        left: "6%",
        depth: 0.14,
    },
    {
        id: 8,
        Icon: Star,
        size: 26,
        color: "text-amber-400/50",
        top: "94%",
        right: "12%",
        depth: 0.06,
    },
];



// ==========================================
// 1. DATA PATH / ALAMAT GAMBAR
// ==========================================
const ROAD_IMAGE = "/images/home/jalan2.png";
const PEOPLE_IMAGE = "/images/home/people.png";

// ==========================================
// 2. KOORDINAT LEKUKAN JALAN LEBIH DETAIL (Supaya Sangat Smooth)
// ==========================================
const SCROLL_STOPS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
const ROAD_CURVES = [50, 58, 66, 52, 34, 42, 64, 55, 36, 44, 50];

// ==========================================
// 3. DATA JENJANG PENDIDIKAN & RENTANG TRIGGER ANIMASI
// ==========================================
const JENJANG_DATA = [
    {
        id: 'pg',
        badge: 'Langkah 1',
        title: 'PG',
        age: 'Usia 2 - 4 Tahun',
        desc: 'Belajar merasa aman, dicintai, dan dekat dengan Al-Qur\'an.',
        btnText: 'Lihat Program PG',
        align: 'left',
        imgSrc: '/images/home/pg.png',
        triggerScroll: 0.12, // Card muncul saat scroll melewatinya
    },
    {
        id: 'tk',
        badge: 'Langkah 2',
        title: 'TK',
        age: 'Usia 4 - 6 Tahun',
        desc: 'Bermain sambil belajar, mengenal adab dan akhlak islami.',
        btnText: 'Lihat Program TK',
        align: 'right',
        imgSrc: '/images/home/tk.png',
        triggerScroll: 0.32,
    },
    {
        id: 'sd',
        badge: 'Langkah 3',
        title: 'SD',
        age: 'Usia 7 - 12 Tahun',
        desc: 'Menumbuhkan ilmu, rasa ingin tahu, dan akhlak mulia.',
        btnText: 'Lihat Program SD',
        align: 'left',
        imgSrc: '/images/home/sd.JPG',
        triggerScroll: 0.52,
    },
    {
        id: 'smp',
        badge: 'Langkah 4',
        title: 'SMP',
        age: 'Usia 13 - 15 Tahun',
        desc: 'Menguatkan karakter, logika, dan kepemimpinan diri.',
        btnText: 'Lihat Program SMP',
        align: 'right',
        imgSrc: '/images/home/smp.JPG',
        triggerScroll: 0.72,
    },
    {
        id: 'sma',
        badge: 'Langkah 5',
        title: 'SMA',
        age: 'Usia 16 - 18 Tahun',
        desc: 'Menjadi generasi pembawa manfaat dan pemimpin masa depan.',
        btnText: 'Lihat Program SMA',
        align: 'left',
        imgSrc: '/images/home/sma.JPG',
        triggerScroll: 0.90,
    }
];

// Data konten keunggulan
const dataKeunggulan = [
    {
        id: 1,
        title: "Pendidikan Islam Berkualitas",
        desc: "Mengintegrasikan ilmu dunia dan nilai-nilai Islam dalam setiap kegiatan, membentuk pribadi berakhlak, berilmu, dan bertakwa.",
        position: "left", // Frame foto di kiri, Teks di kanan, Gedung di kanan
        sunPos: { x: "88%", y: "70%" }, // Posisi relatif matahari pada lintasan
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Akademik Berkualitas",
        desc: "Proses pembelajaran aktif dan bermakna yang menumbuhkan kemampuan berpikir, kreativitas, dan kemandirian.",
        position: "right", // Frame foto di kanan, Teks di kiri, Gedung di kiri
        sunPos: { x: "62%", y: "22%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Prestasi Nyata, Membanggakan",
        desc: "Mendorong siswa untuk berprestasi di berbagai bidang, baik akademik, tahfiz, olahraga, seni, maupun kepemimpinan.",
        position: "left", // Frame foto di kiri, Teks di kanan, Gedung di kanan
        sunPos: { x: "32%", y: "10%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        )
    },
    {
        id: 4,
        title: "Guru & Pendamping yang Berdedikasi",
        desc: "Dibimbing oleh guru dan pendamping yang amanah, berpengalaman, dan tulus mendampingi tumbuh kembang ananda setiap hari.",
        position: "right", // Frame foto di kanan, Teks di kiri, Gedung di kiri
        sunPos: { x: "12%", y: "45%" },
        icon: (
            <svg className="w-6 h-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    }
];

// PRESTASI
const achievements = [
    { id: 1, title: 'Juara 1 Olimpiade Matematika', level: 'Tingkat Kota', unit: 'SD Attaufiq · 2026', angle: -90, distance: 220 },
    { id: 2, title: 'Juara Tahfiz 5 Juz', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: -45, distance: 260 },
    { id: 3, title: 'Juara 2 Lomba Cerdas Cermat', level: 'Tingkat Kota', unit: 'SMP Attaufiq · 2026', angle: 0, distance: 280 },
    { id: 4, title: 'Juara 1 Futsal Putra', level: 'Tingkat Kota', unit: 'SMA Attaufiq · 2026', angle: 45, distance: 260 },
    { id: 5, title: 'Juara 1 Olimpiade IPA', level: 'Tingkat Kota', unit: 'SD Attaufiq · 2026', angle: 90, distance: 220 },
    { id: 6, title: 'Juara 1 Lomba MTQ', level: 'Tingkat Kota', unit: 'SMA Attaufiq · 2026', angle: 135, distance: 260 },
    { id: 7, title: 'Juara 1 Karya Ilmiah Remaja', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: 180, distance: 280 },
    { id: 8, title: 'Juara Harapan 1 Lomba Kaligrafi', level: 'Tingkat Provinsi', unit: 'SMP Attaufiq · 2026', angle: -135, distance: 260 },
];

// EVENT & PROGRAM
// Data Event Terbaru
const events = [
    {
        id: 1,
        title: '[ISI: Nama Event 1, mis. Tasmi Day]',
        desc: '[ISI: ringkasan singkat event 1]',
        link: '#',
    },
    {
        id: 2,
        title: '[ISI: Nama Event 2, mis. Business Day]',
        desc: '[ISI: ringkasan singkat event 2]',
        link: '#',
    },
];

// Data Program Unggulan
const programs = [
    {
        id: 1,
        title: "[ISI: Nama Program 1, mis. Tahfizh Al-Qur'an]",
        desc: '[ISI: ringkasan singkat program 1]',
        link: '#',
    },
    {
        id: 2,
        title: '[ISI: Nama Program 2, mis. Interest & Talent Culture]',
        desc: '[ISI: ringkasan singkat program 2]',
        link: '#',
    },
];

//   DATA BLOG
// Data Artikel Blog (Bisa disesuaikan / dipasang props `posts`)
const articles = [
    {
        id: 1,
        title: '[ISI: Judul artikel contoh]',
        summary: '[ISI: ringkasan singkat artikel]',
        date: '10 Ags 2026',
        link: '#',
    },
    {
        id: 2,
        title: '[ISI: Judul artikel contoh 2]',
        summary: '[ISI: ringkasan singkat artikel 2]',
        date: '05 Ags 2026',
        link: '#',
    },
    {
        id: 3,
        title: '[ISI: Judul artikel contoh 3]',
        summary: '[ISI: ringkasan singkat artikel 3]',
        date: '01 Ags 2026',
        link: '#',
    },
];


// Hook Animasi Scroll Reveal
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

// ==========================================
// 4. SUB-KOMPONEN CARD UNTUK ANIMASI DILALUI ORANG
// ==========================================
const StepCard = ({ step, smoothProgress }) => {
    const opacity = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [0, 1]
    );

    const y = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [40, 0]
    );

    const scale = useTransform(
        smoothProgress,
        [step.triggerScroll - 0.08, step.triggerScroll],
        [0.9, 1]
    );

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className={`flex items-center gap-6 pointer-events-auto my-4 ${step.align === 'right' ? 'flex-row-reverse text-left' : 'flex-row text-left'
                }`}
        >
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-xs sm:max-w-sm border border-amber-100/60">
                <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-wider text-amber-800 bg-amber-100 rounded-full mb-2">
                    {step.badge}
                </span>
                <h3 className="text-2xl font-bold text-[#0F1E56]">{step.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-2">{step.age}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{step.desc}</p>

                <button className="text-xs font-semibold text-[#0F1E56] bg-amber-400 hover:bg-amber-500 px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2">
                    {step.btnText} &rarr;
                </button>
            </div>

            <div className="w-24 h-36 sm:w-28 sm:h-40 rounded-t-full overflow-hidden shadow-xl border-4 border-white flex-shrink-0 bg-amber-100">
                <img src={step.imgSrc} alt={step.title} className="w-full h-full object-cover" />
            </div>
        </motion.div>
    );
};

// Helper component untuk Ornamen Cahaya
const FloatingSparkle = ({ className, delay = 0 }) => (
    <div className={`absolute w-2 h-2 bg-amber-200 rounded-full animate-pulse pointer-events-none ${className}`} style={{ animationDelay: `${delay}ms` }}></div>
);



// KUNCINYA DI SINI: Samakan nama props dengan yang dikirim Controller (posts & galleries)
export default function Home({ auth, posts = [], galleries = [] }) {
    const [sectionRef, isInView] = useInView();

    // Data 4 Card Aktivitas
    const activities = [
        {
            icon: <BookOpenText className="w-6 h-6 text-[#1A2D6C]" />, // Sesuaikan warna ikon di sini
            title: 'Tahfizh Day',
            desc: 'Event puncak dari perjalanan ananda mencintai Al-Qur\'an — lewat teatrikal, visualisasi, dan tilawah.',
            image: 'images/home/tahfidzhDay.JPG' // Ganti dengan path gambar asli
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'Fun & Creative Learning',
            desc: 'Belajar tak harus duduk diam. Ananda diajak aktif, bereksplorasi, dan menemukan cara belajarnya sendiri.',
            image: 'images/jenjang/heroPg.png'
        },
        {
            icon: <Target className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'ITC',
            desc: 'Ruang bagi ananda menemukan dan mengembangkan potensinya, dari robotik hingga olahraga, setiap anak punya kesempatan.',
            image: 'images/home/itc.JPG'
        },
        {
            icon: <Handshake className="w-6 h-6 text-[#1A2D6C]" />,
            title: 'Ilal Liqo\'',
            desc: 'Bukan sekadar perpisahan, tapi momen ananda menunjukkan kesiapannya memberi arti bagi sesama.',
            image: 'images/home/ilalLiqo.JPG'
        },
    ];

    // Variabel konfigurasi animasi halus
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (customDelay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: customDelay,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.9,
                delay: 0.4,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 0.88, // opacity target gedung
            x: 0,
            transition: {
                duration: 1,
                delay: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    //   UNTUK ANIMASI JALAN
    const roadSectionRef = useRef(null);

    // Setup Animation Scroll untuk Section Jalan
    const { scrollYProgress } = useScroll({
        target: roadSectionRef,
        // Kita majukan awal animasinya.
        // "start 80%" artinya progress 0 dimulai saat start section masih 80% di bawah layar.
        // Saat start section akhirnya menyentuh top layar (start start), progress sudah jalan.
        offset: ["start 40%", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 20,
        restDelta: 0.001
    });

    const rawX = useTransform(
        smoothProgress,
        SCROLL_STOPS,
        ROAD_CURVES.map(val => `${val}%`),
        { clamp: true } // Pastikan ini ada agar tidak error di ujung
    );

    // TAMBAHKAN INI: Mengontrol muncul/hilang orang
    const opacityPeople = useTransform(
        smoothProgress,
        // RENTANG PROGRESS: [Awal Sekali (PG), Menjelang Akhir SMA, Akhir Sekali]
        // Kita hilangkan titik transisi 0.02 agar tidak ada fade-in di atas.
        [0, 0.94, 1.0],
        // RENTANG OPACITY: [Muncul Penuh, Muncul Penuh, Hilang Total]
        [1, 1, 0]
    );

    // Definisi warna aesthetic & kontras
    const primaryTextColor = "text-[#0F1E56]"; // Biru Tua
    // Warna bayangan teks untuk menciptakan kontras di atas area terang
    const textShadowStyle = { textShadow: '0 2px 4px rgba(255, 255, 255, 0.9), 0 0 1px rgba(255, 255, 255, 1)' };

    // Menggunakan state khusus untuk section jalanan
    const [isMobileJalanan, setIsMobileJalanan] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileJalanan(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // UNTUK KEUNGGULAN
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress: sectionScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Listener untuk menentukan item aktif secara pasti dari posisi scroll
    useEffect(() => {
        const unsubscribe = sectionScrollProgress.on("change", (latest) => {
            if (latest < 0.25) {
                setActiveIndex(0);
            } else if (latest >= 0.25 && latest < 0.50) {
                setActiveIndex(1);
            } else if (latest >= 0.50 && latest < 0.75) {
                setActiveIndex(2);
            } else {
                setActiveIndex(3);
            }
        });

        return () => unsubscribe();
    }, [sectionScrollProgress]);

    // Pergerakan Horizontal Matahari
    const sunX = useTransform(
        sectionScrollProgress,
        [0, 0.25, 0.50, 0.75, 1],
        ["85%", "65%", "46%", "27%", "13%"]
    );

    // Pergerakan Vertikal Matahari
    const sunY = useTransform(
        sectionScrollProgress,
        [0, 0.25, 0.50, 0.75, 1],
        ["58%", "21%", "11%", "23%", "69%"]
    );

    const currentItem = dataKeunggulan[activeIndex];

    // Menggunakan nama variabel unik agar tidak bentrok (Cannot redeclare block-scoped variable)
    const [isMobileKeunggulan, setIsMobileKeunggulan] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileKeunggulan(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // UNTUK PRESTASI
    const achievementRef = useRef(null);

    const { scrollYProgress: achievementScroll } = useScroll({
        target: achievementRef,
        offset: ["start start", "end end"]
    });

    // Timeline Animasi
    const lineScale = useTransform(achievementScroll, [0.1, 0.5], [0, 1]);
    const nodeOpacity = useTransform(achievementScroll, [0.3, 0.55], [0, 1]);
    const cardOpacity = useTransform(achievementScroll, [0.6, 0.85], [0, 1]);
    const cardScale = useTransform(achievementScroll, [0.6, 0.85], [0.8, 1]);

    // Hook untuk mendeteksi layar mobile/tablet secara real-time
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024); // Breakpoint 'lg' Tailwind (1024px)
        };

        handleResize(); // Check awal saat load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // UNTUK CTA SECTION
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] },
        },
    };

    //   UNTUK EVENT PROGRAM
    const sectionContainerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, staggerChildren: 0.15 },
        },
    };

    const cardItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    //   UNTUK BLOG
    // Motion Variants (Menggunakan nama unik agar tidak bentrok)
    const blogSectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.15 },
        },
    };

    const blogCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };


    return (
        <AppLayout title="Home">
            <Head title="SIT At-Taufiq Jambi - Mencetak Generasi Robbani" />

            {/* --- HERO SECTION --- */}
            <HeroSlider />

            {/* ========================================================= */}
            {/* Character ATQ SECTION - LEBIH LEBAR & LEGA */}
            {/* ========================================================= */}
            <CharacterActivitySection />

            {/* --- 3. Journey Section --- */}
            <JourneySection />

            {/* 4. CAHAYA MASA DEPAN SECTION */}
            <section className="relative w-full min-h-[450px] lg:min-h-[550px] flex items-center justify-center overflow-hidden font-sans">

                {/* 1. LAYER BASE: Background Daun-daun (bgCahaya.png) */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out"
                    style={{ backgroundImage: 'url(/images/home/bgCahaya.png)' }}
                >
                    {/* Overlay Tipis & Halus */}
                    <div className="absolute inset-0 bg-[#FAF6EE]/40"></div>
                </div>

                {/* ======================================================== */}
                {/* ORNAMEN VISUAL DENGAN ANIMASI ENTRANCE & CONTINUOUS ANIMATION */}
                {/* ======================================================== */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">

                    {/* --- ORNAMEN 1: Radial Sunburst / Sinar Cahaya di Latar (Entrance: Fade & Zoom) --- */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] rounded-full animate-[spin_60s_linear_infinite] motion-safe:animate-fade-in duration-1000"></div>

                    {/* --- ORNAMEN 2: Floating Badge Kiri Atas (Entrance: Slide down + Fade) --- */}
                    <div className="absolute top-8 left-4 md:left-10 flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-200 shadow-lg -rotate-3 transition-all duration-700 animate-[bounce_4s_infinite] motion-safe:animate-slide-down">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-[#0F1E56] tracking-wide">✨ Berkah & Cahaya</span>
                    </div>

                    {/* --- ORNAMEN 3: Garis Emas Lengkung & Ring Dekoratif (Entrance: Scale Up) --- */}
                    <div className="absolute top-4 -right-8 w-64 h-32 text-amber-400/50 motion-safe:animate-zoom-in duration-700">
                        <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,80 Q50,0 120,40 T200,20" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
                            <circle cx="120" cy="40" r="6" fill="#F59E0B" className="animate-pulse" />
                        </svg>
                    </div>

                    {/* --- ORNAMEN 4: Floating Card Kanan Atas (Entrance: Slide Left + Fade) --- */}
                    <div className="absolute top-1/4 right-3 md:right-10 bg-amber-50/90 backdrop-blur-md p-3.5 rounded-2xl border border-amber-300/60 shadow-xl rotate-6 hidden sm:flex items-center gap-3 transition-transform duration-500 hover:scale-105 motion-safe:animate-slide-left">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center text-amber-950 shadow-inner font-bold text-lg">
                            🌱
                        </div>
                        <div className="text-left pr-1">
                            <p className="text-[10px] uppercase tracking-wider text-amber-800 font-extrabold">Masa Depan</p>
                            <p className="text-xs font-bold text-[#0F1E56]">Tumbuh Bersama</p>
                        </div>
                    </div>

                    {/* --- ORNAMEN 5: Badge Islami / Al-Qur'an Kiri Tengah (NEW) --- */}
                    <div className="absolute top-1/2 left-3 md:left-8 -translate-y-1/2 bg-white/70 backdrop-blur-md p-2.5 rounded-2xl border border-emerald-200 shadow-md -rotate-6 hidden lg:flex items-center gap-2.5 motion-safe:animate-slide-right">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 text-sm">
                            📖
                        </div>
                        <span className="text-xs font-bold text-[#0F1E56] pr-2">Generasi Rabbani</span>
                    </div>

                    {/* --- ORNAMEN 6: Elemen Daun & Wave Lengkung (Entrance: Slide Up) --- */}
                    <div className="absolute bottom-10 left-4 md:left-12 flex items-center gap-3 -rotate-2 motion-safe:animate-slide-up">
                        <div className="w-11 h-11 bg-emerald-500/15 backdrop-blur-md rounded-2xl border border-emerald-500/30 flex items-center justify-center text-emerald-800 shadow-md animate-bounce">
                            🍃
                        </div>
                        <div className="hidden sm:block">
                            <svg className="w-28 h-8 text-emerald-600/40" viewBox="0 0 100 30" fill="none">
                                <path d="M0,15 C30,5 70,25 100,15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    {/* --- ORNAMEN 7: Sparkles & Stars Kanan Bawah (Continuous Float) --- */}
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-amber-300/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-16 right-8 md:right-20 text-amber-500 text-3xl animate-[bounce_3s_infinite] motion-safe:animate-zoom-in">
                        ✦
                    </div>
                    <div className="absolute bottom-32 right-16 text-amber-400 text-lg animate-pulse">
                        ✦
                    </div>

                    {/* --- ORNAMEN 8: Floating Glow Particles --- */}
                    <div className="absolute top-1/3 left-1/4 w-3.5 h-3.5 bg-amber-400 rounded-full blur-[0.5px] shadow-[0_0_10px_#F59E0B] animate-ping"></div>
                    <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 bg-amber-300 rounded-full blur-[0.5px] shadow-[0_0_8px_#FCD34D] animate-pulse"></div>
                </div>
                {/* ======================================================== */}

                {/* 3. LAYER TENGAH: Konten Utama (Orang, Teks, Tombol) */}
                <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col items-center text-center">

                    {/* Container untuk perataan konten tengah */}
                    <div className="relative flex flex-col items-center max-w-4xl">

                        {/* Area Blending Gambar Tengah & Meredam Kecerahan di Bawah Teks */}
                        <div className="absolute -top-32 md:-top-40 inset-x-0 h-[400px] md:h-[500px] z-0 pointer-events-none transition-all duration-1000 ease-out">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,246,238,0)_0%,rgba(250,246,238,0.7)_50%,rgba(250,246,238,0)_100%)]"></div>

                            {/* Gambar Utama dengan Animasi Entrance Fade & Zoom In */}
                            <img
                                src="/images/home/cahaya.png"
                                alt="Cahaya Masa Depan"
                                className="w-full h-full object-contain opacity-95 filter drop-shadow-[0_12px_15px_rgba(251,191,36,0.35)] animate-[zoom-in_1s_ease-out]"
                            />
                        </div>

                        {/* Teks Kuote dengan Animasi Entrance Slide Up */}
                        <h2
                            className={`relative z-10 mt-28 md:mt-36 text-xl md:text-2xl lg:text-3xl font-medium ${primaryTextColor} leading-relaxed md:leading-snug tracking-wide transition-all duration-700 animate-[slide-up_0.8s_ease-out]`}
                            style={textShadowStyle}
                        >
                            Setiap langkah hari ini adalah cahaya masa <br className="hidden md:inline" />
                            depan yang sedang Allah siapkan.
                        </h2>

                        {/* Tombol CTA dengan Animasi Entrance Fade & Pop Up */}
                        <button className="relative z-10 mt-12 md:mt-14 flex items-center gap-2.5 px-9 py-4 bg-amber-400 hover:bg-amber-500 text-[#0F1E56] font-semibold text-sm md:text-base rounded-full shadow-[0_8px_16px_rgba(15,30,86,0.15)] hover:shadow-[0_12px_20px_rgba(15,30,86,0.25)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 animate-[zoom-in_1s_ease-out]">
                            Mari tumbuh bersama Attaufiq

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={`w-4 h-4 md:w-5 md:h-5 ${primaryTextColor} group-hover:animate-bounce-short`}
                            >
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                </div>

            </section>


            {/* 5. KEUNGGULAN ATQ SECTION */}
            <section
                ref={containerRef}
                className="relative h-[450vh] bg-[#FFFBEF] flex flex-col items-center pt-8 md:pt-20"
            >
                {/* Glow Ornamen Belakang */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-amber-200/30 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

                {/* HEADER SECTION */}
                <div className="relative z-30 text-center max-w-5xl px-4 md:px-6 mb-4 md:mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-sm mb-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <p className="text-amber-700 font-bold tracking-wider text-[10px] md:text-sm uppercase">
                            KEUNGGULAN ATTAUFIQ
                        </p>
                    </motion.div>

                    <h2 className="text-lg md:text-4xl font-extrabold text-indigo-950 leading-snug md:leading-tight">
                        Fondasi kuat yang menjadi alasan orang tua percaya, dan anak–anak tumbuh luar biasa.
                    </h2>
                </div>

                {/* Container Sticky untuk Scroll Animation */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-6 md:pt-14">

                    {/* Ornamen Awan & Bintang */}
                    <motion.div
                        animate={{ x: [0, 25, 0] }}
                        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                        className="absolute top-8 md:top-12 left-[4%] md:left-[8%] opacity-40 pointer-events-none z-10"
                    >
                        <svg className="w-16 h-8 md:w-24 md:h-12 text-amber-200/70 fill-current" viewBox="0 0 24 24">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        animate={{ x: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                        className="absolute top-16 md:top-20 right-[4%] md:right-[10%] opacity-30 pointer-events-none z-10"
                    >
                        <svg className="w-20 h-10 md:w-28 md:h-14 text-amber-300/60 fill-current" viewBox="0 0 24 24">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </motion.div>

                    <div className="absolute top-24 md:top-32 left-[12%] md:left-[20%] text-amber-400 opacity-60 animate-pulse pointer-events-none text-xs md:text-base">✦</div>
                    <div className="absolute top-12 md:top-16 right-[14%] md:right-[22%] text-amber-300 opacity-70 animate-bounce pointer-events-none text-xs md:text-base">✦</div>

                    {/* Gambar Garis Lintasan Matahari */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 scale-x-105 md:scale-x-110">
                        <img
                            src="images/home/garisMatahari.png"
                            alt="Garis Lintasan Matahari"
                            className="w-full h-full object-contain opacity-90 filter drop-shadow-[0_2px_8px_rgba(251,191,36,0.3)]"
                        />
                    </div>

                    {/* Gedung Latar Belakang */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`gedung-${currentItem.id}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`absolute bottom-0 h-[50vh] md:h-[85vh] w-3/4 md:w-5/12 pointer-events-none z-0 ${currentItem.position === "left"
                                    ? "right-0"
                                    : "left-0 transform -scale-x-100"
                                }`}
                        >
                            <img
                                src="images/home/gedung-right.png"
                                alt="Gedung Latar"
                                className="w-full h-full object-cover object-bottom opacity-20 md:opacity-25"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* MATAHARI BERJALAN (Hanya Aktif di Laptop via hidden md:block) */}
                    <motion.div
                        style={{ left: sunX, top: sunY }}
                        className="hidden md:block absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-28 h-28 bg-yellow-400/40 rounded-full blur-xl animate-pulse" />
                            <img
                                src="images/home/matahari.png"
                                alt="Matahari"
                                className="w-28 h-28 object-contain drop-shadow-[0_0_32px_rgba(253,224,71,0.95)] relative z-10"
                            />
                        </div>
                    </motion.div>

                    {/* KONTEN UTAMA (KARTU FOTO & TEKS) */}
                    {/* Penyesuaian Mobile: pt-44 untuk menurunkan konten di bawah lengkungan garis */}
                    <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 h-full flex flex-col items-center justify-start md:justify-center pt-44 md:pt-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentItem.id}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -25 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className={`relative md:absolute md:inset-x-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-10 ${currentItem.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                                    }`}
                            >
                                {/* FOTO */}
                                <div className="w-full md:w-1/2 flex justify-center relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-amber-300/30 to-sky-300/30 rounded-t-full blur-lg transform scale-105 pointer-events-none" />

                                    <div className="relative w-[160px] md:w-[260px] h-36 md:h-[280px] rounded-t-full rounded-b-2xl overflow-hidden border-4 border-amber-300/90 shadow-xl bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 flex items-center justify-center text-center p-3 md:p-4">
                                        <span className="text-white/90 font-medium text-[11px] md:text-sm drop-shadow-md relative z-10">
                                            Foto — {currentItem.title}
                                        </span>
                                        <div className="absolute inset-0 bg-sky-900/10 pointer-events-none" />
                                    </div>
                                </div>

                                {/* TEKS DESKRIPSI */}
                                <div
                                    className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${currentItem.position === 'right' ? 'md:pt-32 md:ml-10' : 'pt-0'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                                        <span className="text-lg md:text-2xl font-black text-amber-500/80 tracking-tight">
                                            0{currentItem.id}
                                        </span>
                                        <div className="h-[2px] w-6 md:w-8 bg-amber-400/60 rounded-full" />
                                    </div>

                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200/80 flex items-center justify-center mb-1.5 md:mb-3 shadow-md border border-amber-300/60">
                                        {currentItem.icon}
                                    </div>

                                    <h3 className="text-base md:text-3xl font-bold text-indigo-950 mb-1 md:mb-2 leading-tight">
                                        {currentItem.title}
                                    </h3>

                                    <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed max-w-xs md:max-w-md">
                                        {currentItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* INDICATOR DOTS */}
                        <div className="absolute bottom-6 md:bottom-12 flex items-center gap-2 z-30 bg-amber-100/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
                            {dataKeunggulan.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className={`transition-all duration-300 rounded-full ${activeIndex === idx
                                            ? "w-5 md:w-6 h-1.5 md:h-2 bg-amber-500"
                                            : "w-1.5 md:w-2 h-1.5 md:h-2 bg-amber-300/80"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>



            {/* 6. PRESTASI SISWA ATQ SECTION */}
            <section
                id="achievements"
                ref={achievementRef}
                className={`relative ${isMobile ? 'min-h-screen py-24' : 'h-[300vh]'
                    } bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] w-full`}
            >
                {/* HEADER SECTION (JUDUL & DESKRIPSI) */}
                <div className="relative lg:absolute top-0 lg:top-12 left-1/2 -translate-x-1/2 z-30 text-center max-w-3xl px-6 pointer-events-none w-full mb-8 lg:mb-0">
                    <span className="text-xs font-bold tracking-widest text-amber-500 uppercase mb-2 block">
                        PRESTASI SISWA
                    </span>
                    <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                        Mendukung setiap siswa untuk berkembang, berprestasi, dan tumbuh menjadi generasi yang cerdas, mandiri, serta berlandaskan nilai–nilai Islami.
                    </h2>
                </div>

                {/* Container Sticky (Desktop) / Normal Container (Mobile) */}
                <div className={`${isMobile ? 'relative py-6' : 'sticky top-0 h-screen'} w-full flex items-center justify-center overflow-hidden`}>

                    {/* 1. ORNAMEN BACKGROUND */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-amber-200/30 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
                        <div className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-orange-300/20 rounded-full blur-[60px] md:blur-[80px]" />
                    </div>

                    {/* 2. ORNAMEN BINTANG KECIL MELAYANG */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                        {[
                            { top: '15%', left: '10%', size: 'w-2 h-2', delay: '0s' },
                            { top: '25%', right: '12%', size: 'w-3 h-3', delay: '1s' },
                            { bottom: '20%', left: '15%', size: 'w-2.5 h-2.5', delay: '2s' },
                            { bottom: '15%', right: '15%', size: 'w-2 h-2', delay: '0.5s' },
                        ].map((sparkle, idx) => (
                            <div
                                key={idx}
                                className={`absolute ${sparkle.size} bg-amber-400 rounded-full blur-[1px] opacity-60 animate-ping`}
                                style={{
                                    top: sparkle.top,
                                    left: sparkle.left,
                                    right: sparkle.right,
                                    bottom: sparkle.bottom,
                                    animationDelay: sparkle.delay,
                                    animationDuration: '3s',
                                }}
                            />
                        ))}
                    </div>

                    {/* ================= MODE MOBILE: LAYOUT TIMELINE VERTIKAL ================= */}
                    {isMobile ? (
                        <div className="flex flex-col items-center w-full px-4 relative z-20 space-y-8">
                            {/* Matahari di Atas Timeline Mobile */}
                            <div className="relative z-10 flex items-center justify-center my-4">
                                <div className="absolute w-28 h-28 rounded-full border border-amber-300/40 animate-[spin_12s_linear_infinite]" />
                                <div className="absolute w-36 h-36 rounded-full border border-dashed border-amber-400/25 animate-[spin_20s_linear_infinite_reverse]" />
                                <div className="absolute w-20 h-20 bg-amber-400/30 rounded-full blur-xl animate-pulse" />

                                <img
                                    src="/images/home/matahari.png"
                                    alt="Matahari Attaufiq"
                                    className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] pointer-events-none"
                                />
                            </div>

                            {/* Grid List Kartu di Mobile */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                                {achievements.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-100/80 hover:border-amber-300 transition-all duration-300"
                                    >
                                        <a href={item.link || `/prestasi/${item.id}`} className="block cursor-pointer">
                                            <div className="w-full h-28 mb-2.5 rounded-xl bg-gradient-to-tr from-sky-400 via-teal-300 to-amber-200 flex items-center justify-center text-xs text-white font-semibold shadow-inner relative overflow-hidden">
                                                <span className="drop-shadow-md z-10">Foto — {item.unit.split(' · ')[0]}</span>
                                            </div>
                                            <div className="px-1">
                                                <div className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 rounded-full border border-amber-200/60">
                                                    {item.level}
                                                </div>
                                                <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                                                    <span className="text-slate-400 font-medium">SIT At-Taufiq</span>
                                                    <span className="text-amber-600 font-bold">{item.unit.split(' · ')[0]}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ================= MODE DESKTOP: LAYOUT ORBITAL KOORDINAT ================= */
                        <>
                            {/* 3. SVG CONNECTOR & DOTS */}
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                                viewBox="-500 -500 1000 1000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <defs>
                                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <g>
                                    {achievements.map((item) => {
                                        const rad = (item.angle * Math.PI) / 180;
                                        const lineDistance = item.distance * 1.1;
                                        const endX = Math.cos(rad) * lineDistance;
                                        const endY = Math.sin(rad) * lineDistance;
                                        const midX = endX * 0.5;
                                        const midY = endY * 0.5;

                                        return (
                                            <g key={item.id}>
                                                <motion.line
                                                    x1="0"
                                                    y1="0"
                                                    x2={endX}
                                                    y2={endY}
                                                    stroke="#FCD34D"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    style={{ pathLength: lineScale }}
                                                />
                                                <motion.circle
                                                    cx={midX}
                                                    cy={midY}
                                                    r="5"
                                                    fill="#FBBF24"
                                                    style={{ opacity: nodeOpacity }}
                                                />
                                                <motion.circle
                                                    cx={endX}
                                                    cy={endY}
                                                    r="6.5"
                                                    fill="#F59E0B"
                                                    filter="url(#glow)"
                                                    style={{ opacity: nodeOpacity }}
                                                />
                                            </g>
                                        );
                                    })}
                                </g>
                            </svg>

                            {/* 4. MATAHARI UTAMA */}
                            <div className="relative z-10 flex items-center justify-center">
                                <div className="absolute w-36 h-36 rounded-full border border-amber-300/40 animate-[spin_12s_linear_infinite]" />
                                <div className="absolute w-44 h-44 rounded-full border border-dashed border-amber-400/25 animate-[spin_20s_linear_infinite_reverse]" />
                                <div className="absolute w-28 h-28 bg-amber-400/30 rounded-full blur-xl animate-pulse" />

                                <img
                                    src="/images/home/matahari.png"
                                    alt="Matahari Attaufiq"
                                    className="w-24 h-24 min-w-[96px] min-h-[96px] object-contain relative z-10 drop-shadow-[0_0_30px_rgba(251,191,36,0.9)] pointer-events-none transition-transform duration-500 hover:scale-110"
                                />
                            </div>

                            {/* 5. LAYER CARD PRESTASI */}
                            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-20">
                                {achievements.map((item) => {
                                    const rad = (item.angle * Math.PI) / 180;
                                    const isVertical = item.angle === -90 || item.angle === 90;
                                    const isHorizontal = item.angle === 0 || item.angle === 180;

                                    let radiusX = 390;
                                    let radiusY = 230;
                                    if (isVertical) radiusY = 240;
                                    if (isHorizontal) radiusX = 430;

                                    const x = Math.cos(rad) * radiusX;
                                    const y = Math.sin(rad) * radiusY;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            className="absolute w-52 p-3 rounded-2xl bg-white/90 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(217,119,6,0.1)] border border-amber-100/80 hover:border-amber-300 pointer-events-auto transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.25)] hover:-translate-y-1"
                                            style={{
                                                x,
                                                y,
                                                opacity: cardOpacity,
                                                scale: cardScale,
                                            }}
                                        >
                                            <a
                                                href={item.link || `/prestasi/${item.id}`}
                                                className="group block cursor-pointer relative overflow-hidden rounded-xl"
                                            >
                                                <div className="w-full h-24 mb-2.5 rounded-xl bg-gradient-to-tr from-sky-400 via-teal-300 to-amber-200 flex items-center justify-center text-xs text-white font-semibold shadow-inner relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
                                                    <span className="drop-shadow-md z-10">Foto — {item.unit.split(' · ')[0]}</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                </div>

                                                <div className="px-0.5">
                                                    <div className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-wider uppercase bg-amber-50 text-amber-700 rounded-full border border-amber-200/60">
                                                        {item.level}
                                                    </div>

                                                    <h4 className="text-xs font-bold text-slate-800 leading-snug transition-colors duration-200 group-hover:text-amber-600 line-clamp-2">
                                                        {item.title}
                                                    </h4>

                                                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 text-[10px]">
                                                        <span className="text-slate-400 font-medium">SIT At-Taufiq</span>
                                                        <span className="text-amber-600 font-bold">{item.unit.split(' · ')[0]}</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </section>


            {/* 7. CTA ATQ SECTION */}
            <section className="relative w-full min-h-screen bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">

                {/* ================= ORNAMEN BACKGROUND ================= */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {/* Glow Soft Ambient */}
                    <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[140px]" />
                    <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[120px]" />

                    {/* Ornamen Bintang Melayang (Floating Sparkles) */}
                    <div className="absolute top-16 left-1/4 w-3 h-3 bg-amber-400 rounded-full blur-[1px] opacity-70 animate-pulse" />
                    <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-ping" />
                    <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 bg-amber-300 rounded-full blur-[1px] opacity-80 animate-bounce" />
                </div>

                {/* ================= KONTEN UTAMA ================= */}
                <motion.div
                    className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center justify-items-center relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >

                    {/* KONTEN KIRI (TEKS & TOMBOL) - Urutan ke-2 di Mobile, ke-1 di Desktop */}
                    <motion.div className="flex flex-col items-start justify-center space-y-6 max-w-xl w-full order-2 lg:order-1" variants={itemVariants}>

                        {/* Sub-heading Glassmorphism */}
                        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md text-amber-600 font-bold text-xs tracking-wider uppercase shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                            <span>PERJALANAN HEBAT DIMULAI DI SINI</span>
                        </div>

                        {/* Heading Utama */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12]">
                            Saatnya Memulai Perjalanan{' '}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
                                Ananda
                            </span>
                        </h1>

                        {/* Deskripsi */}
                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                            Bersama Attaufiq, tumbuh dalam ilmu, akhlak, dan prestasi untuk masa depan yang gemilang.
                        </p>

                        {/* Group Tombol Aksi */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full pt-3">
                            {/* Tombol Utama */}
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                href="#daftar"
                                className="inline-flex items-center justify-center px-7 py-4 bg-[#1B2B65] hover:bg-[#142150] text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-950/20 transition-colors duration-300"
                            >
                                <UserPlus className="w-4 h-4 mr-2.5 text-amber-300" />
                                <span>Daftarkan Ananda — Mulai Perjalanan Hebatnya</span>
                            </motion.a>

                            {/* Tombol Sekunder */}
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                href="#kunjungan"
                                className="inline-flex items-center justify-center px-7 py-4 bg-white/80 hover:bg-white text-slate-800 text-sm font-semibold rounded-full border border-slate-200/80 shadow-sm backdrop-blur-sm transition-all duration-300"
                            >
                                <Calendar className="w-4 h-4 mr-2.5 text-amber-600" />
                                <span>Jadwalkan Kunjungan</span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* KONTEN KANAN (VISUAL KARTU & ORNAMEN) - Urutan ke-1 di Mobile (di atas), ke-2 di Desktop (di kanan) */}
                    <motion.div className="relative flex items-center justify-center w-full order-1 lg:order-2" variants={itemVariants}>

                        {/* Layer Glow Belakang Kartu */}
                        <div className="absolute w-[280px] h-[360px] md:w-[360px] md:h-[460px] bg-amber-400/20 rounded-[50px] blur-2xl" />

                        {/* Ornamen 1: Ring Statis */}
                        <div className="absolute w-[310px] h-[390px] md:w-[390px] md:h-[490px] border border-amber-300/60 rounded-[44px] -rotate-6 pointer-events-none shadow-sm" />

                        {/* Ornamen 2: Ring Berputar Hapus Putus (Dashed Rotating Border) */}
                        <div className="absolute w-[330px] h-[410px] md:w-[410px] md:h-[510px] border border-dashed border-amber-400/50 rounded-[48px] animate-[spin_25s_linear_infinite] pointer-events-none" />

                        {/* Kartu Utama Gradien */}
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 w-[300px] h-[380px] md:w-[380px] md:h-[480px] rounded-[36px] bg-gradient-to-tr from-[#3B5998] via-[#6FA8DC] to-[#FCEEAA] shadow-2xl shadow-amber-900/10 border border-white/40 overflow-hidden flex flex-col justify-between p-6 text-center text-white/90"
                        >
                            {/* Tag Badge Atas Kartu */}
                            <div className="self-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-medium tracking-wide drop-shadow-sm">
                                Foto keluarga — berjalan menuju matahari
                            </div>

                            {/* Ilustrasi Ornamen Sunburst Kecil di Dalam Kartu */}
                            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-300/30 rounded-full blur-xl pointer-events-none" />
                        </motion.div>

                    </motion.div>

                </motion.div>
            </section>


            {/* 8. EVENT & PROGRAM SECTION */}
            <section className="relative w-full bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] py-24 px-6 md:px-12 overflow-hidden">

                {/* Background Ornamen Soft Ambient */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-200/25 rounded-full blur-[140px]" />
                    <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-sky-200/20 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14"
                        variants={sectionContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* ================= KOLOM KIRI: EVENT TERBARU ================= */}
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-end justify-between border-b border-amber-200/60 pb-4">
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5 mb-1">
                                        <Calendar className="w-3.5 h-3.5" /> Agenda Sekolah
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B2B65]">
                                        Event Terbaru
                                    </h3>
                                </div>
                                <a
                                    href="#all-events"
                                    className="group inline-flex items-center text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
                                >
                                    Lihat semua
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>

                            <div className="flex flex-col space-y-4">
                                {events.map((event) => (
                                    <motion.a
                                        key={event.id}
                                        href={event.link}
                                        variants={cardItemVariants}
                                        whileHover={{ y: -4 }}
                                        className="group relative flex items-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-100/80 shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_30px_-5px_rgba(245,158,11,0.15)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Thumbnail Image dengan Efek Hover Zoom */}
                                        <div className="relative w-24 h-24 md:w-28 md:h-24 rounded-xl bg-gradient-to-tr from-[#6FA8DC] via-[#9DC6E8] to-[#FCEEAA] flex-shrink-0 overflow-hidden shadow-inner">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10" />
                                            <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out" />
                                        </div>

                                        {/* Teks Konten */}
                                        <div className="ml-4 md:ml-5 flex-1 pr-6">
                                            <span className="inline-block text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/50 mb-1.5">
                                                {event.date}
                                            </span>
                                            <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
                                                {event.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                                {event.desc}
                                            </p>
                                        </div>

                                        {/* Icon Action Arrow */}
                                        <div className="absolute top-4 right-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* ================= KOLOM KANAN: PROGRAM UNGGULAN ================= */}
                        <div className="flex flex-col space-y-6">
                            <div className="flex items-end justify-between border-b border-amber-200/60 pb-4">
                                <div>
                                    <span className="text-xs font-bold tracking-widest text-amber-500 uppercase flex items-center gap-1.5 mb-1">
                                        <Sparkles className="w-3.5 h-3.5" /> Pembentukan Karakter
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#1B2B65]">
                                        Program Unggulan
                                    </h3>
                                </div>
                                <a
                                    href="#all-programs"
                                    className="group inline-flex items-center text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
                                >
                                    Lihat semua
                                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                            </div>

                            <div className="flex flex-col space-y-4">
                                {programs.map((program) => (
                                    <motion.a
                                        key={program.id}
                                        href={program.link}
                                        variants={cardItemVariants}
                                        whileHover={{ y: -4 }}
                                        className="group relative flex items-center p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-100/80 shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06)] hover:shadow-[0_12px_30px_-5px_rgba(245,158,11,0.15)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Thumbnail Image dengan Efek Hover Zoom */}
                                        <div className="relative w-24 h-24 md:w-28 md:h-24 rounded-xl bg-gradient-to-tr from-[#3B5998] via-[#6FA8DC] to-[#FCEEAA] flex-shrink-0 overflow-hidden shadow-inner">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10" />
                                            <div className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out" />
                                        </div>

                                        {/* Teks Konten */}
                                        <div className="ml-4 md:ml-5 flex-1 pr-6">
                                            <span className="inline-block text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/50 mb-1.5">
                                                {program.tag}
                                            </span>
                                            <h4 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors duration-200 line-clamp-1">
                                                {program.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                                {program.desc}
                                            </p>
                                        </div>

                                        {/* Icon Action Arrow */}
                                        <div className="absolute top-4 right-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ================= TOMBOL CTA UTAMA ================= */}
                    <motion.div
                        className="mt-14 flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            href="#lihat-semua-program"
                            className="group inline-flex items-center justify-center px-8 py-4 bg-[#1B2B65] hover:bg-[#142150] text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-950/15 transition-all duration-300"
                        >
                            <span>Lihat Semua Program</span>
                            <ArrowRight className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* 9. BLOG SECTION */}
            <section className="relative w-full bg-gradient-to-b from-[#FFFDF7] via-[#FFFBEB] to-[#FFF9E6] py-24 px-6 md:px-12 overflow-hidden">

                {/* ================= BACKGROUND ORNAMEN (BALANCED) ================= */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Glow Halus Ambient */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-200/20 rounded-full blur-[140px]" />

                    {/* Floating Sparkles Pasif (Aesthetic & Tidak Ramai) */}
                    <Sparkles className="absolute top-12 left-10 w-4 h-4 text-amber-300 opacity-60 animate-pulse" />
                    <Sparkles className="absolute bottom-16 right-16 w-5 h-5 text-sky-300 opacity-50 animate-pulse" />
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        className="flex flex-col space-y-10"
                        variants={blogSectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* ================= HEADER SECTION ================= */}
                        <div className="flex items-end justify-between border-b border-amber-200/60 pb-5">
                            <div>
                                <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 font-bold text-xs tracking-wider uppercase mb-2">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    <span>INFORMASI & EDUKASI</span>
                                </span>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-[#1B2B65]">
                                    Blog Attaufiq
                                </h3>
                            </div>

                            <a
                                href="#semua-artikel"
                                className="group inline-flex items-center text-xs md:text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors"
                            >
                                Lihat semua artikel
                                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* ================= GRID ARTIKEL BLOG ================= */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article) => (
                                <motion.a
                                    key={article.id}
                                    href={article.link}
                                    variants={blogCardVariants}
                                    whileHover={{ y: -6 }}
                                    className="group relative flex flex-col rounded-[28px] bg-white/80 backdrop-blur-md border border-amber-100/90 shadow-[0_4px_25px_-4px_rgba(217,119,6,0.06)] hover:shadow-[0_16px_35px_-6px_rgba(245,158,11,0.18)] hover:border-amber-300 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Thumbnail Gambar Banner Gradien */}
                                    <div className="relative w-full h-48 md:h-52 bg-gradient-to-tr from-[#3B5998] via-[#6FA8DC] to-[#FCEEAA] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />

                                        {/* Category Badge di Atas Gambar */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-slate-800 text-[11px] font-bold shadow-sm">
                                                {article.category}
                                            </span>
                                        </div>

                                        <div className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out" />
                                    </div>

                                    {/* Konten Teks & Deskripsi */}
                                    <div className="p-6 flex flex-col justify-between flex-1 relative">
                                        <div>
                                            <span className="block text-[11px] font-medium text-amber-600 mb-2">
                                                {article.date}
                                            </span>
                                            <h4 className="text-base md:text-lg font-bold text-[#1B2B65] group-hover:text-amber-600 transition-colors duration-200 leading-snug line-clamp-2">
                                                {article.title}
                                            </h4>
                                            <p className="text-xs md:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                                                {article.summary}
                                            </p>
                                        </div>

                                        {/* Icon Panah & Border Pembatas Lembut */}
                                        <div className="mt-5 pt-4 flex items-center justify-between border-t border-slate-100/80">
                                            <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
                                                Baca Selengkapnya
                                            </span>
                                            <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>







        </AppLayout>
    );
}
