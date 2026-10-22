import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FileText, 
    Image as GalleryIcon, 
    FolderKanban, 
    Calendar, 
    LogOut, 
    Menu, 
    X, 
    ChevronRight,
    Sparkles,
    Shield
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, url = '' } = usePage().props;
    const user = auth?.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // List item navigasi sidebar
    const navigationItems = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: url === '/dashboard',
        },
        {
            name: 'Kelola Blog',
            href: route('admin.posts.index'),
            icon: FileText,
            active: url.startsWith('/admin/posts'),
        },
        {
            name: 'Gallery',
            href: route('admin.gallery.index'),
            icon: GalleryIcon,
            active: url.startsWith('/admin/gallery'),
        },
        {
            name: 'Kategori Blog',
            href: route('admin.categories.index'),
            icon: FolderKanban,
            active: url.startsWith('/admin/categories'),
        },
        {
            name: 'Events & Programs',
            href: route('admin.events.index'),
            icon: Calendar,
            active: url.startsWith('/admin/events'),
        },
    ];

    // Sub-komponen Sidebar Content agar reusable di Desktop & Mobile Drawer
    const SidebarContent = () => (
        <div className="flex flex-col h-full justify-between bg-gradient-to-b from-[#051736] via-[#07327F] to-[#020b1c] text-white">
            
            {/* 1. Header Logo Section */}
            <div>
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center p-1.5 shadow-lg border-2 border-[#D4AF37] group-hover:scale-105 transition-transform flex-shrink-0">
                            <img
                                src="/images/logo/logo.png"
                                alt="SIT At-Taufiq Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <div className="overflow-hidden">
                            <div className="flex items-center space-x-1">
                                <span className="font-serif font-extrabold text-lg text-white tracking-wide">
                                    Attaufiq
                                </span>
                                <span className="text-[#FFC72C] text-xs">✦</span>
                            </div>
                            <span className="text-[10px] text-blue-200/70 uppercase tracking-widest font-semibold block -mt-0.5">
                                Admin Dashboard
                            </span>
                        </div>
                    </Link>

                    {/* Tombol Close Menu di HP */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="md:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 2. Menu Navigasi Utama */}
                <nav className="p-4 sm:p-5 space-y-1.5">
                    <p className="text-[10px] font-bold text-blue-300/40 uppercase tracking-[0.25em] px-3 mb-3">
                        Main Navigation
                    </p>

                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${
                                    item.active
                                        ? 'bg-[#FFC72C] text-[#051736] font-bold shadow-lg shadow-amber-500/20'
                                        : 'text-blue-100/80 hover:bg-white/10 hover:text-white font-medium'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <Icon 
                                        size={18} 
                                        className={item.active ? 'text-[#051736]' : 'text-blue-300 group-hover:text-white'} 
                                    />
                                    <span className="text-xs tracking-wide">{item.name}</span>
                                </div>
                                {item.active && <ChevronRight size={14} className="text-[#051736]" />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* 3. Footer Sidebar: Profil User & Logout */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFC72C] to-amber-500 flex items-center justify-center font-bold text-xs text-[#051736] shadow-sm flex-shrink-0">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="overflow-hidden pr-2">
                            <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
                            <p className="text-[10px] text-blue-200/60 truncate font-light">{user?.email || 'admin@attaufiq.sch.id'}</p>
                        </div>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="p-2 rounded-xl text-red-300 hover:text-white hover:bg-red-500/30 transition duration-200"
                        title="Keluar"
                    >
                        <LogOut size={16} />
                    </Link>
                </div>
            </div>

        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex font-sans antialiased">
            
            {/* ==========================================
                1. DESKTOP SIDEBAR (FIXED / STICKY)
            ========================================== */}
            <aside className="w-64 hidden md:flex flex-col sticky top-0 h-screen shadow-2xl z-30 flex-shrink-0">
                <SidebarContent />
            </aside>

            {/* ==========================================
                2. MOBILE DRAWER SIDEBAR
            ========================================== */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop Blur */}
                    <div 
                        className="fixed inset-0 bg-[#051736]/70 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="relative w-4/5 max-w-xs h-full shadow-2xl z-10">
                        <SidebarContent />
                    </div>
                </div>
            )}

            {/* ==========================================
                3. MAIN AREA (TOPBAR + CONTENT)
            ========================================== */}
            <div className="flex-grow flex flex-col min-w-0">
                
                {/* TOPBAR / HEADER BAR */}
                <header className="bg-white/90 backdrop-blur-md border-b border-[#E8DFC8] h-20 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 shadow-xs">
                    
                    {/* Kiri: Hamburger Button (Mobile) & Header Slot */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#051736] hover:text-white transition focus:outline-none"
                            aria-label="Buka Menu"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="font-serif text-lg sm:text-2xl font-bold text-[#051736] truncate">
                            {header}
                        </div>
                    </div>

                    {/* Kanan: Badge Profile & Live View Link */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-[#07327F] hover:text-[#C9972E] bg-blue-50 hover:bg-amber-50 px-3.5 py-2 rounded-full border border-blue-200 transition"
                        >
                            <Sparkles size={13} className="text-[#FFC72C]" />
                            <span>Lihat Website</span>
                        </Link>

                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-xs font-bold text-[#051736] leading-tight">{user?.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Administrator</span>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-[#051736] border border-[#D4AF37] flex items-center justify-center text-[#FFC72C] font-bold text-xs shadow-xs">
                            {user?.name ? user.name.charAt(0).toUpperCase() : <Shield size={16} />}
                        </div>
                    </div>

                </header>

                {/* MAIN PAGE CONTAINER */}
                <main className="p-4 sm:p-6 lg:p-8 flex-grow">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
}