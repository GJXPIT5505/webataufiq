import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#030e21] text-slate-800 font-sans relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden antialiased">
            
            {/* ==========================================
                1. AMBIENT GLOW BACKGROUND
            ========================================== */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Pattern Grid Bintik & Garis Halus */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:28px_24px]" />

            {/* ==========================================
                2. TOMBOL KEMBALI KE BERANDA (TOP NAV)
            ========================================== */}
            <div className="w-full max-w-5xl flex justify-start mb-4 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-200 hover:text-white hover:bg-blue-600/20 transition-all py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-sm"
                >
                    <ArrowLeft size={14} className="text-[#FFC72C]" />
                    <span>Kembali ke Beranda</span>
                </Link>
            </div>

            {/* ==========================================
                3. CARD SPLIT 2 KOLOM (PERSIS SEPERTI CONTOH)
            ========================================== */}
            <div className="relative z-20 w-full max-w-5xl bg-white rounded-[32px] md:rounded-[40px] shadow-2xl shadow-blue-950/80 border border-blue-400/20 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
                
                {/* ------------------------------------------
                    KOLOM KIRI: BANNER BRANDING ATTAUFIQ
                   ------------------------------------------ */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#07327F] via-[#051736] to-[#020b1c] text-white p-8 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    
                    {/* Pattern Line-Art Gelombang & Bintik (Mirip Gambar) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                        {/* Wavy Line Art Topo */}
                        <svg className="absolute -top-10 -left-10 w-80 h-80 text-blue-300" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10,100 C30,150 70,50 100,100 C130,150 170,50 190,100" />
                            <path d="M10,120 C30,170 70,70 100,120 C130,170 170,70 190,120" />
                            <path d="M10,80 C30,130 70,30 100,80 C130,130 170,30 190,80" />
                        </svg>
                        
                        <svg className="absolute -bottom-12 -right-12 w-80 h-80 text-[#D4AF37]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10,100 C40,40 80,160 120,100 C160,40 180,140 200,100" />
                            <path d="M10,120 C40,60 80,180 120,120 C160,60 180,160 200,120" />
                        </svg>

                        {/* Dot Grid Top Right */}
                        <div className="absolute top-6 right-6 grid grid-cols-4 gap-1.5 opacity-60">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
                            ))}
                        </div>

                        {/* Plus (+) Accents */}
                        <span className="absolute top-20 left-12 text-blue-300 text-lg font-mono">+</span>
                        <span className="absolute bottom-28 right-16 text-[#FFC72C] text-xl font-mono">+</span>
                        <span className="absolute top-1/2 right-8 w-3 h-3 rounded-full border border-white/40"></span>
                        <span className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-[#FFC72C]/60"></span>
                    </div>

                    {/* Logo & Brand Header */}
                    <div className="relative z-10 space-y-4">
                        <Link href="/" className="inline-flex items-center space-x-3 group">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-xl border-2 border-[#D4AF37] group-hover:scale-105 transition-transform">
                                <img
                                    src="/images/logo/logo.png"
                                    alt="Logo Attaufiq"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <p className="text-[9px] tracking-[0.25em] text-blue-200 uppercase font-bold">SEKOLAH ISLAM</p>
                                <h2 className="font-serif font-extrabold text-xl text-white leading-tight">Attaufiq</h2>
                            </div>
                        </Link>
                    </div>

                    {/* Teks Ucapan Selamat Datang (Welcome Back!) */}
                    <div className="relative z-10 my-8 sm:my-12 space-y-3">
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FFC72C] text-[10px] font-bold uppercase tracking-wider">
                            <Sparkles size={12} />
                            <span>PORTAL RESMI</span>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide leading-tight">
                            Selamat Datang!
                        </h1>

                        <p className="text-blue-100/90 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
                            Silakan masuk untuk mengakses akun dan layanan terpadu SIT At-Taufiq Jambi.
                        </p>

                        <div className="pt-2 text-[#FFC72C] font-serif italic text-xs font-normal">
                            “Memberi Arti itu ATTAUFIQ”
                        </div>
                    </div>

                    {/* Footer Kiri: Fitur / Garansi Keamanan */}
                    <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200/80">
                        <div className="flex items-center space-x-2">
                            <ShieldCheck size={16} className="text-[#FFC72C]" />
                            <span className="font-light">Sistem Terproteksi</span>
                        </div>
                        <span className="text-[#D4AF37]">✦ ✦ ✦</span>
                    </div>

                </div>

                {/* ------------------------------------------
                    KOLOM KANAN: TEMPAT FORM (INERTIA CHILDREN)
                   ------------------------------------------ */}
                <div className="lg:col-span-7 bg-white p-8 sm:p-10 md:p-14 flex flex-col justify-between relative">
                    
                    {/* Header Kecil Kanan (Khusus Layar HP) */}
                    <div className="lg:hidden mb-6 pb-4 border-b border-slate-100">
                        <p className="text-xs font-bold text-[#07327F] uppercase tracking-wider">SIT At-Taufiq Jambi</p>
                    </div>

                    {/* Form Children (Login / Register / Reset Password) */}
                    <div className="my-auto">
                        {children}
                    </div>

                    {/* Footer Hak Cipta Kanan */}
                    <div className="mt-8 pt-4 text-center lg:text-left text-[11px] text-slate-400 font-sans border-t border-slate-100">
                        <p>© 2026 SIT At-Taufiq Jambi. All rights reserved.</p>
                    </div>

                </div>

            </div>
        </div>
    );
}