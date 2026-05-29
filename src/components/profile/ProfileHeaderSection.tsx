import { usePlatformIcons } from "@/hooks/usePlatformIcons";
import type { profileData } from "@/types";
import { useAuth } from "@clerk/react";
import { Fragment, useMemo } from "react";
import ShareProfileModal from "@/components/profile/ShareProfileModal";
import UploadProfileCVModal from "@/components/profile/UploadProfileCVModal";
import ViewCVButton from "@/components/profile/ViewCVButton";
import { profilePaths } from "@/data/routesPaths";
import { Link } from "react-router";
import UserImageUsername from "./UserImageUsername";
import CopyProtofolioLinkButton from "./CopyProtofolioLinkButton";
import UserEditIcon from "../icons/UserEditIcon";
import { useAnimation } from "motion/react";

const ProfileHeaderSection = ({
  data,
  isInViewMode = false,
}: {
  data: profileData | undefined;
  isInViewMode?: boolean;
}) => {
  const { isSignedIn, userId } = useAuth();
  const controls = useAnimation();
  const { renderPlatformIconLink } = usePlatformIcons();
  // check it the user who views the profile is the owener or not
  const isUserOwner = useMemo(() => {
    return isSignedIn && userId === data?.user?.clerkId && !isInViewMode
      ? true
      : false;
  }, [isSignedIn, userId, data?.user?.clerkId, isInViewMode]);

  return (
    <div className="flex flex-col items-center justify-center bg-lavender-purple h-120 w-full rounded-b-4xl">
      {/* image */}
      <UserImageUsername
        imageUrl={data?.user?.avatar}
        username={data?.user?.name}
      />

      <h6 className="text-lg text-lavender-mist">{data?.title}</h6>

      {/* Skills */}
      {data?.skills?.length ? (
        <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap max-w-2xl">
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
        <div className="mt-6 flex items-center justify-center gap-2.5 flex-wrap">
          {data?.links.map((link) => (
            <Fragment key={link.link_type}>
              {renderPlatformIconLink(link.link_type, link.link_url)}
            </Fragment>
          ))}
        </div>
      ) : null}

      {/* CTA */}
      <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
        {isUserOwner ? (
          <>
            <Link
              to={profilePaths.editProfile.replace(`:id`, `${data?.id}`)}
              className="px-4 py-2 bg-indigo-velvet text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-wisteria transition-colors duration-300 flex items-center gap-1"
              aria-label="Edit Portofolio"
              onMouseEnter={() => controls.start("animate")}
              onMouseLeave={() => controls.start("normal")}
            >
              <UserEditIcon controls={controls} width={20} height={20} />
              <span>Edit</span>
            </Link>
            {/* Share profile button */}

            <ShareProfileModal
              profileId={data?.id}
              isShared={data?.is_sharable}
            />

            {data?.is_sharable ? (
              <CopyProtofolioLinkButton profileId={data.id} />
            ) : null}

            {/* Upload CV Button */}

            <UploadProfileCVModal
              profileId={data?.id}
              cvUrl={data?.csv_url ? data?.csv_url : null}
            />
          </>
        ) : null}

        {/* View CV Button */}
        {data?.csv_url && <ViewCVButton CVURL={data?.csv_url} />}
      </div>
    </div>
  );
};

export default ProfileHeaderSection;
