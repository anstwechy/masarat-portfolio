"use client";

import { motion } from "motion/react";

/**
 * A glowing animated beam — a soft gradient line with a light pulse that
 * travels along it. Use as a section divider or to frame a feature card.
 */
export function AnimatedBeam({
  className,
  color = "#2dd4bf",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative h-px w-full overflow-hidden ${className ?? ""}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 12px ${color}`,
        }}
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
