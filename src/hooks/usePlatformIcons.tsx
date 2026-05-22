import clsx from "clsx";
import type { ReactNode } from "react";
import GlobeSVG from "@/components/icons/GlobeSVG";
import GithubSVG from "@/components/icons/GithubSVG";
import LinkedinSVG from "@/components/icons/LinkedInSVG";
import YoutubeSVG from "@/components/icons/YoutubeSVG";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const usePlatformIcons = () => {
  const PLATFORM_Icons: Record<string, ReactNode> = {
    youtube: (
      <YoutubeSVG strokeClassNames={clsx("fill-lavender-mist")} classNames="" />
    ),
    github: (
      <Tooltip>
        <TooltipTrigger>
          <GithubSVG className={"fill-lavender-mist"} />
        </TooltipTrigger>
        <TooltipContent>Github</TooltipContent>
      </Tooltip>
    ),
    linkedin: (
      <Tooltip>
        <TooltipTrigger>
          <LinkedinSVG className="stroke-lavender-mist" />
        </TooltipTrigger>
        <TooltipContent>LinkedIn</TooltipContent>
      </Tooltip>
    ),
    others: (
      <Tooltip>
        <TooltipTrigger>
          <GlobeSVG className={"stroke-lavender-mist"} />
        </TooltipTrigger>
        <TooltipContent>Websit</TooltipContent>
      </Tooltip>
    ),
  };

  return { PLATFORM_Icons };
};
