import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";

import {
  Fragment,
  useCallback,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

const DeleteModal = ({
  modalTitle,
  modalDescription,
  trigger,
  onDelete,
}: {
  modalTitle: string;
  modalDescription: string;
  trigger: (setOpen: Dispatch<SetStateAction<boolean>>) => ReactNode;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = useCallback(() => {
    onDelete();
    setOpen(false);
  }, [onDelete]);

  return (
    <Fragment>
      {/* Render the trigger with click handler */}
      {trigger(setOpen)}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-white border-0 px-0">
          <AlertDialogHeader className="flex flex-col  sm:group-data-[size=default]/alert-dialog-content:place-items-center">
            <AlertDialogMedia className="bg-destructive/10 w-10 h-10">
              <Trash2Icon className="text-pink-purple w-7 h-7" />
            </AlertDialogMedia>

            <AlertDialogTitle className="text-center">
              {modalTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="px-4">
              {modalDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="border-t border-gray-100 pb-0 pt-4 px-4 mx-0 mb-0 bg-transparent">
            <AlertDialogAction
              variant="outline"
              className="cursor-pointer bg-destructive text-white rounded-md px-5 py-4.5 transition-colors duration-350 hover:bg-red-500 hover:text-white"
              onClick={() => handleDelete()}
            >
              Delete
            </AlertDialogAction>

            <AlertDialogCancel
              variant="outline"
              className="cursor-pointer bg-dark-amethyst text-white rounded-md px-5 py-4.5 transition-colors duration-350 hover:bg-gray-700 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

export default DeleteModal;
