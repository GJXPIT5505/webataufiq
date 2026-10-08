import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import HeroSection from '@/Layouts/HeroSection';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    Palette,
    Dumbbell,
    Flag,
    HeartHandshake,
    Sparkles,
    Sprout,
    Award,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2
} from 'lucide-react';

/* ==========================================
   CONFIG & HELPERS
   ========================================== */

const PROGRAM_ICONS = {
    'tahfidz & qur\'an': BookOpen,
    'akademik': GraduationCap,
    'seni & kreativitas': Palette,
    'olahraga': Dumbbell,
    'kepemimpinan': Flag,
    'keluarga & parenting': HeartHandshake,
    'spiritual & keislaman': Sparkles,
    'community service': Sprout,
    'wisuda & pelepasan': Award,
};

function getProgramIcon(iconType = '', title = '') {
    const key = (iconType || title).toLowerCase();
    return PROGRAM_ICONS[key] || Sparkles;
}

function resolveImageUrl(path) {
    if (!path) return '/images/placeholder.jpg';
    if (path.startsWith('http') || path.startsWith('/images') || path.startsWith('/storage')) {
        return path;
    }
    return `/storage/${path}`;
}

function getEventGallery(item) {
    const images = [];

    // 1. Cover Utama
    if (item.image) {
        images.push(resolveImageUrl(item.image));
    }

    // 2. Kumpulan Galeri Foto
    if (Array.isArray(item.gallery) && item.gallery.length > 0) {
        item.gallery.forEach((img) => {
            const url = resolveImageUrl(img);
            if (!images.includes(url)) {
                images.push(url);
            }
        });
    }

    return images.length > 0 ? images : ['/images/placeholder.jpg'];
}

