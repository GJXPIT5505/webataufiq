import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from "@/Components/navbar/Navbar";
import Footer from "@/Components/Footer";
import QuickMenu from "@/Components/QuickMenu/QuickMenu";
import QuickMenuMobile from "@/Components/QuickMenu/QuickMenuMobile";

export default function AppLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-ivory font-sans text-navy relative antialiased flex flex-col justify-between overflow-x-clip">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* --- HEADER / NAVBAR (Fixed Transparent -> Glass on Scroll) --- */}
            <Navbar />

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-grow overflow-x-clip">{children}</main>

            {/* --- FLOATING QUICK MENU (BINTANG 8) --- */}
            <QuickMenu />
            <QuickMenuMobile />

            {/* --- FOOTER --- */}
            <Footer />
        </div>
    );
}
