import type { projectData } from "@/types";
import { useAuth } from "@clerk/react";
import { useMemo } from "react";
import clsx from "clsx";
import CreateProjectModal from "./CreateProjectModal";
import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({
  projects,
  profileOwnerId,
  profileId,
  isInViewMode = false,
}: {
  projects: projectData[] | undefined;
  profileOwnerId: string | undefined;
  profileId: string | undefined;
  isInViewMode?: boolean;
}) => {
  const { userId } = useAuth();

  const isUserOwner: boolean = useMemo(() => {
    return userId === profileOwnerId && !isInViewMode ? true : false;
  }, [userId, profileOwnerId, isInViewMode]);

  return (
    <div className="mt-4 container">
      {isUserOwner ? (
        <div className="flex justify-end mb-4">
          {/* Add the button here */}
          <CreateProjectModal
            buttonTitle="Create New Project"
            profileId={profileId}
          />
        </div>
      ) : null}
      <div
        className={clsx(
          projects?.length && projects?.length > 2
            ? "grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6"
            : "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6",
        )}
      >
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isUserOwner={isUserOwner}
            profileId={profileId}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
