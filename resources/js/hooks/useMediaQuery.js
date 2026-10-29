import { useSyncExternalStore } from "react";

// Breakpoint queries shared by the Home sections that render a separate
// mobile choreography instead of hiding a desktop tree with CSS.
//
// - MOBILE_QUERY (<768px): phone-only layouts (footer).
// - TABLET_DOWN_QUERY (<1024px): JourneySection's narrow road.
// - COMPACT_QUERY (<1024px, or any touch-only device): Excellence and
//   Achievements.
export const MOBILE_QUERY = "(max-width: 767px)";
export const TABLET_DOWN_QUERY = "(max-width: 1023px)";
export const COMPACT_QUERY = "(max-width: 1023px), (hover: none) and (pointer: coarse)";

/**
 * Live `matchMedia` result. During SSR and hydration it returns
 * `serverFallback` (mobile-first by default), so the server HTML and the
 * first client render always agree — no hydration mismatch.
 */
export function useMediaQuery(query, serverFallback = true) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

/**
 * `prefers-reduced-motion`, hydration-safe: false during SSR/hydration.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

