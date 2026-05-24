import EmptyProjectList from "./EmptyProjectList";
import ProjectsGrid from "./ProjectsGrid";
import { Fragment, useEffect } from "react";
import ProjectsLoader from "./ProjectsLoader";
import { useInView } from "react-intersection-observer";
import { useProjects } from "@/hooks/useProjects";
import { Spinner } from "../ui/spinner";

const ProjectsLists = ({
  profileId,
  profileOwnerId,
}: {
  profileId: string | undefined;
  profileOwnerId: string | undefined;
}) => {
  const { ref, inView } = useInView();
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
    <div className="mt-8 pb-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>

      {isLoading ? (
        <ProjectsLoader />
      ) : (
        <Fragment>
          {projects?.length ? (
            <Fragment>
              <ProjectsGrid
                projects={projects}
                profileId={profileId}
                profileOwnerId={profileOwnerId}
              />

              {/* infite scrolling */}
              <div ref={ref} className="flex items-center justify-center">
                {isFetchingNextPage ? (
                  <Spinner className="size-10 stroke-lavender-purple" />
                ) : hasNextPage ? (
                  <span className="text-gray-400">Scroll for more</span>
                ) : (
                  <span className="mt-8 text-gray-400">
                    No more Projects to load
                  </span>
                )}
              </div>
            </Fragment>
          ) : (
            <EmptyProjectList
              profileId={profileId}
              profileOwnerId={profileOwnerId}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProjectsLists;
