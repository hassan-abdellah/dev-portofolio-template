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

import { Spinner } from "../../ui/spinner";
import TechnicalFormInputs from "./TechnicalFormInputs";
import apiClient from "@/api/apiClient";
import { useAuth } from "@clerk/react";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import { PROFILESURL } from "@/api/url_helper";
import { profilePaths } from "@/data/routesPaths";
import { useNavigate } from "react-router";

const AddTechnicalDetailsForm = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

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

  async function handleAddData(data: z.infer<typeof technicalDetailsSchema>) {
    try {
      const token = await getToken(); // JWT to send to your Node backend
      await apiClient.post(
        PROFILESURL,
        {
          title: data.title,
          description: data.description,
          skills: data.skills,
          links: data.links,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      handelSuccessMessage("Data Added Successfully");
      navigate(profilePaths.myProfile);
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <Card className="w-full max-w-lg bg-white card-width">
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
          <TechnicalFormInputs form={form} />
        </form>
      </CardContent>
      <CardFooter className="bg-white border-lavender-mist">
        <Button
          form="technical-form"
          type="submit"
          disabled={form.formState.isSubmitting}
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
