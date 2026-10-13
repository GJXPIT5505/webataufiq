import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

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

export default function Contact({
    title = "Hubungi Kami",
    subtitle = "Kami siap membantu Bunda/Ayah untuk informasi pendaftaran & sekolah.",
    tagline = "SEKOLAH ISLAM ATTAUFIQ",
    patternImage = "/images/hero/frame-left.png",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [heroRef, heroInView] = useInView();
    const [hubungiRef, hubungiInView] = useInView();
    const [lokasiRef, lokasiInView] = useInView();
    const [bannerRef, bannerInView] = useInView();

    return (
        <AppLayout title="Contact At-Taufiq">
            <Head title="Hubungi Kami | SIT At-Taufiq Jambi" />

            {/* ==========================================
                1. HERO SECTION
            ========================================== */}
            <section ref={heroRef} className="relative w-full overflow-hidden bg-[#07327F] text-white min-h-[420px] md:min-h-[480px] flex items-center justify-center">
                <div className="absolute top-0 right-0 w-full md:w-3/4 h-full z-0">
                    <img
                        src={mosqueImage}
                        alt="Mosque Background"
                        className="w-full h-full object-cover object-right md:object-center opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07327F] via-[#07327F]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07327F] via-transparent to-[#07327F]/30"></div>
                </div>

                <div className="absolute top-0 left-0 h-full w-full md:w-7/12 z-10 pointer-events-none overflow-hidden">
                    <img
                        src={patternImage}
                        alt="Islamic Arch Frame"
                        className="h-full w-full object-cover object-left [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]"
                    />
                </div>

                <div className={`relative z-20 container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="text-[#D4AF37] text-xs">◆</span>
                        <p className="text-[#F3E5AB] font-bold text-xs md:text-sm tracking-[0.25em] uppercase drop-shadow">
                            {tagline}
                        </p>
                        <span className="text-[#D4AF37] text-xs">◆</span>
                    </div>

                    <div className="text-[#D4AF37] text-lg md:text-xl my-1 animate-pulse">✦</div>

                    <h1 className="font-serif text-4xl md:text-6xl font-normal text-white tracking-tight leading-tight my-2 max-w-3xl drop-shadow-md">
                        {title}
                    </h1>

                    <div className="w-16 h-[1px] bg-[#D4AF37]/50 my-3"></div>

                    <p className="text-blue-100 text-sm md:text-base font-light max-w-lg leading-relaxed mt-1 drop-shadow">
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
                2. SECTION: HUBUNGI KAMI (3 CARDS)
            ========================================== */}
            <section ref={hubungiRef} className="py-20 bg-[#FAF8F5] relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    
                    <div className={`text-center mb-12 transition-all duration-700 ${hubungiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#07327F] mb-3">
                            Hubungi Kami
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs">✦</span>
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                        </div>
                    </div>

                    {/* Grid 3 Card Hubungi Kami */}
                    <div className="grid md:grid-cols-3 gap-6 items-stretch">

                        {/* CARD 1: PG-TK-SD */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between ${hubungiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-[#07327F] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-md">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-bold text-[#07327F]">PG-TK-SD Attaufiq</h3>
                                        <p className="text-xs text-slate-500 font-light leading-snug">
                                            Kami siap membantu kebutuhan informasi untuk jenjang PG, TK dan SD.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-6">
                                    <a href="https://wa.me/6281200000000" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shadow-sm">💬</div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase">WhatsApp</p>
                                                <p className="text-xs font-semibold text-slate-800">0812-XXXX-XXXX</p>
                                            </div>
                                        </div>
                                        <span className="text-slate-400 group-hover:text-emerald-600 transition">›</span>
                                    </a>

                                    <a href="tel:0741000000" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-sm shadow-sm">📞</div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase">Telepon / HP</p>
                                                <p className="text-xs font-semibold text-slate-800">0741-XXXXXXX</p>
                                            </div>
                                        </div>
                                        <span className="text-slate-400 group-hover:text-[#D4AF37] transition">›</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: SMP-SMA */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-500 delay-150 transform hover:-translate-y-2 flex flex-col justify-between ${hubungiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div>
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-[#07327F] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-md">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg font-bold text-[#07327F]">SMP-SMA Attaufiq</h3>
                                        <p className="text-xs text-slate-500 font-light leading-snug">
                                            Kami siap membantu kebutuhan informasi untuk jenjang SMP dan SMA.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-6">
                                    <a href="https://wa.me/6282100000000" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shadow-sm">💬</div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase">WhatsApp</p>
                                                <p className="text-xs font-semibold text-slate-800">0821-XXXX-XXXX</p>
                                            </div>
                                        </div>
                                        <span className="text-slate-400 group-hover:text-emerald-600 transition">›</span>
                                    </a>

                                    <a href="tel:0741000000" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 transition group">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-sm shadow-sm">📞</div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase">Telepon / HP</p>
                                                <p className="text-xs font-semibold text-slate-800">0741-XXXXXXX</p>
                                            </div>
                                        </div>
                                        <span className="text-slate-400 group-hover:text-[#D4AF37] transition">›</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* CARD 3: OPERASIONAL & KONSULTASI */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-500 delay-300 transform hover:-translate-y-2 flex flex-col justify-between space-y-4 ${hubungiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="flex items-start space-x-3.5 pb-3 border-b border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-[#07327F] text-[#D4AF37] flex items-center justify-center flex-shrink-0 text-sm shadow-sm">⏰</div>
                                <div>
                                    <h4 className="font-semibold text-xs text-slate-800">Jam Operasional</h4>
                                    <p className="text-[11px] text-slate-600 mt-0.5">Senin - Jumat : 07.00 - 16.00 WIB</p>
                                    <p className="text-[11px] text-slate-600">Sabtu : 07.00 - 12.00 WIB</p>
                                    <p className="text-[10px] text-slate-400 italic mt-1">*Minggu dan hari libur nasional tutup</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5 pb-3 border-b border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-[#07327F] text-[#D4AF37] flex items-center justify-center flex-shrink-0 text-sm shadow-sm">⚡</div>
                                <div>
                                    <h4 className="font-semibold text-xs text-slate-800">Respon Cepat</h4>
                                    <p className="text-[11px] text-slate-500 leading-snug">
                                        Tim kami akan merespon pesan Anda secepat mungkin di jam operasional.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3.5">
                                <div className="w-10 h-10 rounded-full bg-[#07327F] text-[#D4AF37] flex items-center justify-center flex-shrink-0 text-sm shadow-sm">👥</div>
                                <div>
                                    <h4 className="font-semibold text-xs text-slate-800">Konsultasi Langsung</h4>
                                    <p className="text-[11px] text-slate-500 leading-snug">
                                        Bunda/Ayah juga dapat berkonsultasi langsung dengan tim kami di sekolah dengan membuat janji terlebih dahulu.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                3. SECTION: LOKASI SEKOLAH KAMI (MAPS)
            ========================================== */}
            <section ref={lokasiRef} className="py-16 bg-[#FAF8F5] relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    
                    <div className={`text-center mb-12 transition-all duration-700 ${lokasiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#07327F] mb-3">
                            Lokasi Sekolah Kami
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                            <span className="text-xs">✦</span>
                            <span className="w-8 h-[1px] bg-[#D4AF37]"></span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* LOKASI 1: PG-TK-SD */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 ${lokasiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="relative h-64 w-full bg-slate-200">
                                <div className="absolute top-4 left-4 z-10 bg-[#07327F] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-md">
                                    <span className="text-[#D4AF37]">✦</span>
                                    <span>PG-TK-SD ATTAUFIQ</span>
                                </div>

                                <iframe 
                                    title="Map PG-TK-SD"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8094!2d103.5934!3d-1.6025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzYnMDkuMCJTIDEwM8KwMzUnMzYuMiJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid" 
                                    className="w-full h-full border-0 grayscale contrast-125 opacity-90"
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-start space-x-3 text-slate-600">
                                    <span className="text-[#07327F] text-lg mt-0.5">📍</span>
                                    <p className="text-xs md:text-sm font-light leading-relaxed">
                                        Jl. Attaufiq No.1, Simpang IV Sipin, Kec. Telanaipura, Kota Jambi, Jambi 36124
                                    </p>
                                </div>

                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full bg-[#051736] hover:bg-[#07327F] text-white py-3 rounded-xl text-xs font-medium flex items-center justify-center space-x-2 transition shadow-sm"
                                >
                                    <span>📍</span>
                                    <span>Lihat di Google Maps</span>
                                    <span className="text-[10px]">↗</span>
                                </a>
                            </div>
                        </div>

                        {/* LOKASI 2: SMP-SMA */}
                        <div className={`bg-[#FFFDF9] border border-[#E8DFC8] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 delay-200 ${lokasiInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="relative h-64 w-full bg-slate-200">
                                <div className="absolute top-4 left-4 z-10 bg-[#07327F] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-md">
                                    <span className="text-[#D4AF37]">✦</span>
                                    <span>SMP-SMA ATTAUFIQ</span>
                                </div>

                                <iframe 
                                    title="Map SMP-SMA"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8094!2d103.6120!3d-1.6150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMzYnNTQuMCJTIDEwM8KwMzYnNDMuMiJF!5e0!3m2!1sid!2sid!4v1600000000000!5m2!1sid!2sid" 
                                    className="w-full h-full border-0 grayscale contrast-125 opacity-90"
                                    allowFullScreen="" 
                                    loading="lazy"
                                ></iframe>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-start space-x-3 text-slate-600">
                                    <span className="text-[#07327F] text-lg mt-0.5">📍</span>
                                    <p className="text-xs md:text-sm font-light leading-relaxed">
                                        Jl. Sunan Gunung Jati No.88, Thehok, Kec. Jambi Selatan, Kota Jambi, Jambi 36139
                                    </p>
                                </div>

                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full bg-[#051736] hover:bg-[#07327F] text-white py-3 rounded-xl text-xs font-medium flex items-center justify-center space-x-2 transition shadow-sm"
                                >
                                    <span>📍</span>
                                    <span>Lihat di Google Maps</span>
                                    <span className="text-[10px]">↗</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ==========================================
                4. SECTION: BOTTOM BANNER CALLOUT & SOSMED
            ========================================== */}
            <section ref={bannerRef} className="py-12 bg-[#FAF8F5] pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className={`bg-[#051736] text-white rounded-[36px] p-8 md:p-12 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden transition-all duration-1000 ${bannerInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        
                        {/* Hiasan Kubah Islami Emas di Pojok Kanan Banner */}
                        <div className="absolute -right-8 -bottom-10 w-64 h-64 border-2 border-[#D4AF37]/20 rounded-t-full pointer-events-none flex items-center justify-center">
                            <div className="w-48 h-48 border border-[#D4AF37]/15 rounded-t-full flex items-center justify-center">
                                <span className="text-[#D4AF37]/30 text-4xl">✦</span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                            
                            {/* Kiri: Chat Admin */}
                            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
                                <h3 className="font-serif text-2xl md:text-3xl font-normal text-white">
                                    Butuh Bantuan Lainnya?
                                </h3>
                                <p className="text-xs md:text-sm text-blue-100/80 font-light max-w-sm mx-auto lg:mx-0 leading-relaxed">
                                    Tim Attaufiq siap membantu menjawab pertanyaan Bunda/Ayah seputar sekolah, program, dan pendaftaran.
                                </p>
                                <div className="pt-2">
                                    <a 
                                        href="https://wa.me/6281200000000" 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center space-x-2 bg-[#F3E5AB] hover:bg-[#D4AF37] text-[#051736] px-6 py-3.5 rounded-full font-semibold text-xs transition duration-300 shadow-lg hover:scale-105"
                                    >
                                        <span>💬</span>
                                        <span>Chat Admin Sekarang</span>
                                        <span>›</span>
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Ikuti Kami di Media Sosial */}
                            <div className="lg:col-span-6 space-y-4 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
                                <h4 className="font-serif text-lg font-normal text-white">
                                    Ikuti Kami di Media Sosial
                                </h4>

                                <div className="flex items-center justify-center lg:justify-start space-x-3">
                                    <a href="#" className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#051736] flex items-center justify-center transition font-bold text-xs">
                                        IG
                                    </a>
                                    <a href="#" className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#051736] flex items-center justify-center transition font-bold text-xs">
                                        FB
                                    </a>
                                    <a href="#" className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#051736] flex items-center justify-center transition font-bold text-xs">
                                        YT
                                    </a>
                                    <a href="#" className="w-11 h-11 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/5 hover:bg-[#D4AF37] text-white hover:text-[#051736] flex items-center justify-center transition font-bold text-xs">
                                        TK
                                    </a>
                                </div>

                                <p className="text-xs text-blue-200/70 font-light">
                                    Dapatkan informasi terbaru tentang kegiatan dan program Attaufiq.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}