import { PencilIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { Link } from "react-router";
import ProjectsLists from "@/components/projects/ProjectsLists";

import ProfilePageLoader from "@/components/profile/ProfilePageLoader";
import { profilePaths } from "@/data/routesPaths";
import { useAuth } from "@clerk/react";
import AvatarPlaceholder from "@/assets/images/avatar-placeholder.svg";
import { usePlatformIcons } from "@/hooks/usePlatformIcons";
import { useProfile } from "@/hooks/useProfiles";

const ProfilePage = () => {
  const { isSignedIn, userId } = useAuth();

  const { data, isLoading } = useProfile();

  const { PLATFORM_Icons } = usePlatformIcons();

  // check it the user who views the profile is the owener or not
  const isUserOwner = useMemo(() => {
    return isSignedIn && userId === data?.user?.clerkId ? true : false;
  }, [isSignedIn, userId, data?.user?.clerkId]);

  return (
    <Fragment>
      {isLoading ? (
        <ProfilePageLoader />
      ) : (
        <section className="relative">
          {/* header */}
          <div className="flex flex-col items-center justify-center bg-lavender-purple h-100 w-full rounded-b-4xl">
            {/* image */}
            <div className="w-18 h-18 rounded-full bg-lavender-mist border-2 border-indigo-velvet">
              <img
                src={
                  data?.user?.avatar ? data?.user?.avatar : AvatarPlaceholder
                }
                className="w-full h-full rounded-full"
                alt={data?.user?.name}
              />
            </div>

            <h1 className="text-3xl text-dark-amethyst capitalize">
              {data?.user?.name}
            </h1>
            <h6 className="text-lg text-lavender-mist">{data?.title}</h6>

            {/* Skills */}
            {data?.skills?.length ? (
              <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-2xl">
                {data?.skills.map((item) => (
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

            {data?.links.length ? (
              <div className="mt-4 flex items-center justify-center gap-2.5 flex-wrap">
                {data?.links.map((link) => (
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
            {isUserOwner ? (
              <div className="flex items-center justify-center">
                <Link
                  to={profilePaths.editProfile.replace(`:id`, `${data?.id}`)}
                  className="mt-6 px-4 py-2 bg-indigo-velvet text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-wisteria transition-colors duration-300 flex items-center gap-1"
                >
                  <PencilIcon className="size-4" />
                  <span>Edit Profile</span>
                </Link>
                {/* TODO: implement share profile button */}

                {/* TODO: implement Upload CSV Button */}
              </div>
            ) : null}
          </div>

          {/* Projects Showcase */}

          {/* TODO: implement adding viewing projects */}

          <ProjectsLists
            profileId={data?.id}
            profileOwnerId={data?.user?.clerkId}
          />
        </section>
      )}
    </Fragment>
  );
};

export default ProfilePage;
