import { Fragment } from "react";

import ProfilePageLoader from "@/components/profile/ProfilePageLoader";

import { useNonAuthProfile } from "@/hooks/useProfiles";
import ProfileHeaderSection from "@/components/profile/ProfileHeaderSection";
import { useNavigate, useParams } from "react-router";
import NonAuthProjectLists from "@/components/projects/NonAuthProjectLists";

const ProfotolioPage = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useNonAuthProfile(profileId!);

  if (isError) {
    navigate("/404");
  }
  return (
    <Fragment>
      {isLoading ? (
        <ProfilePageLoader />
      ) : (
        <section className="relative">
          {/* header */}
          <ProfileHeaderSection data={data} />

          {/* Projects Showcase */}

          <NonAuthProjectLists
            profileId={profileId}
            profileOwnerId={data?.user?.clerkId}
          />
        </section>
      )}
    </Fragment>
  );
};

export default ProfotolioPage;
