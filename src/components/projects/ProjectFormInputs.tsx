import { Fragment } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import FormController from "@/components/inputs/FormController";
import TextAreaController from "@/components/inputs/TextAreaController";

import type { projectFormValues } from "@/types/forms";
import DropzoneField from "../inputs/DropzoneField";

const ProjectFormInputs = ({
  form,
}: {
  form: UseFormReturn<projectFormValues>;
}) => {
  return (
    <Fragment>
      {/* title input */}
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <FormController
            id="form-title"
            name="title"
            invalid={fieldState.invalid}
            placeholder="Enter Project title e.g. Javascript Calculator"
            label="Title"
            value={field.value}
            onchange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            isRequired={true}
          />
        )}
      />
      {/* description field */}
      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextAreaController
            id="form-description"
            name="description"
            invalid={fieldState.invalid}
            placeholder="Enter Project description e.g. A calculator built using vanilla javascript css and html"
            label="Description"
            value={field.value}
            onchange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            isRequired={true}
          />
        )}
      />

      {/* project url input */}
      <Controller
        name="project_url"
        control={form.control}
        render={({ field, fieldState }) => (
          <FormController
            id="form-project-url"
            name="project_url"
            invalid={fieldState.invalid}
            placeholder="Enter Preview URL e.g. https://github.com/user/project"
            label="Preview URL"
            value={field.value ? field.value : ""}
            onchange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* project image input */}
      <Controller
        name="project_image"
        control={form.control}
        render={({ field, fieldState }) => (
          <DropzoneField
            id="form-project-image"
            label="Project Image URL"
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
    </Fragment>
  );
};

export default ProjectFormInputs;
