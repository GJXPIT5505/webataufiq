import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import HeroSection from '@/Layouts/HeroSection';
import { Head, Link } from '@inertiajs/react';
import {
    Sparkles,
    BookOpen,
    GraduationCap,
    Users,
    PartyPopper,
    Trophy,
    Lightbulb,
    Newspaper,
    Clock,
    ChevronLeft,
    ChevronRight,
    Palette,
    Dumbbell,
    Flag,
    HeartHandshake,
    Sprout,
    Award,
    Tag,
    Layers,
    ArrowRight
} from 'lucide-react';

/* ==========================================
   HELPERS & ICON MAPPING
   ========================================== */

const AVAILABLE_ICONS = {
    Tag,
    BookOpen,
    GraduationCap,
    Palette,
    Dumbbell,
    Flag,
    HeartHandshake,
    Sparkles,
    Sprout,
    Award,
    Users,
    PartyPopper,
    Trophy,
    Lightbulb,
    Newspaper,
};

function getCategoryIcon(iconKey = '', categoryName = '') {
    if (iconKey && AVAILABLE_ICONS[iconKey]) {
        return AVAILABLE_ICONS[iconKey];
    }
    const nameKey = (categoryName || '').toLowerCase();
    const fallbackMap = {
        parenting: Users,
        tahfizh: BookOpen,
        pendidikan: GraduationCap,
        kegiatan: PartyPopper,
        prestasi: Trophy,
        'tips belajar': Lightbulb,
        berita: Newspaper,
    };
    return fallbackMap[nameKey] || Tag;
}

