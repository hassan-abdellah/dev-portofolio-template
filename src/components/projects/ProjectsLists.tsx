import type { projectData } from "@/types";
import EmptyProjectList from "./EmptyProjectList";
import ProjectsGrid from "./ProjectsGrid";
const ProjectsLists = ({
  projects,
  profileId,
}: {
  projects: projectData[] | undefined;
  profileId: string | undefined;
}) => {
  return (
    <div className="mt-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>
      {projects?.length ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <EmptyProjectList profileId={profileId} />
      )}
    </div>
  );
};

export default ProjectsLists;
