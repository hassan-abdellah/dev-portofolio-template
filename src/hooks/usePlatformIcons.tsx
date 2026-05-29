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
import type { platformType } from "@/types";
import PlatformIconLink from "@/components/profile/PlatformIconLink";

export const usePlatformIcons = () => {
  const renderPlatformIconLink = (
    link_type: platformType,
    link_url: string,
  ): ReactNode => {
    switch (link_type) {
      case "youtube":
        return (
          <PlatformIconLink
            IconComponent={YoutubeSVG}
            link_url={link_url}
            TooltipText="Youtube"
            className="w-6 h-6 text-lavender-mist fill-lavender-mist"
            iconstrokeWidth={1.5}
            iconheight={35}
            iconwidth={35}
          />
        );
      case "github":
        return (
          <PlatformIconLink
            IconComponent={GithubSVG}
            link_url={link_url}
            TooltipText="Github"
            className="w-6 h-6"
            iconClassNames="stroke-lavender-mist fill-lavender-mist stroke-1"
          />
        );
      case "linkedin":
        return (
          <PlatformIconLink
            IconComponent={LinkedinSVG}
            link_url={link_url}
            TooltipText="LinkedIn"
            className="w-6 h-6"
            iconClassNames="stroke-lavender-mist"
          />
        );
      case "others":
        return (
          <PlatformIconLink
            IconComponent={GlobeSVG}
            link_url={link_url}
            TooltipText="Website"
            className="w-6 h-6"
            iconClassNames="stroke-lavender-mist"
          />
        );

      default:
        return null;
    }
  };
  const PLATFORM_Icons: Record<string, ReactNode> = {
    youtube: <YoutubeSVG />,
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

  return { PLATFORM_Icons, renderPlatformIconLink };
};
