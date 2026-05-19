import type { projectData } from "@/types";
import EmptyProjectList from "./EmptyProjectList";
import ProjectsGrid from "./ProjectsGrid";
const ProjectsLists = ({
  projects,
  profileId,
  profileOwnerId,
}: {
  projects: projectData[] | undefined;
  profileId: string | undefined;
  profileOwnerId: string | undefined;
}) => {
  return (
    <div className="mt-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>
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
    </div>
  );
};

export default ProjectsLists;
