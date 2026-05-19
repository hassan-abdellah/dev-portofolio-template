import { Skeleton } from "@/components/ui/skeleton";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";

const UpdateProjectLoader = () => {
  return (
    <DialogContent
      className="px-0 border-lavender-mist w-xl sm:max-w-lg card-width"
      onInteractOutside={(e) => e.preventDefault()}
    >
      {/* Dialog Header */}
      <DialogHeader className="px-4 pb-4 border-b border-lavender-mist">
        <Skeleton className="w-2/3 h-4 rounded-md mb-3" />
      </DialogHeader>

      {/* Dialog Content */}

      <div className="space-y-10 px-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
      <DialogFooter className="border-lavender-mist mb-0 mx-0 bg-transparent pb-0 pt-4">
        <Skeleton className="mt-6 w-full h-10" />
      </DialogFooter>
    </DialogContent>
  );
};

export default UpdateProjectLoader;
