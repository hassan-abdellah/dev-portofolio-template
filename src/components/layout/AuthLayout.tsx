import { Navigate } from "react-router";
import { useAuth } from "@clerk/react";
import { authPaths } from "@/data/routesPaths";
import { Spinner } from "../ui/spinner";
import PublicLayout from "./PublicLayout";

const AuthLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 stroke-lavender-purple" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to={authPaths.logIn} replace />;
  }

  return <PublicLayout />;
};

export default AuthLayout;
