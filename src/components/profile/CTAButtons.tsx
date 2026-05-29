import CopyProtofolioLinkButton from "./CopyProtofolioLinkButton";
import UserEditIcon from "../icons/UserEditIcon";
import { useAnimation } from "motion/react";
import ShareProfileModal from "@/components/profile/ShareProfileModal";
import UploadProfileCVModal from "@/components/profile/UploadProfileCVModal";
import ViewCVButton from "@/components/profile/ViewCVButton";
import { profilePaths } from "@/data/routesPaths";
import { Link } from "react-router";
import { useAuth } from "@clerk/react";
import { Fragment, useMemo } from "react";
import type { profileData } from "@/types";

const CTAButtons = ({
  data,
  isInViewMode = false,
}: {
  data: profileData | undefined;
  isInViewMode?: boolean;
}) => {
  const { isSignedIn, userId } = useAuth();
  const controls = useAnimation();

  // check it the user who views the profile is the owener or not
  const isUserOwner = useMemo(() => {
    return isSignedIn && userId === data?.user?.clerkId && !isInViewMode
      ? true
      : false;
  }, [isSignedIn, userId, data?.user?.clerkId, isInViewMode]);

  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 flex-wrap">
      {isUserOwner ? (
        <Fragment>
          <Link
            to={profilePaths.editProfile.replace(`:id`, `${data?.id}`)}
            className="cta-button bg-indigo-velvet text-lavender-mist hover:bg-wisteria"
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
        </Fragment>
      ) : null}

      {/* View CV Button */}
      {data?.csv_url && <ViewCVButton CVURL={data?.csv_url} />}
    </div>
  );
};

export default CTAButtons;
