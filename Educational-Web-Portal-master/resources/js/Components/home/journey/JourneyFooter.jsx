"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { LinkButton } from "@/Components/ui/Button"; // Sesuaikan jalur/kapitalisasi komponen Anda
import Reveal from "@/Components/home/Reveal";

const LAYER3_SUN_FRACTION = { x: 0.481, y: 0.288 };
const ORBIT_POINT_0 = { x: 0.82, y: 0.75 };
const NAVBAR_PX = 80;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function smoothstep(t) {
  const c = clamp(t, 0, 1);
  return c * c * (3 - 2 * c);
}

export default function JourneyFooter({ sunLayerRef }) {
  const footerRef = useRef(null);
  const textRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      if (sunLayerRef.current) sunLayerRef.current.style.opacity = "0";
      if (textRef.current) textRef.current.style.opacity = "0";
      const sunEl = document.getElementById("journey-sun-handoff");
      if (sunEl) sunEl.style.opacity = "0";
      return;
    }

    const applyFrame = () => {
      const footer = footerRef.current;
      const sun = document.getElementById("journey-sun-handoff");
      if (!footer || !sun) return;

      const footerRect = footer.getBoundingClientRect();
      const V = window.innerHeight;
      const W = window.innerWidth;

      const EMERGE_WINDOW = 100;
      const footerCenterY = footerRect.top + footerRect.height / 2;
      const emerge = clamp((V / 2 + EMERGE_WINDOW - footerCenterY) / (2 * EMERGE_WINDOW), 0, 1);

      if (emerge <= 0) {
        sun.style.opacity = "0";
        if (sunLayerRef.current) sunLayerRef.current.style.opacity = "1";
        if (textRef.current) textRef.current.style.opacity = "1";
        return;
      }

      sun.style.position = "fixed";

      const layer3X = footerRect.left + LAYER3_SUN_FRACTION.x * footerRect.width;
      const layer3Y = footerRect.top + LAYER3_SUN_FRACTION.y * footerRect.height;

      const heading = document.getElementById("keunggulan-heading");
      const headingRect = heading?.getBoundingClientRect();
      const headingX = W / 2;
      const headingY = headingRect ? headingRect.top + headingRect.height / 2 : layer3Y;

      const DESCEND_WINDOW = 240;
      const descendT = smoothstep((NAVBAR_PX - footerRect.top) / DESCEND_WINDOW);

      let x = lerp(layer3X, headingX, descendT);
      let y = lerp(layer3Y, headingY, descendT);

      if (sunLayerRef.current) sunLayerRef.current.style.opacity = String(1 - descendT);
      if (textRef.current) textRef.current.style.opacity = String(1 - descendT);

      const DOCK_THRESHOLD = 220;
      const DOCK_WINDOW = 70;
      const dockT = headingRect
        ? smoothstep((DOCK_THRESHOLD - headingRect.top) / DOCK_WINDOW)
        : 0;

      x = lerp(x, ORBIT_POINT_0.x * W, dockT);
      y = lerp(y, ORBIT_POINT_0.y * V, dockT);

      sun.style.left = `${x}px`;
      sun.style.top = `${y}px`;
      sun.style.transform = `translate(-50%, -50%) scale(${0.6 + 0.4 * emerge})`;
      sun.style.opacity = String(emerge * (1 - clamp((dockT - 0.6) / 0.4, 0, 1)));
    };

    applyFrame();
    window.addEventListener("scroll", applyFrame, { passive: true });
    window.addEventListener("resize", applyFrame);
    return () => {
      window.removeEventListener("scroll", applyFrame);
      window.removeEventListener("resize", applyFrame);
    };
  }, [reduceMotion, sunLayerRef]);

  return (
    <div
      ref={footerRef}
      className="relative min-h-[280px] pb-16 pt-16 md:min-h-[360px] md:pb-24 md:pt-20"
    >
      <div ref={textRef} className="relative z-20">
        <Reveal className="relative mx-auto max-w-5xl px-6">
          <div className="max-w-sm text-left">
            <p className="text-lg font-semibold leading-relaxed text-[#102380] drop-shadow-sm md:text-2xl">
              Setiap langkah hari ini adalah cahaya masa depan yang sedang
              Allah siapkan.
            </p>
            <div className="mt-6">
              <LinkButton href="/admission">
                Mari tumbuh bersama Attaufiq
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                </svg>
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}