import { Fragment } from "react";
import { Controller, useFieldArray, type UseFormReturn } from "react-hook-form";
import FormController from "@/components/inputs/FormController";
import SkillsDropdown from "@/components/inputs/SkillsDropdown";
import TextAreaController from "@/components/inputs/TextAreaController";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { X } from "lucide-react";
import SelectController from "@/components/inputs/SelectController";
import { platformsOptions } from "@/constants";
import { Button } from "@/components/ui/button";
import type { technicalFormValues } from "@/types/forms";

const TechnicalFormInputs = ({
  form,
}: {
  form: UseFormReturn<technicalFormValues>;
}) => {
  // for links form repeater
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

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
            placeholder="Enter your title e.g. Front-End, Back-End"
            label="Title"
            value={field.value}
            onchange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
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
            placeholder="Enter Description about yourself eg:i’m a front end developer using react js and typescript to build dynamic UIs"
            label="Description"
            value={field.value}
            onchange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* skill field */}
      <Controller
        name="skills"
        control={form.control}
        render={({ field, fieldState }) => (
          <SkillsDropdown
            id="form-skills"
            invalid={fieldState.invalid}
            handleSelect={field.onChange}
            onBlur={field.onBlur}
            label="Skills"
            value={field.value}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Links Field */}
      <FieldSet className="gap-4">
        <FieldLegend variant="label">Links</FieldLegend>
        <FieldDescription>
          Add up to 4 social links where people can contact you.
        </FieldDescription>
        <FieldGroup className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-1.5">
              {/* link_type */}
              <Controller
                name={`links.${index}.link_type`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <>
                    <SelectController
                      id={`link-type-${index}`}
                      name={`link-type-${index}`}
                      label="Platform"
                      placeholder="Select Platform"
                      value={controllerField.value}
                      onchange={controllerField.onChange}
                      onBlur={controllerField.onBlur}
                      options={platformsOptions}
                      invalid={fieldState.invalid}
                      error={fieldState.error?.message}
                      fieldClassNames="flex-[30%]"
                    />
                  </>
                )}
              />
              {/* link_url */}
              <Controller
                name={`links.${index}.link_url`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <FormController
                    id={`link_url${index}`}
                    name={`link_url${index}`}
                    invalid={fieldState.invalid}
                    placeholder="https://www."
                    label="Platform URL"
                    value={controllerField.value}
                    onchange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                    error={fieldState.error?.message}
                    fieldClassNames="flex-[65%]"
                  />
                )}
              />
              {/* Remove button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                className="text-muted-foreground mt-7 hover:text-destructive cursor-pointer"
                aria-label={`Remove link ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </Button>{" "}
            </div>
          ))}
        </FieldGroup>

        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          size="sm"
          onClick={() => append({ link_type: "" as "youtube", link_url: "" })}
          disabled={fields.length >= 4}
        >
          + Add New Platform
        </Button>
      </FieldSet>
    </Fragment>
  );
};

export default TechnicalFormInputs;
