import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

interface ShareLinkIconProps extends React.SVGAttributes<SVGSVGElement> {
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

const ShareLinkIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  controls: externalControls,
  ...props
}: ShareLinkIconProps) => {
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
      <motion.path
        variants={{
          normal: { translateX: "0px", translateY: "0px" },
          animate: { translateX: "2px", translateY: "-2px" },
        }}
        transition={defaultTransition}
        animate={controls}
        initial="normal"
        d="M15 3h6v6"
      />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
};

export default ShareLinkIcon;
