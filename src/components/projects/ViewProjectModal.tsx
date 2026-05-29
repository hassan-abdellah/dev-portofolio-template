import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { projectFormSchema } from "@/formSchemas/projectFormSchema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import ProjectFormInputs from "./ProjectFormInputs";

import UpdateProjectLoader from "./UpdateProjectLoader";
import { useProject } from "@/hooks/useProjects";
import EyeIcon from "../icons/EyeIcon";
import { useAnimation } from "motion/react";

const ViewProjectModal = ({ projectId }: { projectId: string | undefined }) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const { data: projectData, isLoading } = useProject(projectId, isOpen);

  const defualtValues = useMemo(() => {
    return {
      title: projectData?.title ? projectData.title : "",
      description: projectData?.description ? projectData.description : "",
      project_image: projectData?.image_url ? projectData?.image_url : "",
      project_url: projectData?.preview_url ? projectData?.preview_url : null,
    };
  }, [projectData]);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defualtValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(defualtValues);
  }, [form, isLoading, defualtValues]);

  return (
    <>
      {/* Dialog trigger */}
      <Button
        className="rounded-icon-button bg-gray-400 hover:bg-gray-500"
        onClick={() => setIsOpen(true)}
        aria-label="View Project"
        onMouseEnter={() => controls.start("animate")}
        onMouseLeave={() => controls.start("normal")}
      >
        <EyeIcon controls={controls} />
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
                <DialogTitle>View Project</DialogTitle>
              </DialogHeader>

              {/* Dialog Content */}
              <div className="space-y-6 w-full overflow-y-auto max-h-[78vh] px-4 pb-4">
                <ProjectFormInputs isViewMode={true} form={form} />
              </div>
            </DialogContent>
          )}
        </Dialog>
      )}
    </>
  );
};

export default ViewProjectModal;
