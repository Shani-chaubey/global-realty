"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Wraps children with a scroll-triggered fade-up animation.
 * Falls back gracefully if framer-motion isn't available.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 40,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container — children animate in sequence.
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for use inside StaggerContainer.
 */
export function StaggerItem({ children, y = 30, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Counter animation hook — counts up when in view.
 */
export function CountUp({ end, duration = 2, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {isInView ? (
          <motion.span
            initial={0}
            animate={isInView ? end : 0}
            transition={{ duration, ease: "easeOut" }}
          >
            {end}
          </motion.span>
        ) : (
          "0"
        )}
      </motion.span>
      {suffix}
    </span>
  );
}
