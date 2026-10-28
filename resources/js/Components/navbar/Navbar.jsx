import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Logo from "@/Components/Logo";
import { LinkButton } from "@/Components/ui/Button";
import { getNavItems } from "@/data/navigation";
import DesktopNavItem from "./DesktopNavItem";
import MobileNav from "./MobileNav";

// Fixed (not sticky). Transparent at the very top of the page — so the
// hero photo + its navy overlay bleed straight through behind the navbar.
// Below lg the tint is a near-opaque navy WITHOUT backdrop-blur: blurring
// everything under a fixed bar on every scroll frame is one of the most
// expensive things a phone GPU can be asked to do.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Ambil data navigasi dinamis dari database via shared Inertia props
  const { navEvents = [], navPrograms = [] } = usePage().props;
  const navItems = getNavItems({ navEvents, navPrograms });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-navy/90 shadow-sm lg:bg-navy/35 lg:backdrop-blur-md"
          : mobileOpen
            ? "border-white/10 bg-[#051C42] lg:border-transparent lg:bg-transparent"
            : "border-transparent bg-transparent"
      }`}
    >
      {/* Full-width bar, flush against right edge per reference mockup */}
      <div className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-10 lg:px-14">
        <Logo />

        {/* Nav links + CTA grouped together toward the right edge (desktop >= 1024px) */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav>
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          <LinkButton href="/admission" size="sm" className="lg:min-h-0">
            Kenali Attaufiq →
          </LinkButton>
        </div>

        {/* Mobile Hamburger Button (< 1024px) */}
        <button
          type="button"
          className="-mr-2 grid h-12 w-12 place-items-center text-white lg:hidden cursor-pointer"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-white transition-transform duration-200 ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-white transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-white transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <MobileNav
        items={navItems}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
