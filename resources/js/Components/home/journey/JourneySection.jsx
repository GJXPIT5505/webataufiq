"use client";

import { useRef } from "react";
import JourneyBackground from "./JourneyBackground";
import JourneyHeading from "./JourneyHeading";
import JourneyPath from "./JourneyPath";
import JourneyFooter from "./JourneyFooter";

// Section 4 — "Perjalanan Tumbuh Bersama Attaufiq". Satu canvas background
// menerus (JourneyBackground) di belakang ketiga zona — heading, jalan
// berkelok + karakter + 5 card jenjang, lalu footer matahari terbit —
// supaya tidak ada garis potongan di setiap peralihan zona.
export default function JourneySection() {
  // Shared between the two siblings so JourneyFooter can fade the raster
  // sun layer (owned by JourneyBackground) as part of its own scroll-driven
  // "sun handoff" effect.
  const sunLayerRef = useRef(null);

  return (
    <section className="relative overflow-hidden">
      <JourneyBackground sunLayerRef={sunLayerRef} />
      <JourneyHeading />
      <JourneyPath />
      <JourneyFooter sunLayerRef={sunLayerRef} />
    </section>
  );
}