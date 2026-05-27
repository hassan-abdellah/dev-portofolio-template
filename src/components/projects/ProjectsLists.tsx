import EmptyProjectList from "./EmptyProjectList";
import ProjectsGrid from "./ProjectsGrid";
import { Fragment } from "react";
import ProjectsLoader from "./ProjectsLoader";
import { Spinner } from "../ui/spinner";
import type { projectData } from "@/types";

const ProjectsLists = ({
  profileId,
  profileOwnerId,
  projects,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  sectionRef,
  isInViewMode = false,
}: {
  profileId: string | undefined;
  profileOwnerId: string | undefined;
  projects: projectData[] | undefined;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  sectionRef: (node?: Element | null) => void;
  isInViewMode?: boolean;
}) => {
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
                isInViewMode={isInViewMode}
              />

              {/* infite scrolling */}
              <div
                ref={sectionRef}
                className="flex items-center justify-center"
              >
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
              isInViewMode={isInViewMode}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProjectsLists;
