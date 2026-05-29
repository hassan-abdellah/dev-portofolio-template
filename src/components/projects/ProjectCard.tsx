import type { projectData } from "@/types";
import ProjectPlacholder from "@/assets/images/project-placeholder.svg";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import UpdateProjectModal from "./UpdateProjectModal";
import DeleteModal from "../common/DeleteModal";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import LoadingModal from "../common/LoadingModal";
import ViewProjectModal from "./ViewProjectModal";
import PreviewProjectButton from "./PreviewProjectButton";
import { useDeleteProject } from "@/hooks/useProjects";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useAnimation } from "motion/react";

const ProjectCard = ({
  profileId,
  project,
  isUserOwner,
}: {
  profileId: string | undefined;
  project: projectData;
  isUserOwner: boolean;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProject = useDeleteProject();
  const controls = useAnimation();
  // Delete Project From DB
  async function handleDeleteProject(projectId: string | undefined) {
    if (!projectId) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteProject.mutateAsync(projectId);

      handelSuccessMessage("Project Deleted Successfully");
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* image */}
        <div className="border-2 border-lavender-purple rounded-xl w-full h-64 overflow-hidden">
          <img
            src={project.image_url ? project.image_url : ProjectPlacholder}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Project Details */}
        <div className="flex flex-col flex-1 gap-2 px-2">
          <h2 className="text-dark-amethyst">{project.title}</h2>
          <p className="text-gray-400 flex-1">{project.description}</p>
          {/* Action Buttons */}
          {isUserOwner ? (
            <div className="flex items-center gap-1.5">
              {project.preview_url ? (
                <PreviewProjectButton preview_url={project.preview_url} />
              ) : null}
              {/* Update Project */}
              <UpdateProjectModal
                projectId={project.id}
                profileId={profileId}
              />
              {/* View Project */}
              <ViewProjectModal projectId={project.id} />

              {/* Delete Project */}

              <DeleteModal
                modalTitle="DELETE CONFIRMATION"
                modalDescription="Are you sure you want to Delete This Project ? this action can’t be undone"
                onDelete={() => handleDeleteProject(project.id)}
                trigger={(setOpen) => (
                  <Button
                    type="button"
                    className="rounded-icon-button bg-destructive hover:bg-red-500"
                    aria-label="Delete Project"
                    onClick={() => setOpen(true)}
                    onMouseEnter={() => controls.start("animate")}
                    onMouseLeave={() => controls.start("normal")}
                  >
                    <DeleteIcon controls={controls} />
                  </Button>
                )}
              />
            </div>
          ) : (
            <Fragment>
              {project.preview_url ? (
                <PreviewProjectButton preview_url={project.preview_url} />
              ) : null}
            </Fragment>
          )}
        </div>
      </div>

      {isDeleting ? <LoadingModal /> : null}
    </>
  );
};

export default ProjectCard;
