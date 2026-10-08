"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "../data/heroSlides";
import HeroSlideContent from "@/Components/home/HeroSlideContent";
import SunNavButton from "@/Components/home/SunNavButton";

const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 60;
const SLIDE_COUNT = heroSlides.length;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, AUTO_ADVANCE_MS);
  }, [clearTimer]);

  useEffect(() => {
    resetTimer();
    return clearTimer;
  }, [resetTimer, clearTimer]);

  const goTo = (i) => {
    setIndex((i + SLIDE_COUNT) % SLIDE_COUNT);
    resetTimer();
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -SWIPE_THRESHOLD) {
      goTo(index + 1);
    } else if (deltaX > SWIPE_THRESHOLD) {
      goTo(index - 1);
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative h-[560px] w-full overflow-hidden bg-[#102380] md:h-[720px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sorotan Attaufiq"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Track */}
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className="relative h-full w-full shrink-0 grow-0 bg-[#102380]"
          >
            <HeroSlideContent slide={slide} priority={i === 0} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <SunNavButton
        direction="prev"
        onClick={() => goTo(index - 1)}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 sm:left-4"
      />
      <SunNavButton
        direction="next"
        onClick={() => goTo(index + 1)}
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 sm:right-4"
      />
    </section>
  );
}
