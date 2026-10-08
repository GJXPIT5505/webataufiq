import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import HeroSection from '@/Layouts/HeroSection';

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
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return [ref, isInView];
}

// 1. KOMPONEN BADGE KUBAH ISLAMI (ARCH MIHRAB)
function IslamicArchBadge({ children }) {
    return (
        <div className="relative w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 flex items-center justify-center filter drop-shadow-md">
            <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                {/* Background Navy */}
                <path
                    d="M50 4 C28 20 6 34 6 58 L6 122 C6 126 9 128 14 128 L86 128 C91 128 94 126 94 122 L94 58 C94 34 72 20 50 4 Z"
                    fill="#051736"
                />
                {/* Border Luar Emas */}
                <path
                    d="M50 4 C28 20 6 34 6 58 L6 122 C6 126 9 128 14 128 L86 128 C91 128 94 126 94 122 L94 58 C94 34 72 20 50 4 Z"
                    stroke="#D4AF37"
                    strokeWidth="2"
                />
                {/* Border Dalam Emas */}
                <path
                    d="M50 12 C32 26 14 38 14 60 L14 118 C14 120 16 122 19 122 L81 122 C84 122 86 120 86 118 L86 60 C86 38 68 26 50 12 Z"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeOpacity="0.8"
                />
            </svg>
            <div className="relative z-10 pt-4 text-[#D4AF37] flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

// 2. KOMPONEN BADGE ANGKA BINTANG ISLAMI (8-POINT STAR)
function IslamicNumberBadge({ number }) {
    return (
        <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                <rect x="6" y="6" width="28" height="28" rx="4" fill="#C9972E" />
                <rect x="6" y="6" width="28" height="28" rx="4" fill="#C9972E" transform="rotate(45 20 20)" />
            </svg>
            <span className="relative z-10 text-white font-bold text-[11px] sm:text-xs font-sans">
                {number}
            </span>
        </div>
    );
}

export default function About() {
    const [visiRef, visiInView] = useInView();

    const misiList = [
        "Menyelenggarakan pendidikan Islam yang berkualitas dan integratif.",
        "Menanamkan nilai-nilai Al-Qur'an dan Sunnah dalam kehidupan sehari-hari.",
        "Mengembangkan potensi akademik, karakter, dan keterampilan siswa.",
        "Menciptakan lingkungan belajar yang aman, nyaman, dan inspiratif.",
        "Membangun kemitraan dengan orang tua dan masyarakat untuk bersama-sama mendidik generasi terbaik."
    ];

    return (
        <AppLayout title="Tentang Kami - SIT At-Taufiq">
            <Head title="Tentang Kami | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <HeroSection 
                title="Tentang Kami"
                subtitle="Mengenal lebih dekat visi dan misi SIT At-Taufiq Jambi dalam membina generasi beriman, berilmu, dan berakhlak mulia."
                tagline="TENTANG ATTAUFIQ"
                mosqueImage="/images/hero/building-attaufiq.png"
            />

            {/* ==========================================
                2. VISI & MISI SECTION
            ========================================== */}
            <section ref={visiRef} className="py-20 bg-[#FAF4EB] relative overflow-hidden">
                
                {/* Ornamen Simbol Matahari Pusat */}
                <div className="flex justify-center mb-12">
                   <div className="text-[#C9972E] text-3xl animate-pulse">☀️</div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">

                        {/* ==========================================
                            CARD 1: VISI (BACKGROUND COVER HALUS)
                        ========================================== */}
                        <div className={`relative bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden group h-full transform hover:-translate-y-2 ${
                            visiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}>
                            <div
                                className="absolute inset-0 bg-cover bg-bottom opacity-5 pointer-events-none group-hover:opacity-10 transition duration-500"
                                style={{ backgroundImage: `url('/images/hero/building-attaufiq.png')` }}
                            ></div>

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-start space-x-6 mb-8">
                                    <IslamicArchBadge>
                                        <svg className="w-9 h-9 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="7" r="2.5" />
                                            <path d="M12 2v2M4.93 4.93l1.41 1.41M19.07 4.93l-1.41 1.41" opacity="0.6"/>
                                            <path d="M2 10.5C5 9.5 8.5 9.5 12 11.5C15.5 9.5 19 9.5 22 10.5V19.5C19 18.5 15.5 18.5 12 20.5C8.5 18.5 5 18.5 2 19.5V10.5Z" />
                                            <line x1="12" y1="11.5" x2="12" y2="20.5" />
                                        </svg>
                                    </IslamicArchBadge>

                                    <div className="pt-2">
                                        <h2 className="font-serif text-4xl font-normal text-[#07327F]">Visi</h2>
                                        <div className="flex items-center space-x-2 my-2">
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                            <span className="text-[#C9972E] text-xs">☀️</span>
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-slate-700 font-light text-base md:text-lg leading-relaxed pt-2">
                                    Menjadi lembaga pendidikan Islam unggulan yang melahirkan <strong className="font-semibold text-slate-900">generasi beriman, berilmu, berakhlak mulia, dan berprestasi</strong> menuju ridha Allah.
                                </p>
                            </div>

                            <div className="relative z-10 pt-8 mt-auto border-t border-slate-100 flex items-center justify-between text-[#D4AF37] text-xs font-serif italic">
                                <span>SIT At-Taufiq Jambi</span>
                                <span>✦ ✦ ✦</span>
                            </div>
                        </div>

                        {/* ==========================================
                            CARD 2: MISI (POLOS BERSIH TANPA BACKGROUND)
                        ========================================== */}
                        <div className={`relative bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-700 delay-200 ease-out flex flex-col justify-between overflow-hidden group h-full transform hover:-translate-y-2 ${
                            visiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}>
                            <div className="relative z-10 flex-grow">
                                <div className="flex items-start space-x-6 mb-8">
                                    <IslamicArchBadge>
                                        <svg className="w-9 h-9 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="9" />
                                            <circle cx="12" cy="12" r="5" />
                                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                                            <path d="M19 5L13.5 10.5" strokeWidth="1.8" />
                                            <path d="M19 8.5V5H15.5" strokeWidth="1.8" />
                                        </svg>
                                    </IslamicArchBadge>

                                    <div className="pt-2">
                                        <h2 className="font-serif text-4xl font-normal text-[#07327F]">Misi</h2>
                                        <div className="flex items-center space-x-2 my-2">
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                            <span className="text-[#C9972E] text-xs">☀️</span>
                                            <div className="w-12 h-[1px] bg-[#D4AF37]"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3.5 pt-1">
                                    {misiList.map((misi, index) => (
                                        <div key={index} className="flex items-start space-x-3.5 group/item">
                                            <IslamicNumberBadge number={index + 1} />
                                            <p className="text-slate-700 font-light text-sm md:text-base leading-snug">
                                                {misi}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </AppLayout>
    );
}