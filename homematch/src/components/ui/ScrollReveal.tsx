"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "w-fit" | "w-full";
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  width = "w-full",
  direction = "up",
  delay = 0,
  duration = 1.0, // Increased default duration for a silkier feel
  className = "",
}: ScrollRevealProps) {
  // Determine starting position based on direction
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: direction === "none" ? 0.95 : 1,
      filter: "blur(12px)", // Added blur for a premium reveal
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // Extremely soft landing cubic-bezier
        delay: delay,
      }
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`${width} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  delay = 0, 
  staggerDelay = 0.15,
  className = "",
  style
}: { 
  children: ReactNode, 
  delay?: number, 
  staggerDelay?: number,
  className?: string,
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = "",
  style
}: { 
  children: ReactNode, 
  className?: string,
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(10px)" }, // Added blur and increased y
        visible: { 
          opacity: 1, 
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } // Softened easing
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
