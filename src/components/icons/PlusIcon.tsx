import type { AnimatedIconProps } from "@/types";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};

const PlusIcon = ({
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
      <motion.g
        variants={{
          normal: { rotate: "0deg" },
          animate: { rotate: "180deg" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </motion.g>
    </svg>
  );
};

export { PlusIcon };
