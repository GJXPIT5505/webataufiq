"use client";

import { motion, useReducedMotion } from "framer-motion";

// Gentle, continuous up/down float (transform-only, GPU-cheap). Respects
// prefers-reduced-motion via Framer Motion's built-in hook — animation is
// simply skipped for users who've asked for less motion.
export default function FloatingElement({
  children,
  className = "",
  range = 10,
  duration = 3.5,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -range, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration, repeat: Infinity, ease: "easeInOut", delay }
      }
    >
      {children}
    </motion.div>
  );
}