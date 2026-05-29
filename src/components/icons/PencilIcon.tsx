import type { AnimatedIconProps } from "@/types";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const PencilIcon = ({
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
      <motion.path
        variants={{
          normal: { translateX: "0px" },
          animate: { translateX: "-2px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        d="M13 21h8"
      />
      <motion.g
        variants={{
          normal: { translateY: "0px", translateX: "0px" },
          animate: { translateY: "-1px", translateX: "-1px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
      >
        <path d="m15 5 4 4" />
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      </motion.g>
    </svg>
  );
};

export default PencilIcon;
