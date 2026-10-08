import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function BlogDetail({ post, relatedPosts = [], prevPost, nextPost }) {
    const [copied, setCopied] = useState(false);

    // Ambil URL saat ini untuk fitur share
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    // Function Copy Link
    const handleCopyLink = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AppLayout title={`${post?.title || 'Detail Artikel'} - SIT At-Taufiq`}>
            <Head title={`${post?.title} | SIT At-Taufiq Jambi`} />

            <div className="bg-[#FAF4EB] min-h-screen text-[#051736]">
                
                {/* ==========================================
                    1. HERO HEADER SECTION (DARK BANNER)
                ========================================== */}
                <div className="relative bg-[#051736] text-white pt-12 pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Background Image Overlay with Dark Gradient */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={post?.image ? `/storage/${post.image}` : '/images/placeholder.jpg'} 
                            alt={post?.title}
                            className="w-full h-full object-cover opacity-25 filter blur-[2px] scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051736] via-[#051736]/80 to-transparent"></div>
                    </div>

                    <div className="max-w-5xl mx-auto relative z-10 space-y-6 pt-6">
                        {/* Kategori Badge */}
                        <div>
                            <span className="inline-block border border-[#D4AF37]/80 text-[#D4AF37] text-[11px] font-extrabold tracking-widest px-4 py-1 rounded-full uppercase bg-[#051736]/60 backdrop-blur-md">
                                {post?.category?.name || 'PARENTING'}
                            </span>
                        </div>

                        {/* Title Artikel */}
                        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-tight max-w-4xl">
                            {post?.title}
                        </h1>

                        {/* Short Excerpt if available */}
                        <p className="text-slate-300 text-sm md:text-base font-light max-w-3xl leading-relaxed">
                            Panduan lengkap dan inspirasi Islami untuk mendampingi tumbuh kembang buah hati dengan berilmu, berakhlak, dan siap menghadapi masa depan.
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 pt-4 text-xs md:text-sm text-slate-300 font-light border-t border-white/10">
                            <span className="flex items-center space-x-2">
                                <span>⏱️</span>
                                <span>7 menit membaca</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span>📅</span>
                                <span>{new Date(post?.created_at || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                                <span>👤</span>
                                <span>Tim Attaufiq</span>
                            </span>
                        </div>
                    </div>
                </div>


                {/* ==========================================
                    2. MAIN CONTENT & SIDEBAR CONTAINER
                ========================================== */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-20">
                    <div className="grid lg:grid-cols-12 gap-10">

                        {/* ------------------------------------------
                            LEFT COLUMN: ARTICLE CONTENT
                        ------------------------------------------ */}
                        <div className="lg:col-span-8 space-y-10">
                            
                            {/* Paper Card Background */}
                            <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-[32px] p-6 md:p-10 shadow-sm space-y-8">
                                
                                {/* Featured Image Main */}
                                <div className="rounded-[24px] overflow-hidden shadow-md aspect-[16/9] border border-[#E8DFC8]">
                                    <img 
                                        src={post?.image ? `/storage/${post.image}` : '/images/placeholder.jpg'} 
                                        alt={post?.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Body Content Render */}
                                <div className="prose prose-lg max-w-none text-slate-700 font-light leading-relaxed space-y-6">
                                    
                                    {/* Render HTML Content / Drop Cap Formatting */}
                                    {post?.content ? (
                                        <div 
                                            className="article-body-content"
                                            dangerouslySetInnerHTML={{ __html: post.content }} 
                                        />
                                    ) : (
                                        <>
                                            {/* Dummy Text Preview jika konten kosong */}
                                            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#D4AF37] first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                                                Di era digital seperti sekarang, memilih sekolah untuk anak bukanlah hal yang bisa dianggap sepele. Sekolah bukan hanya tempat belajar, tetapi juga tempat anak dibentuk karakter, ditanamkan nilai-nilai Islam, dan dipersiapkan untuk menghadapi masa depan yang penuh tantangan.
                                            </p>

                                            <h2 className="font-serif text-2xl font-bold text-[#051736] pt-4">
                                                1. Pastikan Visi dan Nilai Sekolah Selaras
                                            </h2>
                                            <p>
                                                Sekolah Islam yang baik memiliki visi yang jelas dalam membentuk generasi berilmu dan berakhlak mulia. Pastikan nilai-nilai yang dipegang sekolah sejalan dengan prinsip yang Bunda dan Ayah tanamkan di rumah.
                                            </p>

                                            {/* Custom Quote Box */}
                                            <div className="my-8 bg-[#F3EBDD] border border-[#E0D3BC] p-6 md:p-8 rounded-2xl relative overflow-hidden flex items-center space-x-6">
                                                <div className="text-4xl text-[#D4AF37] font-serif font-bold">“</div>
                                                <p className="font-serif text-lg md:text-xl text-[#051736] font-medium leading-snug italic">
                                                    Pendidikan sejati adalah yang menuntut anak untuk mengenal Allah, mencintai ilmu, dan berbuat kebaikan.
                                                </p>
                                            </div>

                                            <h2 className="font-serif text-2xl font-bold text-[#051736] pt-4">
                                                2. Perhatikan Kurikulum dan Pendekatan Pembelajaran
                                            </h2>
                                            <p>
                                                Pilih sekolah yang memiliki kurikulum terpadu, menggabungkan ilmu dunia dan akhirat. Pendekatan pembelajaran yang aktif, kreatif, dan menyenangkan akan membantu anak berkembang optimal sesuai potensinya.
                                            </p>

                                            <h2 className="font-serif text-2xl font-bold text-[#051736] pt-4">
                                                3. Lingkungan yang Aman dan Islami
                                            </h2>
                                            <p>
                                                Lingkungan yang bersih, aman, dan penuh kasih sayang sangat penting untuk mendukung tumbuh kembang anak. Pastikan sekolah memiliki budaya Islami yang kuat dan pembiasaan ibadah yang konsisten.
                                            </p>

                                            {/* Callout Box Icon */}
                                            <div className="my-8 bg-[#F5EFE6] border border-[#E8DFC8] p-6 rounded-2xl flex items-start space-x-4">
                                                <div className="text-3xl">📖</div>
                                                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                                    <strong>Memilih sekolah adalah investasi jangka panjang untuk masa depan anak.</strong> Yuk, pilih sekolah yang bukan hanya cerdas secara akademik, tetapi juga kuat secara iman dan akhlak.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                </div>

                            </div>

                            {/* PREV / NEXT NAVIGATION CARD */}
                            <div className="bg-[#F3EBDD] border border-[#E0D3BC] rounded-3xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                {/* Artikel Sebelumnya */}
                                <Link 
                                    href={prevPost ? route('blog.show', prevPost.slug) : '#'} 
                                    className={`flex items-center space-x-4 p-3 rounded-2xl transition hover:bg-white/60 ${!prevPost && 'opacity-50 pointer-events-none'}`}
                                >
                                    <span className="text-slate-400 font-bold">‹</span>
                                    <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                                        <img src={prevPost?.image ? `/storage/${prevPost.image}` : '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Artikel Sebelumnya</p>
                                        <p className="text-xs font-bold text-[#051736] truncate">{prevPost?.title || '5 Cara Menanamkan Cinta Al-Qur\'an'}</p>
                                    </div>
                                </Link>

                                {/* Artikel Selanjutnya */}
                                <Link 
                                    href={nextPost ? route('blog.show', nextPost.slug) : '#'} 
                                    className={`flex items-center justify-end space-x-4 p-3 rounded-2xl transition hover:bg-white/60 text-right ${!nextPost && 'opacity-50 pointer-events-none'}`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Artikel Selanjutnya →</p>
                                        <p className="text-xs font-bold text-[#051736] truncate">{nextPost?.title || 'Peran Orang Tua Dalam Mendampingi'}</p>
                                    </div>
                                    <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                                        <img src={nextPost?.image ? `/storage/${nextPost.image}` : '/images/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-slate-400 font-bold">›</span>
                                </Link>
                            </div>

                        </div>


                        {/* ------------------------------------------
                            RIGHT COLUMN: SIDEBAR
                        ------------------------------------------ */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* 1. CARD TENTANG PENULIS */}
                            <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-3xl p-6 text-center space-y-4 shadow-sm">
                                <div className="flex items-center justify-center space-x-2 text-[#D4AF37] text-xs font-bold">
                                    <span>☀️</span>
                                    <span>Tentang Penulis</span>
                                </div>

                                <div className="w-20 h-20 rounded-full bg-[#051736] text-[#D4AF37] mx-auto flex items-center justify-center border-2 border-[#D4AF37]/60 shadow-md">
                                    <span className="text-3xl">☀️</span>
                                </div>

                                <div>
                                    <h4 className="font-serif text-lg font-bold text-[#051736]">Tim Attaufiq</h4>
                                    <p className="text-[11px] text-slate-500 font-light">Attaufiq Islamic School</p>
                                </div>

                                <p className="text-xs text-slate-600 font-light leading-relaxed">
                                    Tim konten Attaufiq berkomitmen untuk berbagi informasi dan inspirasi seputar pendidikan Islam, parenting, dan pengembangan anak.
                                </p>
                            </div>


                            {/* 2. CARD BAGIKAN ARTIKEL */}
                            <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-3xl p-6 space-y-4 shadow-sm">
                                <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold">
                                    <span>⚙️</span>
                                    <span className="text-slate-800">Bagikan Artikel Ini</span>
                                </div>

                                <div className="flex items-center justify-center space-x-3 pt-2">
                                    {/* WA */}
                                    <a 
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post?.title + ' ' + currentUrl)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full bg-[#051736] hover:bg-[#082352] text-white flex items-center justify-center transition shadow-sm text-sm"
                                        title="Bagikan ke WhatsApp"
                                    >
                                        💬
                                    </a>

                                    {/* FB */}
                                    <a 
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full bg-[#051736] hover:bg-[#082352] text-white flex items-center justify-center transition shadow-sm text-sm"
                                        title="Bagikan ke Facebook"
                                    >
                                        f
                                    </a>

                                    {/* Twitter / X */}
                                    <a 
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post?.title)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-10 h-10 rounded-full bg-[#051736] hover:bg-[#082352] text-white flex items-center justify-center transition shadow-sm text-sm"
                                        title="Bagikan ke Twitter"
                                    >
                                        𝕏
                                    </a>

                                    {/* Copy Link */}
                                    <button 
                                        onClick={handleCopyLink}
                                        className="w-10 h-10 rounded-full bg-[#051736] hover:bg-[#082352] text-white flex items-center justify-center transition shadow-sm text-sm relative"
                                        title="Salin Tautan"
                                    >
                                        🔗
                                        {copied && (
                                            <span className="absolute -top-8 bg-black text-white text-[9px] px-2 py-1 rounded shadow">
                                                Tersalin!
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>


                            {/* 3. CARD ARTIKEL TERKAIT */}
                            <div className="bg-[#FAF8F3] border border-[#E8DFC8] rounded-3xl p-6 space-y-4 shadow-sm">
                                <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold">
                                    <span>⚙️</span>
                                    <span className="text-slate-800">Artikel Terkait</span>
                                </div>

                                <div className="space-y-4 divide-y divide-slate-100">
                                    {relatedPosts.length > 0 ? (
                                        relatedPosts.map((related) => (
                                            <Link 
                                                key={related.id} 
                                                href={route('blog.show', related.slug)}
                                                className="pt-3 first:pt-0 flex items-center space-x-3 group"
                                            >
                                                <div className="w-16 h-14 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0 border border-slate-200">
                                                    <img 
                                                        src={related.image ? `/storage/${related.image}` : '/images/placeholder.jpg'} 
                                                        alt={related.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="inline-block text-[8px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#E8DFC8] text-[#8B6B13]">
                                                        {related.category?.name || 'UMUM'}
                                                    </span>
                                                    <h5 className="font-serif text-xs font-bold text-[#051736] group-hover:text-[#D4AF37] transition line-clamp-2 leading-snug">
                                                        {related.title}
                                                    </h5>
                                                    <p className="text-[10px] text-slate-400">
                                                        ⏱️ {new Date(related.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-xs text-slate-400 italic">Belum ada artikel terkait.</p>
                                    )}
                                </div>
                            </div>


                            {/* 4. CTA BANNER ADMISSION / PPDB */}
                            <div className="bg-[#051736] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4 border border-[#1E3B6E]">
                                {/* Arch pattern ornament */}
                                <div className="absolute right-0 bottom-0 w-32 opacity-20 pointer-events-none">
                                    <img src="/images/blog/pattern-arch-gold.png" alt="" className="w-full h-full object-contain" />
                                </div>

                                <h4 className="font-serif text-xl font-bold leading-snug">
                                    Tertarik Bergabung dengan Attaufiq?
                                </h4>

                                <p className="text-xs text-slate-300 font-light leading-relaxed">
                                    Mari tumbuh dan belajar bersama dalam lingkungan Islam yang amanah dan penuh cinta.
                                </p>

                                <Link 
                                    href="/admission" 
                                    className="inline-flex items-center justify-between w-full bg-[#D4AF37] hover:bg-[#B59226] text-[#051736] px-5 py-3 rounded-xl text-xs font-extrabold transition shadow-md"
                                >
                                    <span>Lihat Halaman Admission</span>
                                    <span>›</span>
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </AppLayout>
    );
}