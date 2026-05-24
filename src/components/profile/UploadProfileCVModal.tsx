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

import { FileUser } from "lucide-react";
import { useUploadProfileCV } from "@/hooks/useProfiles";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import { profileCVSchema } from "@/formSchemas/techincalDetailsFormSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DropzoneField from "../inputs/DropzoneField";

const UploadProfileCVModal = ({
  profileId,
  cvUrl,
}: {
  profileId: string | undefined;
  cvUrl?: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const uploadCV = useUploadProfileCV();

  const defualtValues = useMemo(() => {
    return {
      pdf: cvUrl ? cvUrl : null,
    };
  }, [cvUrl]);

  const form = useForm<z.infer<typeof profileCVSchema>>({
    resolver: zodResolver(profileCVSchema),
    defaultValues: defualtValues,
    mode: "onChange",
  });

  async function handleUploadCV(data: z.infer<typeof profileCVSchema>) {
    if (!profileId) {
      return;
    }
    try {
      await uploadCV.mutateAsync({
        profileId: profileId,
        data: {
          pdf: data.pdf,
        },
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
  }, [form, defualtValues]);

  return (
    <>
      {/* Dialog trigger */}

      <Button
        type="button"
        className="h-full cursor-pointer px-4 py-2 bg-gray-400 text-dark-amethyst rounded-lg shadow-indigo-velvet hover:bg-gray-800 hover:text-lavender-mist transition-colors duration-300 flex items-center gap-1"
        onClick={() => setIsOpen(true)}
        aria-label="Upload CV"
      >
        <FileUser className="size-4" />
        <span>Upload CV</span>
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <DialogContent
            className="px-0 border-lavender-mist w-xl sm:max-w-lg card-width"
            onInteractOutside={(e) => e.preventDefault()}
          >
            {/* Dialog Header */}
            <DialogHeader className="px-4 pb-4 border-b border-lavender-mist">
              <DialogTitle>Upload CV</DialogTitle>
            </DialogHeader>

            {/* Dialog Content */}
            <form
              id="cv-upload-form"
              className="space-y-6 w-full overflow-y-auto max-h-[78vh] px-4 pb-4"
              onSubmit={form.handleSubmit(handleUploadCV)}
            >
              {/* project image input */}
              <Controller
                name="pdf"
                control={form.control}
                render={({ field, fieldState }) => (
                  <DropzoneField
                    id="form-profile-csv"
                    label="CV (PDF)"
                    onChange={(files) =>
                      field.onChange(files.length > 0 ? files[0] : null)
                    }
                    // value={field.value instanceof File ? [field.value] : []}
                    value={field.value ? [field.value] : []}
                    maxFiles={1}
                    invalid={fieldState.invalid}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </form>

            <DialogFooter className="border-lavender-mist mb-0 mx-0 bg-transparent pb-0 pt-4">
              <Button
                form="cv-upload-form"
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

export default UploadProfileCVModal;
