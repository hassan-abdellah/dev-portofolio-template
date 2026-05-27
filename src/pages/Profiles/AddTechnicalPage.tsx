import AddTechnicalDetailsForm from "@/components/profile/AddTechnicalDetailsForm";
import { useDocTitle } from "@/hooks/useDocTitle";

const AddTechnicalPage = () => {
  useDocTitle("Create Portfolio");

  return (
    <section className="flex items-center justify-center">
      <AddTechnicalDetailsForm />
    </section>
  );
};

export default AddTechnicalPage;
