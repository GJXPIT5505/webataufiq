import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    FileText, 
    Image as ImageIcon, 
    FolderTree, 
    Calendar, 
    LogOut, 
    Menu, 
    X, 
    ExternalLink,
    Globe
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, url = '' } = usePage().props;
    const user = auth?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            active: url === '/dashboard',
            icon: LayoutDashboard,
        },
        {
            name: 'Kelola Blog',
            href: route('admin.posts.index'),
            active: url.startsWith('/admin/posts'),
            icon: FileText,
        },
        {
            name: 'Gallery Foto',
            href: route('admin.gallery.index'),
            active: url.startsWith('/admin/gallery'),
            icon: ImageIcon,
        },
        {
            name: 'Kategori',
            href: route('admin.categories.index'),
            active: url.startsWith('/admin/categories'),
            icon: FolderTree,
        },
        {
            name: 'Events & Programs',
            href: route('admin.events.index'),
            active: url.startsWith('/admin/events'),
            icon: Calendar,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased font-sans">
            
            {/* --- SIDEBAR DESKTOP --- */}
            <aside className="w-64 bg-[#07327F] text-white hidden md:flex flex-col sticky top-0 h-screen shadow-2xl z-30 shrink-0">
                {/* Logo Section */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center space-x-3 group">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shadow-md">
                            <img
                                src="/images/logo/logo.png"
                                alt="Logo"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <div>
                            <span className="text-sm font-black tracking-wider uppercase text-white block">
                                AT-TAUFIQ<span className="text-[#FFC72C]">.</span>
                            </span>
                            <span className="text-[10px] text-blue-200/70 uppercase tracking-widest font-semibold block">
                                Panel CMS Admin
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigasi Menu */}
                <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
                    <p className="text-[10px] font-bold text-blue-200/50 uppercase tracking-[0.2em] px-3 mb-2">
                        Menu Utama
                    </p>

                    {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                                    item.active
                                        ? 'bg-[#FFC72C] text-[#07327F] shadow-lg shadow-black/10 font-extrabold'
                                        : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-4 border-t border-white/10 my-2">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-100/70 hover:bg-white/10 hover:text-white transition"
                        >
                            <span className="flex items-center space-x-2.5">
                                <Globe size={15} />
                                <span>Lihat Website</span>
                            </span>
                            <ExternalLink size={13} className="text-blue-300" />
                        </a>
                    </div>
                </nav>

                {/* Footer Sidebar (User Info & Logout) */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5 overflow-hidden">
                            <div className="w-8 h-8 rounded-full bg-[#FFC72C] text-[#07327F] flex items-center justify-center font-black text-xs shrink-0 uppercase">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold truncate text-white">{user?.name || 'Admin'}</p>
                                <p className="text-[10px] text-blue-200/60 truncate italic">{user?.email || 'admin@attaufiq.sch.id'}</p>
                            </div>
                        </div>

                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            title="Keluar (Logout)"
                            className="p-2 rounded-lg text-blue-200 hover:text-rose-300 hover:bg-rose-500/20 transition shrink-0"
                        >
                            <LogOut size={16} />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MOBILE NAVBAR --- */}
            <div className="md:hidden bg-[#07327F] text-white px-4 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-md">
                <Link href="/dashboard" className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-0.5">
                        <img
                            src="/images/logo/logo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                    <span className="text-xs font-black tracking-wider uppercase text-white">
                        AT-TAUFIQ <span className="text-[#FFC72C]">CMS</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-2">
                    <Link
                        method="post"
                        href={route('logout')}
                        as="button"
                        className="p-2 text-rose-300 hover:bg-white/10 rounded-lg text-xs"
                        title="Keluar"
                    >
                        <LogOut size={18} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 text-white hover:bg-white/10 rounded-lg"
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden bg-[#052254] text-white px-4 py-4 space-y-2 border-b border-white/10 shadow-xl z-30">
                    {navLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                                    item.active
                                        ? 'bg-[#FFC72C] text-[#07327F]'
                                        : 'text-blue-100 hover:bg-white/10'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center space-x-2 text-blue-200 py-2"
                        >
                            <Globe size={14} />
                            <span>Lihat Website Utama</span>
                        </a>
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="text-rose-300 font-bold py-2"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-grow flex flex-col min-w-0">
                {header && (
                    <header className="bg-white border-b border-slate-200/80 min-h-16 flex items-center justify-between px-6 sm:px-8 py-3">
                        <div className="w-full">{header}</div>

                        <div className="hidden sm:flex items-center space-x-4 shrink-0 pl-4">
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-800">{user?.name || 'Administrator'}</p>
                                <p className="text-[10px] text-slate-400 font-medium italic">{user?.email || 'admin@attaufiq.sch.id'}</p>
                            </div>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition"
                            >
                                <LogOut size={13} />
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </header>
                )}

                <main className="p-4 sm:p-6 md:p-8 flex-grow">
                    {children}
                </main>
            </div>

        </div>
    );
}