import React from "react";

// Same arch silhouette as the "Usia" badge on the jenjang detail pages
const ARCH_PATH =
  "M122.5,0 C128.2,4.5 145.4,19.4 156.8,26.9 C168.2,34.4 180.9,37.9 191.1,44.9 C201.3,51.8 211.9,59.8 218.1,68.8 C224.2,77.7 223.8,90.7 227.9,98.7 C231.9,106.6 239.7,105.6 242.6,116.6 C245.4,127.6 244.6,156.5 245,164.5 L245,296 Q245,299 242.6,299 L2.4,299 Q0,299 0,296 L0,164.5 C0.4,156.5 -0.4,127.6 2.4,116.6 C5.3,105.6 13.1,106.6 17.1,98.7 C21.2,90.7 20.8,77.7 26.9,68.8 C33.1,59.8 43.7,51.8 53.9,44.9 C64.1,37.9 76.8,34.4 88.2,26.9 C99.6,19.4 116.8,4.5 122.5,0 Z";

// Clips arbitrary children to the arch silhouette via an SVG <foreignObject> + native clipPath
export default function ArchPhotoFrame({
  id,
  children,
  gold = "#FDD000",
}) {
  const clipId = `arch-clip-${id}`;
  return (
    <div className="relative w-full" style={{ aspectRatio: "245 / 299" }}>
      <svg
        viewBox="0 0 245 299"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={ARCH_PATH} />
          </clipPath>
        </defs>
        <foreignObject x="0" y="0" width="245" height="299" clipPath={`url(#${clipId})`}>
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        </foreignObject>
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

