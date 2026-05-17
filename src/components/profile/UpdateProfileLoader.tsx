import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

const UpdateProfileLoader = () => {
  return (
    <Card className="w-full max-w-lg bg-white card-width">
      <CardHeader className="[.border-b]:pb-2 border-b border-lavender-mist">
        {/* Name */}
        <Skeleton className="w-full h-4 rounded-md mb-3" />
        {/* title */}
        <Skeleton className="w-2/3 h-4 rounded-md mb-3" />
      </CardHeader>
      <CardContent>
        {/* Skills */}
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-3xl" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-white border-lavender-mist">
        <Skeleton className="mt-6 w-full h-10" />
      </CardFooter>
    </Card>
  );
};

export default UpdateProfileLoader;
