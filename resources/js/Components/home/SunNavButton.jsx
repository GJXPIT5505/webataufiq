export default function SunNavButton({
  direction,
  onClick,
  className = "",
}) {
  const spikeCount = 20;
  const rInner = 8.5; // spike base — sits just outside the circle stroke
  const rOuter = 15; // spike tip
  const rTriBase = 1.1; // half-width of each spike's base, in degrees-equivalent arc

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Slide sebelumnya" : "Slide berikutnya"}
      className={`group absolute top-1/2 z-30 grid h-[60px] w-[60px] -translate-y-1/2 place-items-center transition-transform duration-200 hover:scale-110 sm:h-[72px] sm:w-[72px] ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 40 40" className="h-[48px] w-[48px] sm:h-[54px] sm:w-[54px]" fill="none">
        {Array.from({ length: spikeCount }).map((_, i) => {
          const angle = (i * Math.PI * 2) / spikeCount;
          const baseAngle1 = angle - rTriBase * 0.055;
          const baseAngle2 = angle + rTriBase * 0.055;
          const tipX = 20 + Math.cos(angle) * rOuter;
          const tipY = 20 + Math.sin(angle) * rOuter;
          const b1x = 20 + Math.cos(baseAngle1) * rInner;
          const b1y = 20 + Math.sin(baseAngle1) * rInner;
          const b2x = 20 + Math.cos(baseAngle2) * rInner;
          const b2y = 20 + Math.sin(baseAngle2) * rInner;
          return (
            <polygon
              key={i}
              points={`${tipX.toFixed(2)},${tipY.toFixed(2)} ${b1x.toFixed(2)},${b1y.toFixed(2)} ${b2x.toFixed(2)},${b2y.toFixed(2)}`}
              fill="#FDD000"
            />
          );
        })}
        <circle cx="20" cy="20" r="8" fill="none" stroke="#FDD000" strokeWidth="1.3" />
        <path
          d={direction === "prev" ? "M22.5 15.5 17 20l5.5 4.5" : "M17.5 15.5 23 20l-5.5 4.5"}
          fill="none"
          stroke="#FDD000"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
