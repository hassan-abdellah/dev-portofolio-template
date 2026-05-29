import type { AnimatedIconProps } from "@/types";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const EyeIcon = ({
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
          normal: { pathLength: 1 },
          animate: { pathLength: 0.5 },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
      />

      <motion.circle
        variants={{
          normal: { rotateX: "0%" },
          animate: { rotateX: "180deg" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        cx={12}
        cy={12}
        r={3}
      />
    </svg>
  );
};

export default EyeIcon;
