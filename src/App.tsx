import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import AddTechnicalPage from "./pages/AddTechnicalPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<AddTechnicalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
