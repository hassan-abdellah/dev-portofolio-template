import { cn } from "@/lib/utils";
import type { AnimatedIconProps } from "@/types";
import { useAnimation } from "motion/react";
import React from "react";

export interface animatedIconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  iconwidth?: number;
  iconheight?: number;
  iconstrokeWidth?: number;
  iconstroke?: string;
  iconClassNames?: string;
  /** Pass controls from the parent to drive the animation externally */
  controls?: ReturnType<typeof useAnimation>;
  linkText?: string;
  IconComponent: React.ComponentType<AnimatedIconProps>;
}
const AnimatedIconLink = ({
  IconComponent,
  iconwidth = 28,
  iconheight = 28,
  iconstrokeWidth = 2,
  iconstroke = "currentColor",
  iconClassNames,
  linkText,
  ...rest
}: animatedIconLinkProps) => {
  const controls = useAnimation();
  return (
    <a
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      {...rest}
    >
      <IconComponent
        controls={controls}
        width={iconwidth}
        height={iconheight}
        strokeWidth={iconstrokeWidth}
        stroke={iconstroke}
        className={cn(iconClassNames)}
      />
      {linkText && <span>{linkText}</span>}
    </a>
  );
};

export default AnimatedIconLink;
