import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';
import HeroSlider from '@/Layouts/HeroSlider';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import JourneySection from "@/Components/home/journey/JourneySection";
import KeunggulanSection from '@/Components/home/keunggulan/KeunggulanSection';
import AchievementsSection from "@/Components/home/achievements/AchievementsSection";
import ClosingCtaSection from '@/Components/home/closing/ClosingCtaSection';
import TestimonialSection from '@/Components/home/testimonials/TestimonialSection';
import BlogPreview from '@/Components/home/BlogPreview';
import PhotoFrame from '@/Components/home/keunggulan/PhotoFrame';
import CharacterActivitySection from '@/Components/home/CharacterActivitySection';

import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Heart,
    Cloud,
    Smile,
    Compass,
    Star,
    BookOpenText,
    Lightbulb,
    Target,
    Handshake
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

    // MATAHARI BERJALAN
    // 1. REFS & STATE (Menggunakan prefix 'atqKeunggulan' agar bebas bentrok)
    const atqKeunggulanSectionRef = useRef(null);
    const atqKeunggulanWrapperRef = useRef(null);
    const [atqKeunggulanActiveIndex, setAtqKeunggulanActiveIndex] = useState(0);

    // 2. SCROLL PROGRESS
    const { scrollYProgress: atqKeunggulanSectionProgress } = useScroll({
        target: atqKeunggulanSectionRef,
        offset: ["start start", "end end"]
    });

    const { scrollYProgress: atqKeunggulanTotalProgress } = useScroll({
        target: atqKeunggulanWrapperRef,
        offset: ["start start", "end end"]
    });

    // Listener indeks card aktif
    useEffect(() => {
        const unsubscribeAtqKeunggulan = atqKeunggulanSectionProgress.on("change", (latestVal) => {
            if (latestVal < 0.25) {
                setAtqKeunggulanActiveIndex(0);
            } else if (latestVal >= 0.25 && latestVal < 0.50) {
                setAtqKeunggulanActiveIndex(1);
            } else if (latestVal >= 0.50 && latestVal < 0.75) {
                setAtqKeunggulanActiveIndex(2);
            } else {
                setAtqKeunggulanActiveIndex(3);
            }
        });

        return () => unsubscribeAtqKeunggulan();
    }, [atqKeunggulanSectionProgress]);

    // 3. LOGIKA LINTASAN MATAHARI (Horizontal & Vertikal)
    const horizontalSunTracker = useTransform(
        atqKeunggulanTotalProgress,
        [0, 0.18, 0.37, 0.56, 0.75, 0.90, 1.0],
        ["85%", "65%", "46%", "27%", "13%", "13%", "50%"]
    );

    const verticalSunTracker = useTransform(
        atqKeunggulanTotalProgress,
        [0, 0.18, 0.37, 0.56, 0.75, 0.90, 1.0],
        ["58%", "21%", "11%", "23%", "69%", "85vh", "85vh"]
    );

    // Item data aktif & penanganan responsif
    const currentHighlightedKeunggulanItem = dataKeunggulan[atqKeunggulanActiveIndex];

    const [currentScreenIsMobileKeunggulan, setCurrentScreenIsMobileKeunggulan] = useState(false);

    useEffect(() => {
        const keunggulanResizeHandler = () => {
            setCurrentScreenIsMobileKeunggulan(window.innerWidth < 768);
        };

        keunggulanResizeHandler();
        window.addEventListener('resize', keunggulanResizeHandler);
        return () => window.removeEventListener('resize', keunggulanResizeHandler);
    }, []);

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


            {/* 4. KEUNGGULAN ATQ SECTION */}
            <section
            ref={containerRef}
            className="relative h-[450vh] bg-[#FFFBEF] flex flex-col items-center pt-8 md:pt-20"
        >
            {/* Glow Ornamen Belakang */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[150px] md:h-[300px] bg-amber-200/30 blur-[60px] md:blur-[100px] rounded-full pointer-events-none" />

            {/* HEADER SECTION */}
            <div className="relative z-30 text-center max-w-5xl px-4 md:px-6 mb-2 md:mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/60 shadow-sm mb-3"
                >
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <p className="text-amber-700 font-bold tracking-wider text-[10px] md:text-sm uppercase">
                        KEUNGGULAN ATTAUFIQ
                    </p>
                </motion.div>

                <h2 className="text-lg md:text-4xl font-extrabold text-indigo-950 leading-snug md:leading-tight px-2">
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

                {/* MATAHARI BERJALAN (Laptop only) */}
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
                <div className="relative z-10 w-full max-w-4xl px-4 md:px-8 h-full flex flex-col items-center justify-start md:justify-center pt-32 md:pt-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -25 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className={`relative md:absolute md:inset-x-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 ${currentItem.position === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
                                }`}
                        >
                            {/* KOMPONEN PHOTO FRAME KUBAH */}
                            <PhotoFrame
                                title={currentItem.title}
                                src={currentItem.image}
                            />

                            {/* TEKS DESKRIPSI */}
                            <div
                                className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${currentItem.position === 'right' ? 'md:pt-16 md:ml-10' : 'pt-0'
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

            {/* --- SEKSI INTERAKTIF & LAINNYA --- */}
            <JourneySection />
            <AchievementsSection />


            {/* 7. CTA ATQ SECTION */}
            <ClosingCtaSection />


            {/* 8. TESTIMONIAL SECTION */}
            <TestimonialSection />

            {/* 9. BLOG SECTION */}
            <BlogPreview posts={posts} />

        </AppLayout>
    );
}
