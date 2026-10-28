import { useRef } from "react";
import JourneyBackground from "./JourneyBackground";
import JourneyHeading from "./JourneyHeading";
import JourneyPath from "./JourneyPath";
import JourneyPathMobile from "./JourneyPathMobile";
import JourneyFooter from "./JourneyFooter";
import { TABLET_DOWN_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

export default function JourneySection() {
  const sunLayerRef = useRef(null);
  const isMobile = useMediaQuery(TABLET_DOWN_QUERY);

  return (
    <section className="relative overflow-hidden">
      <JourneyBackground sunLayerRef={sunLayerRef} />
      <JourneyHeading />
      {isMobile ? <JourneyPathMobile /> : <JourneyPath />}
      <JourneyFooter sunLayerRef={sunLayerRef} sunHandoff={!isMobile} />
    </section>
  );
}
