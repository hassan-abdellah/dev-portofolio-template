import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { technicalDetailsSchema } from "@/formSchemas/techincalDetailsFormSchema";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormController from "../inputs/FormController";
import SkillsDropdown from "../inputs/SkillsDropdown";
import TextAreaController from "../inputs/TextAreaController";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { CheckCircleIcon, X } from "lucide-react";
import SelectController from "../inputs/SelectController";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const AddTechnicalDetailsForm = () => {
  const form = useForm<z.infer<typeof technicalDetailsSchema>>({
    resolver: zodResolver(technicalDetailsSchema),
    defaultValues: {
      title: "",
      description: "",
      links: [{ link_type: "" as "youtube", link_url: "" }],
      skills: [],
    },
    mode: "onChange",
  });

  // for links form repeater
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  function handleAddData(data: z.infer<typeof technicalDetailsSchema>) {
    localStorage.removeItem("dev-links");
    localStorage.setItem("dev-links", JSON.stringify(data));
    toast.success("Data Added Successfully", {
      position: "top-right",
      icon: <CheckCircleIcon />,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg bg-white">
      <CardHeader className="[.border-b]:pb-2 border-b border-lavender-mist">
        <CardTitle>Technical Details</CardTitle>

        <CardDescription>Enter your Technical Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="technical-form"
          className="space-y-6 w-full"
          onSubmit={form.handleSubmit(handleAddData)}
        >
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
                          options={["youtube", "github", "linkedIn", "others"]}
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
              onClick={() =>
                append({ link_type: "" as "youtube", link_url: "" })
              }
              disabled={fields.length >= 4}
            >
              + Add New Platform
            </Button>
          </FieldSet>
        </form>
      </CardContent>
      <CardFooter className="bg-white border-lavender-mist">
        <Button
          form="technical-form"
          type="submit"
          className="w-full flex items-center gap-1.5 cursor-pointer py-4.5 rounded-xl bg-indigo-velvet hover:bg-lavender-purple"
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
      </CardFooter>
    </Card>
  );
};

export default AddTechnicalDetailsForm;
