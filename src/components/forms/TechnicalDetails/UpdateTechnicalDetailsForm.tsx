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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CheckCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "../../ui/spinner";
import { useProfileData } from "@/hooks/useProfileData";
import TechnicalFormInputs from "./TechnicalFormInputs";

const UpdateTechnicalDetailsForm = () => {
  // @TODO: implement getting data from DB

  const profileData = useProfileData();

  const form = useForm<z.infer<typeof technicalDetailsSchema>>({
    resolver: zodResolver(technicalDetailsSchema),
    defaultValues: {
      title: profileData.title ? profileData.title : "",
      description: profileData.description ? profileData.description : "",
      links:
        profileData.links.length > 0
          ? profileData.links
          : [{ link_type: "" as "youtube", link_url: "" }],
      skills: profileData.skills.length > 0 ? profileData.skills : [],
    },
    mode: "onChange",
  });

  function handleUpdateData(data: z.infer<typeof technicalDetailsSchema>) {
    localStorage.removeItem("dev-links");
    localStorage.setItem("dev-links", JSON.stringify(data));
    toast.success("Data updated Successfully", {
      position: "top-right",
      icon: <CheckCircleIcon />,
    });
    form.reset();
  }

  return (
    <Card className="w-full max-w-lg bg-white card-width">
      <CardHeader className="[.border-b]:pb-2 border-b border-lavender-mist">
        <CardTitle>Technical Details</CardTitle>

        <CardDescription>Update your Technical Details</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="technical-form"
          className="space-y-6 w-full"
          onSubmit={form.handleSubmit(handleUpdateData)}
        >
          <TechnicalFormInputs form={form} />
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

export default UpdateTechnicalDetailsForm;
