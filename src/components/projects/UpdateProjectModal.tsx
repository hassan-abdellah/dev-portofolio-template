import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { projectFormSchema } from "@/formSchemas/projectFormSchema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ProjectFormInputs from "./ProjectFormInputs";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import UpdateProjectLoader from "./UpdateProjectLoader";
import { PencilIcon } from "lucide-react";
import { useProject, useUpdateProject } from "@/hooks/useProjects";

const UpdateProjectModal = ({
  profileId,
  projectId,
}: {
  profileId: string | undefined;
  projectId: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateProject = useUpdateProject();

  const { data: projectData, isLoading } = useProject(projectId, isOpen);

  const defualtValues = useMemo(() => {
    return {
      title: projectData?.title ? projectData.title : "",
      description: projectData?.description ? projectData.description : "",
      project_image: projectData?.image_url ? projectData?.image_url : null,
      project_url: projectData?.preview_url ? projectData?.preview_url : null,
    };
  }, [projectData]);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defualtValues,
    mode: "onChange",
  });

  async function handleUpdateProject(data: z.infer<typeof projectFormSchema>) {
    if (!profileId) {
      return;
    }
    try {
      await updateProject.mutateAsync({
        data: {
          ...data,
          image: data.project_image,
          project_url: data.project_url,
        },

        projectId: projectData?.id ? projectData.id : "",
      });

      handelSuccessMessage("Project Updated Successfully");
      setIsOpen(false);
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  }

  useEffect(() => {
    form.reset(defualtValues);
  }, [form, isLoading, defualtValues]);

  return (
    <>
      {/* Dialog trigger */}
      <Button
        className="rounded-icon-button bg-dark-amethyst hover:bg-midnight-violet"
        onClick={() => setIsOpen(true)}
        aria-label="Edit Project"
      >
        <PencilIcon />
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          {isLoading ? (
            <UpdateProjectLoader />
          ) : (
            <DialogContent
              className="px-0 border-lavender-mist w-xl sm:max-w-lg card-width"
              onInteractOutside={(e) => e.preventDefault()}
            >
              {/* Dialog Header */}
              <DialogHeader className="px-4 pb-4 border-b border-lavender-mist">
                <DialogTitle>Update Project</DialogTitle>
              </DialogHeader>

              {/* Dialog Content */}
              <form
                id="project-form"
                className="space-y-6 w-full overflow-y-auto max-h-[78vh] px-4 pb-4"
                onSubmit={form.handleSubmit(handleUpdateProject)}
              >
                <ProjectFormInputs form={form} />
              </form>

              <DialogFooter className="border-lavender-mist mb-0 mx-0 bg-transparent pb-0 pt-4">
                <Button
                  form="project-form"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full flex items-center gap-1.5 cursor-pointer py-4.5 rounded-xl bg-indigo-velvet hover:bg-lavender-purple focus-visible:ring-lavender-mist"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner />
                      <span>Saving</span>
                    </>
                  ) : (
                    <span>Save</span>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
};

export default UpdateProjectModal;
