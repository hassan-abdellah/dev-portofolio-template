import { Fragment } from "react";
import ProfilePageLoader from "@/components/profile/ProfilePageLoader";
import { useProfile } from "@/hooks/useProfiles";
import ProfileHeaderSection from "@/components/profile/ProfileHeaderSection";
import ProfileProjectsList from "@/components/projects/ProfileProjectsList";
import { useDocTitle } from "@/hooks/useDocTitle";

const MyProtofolioPage = () => {
  const { data, isLoading } = useProfile();
  useDocTitle("My Portfolio");

  return (
    <Fragment>
      {isLoading ? (
        <ProfilePageLoader />
      ) : (
        <section className="relative">
          {/* header */}
          <ProfileHeaderSection data={data} />

          {/* Projects Showcase */}

          <ProfileProjectsList
            profileId={data?.id}
            profileOwnerId={data?.user?.clerkId}
          />
        </section>
      )}
    </Fragment>
  );
};

export default MyProtofolioPage;
