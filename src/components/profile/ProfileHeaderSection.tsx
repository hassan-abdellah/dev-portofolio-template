import { Fragment } from "react";
import { usePlatformIcons } from "@/hooks/usePlatformIcons";
import type { profileData } from "@/types";
import UserImageUsername from "./UserImageUsername";
import CTAButtons from "./CTAButtons";

const ProfileHeaderSection = ({
  data,
  isInViewMode = false,
}: {
  data: profileData | undefined;
  isInViewMode?: boolean;
}) => {
  const { renderPlatformIconLink } = usePlatformIcons();

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
      <CTAButtons data={data} isInViewMode={isInViewMode} />
    </div>
  );
};

export default ProfileHeaderSection;
