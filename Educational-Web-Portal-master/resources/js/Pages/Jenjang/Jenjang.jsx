import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

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

export default function Jenjang({
    title = "Program\nPendidikan",
    subtitle = "Setiap jenjang, satu perjalanan. Bersama membangun generasi beradab.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/jenjang-hero-left.png"
}) {
    const [activeTab, setActiveTab] = useState('PG-TK');


    // Ref untuk Masing-masing Section Animasi
    const [heroRef, heroInView] = useInView();
    const [sejarahRef, sejarahInView] = useInView();
    const [todayRef, todayInView] = useInView();
    const [quoteRef, quoteInView] = useInView();


    const jenjangList = [
        {
            title: "PG",
            subtitle: "Playgroup",
            href: "/pg",
            icon: (
                <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M5 6h14v12H5z" />
                    <path d="M9 10h6M9 14h6" />
                </svg>
            ),
        },
        {
            title: "TK",
            subtitle: "Taman Kanak-Kanak",
            href: "/tk",
            icon: (
                <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 21h18" />
                    <path d="M5 21V8l7-5 7 5v13" />
                </svg>
            ),
        },
        {
            title: "SD",
            subtitle: "Sekolah Dasar",
            href: "/sd",
            icon: (
                <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M4 5h16v14H4z" />
                    <path d="M12 5v14" />
                </svg>
            ),
        },
        {
            title: "SMP",
            subtitle: "Sekolah Menengah Pertama",
            href: "/smp",
            icon: (
                <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M4 19h16" />
                    <path d="M7 19V9l5-5 5 5v10" />
                </svg>
            ),
        },
        {
            title: "SMA",
            subtitle: "Sekolah Menengah Atas",
            href: "/sma",
            icon: (
                <svg
                    className="w-10 h-10 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 8l9-5 9 5-9 5-9-5z" />
                    <path d="M6 10v4c0 2 3 4 6 4s6-2 6-4v-4" />
                </svg>
            ),
        },
    ];


    return (
        <AppLayout title="About At-Taufiq">
            <Head title="About At-Taufiq Jambi | Mencetak Generasi Robbani" />

            {/* ==========================================
                1. HERO SECTION (FADE IN SANTAI)
            ========================================== */}
            <section ref={heroRef} className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-[480px] md:min-h-[560px] flex items-center justify-center">
                <div className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0">
                    <img
                        src={mosqueImage}
                        alt="Mosque Background"
                        className="w-full h-full object-cover object-[90%_center]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] from-[38%] via-[#07327F]/20 via-[55%] to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07327F] via-transparent to-[#07327F]/30"></div>
                </div>

                <div className="absolute top-0 left-0 h-full w-full md:w-7/12 z-10 pointer-events-none overflow-hidden">
                    <img
                        src={patternImage}
                        alt="Islamic Arch Frame"
                        className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]"
                    />
                </div>

                <div className={`relative z-20 container mx-auto flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-[#D4AF37] text-xs">◆</span>
                        <p className="text-[#F3E5AB] font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow">
                            {tagline}
                        </p>
                        <span className="text-[#D4AF37] text-xs">◆</span>
                    </div>

                    <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">✦</div>

                    <h1
                        className="font-serif text-5xl md:text-7xl lg:text-[72px]
    leading-[1.15]
    whitespace-pre-line
    font-semibold
    max-w-2xl
    mx-auto
    text-white"
                    >
                        {title}
                    </h1>

                    <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">✦</div>

                    <div className="w-16 h-[1px] bg-[#D4AF37]/50 my-3"></div>

                    <p className="text-blue-100 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed mt-1 drop-shadow">
                        {subtitle}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none translate-y-1">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block" preserveAspectRatio="none">
                        <path d="M0 60 C 360 120, 1080 0, 1440 60 L 1440 120 L 0 120 Z" fill="#D4AF37" opacity="0.8" />
                        <path d="M0 75 C 360 135, 1080 15, 1440 75 L 1440 120 L 0 120 Z" fill="#FAF8F5" />
                    </svg>
                </div>
            </section>


            {/* ==========================================
                2. JENJANG PENDIDIKAN  SECTION
            ========================================== */}
            <section class="relative py-24 bg-[#FAF8F5] overflow-hidden flex flex-col items-center">

                {/* <!-- Background Pattern --> */}
                <div class="absolute inset-0 opacity-10 bg-[url('/images/pattern/islamic-pattern.svg')] bg-cover bg-center"></div>

                <div class="relative max-w-7xl mx-auto px-6">

                    {/* <!-- Heading --> */}
                    <div class="text-center mb-16">

                        <h2 class="text-[#0D2D6C] text-4xl font-serif font-semibold">
                            Pilih Jenjang Pendidikan
                        </h2>

                        <div class="flex justify-center items-center gap-4 mt-5">
                            <div class="w-20 h-[2px] bg-[#D4AF37]"></div>

                            <span class="text-[#D4AF37] text-lg">
                                ✦
                            </span>

                            <div class="w-20 h-[2px] bg-[#D4AF37]"></div>
                        </div>

                    </div>

                    {/* <!-- Cards --> */}
                    <div className="flex justify-center w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-5xl">

                            {jenjangList.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    className="group bg-white rounded-[90px_90px_20px_20px]
                border border-[#E7D9C7]
                shadow-sm hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300
                pt-10 pb-5 px-6
                text-center"
                                >
                                    <div
                                        className="w-20 h-20 rounded-full
                    bg-[#082E72]
                    mx-auto
                    flex items-center justify-center
                    shadow-lg
                    group-hover:scale-110
                    transition"
                                    >
                                        {item.icon}
                                    </div>

                                    <h3 className="mt-7 text-4xl font-serif text-[#0D2D6C]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-600">
                                        {item.subtitle}
                                    </p>

                                    <div className="mt-8 text-xl text-[#0D2D6C] group-hover:translate-x-1 transition">
                                        →
                                    </div>
                                </a>
                            ))}

                        </div>
                    </div>


                    {/* <!-- Bottom Ornament --> */}
                    <div class="flex justify-center items-center gap-4 mt-16">

                        <div class="w-20 h-[2px] bg-[#D4AF37]"></div>

                        <span class="text-[#D4AF37]">
                            ✦
                        </span>

                        <div class="w-20 h-[2px] bg-[#D4AF37]"></div>

                    </div>

                </div>

            </section>


        </AppLayout>
    );
}