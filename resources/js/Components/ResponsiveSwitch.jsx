import { MOBILE_QUERY, useMediaQuery } from "@/hooks/useMediaQuery";

// Mounts exactly one of two trees by viewport, instead of
// shipping both into the DOM and hiding one with `hidden md:block`.
export default function ResponsiveSwitch({
  mobile,
  desktop,
  query = MOBILE_QUERY,
}) {
  return useMediaQuery(query) ? mobile : desktop;
}

