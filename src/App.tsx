import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import AddTechnicalPage from "./pages/AddTechnicalPage";
import EditTechnicalDetailsPage from "./pages/EditTechnicalDetailsPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import RegisterPage from "./pages/authentication/RegisterPage";
import LoginPage from "./pages/authentication/LoginPage";
import { authPaths, profilePaths } from "./data/routesPaths";

const App = () => {
  return (
    <div>
      <TooltipProvider>
        <Routes>
          <Route index element={<AddTechnicalPage />} />
          <Route
            path={profilePaths.editProfile}
            element={<EditTechnicalDetailsPage />}
          />
          <Route path={profilePaths.myProfile} element={<ProfilePage />} />

          <Route path={authPaths.register} element={<RegisterPage />} />
          <Route path={authPaths.logIn} element={<LoginPage />} />
        </Routes>
        <Toaster />
      </TooltipProvider>
    </div>
  );
};

export default App;
