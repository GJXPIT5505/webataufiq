import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#071938] text-slate-800 font-sans relative flex flex-col justify-center items-center p-4 sm:p-6 overflow-hidden antialiased">
            
            {/* ==========================================
                1. BLUE AMBIENT LIGHT & MESH PATTERN
            ========================================== */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Pattern Mesh Biru Halus */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* ==========================================
                2. TOMBOL KEMBALI KE BERANDA
            ========================================== */}
            <div className="relative z-20 mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-200 hover:text-white hover:bg-blue-600/30 transition-all py-2 px-4 rounded-full bg-blue-900/40 border border-blue-400/30 backdrop-blur-md shadow-sm"
                >
                    <ArrowLeft size={14} className="text-blue-400" />
                    <span>Kembali ke Beranda</span>
                </Link>
            </div>

            {/* ==========================================
                3. CARD LAYOUT UTAMA (SERBA BIRU ELEGAN)
            ========================================== */}
            <div className="relative z-20 w-full sm:max-w-md">
                
                {/* Header Logo & Judul */}
                <div className="text-center mb-6 flex flex-col items-center">
                    <Link href="/" className="group flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 shadow-2xl shadow-blue-500/30 border-2 border-blue-400 group-hover:scale-105 transition-transform duration-300">
                            <img
                                src="/images/logo/logo.png"
                                alt="SIT At-Taufiq Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <div className="absolute -bottom-1.5 bg-[#07327F] text-white text-[9px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-blue-400/50">
                                Attaufiq
                            </div>
                        </div>
                    </Link>

                    <h1 className="font-serif font-bold text-2xl text-white mt-5 tracking-wide">
                        SIT At-Taufiq Jambi
                    </h1>
                    <p className="text-xs text-blue-200/80 font-light mt-1">
                        Sistem Informasi & Layanan Terpadu
                    </p>
                </div>

                {/* Card Form Bersih dengan Aksen Biru */}
                <div className="relative bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-blue-950/60 border border-blue-100 overflow-hidden">
                    
                    {/* Aksen Hiasan Biru Atas */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center space-x-2 text-blue-600">
                            <span className="w-8 h-[2px] bg-blue-600/20 rounded-full"></span>
                            <Sparkles size={15} className="text-blue-600 animate-pulse" />
                            <span className="w-8 h-[2px] bg-blue-600/20 rounded-full"></span>
                        </div>
                    </div>

                    {/* Tempat Form Login / Register / Forgot Password */}
                    <div className="relative z-10">
                        {children}
                    </div>

                    {/* Footer Kecil di Dalam Card */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center space-x-1.5 text-[#07327F] font-semibold">
                            <ShieldCheck size={14} className="text-blue-600" />
                            <span>Akses Terproteksi</span>
                        </span>
                        <span className="text-blue-500 font-bold">● ● ●</span>
                    </div>

                </div>

                {/* Copyright Bawah */}
                <div className="text-center mt-6 text-[11px] text-blue-200/60 font-sans">
                    <p>© 2026 SIT At-Taufiq Jambi. Memberi Arti Itu Attaufiq.</p>
                </div>

            </div>
        </div>
    );
}