import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface CloudUploadIconProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  /** Pass controls from the parent to drive the animation externally */
  controls?: ReturnType<typeof useAnimation>;
}
const defaultTransition: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
};
const CloudUploadIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  controls: externalControls,
  ...props
}: CloudUploadIconProps) => {
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
      <path d="M12 13v8" />
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />

      <motion.path
        variants={{
          normal: { translateY: "0%" },
          animate: { translateY: "-2px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        d="m8 17 4-4 4 4"
      />
    </svg>
  );
};

export default CloudUploadIcon;
