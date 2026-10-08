"use client";

import { motion, useReducedMotion } from "framer-motion";
import { activityCards } from "@/data/activities";
import ActivityCardItem from "./ActivityCardItem";

// Parent variant drives the stagger — children fire staggerChildren apart,
// no manual per-card delay math needed.
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

// Fade + slide-up + scale-in. Transform/opacity only, so it never shifts
// layout (no margin/position involved) while it plays.
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// prefers-reduced-motion: skip straight to the end state, no motion at all.
const staticVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function ActivityCardGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:mt-12 lg:mt-14 lg:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={reduceMotion ? staticVariants : gridVariants}
    >
      {activityCards.map((card) => (
        <motion.div
          key={card.slug}
          variants={reduceMotion ? staticVariants : cardVariants}
        >
          <ActivityCardItem card={card} />
        </motion.div>
      ))}
    </motion.div>
  );
}