import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import { MessageCircleMore, X } from "lucide-react";
import { PETALS, STAR_POINTS } from "./QuickMenu";

// Top-to-bottom order on the phone.
const ORDER = ["top", "left", "right", "bottom"];
const ITEMS = ORDER.map((side) => PETALS.find((p) => p.side === side));

// Rail dot colour per pill (ivory pills get a navy dot, like the mockup).
const dotColor = (fill) => (fill === "#FBF6EA" ? "#102380" : fill);

export default function QuickMenuMobile() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      setOpen(false);
      // Hide while reading downward; show again on the way back up.
      setHidden(delta > 0 && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="quick-menu-mobile">
      {/* Tap-outside catcher + light dim while open. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[89] bg-navy/20 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed right-3 z-[90] flex flex-col items-end transition-transform duration-300 ease-out ${
          hidden && !open ? "translate-y-[calc(100%+2rem)]" : ""
        }`}
        style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        {/* Pills + dotted rail */}
        <nav
          id="quick-menu-mobile-list"
          aria-label="Menu cepat"
          className={`relative mb-3 mr-1 pr-6 transition-all duration-300 ease-out ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <span aria-hidden="true" className="absolute bottom-5 right-[9px] top-5 w-0.5 rounded-full bg-navy/25" />
          <ul className="flex flex-col items-end gap-2.5">
            {ITEMS.map(({ label, sub, href, external, Icon, fill }, i) => {
              const LinkComponent = external || href.startsWith("http") ? "a" : Link;

              return (
                <li
                  key={href}
                  className="relative transition-all duration-300 ease-out"
                  style={{
                    transitionDelay: open ? `${(ITEMS.length - 1 - i) * 40}ms` : "0ms",
                    transform: open ? "none" : "translateX(12px)",
                  }}
                >
                  <LinkComponent
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="flex min-h-12 items-center gap-2.5 rounded-full py-2 pl-3 pr-5 text-navy shadow-[0_6px_16px_rgba(16,35,128,0.18)] ring-1 ring-navy/5"
                    style={{ backgroundColor: fill }}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={2} />
                    <span className="text-sm font-extrabold uppercase tracking-wide">
                      {label}
                      {sub && <span className="ml-1 font-bold">{sub}</span>}
                    </span>
                  </LinkComponent>
                  {/* Rail dot level with this pill. */}
                  <span
                    aria-hidden="true"
                    className="absolute -right-[19px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: dotColor(fill) }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Same navy star as the desktop menu (chat icon + MENU); shows an
            X and "TUTUP" while open. */}
        <div className="relative h-[84px] w-[84px]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="quick-menu-mobile-list"
            aria-label={open ? "Tutup menu cepat" : "Buka menu cepat"}
            className="relative grid h-full w-full place-items-center cursor-pointer"
          >
            <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_8px_16px_rgba(16,35,128,0.35)]">
              <polygon points={STAR_POINTS} fill="#102380" stroke="#102380" strokeWidth={6} strokeLinejoin="round" />
            </svg>
            <span className="relative flex flex-col items-center text-white">
              {open ? (
                <X aria-hidden="true" className="h-6 w-6" strokeWidth={2.4} />
              ) : (
                <MessageCircleMore aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
              )}
              <span className="mt-0.5 text-[10px] font-bold tracking-wider">{open ? "TUTUP" : "MENU"}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

