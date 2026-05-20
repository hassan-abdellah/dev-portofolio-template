import type { projectData } from "@/types";
import ProjectPlacholder from "@/assets/images/project-placeholder.svg";
import { useAuth } from "@clerk/react";
import { Fragment, useMemo, useState } from "react";
import { Button } from "../ui/button";
import UpdateProjectModal from "./UpdateProjectModal";
import DeleteModal from "../common/DeleteModal";
import apiClient from "@/api/apiClient";
import { PROJECTSURL } from "@/api/url_helper";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import LoadingModal from "../common/LoadingModal";
const ProjectsGrid = ({
  projects,
  profileOwnerId,
  profileId,
}: {
  projects: projectData[] | undefined;
  profileOwnerId: string | undefined;
  profileId: string | undefined;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { userId, getToken } = useAuth();

  const isUserOwner: boolean = useMemo(() => {
    return userId === profileOwnerId ? true : false;
  }, [userId, profileOwnerId]);

  // Delete Project From DB
  async function handleDeleteProject(projectId: string | undefined) {
    if (!projectId) {
      return;
    }
    setIsDeleting(true);
    try {
      const token = await getToken(); // JWT to send to your Node backend

      await apiClient.delete(`${PROJECTSURL}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handelSuccessMessage("Project Deleted Successfully");
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="mt-4 container grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {projects?.map((project) => (
          <div key={project.id}>
            {/* image */}
            <div className="border-2 border-lavender-purple rounded-xl w-full h-64 overflow-hidden">
              <img
                src={project.image_url ? project.image_url : ProjectPlacholder}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Project Details */}
            <div className="mt-4 flex flex-col gap-2 px-2">
              <h2 className="text-dark-amethyst">{project.title}</h2>
              <p className="text-gray-400">{project.description}</p>
              {isUserOwner ? (
                <div className="flex items-center gap-0.5">
                  {project.preview_url ? (
                    <a
                      target="_blank"
                      href={project.preview_url}
                      className="flex-1 bg-indigo-velvet cursor-pointer rounded-lg text-white text-center py-2 hover:bg-wisteria transition-colors duration-300"
                    >
                      Preview
                    </a>
                  ) : null}
                  {/* Update Project */}
                  <UpdateProjectModal
                    projectId={project.id}
                    profileId={profileId}
                  />

                  {/* Delete Project */}

                  <DeleteModal
                    modalTitle="DELETE CONFIRMATION"
                    modalDescription="Are you sure you want to Delete This Project ? this action can’t be undone"
                    onDelete={() => handleDeleteProject(project.id)}
                    trigger={(setOpen) => (
                      <Button
                        type="button"
                        className="flex-1 py-5 bg-destructive cursor-pointer hover:bg-destructive/50 transition-colors duration-300"
                        onClick={() => setOpen(true)}
                      >
                        Delete
                      </Button>
                    )}
                  />
                </div>
              ) : (
                <Fragment>
                  {project.preview_url ? (
                    <a
                      target="_blank"
                      href={project.preview_url}
                      className="bg-indigo-velvet cursor-pointer rounded-lg text-white text-center py-2 hover:bg-wisteria transition-colors duration-300"
                    >
                      Preview
                    </a>
                  ) : null}
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
      {isDeleting ? <LoadingModal /> : null}
    </>
  );
};

export default ProjectsGrid;
