"use client";

import type { AnimatedIconProps } from "@/types";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

const transition: Transition = {
  duration: 0.3,
  opacity: { delay: 0.15 },
};

const pathVariants: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      ...transition,
      delay: 0.1 * custom,
    },
  }),
};

const GlobeSVG = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
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
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        variants={pathVariants}
        animate={controls}
        custom={0}
      />
      <motion.path
        d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
        variants={pathVariants}
        animate={controls}
        custom={1}
      />
      <motion.path
        d="M2 12h20"
        variants={pathVariants}
        animate={controls}
        custom={2}
      />
    </svg>
  );
};

export default GlobeSVG;
