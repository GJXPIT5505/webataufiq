import React from "react";
import { COMPACT_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";
import ExcellenceDesktop from "./ExcellenceDesktop";
import ExcellenceMobile from "./ExcellenceMobile";

// Section 5 — Keunggulan Attaufiq. Exactly one scene is mounted:
// scroll-driven desktop orbit on screens >= 1024px with mouse/trackpad,
// scroll-driven compact orbit everywhere else.
export default function ExcellenceSection() {
  const compact = useMediaQuery(COMPACT_QUERY);
  return compact ? <ExcellenceMobile /> : <ExcellenceDesktop />;
}
