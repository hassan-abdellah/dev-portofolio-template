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
import UpdateProfileLoader from "@/components/profile/UpdateProfileLoader";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import { profilePaths } from "@/data/routesPaths";
import { useProfile, useUpdateProfile } from "@/hooks/useProfiles";

const UpdateTechnicalDetailsForm = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();

  const { data: profileData, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const defualtValues = useMemo(() => {
    return {
      title: profileData?.title ? profileData.title : "",
      description: profileData?.description ? profileData.description : "",
      links: profileData?.links.length
        ? profileData.links
        : [{ link_type: "" as "youtube", link_url: "" }],
      skills: profileData?.skills.length ? profileData.skills : [],
    };
  }, [profileData]);

  const form = useForm<z.infer<typeof technicalDetailsSchema>>({
    resolver: zodResolver(technicalDetailsSchema),
    defaultValues: defualtValues,
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(defualtValues);
  }, [form, isLoading, defualtValues]);

  const handleUpdateData = async (
    data: z.infer<typeof technicalDetailsSchema>,
  ) => {
    try {
      if (!profileId) return;
      await updateProfile.mutateAsync({ profileId: profileId, data });
      handelSuccessMessage("Data Upadted Successfully");
      navigate(profilePaths.myProfile);
    } catch (error) {
      handleAxiosError(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <UpdateProfileLoader />
      ) : (
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
      )}
    </>
  );
};

export default UpdateTechnicalDetailsForm;
