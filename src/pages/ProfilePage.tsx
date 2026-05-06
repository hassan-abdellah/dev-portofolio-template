import YoutubeSVG from "@/components/icons/YoutubeSVG";
import { useProfileData } from "@/hooks/useProfileData";
import clsx from "clsx";
import { PencilIcon } from "lucide-react";
import { type ReactNode } from "react";
import { Link } from "react-router";
import ProjectsLists from "@/components/projects/ProjectsLists";
import LinkedinSVG from "@/components/icons/LinkedinSVG";
import GlobeSVG from "@/components/icons/GlobeSVG";
import GithubSVG from "@/components/icons/GithubSVG";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProfilePage = () => {
  // @TODO: implement getting data from DB
  const profileData = useProfileData();

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

  return (
    <section className="relative">
      {/* header */}
      <div className="flex flex-col items-center justify-center bg-lavender-purple h-100 w-screen rounded-b-4xl">
        {/* image */}
        <div className="w-16 h-16 rounded-full bg-lavender-mist border-2 border-indigo-velvet"></div>

        <h1 className="text-3xl text-dark-amethyst">Hassan Abdellah</h1>
        <h6 className="text-lg text-lavender-mist">{profileData.title}</h6>

        {/* Skills */}
        {profileData.skills.length > 0 ? (
          <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-2xl">
            {profileData.skills.map((item) => (
              <span
                key={item}
                className="bg-lavender-mist rounded-3xl text-dark-amethyst shadow-dark-amethyst px-3 py-1.5 capitalize"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {/* social links */}

        {profileData.links.length > 0 ? (
          <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap">
            {profileData.links.map((link) => (
              <a
                href={link.link_url}
                target="_blank"
                aria-label={`${link.link_type} url`}
                key={link?.link_type}
                className="w-6 h-6"
              >
                {PLATFORM_Icons[link?.link_type]}
              </a>
            ))}
          </div>
        ) : null}

        {/* CTA */}
        {/* TODO: implement Authintication */}
        <div className="flex items-center justify-center">
          <Link
            to="/profile/edit"
            className="mt-6 px-4 py-2 bg-indigo-velvet text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-wisteria transition-colors duration-300 flex items-center gap-1"
          >
            <PencilIcon className="size-4" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Projects Showcase */}

      {/* TODO: implement adding viewing projects */}

      <ProjectsLists />
    </section>
  );
};

export default ProfilePage;
