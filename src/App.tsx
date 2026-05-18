import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "./components/layout/AppRoutes";

const App = () => {
  return (
    <TooltipProvider>
      {/* Routes Wrapper */}
      <AppRoutes />
      {/* Toaster Wrapper */}
      <Toaster />
    </TooltipProvider>
  );
};

export default App;
