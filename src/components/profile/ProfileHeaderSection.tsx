import { usePlatformIcons } from "@/hooks/usePlatformIcons";
import type { profileData } from "@/types";
import { useAuth } from "@clerk/react";
import { useMemo } from "react";
import ShareProfileModal from "@/components/profile/ShareProfileModal";
import UploadProfileCVModal from "@/components/profile/UploadProfileCVModal";
import ViewCVButton from "@/components/profile/ViewCVButton";

import { profilePaths } from "@/data/routesPaths";
import AvatarPlaceholder from "@/assets/images/avatar-placeholder.svg";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

const ProfileHeaderSection = ({ data }: { data: profileData | undefined }) => {
  const { isSignedIn, userId } = useAuth();

  const { PLATFORM_Icons } = usePlatformIcons();

  // check it the user who views the profile is the owener or not
  const isUserOwner = useMemo(() => {
    return isSignedIn && userId === data?.user?.clerkId ? true : false;
  }, [isSignedIn, userId, data?.user?.clerkId]);

  return (
    <div className="flex flex-col items-center justify-center bg-lavender-purple h-100 w-full rounded-b-4xl">
      {/* image */}
      <div className="w-18 h-18 rounded-full bg-lavender-mist border-2 border-indigo-velvet">
        <img
          src={data?.user?.avatar ? data?.user?.avatar : AvatarPlaceholder}
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
        <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
          <Link
            to={profilePaths.editProfile.replace(`:id`, `${data?.id}`)}
            className="px-4 py-2 bg-indigo-velvet text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-wisteria transition-colors duration-300 flex items-center gap-1"
            aria-label="Edit Portofolio"
          >
            <PencilIcon className="size-4" />
            <span>Edit</span>
          </Link>
          {/* Share profile button */}

          <ShareProfileModal
            profileId={data?.id}
            isShared={data?.is_sharable}
          />

          {/* Upload CV Button */}

          <UploadProfileCVModal
            profileId={data?.id}
            cvUrl={data?.csv_url ? data?.csv_url : null}
          />

          {/* View CV Button */}
          {data?.csv_url && <ViewCVButton CVURL={data?.csv_url} />}
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
          {/* View CV Button */}
          {data?.csv_url && <ViewCVButton CVURL={data?.csv_url} />}
        </div>
      )}
    </div>
  );
};

export default ProfileHeaderSection;
