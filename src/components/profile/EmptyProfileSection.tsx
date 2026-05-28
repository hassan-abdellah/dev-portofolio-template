import { useUser } from "@clerk/react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router";
import { CodeIcon } from "lucide-react";
import UserImageUsername from "./UserImageUsername";
const EmptyProfileSection = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center bg-lavender-purple h-120 w-full rounded-b-4xl">
      <UserImageUsername imageUrl={user?.imageUrl} username={user?.fullName} />

      <Empty className="mt-6 border border-dashed border-lavender-mist flex-none max-w-2xl mx-auto card-width">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CodeIcon className="stroke-dark-amethyst" />
          </EmptyMedia>
          <EmptyTitle className="text-xl">No portofolio Yet</EmptyTitle>
          <EmptyDescription className="text-lg text-lavender-mist">
            You haven&apos;t created a portofolio yet. Get started by creating
            your portofolio.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          {/* Add the button here */}
          <Link
            to="/"
            className="bg-dark-amethyst text-lavender-mist px-4 py-2 rounded-lg hover:bg-indigo-velvet transition-colors"
          >
            Create Portofolio
          </Link>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyProfileSection;