export default function EventsIndex({
    events = [],
    title = "Events & Agenda",
    subtitle = "Temukan berbagai kegiatan dan agenda menarik yang kami selenggarakan di SIT At-Taufiq.",
    tagline = "AGENDA ATTAUFIQ",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const defaultPrograms = [
        {
            id: 1,
            title: "Tahfidz Day",
            slug: "tahfidz-day",
            type: "program",
            icon_type: "tahfidz & qur'an",
            description: "Kegiatan istimewa untuk mengapresiasi perjuangan para siswa dalam menghafal Al-Qur'an serta menumbuhkan kecintaan terhadap kalamullah.",
            image: "/images/events/tahfidz.jpg",
            gallery: [
                "/images/events/tahfidz.jpg",
                "/images/events/tahfidz-2.jpg",
                "/images/events/tahfidz-3.jpg",
                "/images/events/tahfidz-4.jpg"
            ],
            highlights: [
                { title: "Tasmi' & Muroja'ah", desc: "Siswa menampilkan hafalan Al-Qur'an di hadapan para ustadz dan orang tua." },
                { title: "Motivasi & Apresiasi", desc: "Pemberian apresiasi untuk memotivasi siswa agar terus semangat menghafal." },
                { title: "Kebersamaan", desc: "Momen penuh berkah bersama teman, guru, dan orang tua." }
            ]
        },
        {
            id: 2,
            title: "Pekan Akademik & Sains",
            slug: "pekan-akademik",
            type: "event",
            icon_type: "akademik",
            description: "Ajang unjuk kebolehan siswa dalam bidang sains, matematika, dan teknologi berbasis karakter Islami.",
            image: "/images/events/akademik.jpg",
            gallery: [
                "/images/events/akademik.jpg",
                "/images/events/akademik-2.jpg"
            ],
            highlights: [
                { title: "Science Fair", desc: "Pameran karya eksperimen sains sederhana ciptaan siswa." },
                { title: "Olimpiade Matematika", desc: "Asah logika dan ketangkasan berhitung cepat." }
            ]
        }
    ];

    const displayPrograms = events && events.length > 0 ? events : defaultPrograms;

    const handleOpenModal = (program) => {
        setSelectedEvent(program);
        setActiveImageIndex(0);
    };

    const handleNextEvent = () => {
        if (!selectedEvent) return;
        const currentIndex = displayPrograms.findIndex((p) => p.id === selectedEvent.id);
        const nextIndex = (currentIndex + 1) % displayPrograms.length;
        setSelectedEvent(displayPrograms[nextIndex]);
        setActiveImageIndex(0);
    };

    const activeGallery = selectedEvent ? getEventGallery(selectedEvent) : [];

    return (
        <AppLayout title={`${title} - SIT At-Taufiq`}>
            <Head title={`${title} | SIT At-Taufiq Jambi`} />

            {/* HERO SECTION REUSABLE */}
            <HeroSection
                title={title}
                subtitle={subtitle}
                tagline={tagline}
                mosqueImage={mosqueImage}
            />

            {/* Canvas Utama */}
            <div className="bg-[#FAF4EB] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                    {/* HEADER SECTION */}
                    <div className="text-center space-y-2 max-w-2xl mx-auto">
                        <p className="text-xs md:text-sm font-medium text-slate-600 tracking-wide">
                            Pilih kegiatan untuk melihat informasi selengkapnya
                        </p>
                        <div className="flex justify-center text-[#D4AF37] pt-1">
                            <span className="animate-bounce text-sm">∨</span>
                        </div>
                    </div>

                    {/* ORBITAL GRID CONTAINER */}
                    <div className="relative py-8">
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                        >
                            <path
                                d="M 50 180 Q 300 80 600 220 T 1200 180 T 1800 220"
                                stroke="#D4AF37"
                                strokeWidth="1.5"
                                strokeDasharray="6 6"
                                strokeOpacity="0.4"
                            />
                        </svg>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-y-16 items-center justify-center">
                            {displayPrograms.map((program, index) => (
                                <ProgramOrbCard
                                    key={program.id || index}
                                    program={program}
                                    index={index}
                                    onClick={() => handleOpenModal(program)}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ==========================================
                POP-UP MODAL DETAIL EVENT
            ========================================== */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#051736]/70 backdrop-blur-md transition-all duration-300">

                    {/* Modal Box */}
                    <div className="bg-[#FAF8F3] border border-[#E8DFC8] w-full max-w-5xl rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#051736] border border-[#E8DFC8] flex items-center justify-center shadow-md transition z-30"
                            title="Tutup"
                        >
                            <X size={18} />
                        </button>

                        {/* Modal Body Container */}
                        <div className="p-6 md:p-10 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                            {/* LEFT SIDE: GALLERY SLIDER */}
                            <div className="lg:col-span-7 space-y-4">

                                {/* Main Image Display */}
                                <div className="aspect-[16/10] w-full rounded-3xl overflow-hidden relative bg-slate-200 border border-[#E8DFC8] shadow-md group">
                                    <img
                                        src={activeGallery[activeImageIndex] || '/images/placeholder.jpg'}
                                        alt={selectedEvent.title}
                                        className="w-full h-full object-cover transition duration-500"
                                    />

                                    {/* Expand Icon */}
                                    <div className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-xl backdrop-blur-sm opacity-80">
                                        <Maximize2 size={16} />
                                    </div>

                                    {/* Prev / Next Buttons */}
                                    {activeGallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? activeGallery.length - 1 : prev - 1))}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#051736]/60 hover:bg-[#051736] text-white flex items-center justify-center transition"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={() => setActiveImageIndex((prev) => (prev + 1) % activeGallery.length)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#051736]/60 hover:bg-[#051736] text-white flex items-center justify-center transition"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </>
                                    )}

                                    {/* Counter Badge */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-[11px] font-mono rounded-full backdrop-blur-sm">
                                        {activeImageIndex + 1} / {activeGallery.length}
                                    </div>
                                </div>

                                {/* Thumbnail Selector */}
                                {activeGallery.length > 1 && (
                                    <div className="grid grid-cols-4 gap-3 pt-1">
                                        {activeGallery.map((imgUrl, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImageIndex(idx)}
                                                className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition ${
                                                    activeImageIndex === idx 
                                                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105' 
                                                        : 'border-[#E8DFC8] opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Slider Indicator Dots */}
                                <div className="flex justify-center space-x-1.5 pt-1">
                                    {activeGallery.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-2 rounded-full transition-all ${
                                                activeImageIndex === i ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-[#E8DFC8]'
                                            }`}
                                        />
                                    ))}
                                </div>

                            </div>

                            {/* RIGHT SIDE: EVENT DETAILS */}
                            <div className="lg:col-span-5 space-y-6 pt-2">

                                {/* Badge Category */}
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-[#F3EBDD] text-[#8B6B13] rounded-xl border border-[#E8DFC8]">
                                        <BookOpen size={18} />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest text-[#8B6B13] uppercase bg-[#F3EBDD] border border-[#D4AF37]/40 px-3.5 py-1 rounded-full">
                                        {selectedEvent.icon_type || selectedEvent.type || "PROGRAM UNGGULAN"}
                                    </span>
                                </div>

                                {/* Event Title */}
                                <div className="space-y-2">
                                    <h2 className="font-serif text-3xl font-bold text-[#051736]">
                                        {selectedEvent.title}
                                    </h2>
                                    <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-slate-600 font-light leading-relaxed">
                                    {selectedEvent.description}
                                </p>

                                {/* Highlight Points */}
                                <div className="space-y-3 pt-2">
                                    {(selectedEvent.highlights || [
                                        { title: "Pembentukan Karakter", desc: "Menanamkan nilai-nilai keislaman dan adab luhur." },
                                        { title: "Kebersamaan", desc: "Momen penuh kehangatan bersama teman dan guru." }
                                    ]).map((item, idx) => (
                                        <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#E8DFC8] flex items-start space-x-3 shadow-sm">
                                            <div className="p-2 bg-[#F3EBDD] text-[#8B6B13] rounded-xl flex-shrink-0 mt-0.5">
                                                <Sparkles size={14} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xs text-[#051736]">{item.title}</h4>
                                                <p className="text-[11px] text-slate-500 font-light mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 flex items-center gap-3">
                                    <Link
                                        href={route('events.show', selectedEvent?.slug || 'detail')}
                                        className="flex-1 border border-[#051736] text-[#051736] hover:bg-[#051736] hover:text-white py-3 rounded-full text-xs font-bold transition text-center"
                                    >
                                        Halaman Penuh
                                    </Link>
                                    <button
                                        onClick={handleNextEvent}
                                        className="flex-1 bg-[#051736] hover:bg-[#07327F] text-white py-3 rounded-full text-xs font-bold transition shadow-md flex items-center justify-center space-x-1.5 group"
                                    >
                                        <span>Next Events</span>
                                        <ChevronRight size={15} className="group-hover:translate-x-1 transition" />
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </AppLayout>
    );
}

// Komponen Kartu Orb
function ProgramOrbCard({ program, index, onClick }) {
    const IconComponent = getProgramIcon(program.icon_type, program.title);
    const isEven = index % 2 === 0;
    const coverUrl = resolveImageUrl(program.image);

    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                isEven ? 'lg:-translate-y-6' : 'lg:translate-y-6'
            }`}
        >
            <div className="w-[260px] h-[340px] rounded-[130px] bg-[#FAF8F3] border border-[#E8DFC8] shadow-lg hover:shadow-2xl transition-all duration-500 p-3 flex flex-col justify-between items-center relative group overflow-hidden">

                {/* 1. HALF-CIRCLE IMAGE BANNER */}
                <div className="w-full h-[145px] rounded-t-[120px] rounded-b-2xl overflow-hidden relative bg-slate-200 block">
                    <img
                        src={coverUrl}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute -bottom-1 left-4 w-9 h-9 rounded-full bg-[#FAF8F3] border border-[#E8DFC8] shadow-md flex items-center justify-center text-[#8B6B13] z-10">
                        <IconComponent size={16} />
                    </div>
                </div>

                {/* 2. CARD CONTENT DETAILS */}
                <div className="px-3 pt-3 pb-2 text-center flex-1 flex flex-col justify-between items-center w-full">
                    <div className="space-y-1.5">
                        <h3 className="font-serif text-base font-bold text-[#051736] group-hover:text-[#D4AF37] transition leading-snug">
                            {program.title}
                        </h3>

                        <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-3 px-1">
                            {program.description}
                        </p>
                    </div>

                    {/* 3. BUTTON DETAIL POP-UP */}
                    <button
                        onClick={onClick}
                        className="w-8 h-8 rounded-full bg-[#C29D38] hover:bg-[#051736] text-white flex items-center justify-center transition-all duration-300 shadow-md group-hover:scale-110 mt-2"
                        title="Lihat Detail Pop-up"
                    >
                        <ArrowRight size={14} />
                    </button>
                </div>

            </div>
        </div>
    );
}