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
const ProjectsLists = () => {
  return (
    <div className="mt-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>
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
          {/* TODO: Implement project creation functionality */}
          {/* Add the button here */}
          <CreateProjectModal />
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default ProjectsLists;
