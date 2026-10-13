import React, { useEffect, useState } from "react";
import Logo from "@/Components/Logo";
import { LinkButton } from "@/Components/ui/Button";
import { getNavItems } from "@/data/navigation";
import DesktopNavItem from "./DesktopNavItem";
import MobileNav from "./MobileNav";

// Fixed (not sticky). Transparent at the very top of the page — so the
// hero photo + its navy overlay bleed straight through behind the navbar,
// with no separate nav background — and picks up the glass tint
// once the page has scrolled past the top.
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navItems = getNavItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-navy/60 shadow-md backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      {/* Full-width bar, flush against right edge per reference mockup */}
      <div className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-10 lg:px-14">
        <Logo />

        {/* Nav links + CTA grouped together toward the right edge */}
        <div className="hidden items-center gap-8 md:flex">
          <nav>
            <ul className="flex items-center gap-7">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </ul>
          </nav>

          <LinkButton href="/admission" size="sm">
            Kenali Attaufiq →
          </LinkButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="p-2 text-white md:hidden cursor-pointer"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`mt-1.5 block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`mt-1.5 block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
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

