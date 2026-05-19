import { useState } from "react";

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
import { useAuth } from "@clerk/react";
import apiClient from "@/api/apiClient";
import { PROJECTSURL } from "@/api/url_helper";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";

const CreateProjectModal = ({
  profileId,
}: {
  profileId: string | undefined;
}) => {
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      project_image: null,
      project_url: "",
    },
    mode: "onChange",
  });

  async function handleAddProject(data: z.infer<typeof projectFormSchema>) {
    if (!profileId) {
      return;
    }
    try {
      const token = await getToken(); // JWT to send to your Node backend

      const formData = new FormData();
      console.log("data", data?.project_image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.project_image) {
        formData.append("image", data.project_image);
      }

      if (data.project_url) {
        formData.append("preview_url", data.project_url);
      }

      if (profileId) {
        formData.append("profile_id", profileId);
      }
      await apiClient.post(PROJECTSURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": undefined,
        },
      });
      handelSuccessMessage("Data Added Successfully");
      setIsOpen(false);
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <>
      {/* Dialog trigger */}
      <Button
        className="py-4.5 bg-dark-amethyst hover:bg-lavender-purple transition-colors duration-200 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Create Project
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <DialogContent
            className="px-0 border-lavender-mist w-xl sm:max-w-lg card-width"
            onInteractOutside={(e) => e.preventDefault()}
          >
            {/* Dialog Header */}
            <DialogHeader className="px-4 pb-4 border-b border-lavender-mist">
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>

            {/* Dialog Content */}
            <form
              id="project-form"
              className="space-y-6 w-full overflow-y-auto max-h-[78vh] px-4 pb-4"
              onSubmit={form.handleSubmit(handleAddProject)}
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
        </Dialog>
      )}
    </>
  );
};

export default CreateProjectModal;
