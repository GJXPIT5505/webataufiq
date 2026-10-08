"use client";

export default function SunNavButton({
  direction,
  onClick,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Slide sebelumnya" : "Slide berikutnya"}
      className={`group absolute top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-navy/40 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-navy/70 sm:h-12 sm:w-12 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45 sm:h-7 sm:w-7"
        fill="none"
      >
        <circle cx="20" cy="20" r="6.5" stroke="#FDD000" strokeWidth="1.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x1 = Number((20 + Math.cos(angle) * 10.5).toFixed(3));
          const y1 = Number((20 + Math.sin(angle) * 10.5).toFixed(3));
          const x2 = Number((20 + Math.cos(angle) * 16.5).toFixed(3));
          const y2 = Number((20 + Math.sin(angle) * 16.5).toFixed(3));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FDD000"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </button>
  );
}
