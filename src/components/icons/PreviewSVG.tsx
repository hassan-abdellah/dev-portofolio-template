import React from "react";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface PreviewIconProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  controls?: ReturnType<typeof useAnimation>;
}

const transitions: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};
const topPathVariants: Variants = {
  normal: {
    y: 0,
    transition: transitions,
  },
  animate: {
    y: -3,
    transition: transitions,
  },
};
const bottomPathVariants: Variants = {
  normal: {
    y: 0,
    transition: transitions,
  },
  animate: {
    y: 3,
    transition: transitions,
  },
};
const PreviewSVG = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  controls: externalControls,

  ...props
}: PreviewIconProps) => {
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
      <motion.g variants={topPathVariants} animate={controls}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      </motion.g>
      <motion.g variants={bottomPathVariants} animate={controls}>
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      </motion.g>
      <circle cx={12} cy={12} r={1} />
      <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  );
};

export default PreviewSVG;
