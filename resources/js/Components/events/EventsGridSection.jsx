import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { eventsList as defaultEvents } from "@/data/events";
import ImagePlaceholder from "@/Components/ui/ImagePlaceholder";
import EventModal from "./EventModal";

export default function EventsGridSection({ items }) {
  const list = (items && items.length > 0) ? items : defaultEvents;
  const [activeSlug, setActiveSlug] = useState(null);

  // Deep link support via ?event=<slug>
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("event");
      if (slug && list.some((e) => e.slug === slug)) {
        setActiveSlug(slug);
      }
    }
  }, [list]);

  useEffect(() => {
    document.body.style.overflow = activeSlug ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeSlug]);

  const openEvent = useCallback((slug) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("event", slug);
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const closeEvent = useCallback(() => {
    setActiveSlug(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("event");
      window.history.replaceState(null, "", url.toString());
    }
  }, []);

  const activeEvent = list.find((e) => e.slug === activeSlug) ?? null;

  const goToNext = useCallback(() => {
    if (!activeEvent) return;
    const currentIndex = list.findIndex((e) => e.slug === activeEvent.slug);
    const next = list[(currentIndex + 1) % list.length];
    openEvent(next.slug);
  }, [activeEvent, list, openEvent]);

  return (
    <section className="relative bg-ivory px-6 py-16 md:py-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-base font-medium text-navy sm:text-lg">
            Pilih event untuk melihat informasi selengkapnya
          </p>
          <ChevronDown className="h-5 w-5 text-gold" aria-hidden="true" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((event, i) => (
            <motion.button
              key={event.slug}
              type="button"
              onClick={() => openEvent(event.slug)}
              className="group mx-auto"
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
            >
              {/* Desain kartu lingkaran presisi */}
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-gold/40 shadow-md sm:h-64 sm:w-64">
                <div className="absolute inset-x-0 top-0 h-1/2">
                  {event.image ? (
                    <img
                      src={
                        event.image.startsWith("http") || event.image.startsWith("/storage") || event.image.startsWith("/images")
                          ? event.image
                          : `/storage/${event.image}`
                      }
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlaceholder label={`[ISI: Foto ${event.title}]`} className="h-full w-full" />
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex h-1/2 flex-col items-center bg-white px-8 pt-3 text-center sm:px-10">
                  <h3 className="line-clamp-1 font-heading text-sm text-navy sm:text-base">
                    {event.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-navy/60 sm:text-xs">
                    {event.summary}
                  </p>
                  <span className="mb-3 mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-navy shadow transition-transform group-hover:scale-110 sm:mb-4">
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {activeEvent && (
        <EventModal
          key={activeEvent.slug}
          event={activeEvent}
          onClose={closeEvent}
          onNext={goToNext}
        />
      )}
    </section>
  );
}

