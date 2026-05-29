"use client";

import type { AnimatedIconProps } from "@/types";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const staticVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
};

const dropVariants: Variants = {
  normal: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  animate: (custom: number) => ({
    y: [-100, 10, 0],
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 1.2,
      delay: custom * 0.15,
    },
  }),
};

const LinkedinSVG = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "currentColor",
  controls: externalControls,
  ...props
}: AnimatedIconProps) => {
  const internalControls = useAnimation();
  const controls = externalControls ?? internalControls;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Static dot and line */}
      <motion.rect
        width="4"
        height="12"
        x="2"
        y="9"
        variants={staticVariants}
        animate={controls}
      />
      <motion.circle
        cx="4"
        cy="4"
        r="2"
        variants={staticVariants}
        animate={controls}
      />

      {/* Dropping "i" part */}
      <motion.path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7"
        variants={dropVariants}
        animate={controls}
        custom={0}
      />

      {/* Dropping "n" part */}
      <motion.path
        d="M18 14a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7"
        variants={dropVariants}
        animate={controls}
        custom={1}
      />
    </svg>
  );
};

export default LinkedinSVG;
