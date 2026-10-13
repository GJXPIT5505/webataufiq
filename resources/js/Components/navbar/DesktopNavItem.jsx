import React, { useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import SwooshUnderline from "@/Components/ui/SwooshUnderline";

const CLOSE_DELAY = 150;

export default function DesktopNavItem({ item }) {
  const { url } = usePage();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  // Normalize path without query or hash
  const pathname = (url || "/").split("?")[0].split("#")[0] || "/";

  const isActive =
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openNow = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeWithDelay = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const hasChildren = !!item.children?.length;

  return (
    <li
      className="relative"
      onMouseEnter={hasChildren ? openNow : undefined}
      onMouseLeave={hasChildren ? closeWithDelay : undefined}
      onFocusCapture={hasChildren ? openNow : undefined}
      onBlurCapture={hasChildren ? closeWithDelay : undefined}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? open : undefined}
        className={`relative inline-block px-1 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive ? "text-white" : "text-white/85 hover:text-gold"
        }`}
      >
        {item.label}
        {isActive && (
          <SwooshUnderline className="absolute inset-x-0 -bottom-1 h-2 w-full" />
        )}
      </Link>

      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-0 top-full z-40 min-w-[220px] max-h-[75vh] overflow-y-auto rounded-xl bg-white py-2 shadow-xl custom-scrollbar"
            >
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2 text-sm text-navy hover:bg-ivory hover:text-navy transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </li>
  );
}

