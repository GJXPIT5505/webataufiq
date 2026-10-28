import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides } from "@/data/heroSlides";
import HeroSlideContent from "@/Components/home/HeroSlideContent";
import HeroPagination from "@/Components/home/HeroPagination";
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
      className="relative h-[560px] overflow-hidden bg-navy md:aspect-[16/9] md:h-auto md:min-h-[720px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Sorotan Attaufiq"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${SLIDE_COUNT * 100}%`,
          transform: `translateX(-${index * (100 / SLIDE_COUNT)}%)`,
        }}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className="relative h-full shrink-0"
            style={{ width: `${100 / SLIDE_COUNT}%` }}
          >
            <HeroSlideContent slide={slide} priority={i === 0} active={i === index} />
          </div>
        ))}
      </div>

      <div className="absolute right-6 top-24 z-20 md:right-10">
        <HeroPagination count={SLIDE_COUNT} index={index} onSelect={goTo} />
      </div>

      <SunNavButton direction="prev" onClick={() => goTo(index - 1)} className="left-2 sm:left-4" />
      <SunNavButton direction="next" onClick={() => goTo(index + 1)} className="right-2 sm:right-4" />
    </section>
  );
}
