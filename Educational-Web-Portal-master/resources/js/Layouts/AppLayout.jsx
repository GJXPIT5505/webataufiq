import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Info, UserPlus, MessageCircleQuestion, MapPin } from 'lucide-react';
import Footer from "@/Components/Footer";

// Menyiapkan konstanta path gambar agar lebih rapi dan mudah di-maintain
const ASSETS = {
    LOGO: '/images/logo/logo.png',
    BUILDING_HERO: '/images/hero/building-attaufiq.png',
};

export default function AppLayout({ children, title }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);// Fix 1: Menambahkan State openDropdown

    // Deteksi scroll untuk efek glassmorphism navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        {
            name: 'Tentang Kami',
            href: '/about',
            children: [
                { name: 'Sejarah', href: '/sejarah', desc: 'Mengenal rekam jejak & perjalanan sekolah' },
                { name: 'FAQ', href: '/faq', desc: 'Pertanyaan yang sering ditanyakan' },
                { name: 'Kontak Us', href: '/contact', desc: 'Hubungi kami & lokasi kampus' },
            ]
        },
        {
            name: 'Jenjang', href: '/jenjang',
            children: [
                { name: 'PG', href: '/pg' },
                { name: 'TK', href: '/tk' },
                { name: 'SD', href: '/sd' },
                { name: 'SMP', href: '/smp' },
                { name: 'SMA', href: '/sma' },
            ]
        },
        { name: 'Admission', href: '/#admission' },
        { name: 'Events', href: '/#events' },
        { name: 'Programs', href: '/#events' },
        { name: 'Berita', href: '/#blog' },
    ];

    // HAMBURGER MENU
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    const toggleMobileSubmenu = (name) => {
        setMobileDropdown(mobileDropdown === name ? null : name);
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] font-sans text-slate-800 relative antialiased flex flex-col justify-between">
            <Head title={title ? `${title} - SIT At-Taufiq Jambi` : 'SIT At-Taufiq Jambi - Sekolah Islam Terpadu'} />

            {/* --- HEADER / NAVBAR --- */}
            <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#D4AF37]/20 ${
        scrolled
          ? 'bg-[#051C42]/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-[#07327F] py-4'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 flex justify-between items-center max-w-7xl">

        {/* Logo At-Taufiq */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-md border border-[#D4AF37]">
            <img
              src={ASSETS?.LOGO}
              alt="At-Taufiq Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="font-serif font-black text-xl sm:text-2xl text-white tracking-wider uppercase group-hover:text-[#F3E5AB] transition">
            AT-TAUFIQ<span className="text-[#D4AF37]">.</span>
          </div>
        </Link>

        {/* Menu Navigasi Utama (Desktop) */}
        <div className="hidden md:flex space-x-8 text-xs font-bold tracking-widest items-center">
          {navLinks?.map((link) => {
            const isActive = url === link.href || (link.href !== '/' && url?.startsWith(link.href));
            const hasChildren = link.children && link.children.length > 0;

            return (
              <div
                key={link.name}
                className="relative group py-2"
                onMouseEnter={() => hasChildren && setOpenDropdown(link.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center space-x-1 transition py-1 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-blue-100/80 hover:text-[#F3E5AB]'
                  }`}
                >
                  <span>{link.name}</span>
                  {hasChildren && (
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-1 flex justify-center">
                      <svg viewBox="0 0 40 6" fill="none" className="w-full h-auto text-[#D4AF37]">
                        <path d="M1 3C10 0.5 30 5.5 39 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  )}
                </Link>

                {/* SUBMENU BOX DESKTOP */}
                {hasChildren && (
                  <div
                    className={`absolute left-0 top-full pt-2 w-64 transition-all duration-300 transform ${
                      openDropdown === link.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/30 p-2 overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                      <div className="divide-y divide-slate-100">
                        {link.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group/sub block p-3 rounded-xl hover:bg-[#FAF8F5] transition duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-slate-800 group-hover/sub:text-[#07327F] font-bold text-xs capitalize tracking-normal transition">
                                {subItem.name}
                              </span>
                              <span className="text-[#D4AF37] opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all text-xs">
                                →
                              </span>
                            </div>
                            {subItem.desc && (
                              <p className="text-[10px] text-slate-400 font-normal capitalize tracking-normal mt-0.5 leading-tight">
                                {subItem.desc}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tombol Aksi Desktop & Hamburger Mobile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a
            href="#ppdb"
            className="hidden sm:inline-block bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#051C42] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            PPDB Online
          </a>

          {/* TOMBOL HAMBURGER (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 text-white hover:text-[#D4AF37] focus:outline-none transition"
          >
            {isMobileMenuOpen ? (
              /* Ikon Close (X) */
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Ikon Hamburger */
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ================= PANEL MENU MOBILE ================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#051C42] border-b border-[#D4AF37]/30 px-6 pt-4 pb-6 space-y-3 transition-all">
          {navLinks?.map((link) => {
            const hasChildren = link.children && link.children.length > 0;
            const isOpen = mobileDropdown === link.name;

            return (
              <div key={link.name} className="border-b border-white/5 pb-2">
                <div className="flex justify-between items-center py-2">
                  <Link
                    href={link.href}
                    onClick={() => !hasChildren && setIsMobileMenuOpen(false)}
                    className="text-white text-sm font-bold tracking-wider hover:text-[#D4AF37]"
                  >
                    {link.name}
                  </Link>
                  {hasChildren && (
                    <button
                      onClick={() => toggleMobileSubmenu(link.name)}
                      className="p-1 text-[#D4AF37]"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* SUBMENU ACCORDION MOBILE */}
                {hasChildren && isOpen && (
                  <div className="pl-4 mt-2 space-y-2 bg-white/5 rounded-xl p-3">
                    {link.children.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-xs text-slate-300 hover:text-[#D4AF37] py-1"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tombol PPDB Mobile */}
          <div className="pt-2">
            <a
              href="#ppdb"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center w-full bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#051C42] py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest transition shadow-md"
            >
              PPDB Online
            </a>
          </div>
        </div>
      )}
    </header>


            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-grow">{children}</main>

            {/* --- FLOATING DIAMOND BUTTONS --- */}


            <div className="fixed right-6 bottom-12 z-[100] group flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 rotate-45 transform scale-90 hover:scale-100 transition duration-500 ease-out cursor-pointer shadow-2xl shadow-[#051C42]/50 rounded-2xl p-1 bg-[#07327F]/20 backdrop-blur-sm border border-[#D4AF37]/30">

                    {/* INFO */}
                    <div className="w-14 h-14 bg-[#FFC72C] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:-translate-y-1 transition duration-300">
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-[#051C42]">
                            <Info className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-bold text-[9px] uppercase leading-none">Info</span>
                        </div>
                    </div>

                    {/* DAFTAR */}
                    <div className="w-14 h-14 bg-[#008144] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:-translate-y-1 transition duration-300 relative group/icon">
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-white">
                            <UserPlus className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Daftar</span>
                        </div>
                        <span className="absolute -top-12 -right-4 bg-[#051C42] border border-[#D4AF37] text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover/icon:opacity-100 transition whitespace-nowrap font-bold italic shadow-xl">
                            Pendaftaran Santri Baru
                        </span>
                    </div>

                    {/* TANYA */}
                    <div className="w-14 h-14 bg-[#07327F] rounded-xl flex items-center justify-center shadow-md hover:-translate-x-1 hover:translate-y-1 transition duration-300 border border-[#D4AF37]/40">
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-white">
                            <MessageCircleQuestion className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Tanya</span>
                        </div>
                    </div>

                    {/* LOKASI */}
                    <div className="w-14 h-14 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-md hover:translate-x-1 hover:translate-y-1 transition duration-300">
                        <div className="-rotate-45 flex flex-col items-center gap-0.5 text-[#051C42]">
                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                            <span className="font-black text-[9px] uppercase tracking-widest leading-none">Lokasi</span>
                        </div>
                    </div>

                </div>
                <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10"></div>
            </div>

            {/* --- FOOTER --- */}
            {/* <footer className="relative bg-[#FAF8F5] text-white pt-10 overflow-hidden font-sans">
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="relative bg-[#0047BA] rounded-t-[50px] md:rounded-t-[80px] border-t-2 border-x-2 border-[#D4AF37] p-8 md:p-14 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                            <img
                                src={ASSETS.BUILDING_HERO}
                                alt="Mosque Pattern Background"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#003B99] via-[#0047BA]/90 to-[#003B99]"></div>
                        </div>

                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[#D4AF37] text-xl z-10">
                            ☀️
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 relative z-10 items-start pt-4">
                            <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-4 border-b lg:border-b-0 lg:border-r border-blue-400/30 pb-8 lg:pb-0">
                                <div className="flex items-center space-x-3">
                                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 shadow-md">
                                        <img
                                            src={ASSETS.LOGO}
                                            alt="At-Taufiq Logo"
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/50";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-[0.2em] uppercase text-blue-200 font-semibold">SEKOLAH ISLAM</p>
                                        <h3 className="font-serif text-2xl font-bold text-white leading-none">Attaufiq</h3>
                                        <p className="text-[9px] tracking-widest text-blue-200 uppercase mt-0.5">PG-TK-SD-SMP-SMA</p>
                                    </div>
                                </div>

                                <p className="text-[#F3E5AB] font-serif italic text-sm md:text-base font-normal pt-1">
                                    Memberi Arti itu ATTAUFIQ
                                </p>

                                <p className="text-blue-100/90 text-xs md:text-sm font-light leading-relaxed">
                                    Membina generasi beradab dengan pendidikan Islam yang menyeluruh, menggabungkan ilmu, karakter, dan spiritualitas untuk masa depan yang penuh keberkahan.
                                </p>

                                <div className="flex justify-center md:justify-start pt-2">
                                    <span className="text-[#D4AF37] text-xs">☀️ ──────────</span>
                                </div>
                            </div>

                            <div className="lg:col-span-3 space-y-6 lg:border-r border-blue-400/30 pr-0 lg:pr-4">
                                <div className="space-y-1.5">
                                    <div className="flex items-center space-x-2 text-white">
                                        <span className="text-[#D4AF37] text-base">📍</span>
                                        <h4 className="font-semibold text-sm">Alamat PG-TK & SD</h4>
                                    </div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                                    <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                                        Jl. Letkol M. Insya No.2, Rajawali, Kec. Jambi Tim., Kota Jambi, Jambi 36143
                                    </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <div className="flex items-center space-x-2 text-white">
                                        <span className="text-[#D4AF37] text-base">📍</span>
                                        <h4 className="font-semibold text-sm">Alamat SMP-SMA</h4>
                                    </div>
                                    <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent my-1"></div>
                                    <p className="text-blue-100/80 text-xs font-light leading-relaxed pl-6">
                                        Jl. Gn. Kidul No.11, Talang Banjar, Kec. Jambi Tim., Kota Jambi, Jambi 36142
                                    </p>
                                </div>
                            </div>

                            <div className="lg:col-span-3 space-y-3 lg:border-r border-blue-400/30 pr-0 lg:pr-4">
                                <div className="flex items-center space-x-2 text-white mb-1">
                                    <span className="text-[#D4AF37] text-base">📞</span>
                                    <h4 className="font-semibold text-sm">Kontak Kami</h4>
                                </div>
                                <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent mb-3"></div>

                                <a href="mailto:smpakislamattaufiq@gmail.com" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <span className="text-[#D4AF37] text-sm">✉️</span>
                                    <span>Email : smpakislamattaufiq@gmail.com</span>
                                </a>

                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <span className="text-[#D4AF37] text-sm">📸</span>
                                    <span>@instagram</span>
                                </a>

                                <a href="https://wa.me/6285268797915" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <span className="text-[#D4AF37] text-sm">💬</span>
                                    <span>+62 852-6879-7915 (WA PG-TK-SD)</span>
                                </a>

                                <a href="https://wa.me/6281927421650" target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-xs text-blue-100/90 hover:text-white transition py-1">
                                    <span className="text-[#D4AF37] text-sm">💬</span>
                                    <span>+62 819-2742-1650 (WA SMP-SMA)</span>
                                </a>
                            </div>

                            <div className="lg:col-span-2 space-y-3">
                                <h4 className="font-semibold text-sm text-white">Follow Us</h4>
                                <div className="w-full h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent mb-4"></div>

                                <div className="flex items-center space-x-2.5">
                                    <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">f</a>
                                    <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">📷</a>
                                    <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">▶</a>
                                    <a href="#" className="w-9 h-9 rounded-full border border-blue-300/40 hover:border-[#D4AF37] bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#0047BA] flex items-center justify-center transition text-xs font-bold shadow-sm">♪</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#FAF8F5] text-slate-700 py-6 text-center text-xs md:text-sm font-serif border-t border-[#E8DFC8] relative z-20">
                    <div className="container mx-auto px-6 flex items-center justify-center space-x-3">
                        <span className="text-[#D4AF37] text-xs">─── ◆</span>
                        <p className="text-[#003366] font-medium">
                            Copyright © 2026 Memberi Arti Itu Attaufiq | Powered by Memberi Arti Itu Attaufiq
                        </p>
                        <span className="text-[#D4AF37] text-xs">◆ ───</span>
                    </div>
                </div>
            </footer> */}
            <Footer />
        </div>
    );
}
