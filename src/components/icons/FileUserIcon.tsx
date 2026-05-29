import type { AnimatedIconProps } from "@/types";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};
const FileUserIcon = ({
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
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <motion.g
        variants={{
          normal: { translateY: "0px" },
          animate: { translateY: "-2px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
      >
        <path d="M16 22a4 4 0 0 0-8 0" />
        <motion.circle
          variants={{
            normal: { rotateX: "0%" },
            animate: { rotateX: "180deg" },
          }}
          transition={defaultTransition}
          animate={controls}
          initial="normal"
          cx={12}
          cy={15}
          r={3}
        />
      </motion.g>
    </svg>
  );
};

export default FileUserIcon;
