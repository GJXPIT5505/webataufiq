import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar, 
    ArrowRight, 
    Sparkles,
    Share2,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Check
} from 'lucide-react';

export default function EventDetail({ event, relatedEvents = [] }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    // Helper Resolve URL File
    const resolveImageUrl = (path) => {
        if (!path) return '/images/placeholder.jpg';
        if (path.startsWith('http') || path.startsWith('/images') || path.startsWith('/storage')) {
            return path;
        }
        return `/storage/${path}`;
    };

    // Gabungkan Cover Utama dan Galeri Slider
    const getGalleryList = () => {
        const list = [];
        if (event?.image) {
            list.push(resolveImageUrl(event.image));
        }
        if (Array.isArray(event?.gallery) && event.gallery.length > 0) {
            event.gallery.forEach((img) => {
                const url = resolveImageUrl(img);
                if (!list.includes(url)) {
                    list.push(url);
                }
            });
        }
        return list.length > 0 ? list : ['/images/placeholder.jpg'];
    };

    const gallery = getGalleryList();

    // Format Tanggal Publikasi
    const formattedDate = event?.created_at 
        ? new Date(event.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : 'SIT At-Taufiq Jambi';

    // Share Button Action
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event?.title || 'Program & Event SIT At-Taufiq',
                text: event?.description || 'Simak kegiatan menarik di SIT At-Taufiq Jambi',
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <AppLayout title={`${event?.title || 'Detail Program'} - SIT At-Taufiq`}>
            <Head title={`${event?.title || 'Detail Program'} | SIT At-Taufiq Jambi`} />

            {/* Canvas Utama */}
            <div className="bg-[#FAF4EB] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-[#051736] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-4xl mx-auto space-y-8 relative z-10">

                    {/* 1. TOMBOL NAVIGASI & AKSI ATAS */}
                    <div className="flex items-center justify-between gap-4">
                        <Link 
                            href={route('events.index')} 
                            className="inline-flex items-center space-x-2 text-xs font-bold text-[#051736] hover:text-[#D4AF37] transition bg-[#FAF8F3] border border-[#E8DFC8] px-4 py-2.5 rounded-full shadow-sm"
                        >
                            <ArrowLeft size={16} />
                            <span>Kembali ke Semua Program</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#051736] hover:text-[#D4AF37] bg-[#FAF8F3] border border-[#E8DFC8] px-3.5 py-2.5 rounded-full shadow-sm transition"
                                title="Bagikan Halaman"
                            >
                                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                                <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Bagikan'}</span>
                            </button>

                            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#8B6B13] uppercase bg-[#FAF8F3] border border-[#D4AF37]/40 px-3.5 py-2 rounded-full">
                                {event?.icon_type || event?.type || 'PROGRAM'}
                            </span>
                        </div>
                    </div>

                    {/* 2. ARTIKEL UTAMA */}
                    <article className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-10 shadow-sm space-y-8">
                        
                        {/* Header Judul & Meta Info */}
                        <div className="space-y-4 border-b border-[#E8DFC8] pb-6">
                            <h1 className="font-serif text-3xl md:text-5xl font-normal text-[#051736] leading-tight">
                                {event?.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-light">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-[#D4AF37]" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-[#D4AF37]" />
                                    SIT At-Taufiq Jambi
                                </span>
                            </div>
                        </div>

                        {/* Gallery Slider & Image Viewer */}
                        <div className="space-y-3">
                            <div className="aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden border border-[#E8DFC8] shadow-md bg-slate-200 relative group">
                                <img 
                                    src={gallery[activeImageIndex]} 
                                    alt={`${event?.title} - Gambar ${activeImageIndex + 1}`} 
                                    className="w-full h-full object-cover transition duration-500" 
                                />

                                {/* Prev & Next Arrows */}
                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#051736]/60 hover:bg-[#051736] text-white flex items-center justify-center transition shadow-md"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => setActiveImageIndex((prev) => (prev + 1) % gallery.length)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#051736]/60 hover:bg-[#051736] text-white flex items-center justify-center transition shadow-md"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter Badge */}
                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white text-[11px] font-mono rounded-full backdrop-blur-sm">
                                    {activeImageIndex + 1} / {gallery.length}
                                </div>
                            </div>

                            {/* Thumbnails Row */}
                            {gallery.length > 1 && (
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-1">
                                    {gallery.map((imgUrl, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition ${
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
                        </div>

                        {/* Deskripsi Singkat / Excerpt */}
                        {event?.description && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#F3EBDD] border-l-4 border-[#D4AF37] text-slate-700 text-sm md:text-base leading-relaxed italic">
                                "{event.description}"
                            </div>
                        )}

                        {/* Konten Lengkap */}
                        <div className="prose max-w-none text-slate-700 font-light leading-relaxed space-y-4 text-sm md:text-base">
                            {event?.content ? (
                                <div dangerouslySetInnerHTML={{ __html: event.content }} />
                            ) : (
                                <p>
                                    Program <strong>{event?.title}</strong> merupakan salah satu pilar kegiatan unggulan di SIT At-Taufiq Jambi yang dirancang untuk membimbing siswa-siswi mencapai potensi terbaik dalam aspek akademik, karakter, serta nilai-nilai keislaman.
                                </p>
                            )}
                        </div>

                    </article>

                    {/* 3. KEGIATAN LAINNYA */}
                    {relatedEvents.length > 0 && (
                        <div className="space-y-6 pt-6 border-t border-[#E8DFC8]">
                            <div className="flex items-center justify-between">
                                <h3 className="font-serif text-xl md:text-2xl text-[#051736] font-normal">
                                    Kegiatan & Program Lainnya
                                </h3>
                                <Link 
                                    href={route('events.index')}
                                    className="text-xs font-bold text-[#8B6B13] hover:text-[#051736] flex items-center gap-1 transition"
                                >
                                    <span>Lihat Semua</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {relatedEvents.map((item) => (
                                    <Link 
                                        key={item.id} 
                                        href={route('events.show', item.slug)}
                                        className="bg-[#FAF8F3] p-5 rounded-2xl border border-[#E8DFC8] hover:shadow-md transition flex flex-col justify-between group"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-extrabold text-[#8B6B13] uppercase tracking-wider">
                                                {item.icon_type || item.type || 'PROGRAM'}
                                            </span>
                                            <h4 className="font-serif font-bold text-sm text-[#051736] group-hover:text-[#D4AF37] transition line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 line-clamp-2 font-light">
                                                {item.description || 'Lihat informasi lengkap mengenai program ini...'}
                                            </p>
                                        </div>

                                        <div className="pt-4 flex items-center text-xs font-bold text-[#051736] group-hover:text-[#D4AF37] space-x-1">
                                            <span>Selengkapnya</span>
                                            <ArrowRight size={12} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}