import { cn } from "@/lib/utils";
import type { AnimatedIconProps } from "@/types";
import { useAnimation } from "motion/react";
import React from "react";
import { Button } from "../ui/button";

export interface animatedIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconwidth?: number;
  iconheight?: number;
  iconstrokeWidth?: number;
  iconstroke?: string;
  iconClassNames?: string;
  /** Pass controls from the parent to drive the animation externally */
  controls?: ReturnType<typeof useAnimation>;
  buttonText?: string;
  IconComponent: React.ComponentType<AnimatedIconProps>;
}
const AnimatedIconButton = ({
  IconComponent,
  iconwidth = 28,
  iconheight = 28,
  iconstrokeWidth = 2,
  iconstroke = "currentColor",
  iconClassNames,
  buttonText,
  ...rest
}: animatedIconButtonProps) => {
  const controls = useAnimation();
  return (
    <Button
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
      {buttonText && <span>{buttonText}</span>}
    </Button>
  );
};

export default AnimatedIconButton;
