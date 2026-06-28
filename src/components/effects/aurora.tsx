"use client";

import { motion } from "motion/react";

/**
 * Animated aurora background — two large blurred gradient blobs that drift
 * slowly, giving the hero depth and motion without distraction.
 * Place behind hero content (absolute, -z).
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        className="absolute -left-[10%] top-[5%] h-[420px] w-[420px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.55), transparent 70%)",
        }}
        animate={{
          x: [0, 60, -20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-5%] top-[30%] h-[380px] w-[380px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[30%] h-[300px] w-[300px] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.5), transparent 70%)",
        }}
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