function getReadingTime(htmlContent = '') {
    const text = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    if (!text) return 1;
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

function getExcerpt(htmlContent = '', length = 110) {
    const text = htmlContent.replace(/<[^>]*>?/gm, '').trim();
    return text.length > length ? `${text.slice(0, length)}…` : text;
}

function resolveImageUrl(imagePath) {
    if (!imagePath) return '/images/placeholder.jpg';
    if (imagePath.startsWith('http') || imagePath.startsWith('/images')) {
        return imagePath;
    }
    return `/storage/${imagePath}`;
}

export default function BlogIndex({
    posts = [],
    categories = [],
    paginationLinks = [],
    title = "Warta & Artikel",
    subtitle = "Informasi terkini, liputan kegiatan, prestasi siswa, dan tulisan edukatif seputar SIT At-Taufiq Jambi.",
    tagline = "KABAR ATTAUFIQ",
    mosqueImage = "/images/hero/building-attaufiq.png"
}) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Filter posts berdasarkan kategori
    const filteredPosts = selectedCategory === 'Semua'
        ? posts
        : posts.filter(post => post.category?.name === selectedCategory);

    // Ambil post pertama untuk Featured Banner
    const featuredPost = posts.length > 0 ? posts[0] : null;

    return (
        <AppLayout title={`${title} - SIT At-Taufiq`}>
            <Head title={`${title} | SIT At-Taufiq Jambi`} />

            {/* HERO SECTION DARI FOLDER LAYOUTS */}
            <HeroSection
                title={title}
                subtitle={subtitle}
                tagline={tagline}
                mosqueImage={mosqueImage}
            />

            <div className="bg-[#FAF4EB] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#051736]">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* ==========================================
                        1. FEATURED ARTICLE BANNER
                    ========================================== */}
                    {featuredPost && (
                        <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition">
                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                {/* Thumbnail Image */}
                                <div className="lg:col-span-5 aspect-[4/3] rounded-[24px] overflow-hidden shadow-md relative group bg-slate-200">
                                    <span className="absolute top-4 left-4 z-20 bg-[#07327F] text-[#FFC72C] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider shadow-md">
                                        FEATURED ARTICLE
                                    </span>
                                    <img
                                        src={resolveImageUrl(featuredPost.image)}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                    />
                                </div>

                                {/* Content Details */}
                                <div className="lg:col-span-7 space-y-3.5">
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center space-x-1.5 border border-[#D4AF37]/60 text-[#8B6B13] text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase bg-[#FAF8F5]">
                                            {React.createElement(getCategoryIcon(featuredPost.category?.icon, featuredPost.category?.name), { size: 12 })}
                                            <span>{featuredPost.category?.name || 'UMUM'}</span>
                                        </span>
                                    </div>

                                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#07327F] leading-snug">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-slate-600 font-light text-xs md:text-sm leading-relaxed line-clamp-3">
                                        {featuredPost.content?.replace(/<[^>]*>?/gm, '')}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between pt-4 border-t border-[#E8DFC8] text-xs text-slate-500 font-light gap-4">
                                        <div className="flex items-center space-x-4 text-xs">
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={13} className="text-[#D4AF37]" />
                                                {getReadingTime(featuredPost.content)} menit membaca
                                            </span>
                                            <span>
                                                {new Date(featuredPost.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <Link
                                            href={route('blog.show', featuredPost?.slug || 'slug-berita')}
                                            className="font-bold text-[#07327F] hover:text-[#D4AF37] transition flex items-center space-x-1 text-xs group"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* ==========================================
                        2. CATEGORY FILTER TABS
                    ========================================== */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                        <button
                            onClick={() => setSelectedCategory('Semua')}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 border ${
                                selectedCategory === 'Semua'
                                    ? 'bg-[#07327F] text-white border-[#07327F] shadow-md'
                                    : 'bg-[#FAF8F3] text-slate-700 border-[#E8DFC8] hover:bg-white hover:text-[#07327F]'
                            }`}
                        >
                            <Layers size={13} className={selectedCategory === 'Semua' ? 'text-[#FFC72C]' : 'text-slate-400'} />
                            <span>Semua</span>
                        </button>

                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat.name;
                            const IconComponent = getCategoryIcon(cat.icon, cat.name);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center space-x-2 border ${
                                        isActive
                                            ? 'bg-[#07327F] text-white border-[#07327F] shadow-md'
                                            : 'bg-[#FAF8F3] text-slate-700 border-[#E8DFC8] hover:bg-white hover:text-[#07327F]'
                                    }`}
                                >
                                    <IconComponent size={13} className={isActive ? 'text-[#FFC72C]' : 'text-[#8B6B13]'} />
                                    <span>{cat.name}</span>
                                    {cat.posts_count !== undefined && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-[#F3EBDD] text-[#8B6B13]'
                                        }`}>
                                            {cat.posts_count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>


                    {/* ==========================================
                        3. HEADLINE SECTION
                    ========================================== */}
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 text-[#D4AF37]">
                            <span className="text-xs">✦</span>
                            <h3 className="font-serif text-2xl md:text-3xl text-[#07327F] font-bold">
                                Artikel Terbaru {selectedCategory !== 'Semua' && `(${selectedCategory})`}
                            </h3>
                            <span className="text-xs">✦</span>
                        </div>
                    </div>


                    {/* ==========================================
                        4. GRID ARTIKEL
                    ========================================== */}
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((item) => (
                                <ArticleCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-slate-400 text-sm">
                            Belum ada artikel untuk kategori <strong>"{selectedCategory}"</strong>.
                        </div>
                    )}

                    {/* ==========================================
                        5. PAGINATION
                    ========================================== */}
                    {paginationLinks && paginationLinks.length > 3 && (
                        <div className="flex items-center justify-center gap-1.5 pt-4">
                            {paginationLinks.map((link, i) => {
                                const isPrev = i === 0;
                                const isNext = i === paginationLinks.length - 1;
                                const label = isPrev ? <ChevronLeft size={14} /> : isNext ? <ChevronRight size={14} /> : link.label;

                                return link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        preserveScroll
                                        dangerouslySetInnerHTML={typeof label === 'string' ? { __html: label } : undefined}
                                        className={`min-w-[2.25rem] h-9 px-3 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                                            link.active
                                                ? 'bg-[#07327F] text-white shadow-md'
                                                : 'bg-[#FAF8F3] text-slate-700 border border-[#E8DFC8] hover:bg-white hover:text-[#07327F]'
                                        }`}
                                    >
                                        {typeof label !== 'string' ? label : null}
                                    </Link>
                                ) : (
                                    <span
                                        key={i}
                                        dangerouslySetInnerHTML={typeof label === 'string' ? { __html: label } : undefined}
                                        className="min-w-[2.25rem] h-9 px-3 flex items-center justify-center rounded-xl text-xs font-bold text-slate-300 bg-slate-100/50"
                                    >
                                        {typeof label !== 'string' ? label : null}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}

/* ==========================================
   KARTU ARTIKEL
   ========================================== */
function ArticleCard({ item }) {
    const CardIcon = getCategoryIcon(item.category?.icon, item.category?.name);

    return (
        <Link
            href={route('blog.show', item?.slug || 'slug-berita')}
            className="group bg-[#FAF8F3] rounded-[28px] border border-[#E8DFC8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
        >
            <div>
                {/* Gambar Thumbnail */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-200">
                    <img
                        src={resolveImageUrl(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-[#FAF8F3]/95 backdrop-blur-sm border border-[#E8DFC8] text-[#07327F] text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider flex items-center space-x-1.5 shadow-sm">
                        <CardIcon size={12} className="text-[#8B6B13]" />
                        <span>{item.category?.name || 'UMUM'}</span>
                    </div>
                </div>

                {/* Konten */}
                <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-light">
                        <span>
                            {new Date(item.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={12} className="text-[#D4AF37]" />
                            {getReadingTime(item.content)} menit membaca
                        </span>
                    </div>

                    <h3 className="font-serif font-bold text-[#07327F] text-base leading-snug line-clamp-2 group-hover:text-[#8B6B13] transition">
                        {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                        {getExcerpt(item.content)}
                    </p>
                </div>
            </div>

            {/* Footer Aksi */}
            <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#07327F] group-hover:text-[#8B6B13] transition">
                <span>Baca Selengkapnya</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
            </div>
        </Link>
    );
}