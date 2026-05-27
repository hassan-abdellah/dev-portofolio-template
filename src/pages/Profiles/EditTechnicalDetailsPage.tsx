import UpdateTechnicalDetailsForm from "@/components/profile/UpdateTechnicalDetailsForm";
import { useDocTitle } from "@/hooks/useDocTitle";

const EditTechnicalDetailsPage = () => {
  useDocTitle("Update Portfolio");

  return (
    <section className="flex items-center justify-center">
      <UpdateTechnicalDetailsForm />
    </section>
  );
};

export default EditTechnicalDetailsPage;
