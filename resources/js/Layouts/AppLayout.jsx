import React from 'react';
import { Head } from '@inertiajs/react';
import { Info, UserPlus, MessageCircleQuestion, MapPin } from 'lucide-react';
import Navbar from "@/Components/navbar/Navbar";
import Footer from "@/Components/Footer";

export default function AppLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-ivory font-sans text-navy relative antialiased flex flex-col justify-between">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* --- HEADER / NAVBAR (Fixed Transparent -> Glass on Scroll) --- */}
            <Navbar />

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-grow">{children}</main>

            {/* --- FLOATING DIAMOND BUTTONS --- */}
            <div className="fixed right-6 bottom-12 z-[100] group flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-90 hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl shadow-[#051C42]/50 rounded-2xl p-1 bg-[#07327F]/20 backdrop-blur-sm border border-[#D4AF37]/30">

                    {/* INFO */}
                    <a
                        href="/about#faq"
                        className="w-14 h-14 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300"
                        title="Informasi & FAQ"
                    >
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-[#051C42]">
                            <Info className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-bold text-[9px] uppercase leading-none">Info</span>
                        </div>
                    </a>

                    {/* DAFTAR */}
                    <a
                        href="/admission"
                        className="w-14 h-14 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative group/icon"
                        title="Pendaftaran Santri Baru"
                    >
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-white">
                            <UserPlus className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Daftar</span>
                        </div>
                        <span className="absolute -top-12 -right-4 bg-[#051C42] border border-[#D4AF37] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-bold italic shadow-xl pointer-events-none">
                            Pendaftaran Santri Baru
                        </span>
                    </a>

                    {/* TANYA */}
                    <a
                        href="https://wa.me/6285268797915"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-[#07327F] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300 border border-[#D4AF37]/40"
                        title="Tanya via WhatsApp"
                    >
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-white">
                            <MessageCircleQuestion className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Tanya</span>
                        </div>
                    </a>

                    {/* LOKASI */}
                    <a
                        href="/about#contact"
                        className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300"
                        title="Lokasi Kampus"
                    >
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-[#051C42]">
                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Lokasi</span>
                        </div>
                    </a>

                </div>
                <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </div>

            {/* --- FOOTER --- */}
            <Footer />
        </div>
    );
}
