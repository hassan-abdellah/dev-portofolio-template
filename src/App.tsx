import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import AddTechnicalPage from "./pages/AddTechnicalPage";
import EditTechnicalDetailsPage from "./pages/EditTechnicalDetailsPage";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <div>
      <TooltipProvider>
        <Routes>
          <Route index element={<AddTechnicalPage />} />
          <Route path="/profile/edit" element={<EditTechnicalDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </div>
  );
};

export default App;
