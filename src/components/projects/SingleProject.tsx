import type { projectData } from "@/types";
import ProjectPlacholder from "@/assets/images/project-placeholder.svg";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import UpdateProjectModal from "./UpdateProjectModal";
import DeleteModal from "../common/DeleteModal";
import { useAuth } from "@clerk/react";
import apiClient from "@/api/apiClient";
import { PROJECTSURL } from "@/api/url_helper";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import LoadingModal from "../common/LoadingModal";
import { GlobeIcon, TrashIcon } from "lucide-react";
import ViewProjectModal from "./ViewProjectModal";

const SingleProject = ({
  profileId,
  project,
  isUserOwner,
}: {
  profileId: string | undefined;
  project: projectData;
  isUserOwner: boolean;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { getToken } = useAuth();

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
      <div>
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
            <div className="flex items-center gap-1.5">
              {project.preview_url ? (
                <a
                  target="_blank"
                  href={project.preview_url}
                  className="rounded-full flex items-center justify-center w-10 h-10 bg-indigo-velvet cursor-pointer text-white  hover:bg-wisteria transition-colors duration-300"
                >
                  <GlobeIcon />
                </a>
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
                    className="rounded-full flex items-center justify-center w-10 h-10 bg-destructive cursor-pointer hover:bg-destructive/50 transition-colors duration-300"
                    onClick={() => setOpen(true)}
                  >
                    <TrashIcon />
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
                  className="rounded-full flex items-center justify-center w-10 h-10 bg-indigo-velvet cursor-pointer text-white hover:bg-wisteria transition-colors duration-300"
                >
                  <GlobeIcon />
                </a>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>

      {isDeleting ? <LoadingModal /> : null}
    </>
  );
};

export default SingleProject;
