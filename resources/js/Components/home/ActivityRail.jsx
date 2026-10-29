import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { activityCards } from "@/data/activities";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import ActivityCardGrid from "./ActivityCardGrid";
import ActivityCardItem from "./ActivityCardItem";

export default function ActivityRail({ heading }) {
  const reduceMotion = usePrefersReducedMotion();
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const travelRef = useRef(0);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - viewport.clientWidth);
      travelRef.current = next;
      setTravel(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (p) => -Math.min(Math.max(p, 0), 1) * travelRef.current);
  const progressScale = useTransform(scrollYProgress, (p) => Math.min(Math.max(p, 0), 1));

  if (reduceMotion) {
    return (
      <>
        {heading}
        <ActivityCardGrid />
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative -mx-6" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pb-6 pt-20">
        <div className="px-6">{heading}</div>

        <div ref={viewportRef} className="mt-8 overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-4 px-6">
            {activityCards.map((card, i) => (
              <motion.div
                key={card.slug}
                className="w-[78vw] max-w-sm shrink-0"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.12 }}
              >
                <ActivityCardItem card={card} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div aria-hidden="true" className="mx-auto mt-6 h-1 w-24 overflow-hidden rounded-full bg-navy/10">
          <motion.div
            className="h-full origin-left rounded-full bg-gold"
            style={{ scaleX: progressScale }}
          />
        </div>
      </div>
    </div>
  );
}

