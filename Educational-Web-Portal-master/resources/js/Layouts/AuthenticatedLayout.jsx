// resources/js/Layouts/AuthenticatedLayout.jsx

import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    // AMBIL DATA USER DARI GLOBAL PROPS INERTIA
    const { auth, url = '' } = usePage().props;
    const user = auth.user; // Sekarang user gak bakal undefined selama kamu login

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* --- SIDEBAR --- */}
            {/* --- SIDEBAR (Kiri) --- */}
            <aside className="w-64 bg-[#003366] text-white hidden md:flex flex-col sticky top-0 h-screen shadow-xl">
                {/* Logo Section */}
                <div className="p-8 border-b border-white/10">
                    <Link href="/" className="flex flex-col">
                        <span className="text-2xl font-black tracking-tighter italic uppercase">AT-TAUFIQ<span className="text-[#FF6600]">.</span></span>
                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Admin Dashboard</span>
                    </Link>
                </div>

                {/* Navigasi Menu - PASTIKAN BAGIAN INI ADA ISI-NYA */}
                <nav className="flex-grow p-6 space-y-3">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Main Menu</p>

                    {/* Menu Dashboard */}
                    <Link
                        href={route('dashboard')}
                        className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${url === '/dashboard' ? 'bg-[#FF6600] shadow-lg shadow-orange-900/40 text-white' : 'hover:bg-white/5 text-white/70'}`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest">🏠 Dashboard</span>
                    </Link>

                    {/* Menu Kelola Blog (CRUD yang tadi kita buat) */}
                    <Link
                        href={route('admin.posts.index')}
                        className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${url.startsWith('/admin/posts') ? 'bg-[#FF6600] shadow-lg shadow-orange-900/40 text-white' : 'hover:bg-white/5 text-white/70'}`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest">📝 Kelola Blog</span>
                    </Link>

                    {/* Menu Gallery (Masih dummy dulu) */}
                    <Link
                        href={route('admin.gallery.index')}
                        className={`flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${url.startsWith('/admin/gallery') ? 'bg-[#FF6600] shadow-lg shadow-orange-900/40 text-white' : 'hover:bg-white/5 text-white/70'}`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest">🖼️ Gallery</span>
                    </Link>

                    {/* Menu Slider (Masih dummy dulu) */}
                    <Link
                        href={route('admin.categories.index')}
                        className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-white/5 transition text-white/30 opacity-50 cursor-not-allowed"
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest">🎡 Category</span>
                    </Link>
                    <Link
                        href={route('admin.events.index')}
                        className={`flex items-center space-x-3 p-4 rounded-2xl transition ${route().current('admin.events.*')
                                ? 'bg-white/10 text-white font-bold'
                                : 'text-white/70 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest">🎪 Events & Programs</span>
                    </Link>
                </nav>

                {/* Footer Sidebar (User Info) */}
                <div className="p-6 border-t border-white/10 bg-black/20">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#FF6600] flex items-center justify-center font-bold text-xs uppercase">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-black truncate uppercase">{user?.name}</p>
                            <p className="text-[10px] text-white/40 truncate italic">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-grow flex flex-col">
                <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8">
                    <div>{header}</div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right mr-4 hidden sm:block">
                            {/* Pakai optional chaining ?. agar tidak crash */}
                            <p className="text-xs font-bold text-slate-800">{user?.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium italic">{user?.email}</p>
                        </div>
                        {/* ... tombol logout ... */}
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}