import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { IconFolderCode } from "@tabler/icons-react";
const ProjectsLists = () => {
  return (
    <div className="mt-8">
      <h5 className="text-center text-2xl mb-4">Projects</h5>
      <Empty className="border border-dashed border-dark-amethyst max-w-md mx-auto">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button className="py-4.5 bg-dark-amethyst hover:bg-lavender-purple transition-colors duration-200 cursor-pointer">
            Create Project
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default ProjectsLists;
