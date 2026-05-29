import type { AnimatedIconProps } from "@/types";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};
const UserEditIcon = ({
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
      <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
      <motion.path
        variants={{
          normal: { translateY: "0%" },
          animate: { translateY: "2px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
      />
      <motion.circle
        variants={{
          normal: { rotateX: "0%" },
          animate: { rotateX: "180deg" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        cx={10}
        cy={7}
        r={4}
      />
    </svg>
  );
};

export default UserEditIcon;
