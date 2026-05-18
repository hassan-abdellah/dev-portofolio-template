import { Route, Routes } from "react-router";
import ProfilePage from "@/pages/Profiles/ProfilePage";
import AddTechnicalPage from "@/pages/AddTechnicalPage";
import EditTechnicalDetailsPage from "@/pages/EditTechnicalDetailsPage";
import RegisterPage from "@/pages/authentication/RegisterPage";
import LoginPage from "@/pages/authentication/LoginPage";
import { authPaths, profilePaths } from "@/data/routesPaths";
import PublicLayout from "./PublicLayout";
import AuthLayout from "./AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<AuthLayout />}>
        <Route index element={<AddTechnicalPage />} />
        <Route
          path={profilePaths.editProfile}
          element={<EditTechnicalDetailsPage />}
        />
        <Route path={profilePaths.myProfile} element={<ProfilePage />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path={authPaths.register} element={<RegisterPage />} />
        <Route path={authPaths.logIn} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
