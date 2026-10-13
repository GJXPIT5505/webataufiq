import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { LinkButton } from "@/Components/ui/Button";

export default function MobileNav({ items, open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden bg-[#0b1a63] md:hidden shadow-2xl border-t border-white/10"
        >
          <ul className="flex flex-col divide-y divide-white/10 px-4 max-h-[70vh] overflow-y-auto">
            {items.map((item) => {
              const hasChildren = !!item.children?.length;
              const isExpanded = expanded === item.label;
              return (
                <li key={item.label} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex-1 py-3 text-base font-medium text-white hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`Buka submenu ${item.label}`}
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpanded(isExpanded ? null : item.label)
                        }
                        className="p-3 text-gold cursor-pointer"
                      >
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.15 }}
                          className="block text-sm"
                        >
                          ▾
                        </motion.span>
                      </button>
                    )}
                  </div>
                  {hasChildren && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-4 pb-2 max-h-56 overflow-y-auto"
                        >
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block py-2 text-sm text-white/80 hover:text-gold transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-6 pt-3">
            <LinkButton href="/admission" className="w-full" size="sm" onClick={onClose}>
              Kenali Attaufiq →
            </LinkButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

