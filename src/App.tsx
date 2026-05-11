import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import AddTechnicalPage from "./pages/AddTechnicalPage";
import EditTechnicalDetailsPage from "./pages/EditTechnicalDetailsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import RegisterPage from "./pages/authentication/RegisterPage";
import LoginPage from "./pages/authentication/LoginPage";

const App = () => {
  return (
    <div>
      <TooltipProvider>
        <Routes>
          <Route index element={<AddTechnicalPage />} />
          <Route path="/profile/edit" element={<EditTechnicalDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route path={"/auth/sign-up"} element={<RegisterPage />} />
          <Route path={"/auth/sign-in"} element={<LoginPage />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </div>
  );
};

export default App;
