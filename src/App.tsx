import { Toaster } from "@/components/ui/sonner";
import AddTechnicalDetailsForm from "./components/forms/AddTechnicalDetailsForm";
const App = () => {
  return (
    <div className="flex items-center justify-center my-10">
      <AddTechnicalDetailsForm />

      <Toaster />
    </div>
  );
};

export default App;
