import { useId } from "react";

export const DEFAULT_ORBIT = {
  path: "M58,88 Q95,55 90,46",
  dots: [
    { x: 84.5, y: 61, size: 12 },
    { x: 90, y: 46, size: 18 },
  ],
  fade: { x1: 90, y1: 46, x2: 58, y2: 88 },
};

export const MOBILE_DEFAULT_ORBIT = {
  path: "M14,48 Q48,22 82,26",
  dots: [
    { x: 48, y: 36, size: 11 },
    { x: 82, y: 26, size: 18 },
  ],
  fade: { x1: 48, y1: 36, x2: 14, y2: 48 },
};

function SunDot({ size }) {
  const spikeCount = 12;
  const rInner = 6.5;
  const rOuter = 11.5;

  return (
    <span className="relative block" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 24"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: spikeCount }).map((_, i) => {
          const angle = (i * Math.PI * 2) / spikeCount;
          const baseAngle1 = angle - 0.06;
          const baseAngle2 = angle + 0.06;
          const tipX = 12 + Math.cos(angle) * rOuter;
          const tipY = 12 + Math.sin(angle) * rOuter;
          const b1x = 12 + Math.cos(baseAngle1) * rInner;
          const b1y = 12 + Math.sin(baseAngle1) * rInner;
          const b2x = 12 + Math.cos(baseAngle2) * rInner;
          const b2y = 12 + Math.sin(baseAngle2) * rInner;
          return (
            <polygon
              key={i}
              points={`${tipX.toFixed(2)},${tipY.toFixed(2)} ${b1x.toFixed(2)},${b1y.toFixed(2)} ${b2x.toFixed(2)},${b2y.toFixed(2)}`}
              fill="#F1B23A"
            />
          );
        })}
      </svg>
      <span
        className="motion-safe:animate-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.42,
          height: size * 0.42,
          background:
            "radial-gradient(circle at 35% 35%, #FFF6D6, #F1B23A 55%, #E0982A 100%)",
          boxShadow: `0 0 ${size * 0.7}px ${size * 0.2}px rgba(241,178,58,0.55)`,
        }}
      />
    </span>
  );
}

export default function HeroOrbit({ orbit = DEFAULT_ORBIT, className = "" }) {
  const id = useId();
  const gradientId = `hero-orbit-fade-${id}`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-95"
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={orbit.fade.x1}
            y1={orbit.fade.y1}
            x2={orbit.fade.x2}
            y2={orbit.fade.y2}
          >
            <stop offset="0%" stopColor="#F1B23A" stopOpacity="1" />
            <stop offset="100%" stopColor="#F1B23A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={orbit.path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{
            filter:
              "drop-shadow(0 0 2px rgba(241,178,58,0.9)) drop-shadow(0 0 6px rgba(241,178,58,0.65)) drop-shadow(0 0 12px rgba(241,178,58,0.35))",
          }}
        />
      </svg>
      {orbit.dots.map((dot, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        >
          <SunDot size={dot.size} />
        </div>
      ))}
    </div>
  );
}
