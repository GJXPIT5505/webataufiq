import React from "react";

// Same arch silhouette as the "Usia" badge on the jenjang detail pages
const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

// SVG mask data URI that reliably clips in all browsers, even under 3D transforms (rotateY)
const ARCH_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 245 299'%3E%3Cpath d='${ARCH_PATH}' fill='%23000'/%3E%3C/svg%3E")`;

export default function ArchPhotoFrame({
  id,
  children,
  gold = "#FDD000",
}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "245 / 299" }}>
      {/* Clipped content container: perfectly shaped to arch frame */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{
          maskImage: ARCH_MASK,
          WebkitMaskImage: ARCH_MASK,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="h-full w-full">{children}</div>
      </div>

      {/* Decorative arch border stroke */}
      <svg
        viewBox="0 0 245 299"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        <path
          d={ARCH_PATH}
          fill="none"
          stroke={gold}
          strokeWidth="6"
          transform="translate(122.5,149.5) scale(0.96) translate(-122.5,-149.5)"
        />
      </svg>
    </div>
  );
}
