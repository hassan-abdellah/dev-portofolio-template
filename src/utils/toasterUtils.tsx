import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "./apiErrorsUtils";

// for error
export const handleAxiosError = (error: unknown): void => {
  // extract the real error message from axios
  const errorMessage = getErrorMessage(error);
  toast.error(errorMessage, {
    className: "text-red500",
    position: "top-right",
    icon: <XCircleIcon />,
  });
};

// for success
export const handelSuccessMessage = (message: string): void => {
  toast.success(message, {
    position: "top-right",
    icon: <CheckCircleIcon />,
  });
};
