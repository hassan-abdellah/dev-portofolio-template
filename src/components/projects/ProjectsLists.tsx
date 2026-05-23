import type { projectData } from "@/types";
import EmptyProjectList from "./EmptyProjectList";
import ProjectsGrid from "./ProjectsGrid";
import { Fragment } from "react";
import ProjectsLoader from "./ProjectsLoader";
const ProjectsLists = ({
  projects,
  isLoading,
  profileId,
  profileOwnerId,
}: {
  projects: projectData[] | undefined;
  isLoading: boolean;
  profileId: string | undefined;
  profileOwnerId: string | undefined;
}) => {
  return (
    <div className="mt-8 pb-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>

      {isLoading ? (
        <ProjectsLoader />
      ) : (
        <Fragment>
          {projects?.length ? (
            <ProjectsGrid
              projects={projects}
              profileId={profileId}
              profileOwnerId={profileOwnerId}
            />
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
