import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CreateProjectModal from "./CreateProjectModal";
import { Folders } from "../icons/Folders";
const EmptyProjectList = ({ profileId }: { profileId: string | undefined }) => {
  return (
    <Empty className="border border-dashed border-dark-amethyst max-w-md mx-auto card-width">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folders className="stroke-dark-amethyst" />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {/* Add the button here */}
        <CreateProjectModal profileId={profileId} />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyProjectList;
