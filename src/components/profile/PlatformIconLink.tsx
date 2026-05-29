import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AnimatedIconLink, {
  type animatedIconLinkProps,
} from "../common/AnimatedIconLink";
const PlatformIconLink = ({
  link_url,
  TooltipText,
  IconComponent,
  iconstrokeWidth,
  iconheight,
  iconwidth,
  className,
  iconClassNames,
}: {
  link_url: string;
  TooltipText: string;
  iconwidth?: number;
  iconheight?: number;
  iconstrokeWidth?: number;
  iconstroke?: string;
  className?: string;
  iconClassNames?: string;
  IconComponent: animatedIconLinkProps["IconComponent"];
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <AnimatedIconLink
          IconComponent={IconComponent}
          target="_blank"
          href={link_url}
          aria-label={TooltipText}
          className={className}
          iconstrokeWidth={iconstrokeWidth}
          iconheight={iconheight}
          iconwidth={iconwidth}
          iconClassNames={iconClassNames}
        />
      </TooltipTrigger>
      <TooltipContent>{TooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default PlatformIconLink;
