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
import { useAuth } from "@clerk/react";
import { useMemo } from "react";
const EmptyProjectList = ({
  profileId,
  profileOwnerId,
}: {
  profileId: string | undefined;
  profileOwnerId: string | undefined;
}) => {
  const { userId } = useAuth();

  const isUserOwner: boolean = useMemo(() => {
    return userId === profileOwnerId ? true : false;
  }, [userId, profileOwnerId]);

  return (
    <Empty className="border border-dashed border-dark-amethyst max-w-md mx-auto card-width">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folders className="stroke-dark-amethyst" />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        {isUserOwner ? (
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        ) : (
          <EmptyDescription>
            This Profile’s user hasn&apos;t created any projects yet.
          </EmptyDescription>
        )}
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        {/* Add the button here */}
        {isUserOwner ? <CreateProjectModal profileId={profileId} /> : null}
      </EmptyContent>
    </Empty>
  );
};

export default EmptyProjectList;
