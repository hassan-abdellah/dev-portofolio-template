import { useInView } from "react-intersection-observer";
import { useProjects } from "@/hooks/useProjects";
import ProjectsLists from "./ProjectsLists";
import { useEffect } from "react";

const ProfileProjectsList = ({
  profileId,
  profileOwnerId,
}: {
  profileId: string | undefined;
  profileOwnerId: string | undefined;
}) => {
  const { inView, ref } = useInView();
  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    data: projects,
  } = useProjects();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <ProjectsLists
      profileId={profileId}
      profileOwnerId={profileOwnerId}
      projects={projects}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      sectionRef={ref}
    />
  );
};

export default ProfileProjectsList;
