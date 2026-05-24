import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { ExternalLink } from "lucide-react";
import { useShareProfile } from "@/hooks/useProfiles";
import { handelSuccessMessage, handleAxiosError } from "@/utils/toasterUtils";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const ShareProfileModal = ({
  profileId,
  isShared,
}: {
  profileId: string | undefined;
  isShared?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const shareProfile = useShareProfile();
  const isLoading = shareProfile.status === "pending" ? true : false;
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleShareProfile = async () => {
    if (!profileId) return;
    try {
      await shareProfile.mutateAsync({
        profileId,
        data: { is_sharable: !isShared },
      });
      setIsOpen(false);

      handelSuccessMessage(
        `Porotofolio ${isShared ? "unshared" : "shared"} successfully`,
      );
      if (!isShared) {
        const baseLink = import.meta.env.VITE_REACT_APP_BASE_URL;
        const shareableLink = `${baseLink}/profiles/${profileId}`;
        await copyToClipboard(shareableLink);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    if (copied) {
      handelSuccessMessage("Link Copied to clipboard");
    }
  }, [copied]);

  return (
    <>
      {/* Dialog trigger */}

      <Button
        type="button"
        className="h-full cursor-pointer px-4 py-2 bg-midnight-violet text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-dark-amethyst transition-colors duration-300 flex items-center gap-1"
        aria-label={isShared ? "Unshare Profile" : "Share Profile"}
        onClick={() => setIsOpen(true)}
      >
        <ExternalLink className="size-4" />
        <span>{isShared ? "Unshare" : "Share"}</span>
      </Button>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <DialogContent
            className="px-0 border-lavender-mist w-lg card-width"
            onInteractOutside={(e) => e.preventDefault()}
          >
            {/* Dialog Header */}
            <DialogHeader className="px-4 pb-4 border-b border-lavender-mist">
              <DialogTitle>Share Portofolio</DialogTitle>
            </DialogHeader>
            {/* Dialog Content */}
            <p className="px-4 leading-6">
              Be Cautious Anyone who has access to this link can view your
              porotofolio and projects, but they cannot edit or make any changes
              to it.
              <br />
              Are you sure you want to share your porotofolio?
            </p>
            <DialogFooter className="border-lavender-mist mb-0 mx-0 bg-transparent pb-0 pt-4 flex items-center max-w-full">
              <Button
                type="button"
                className="flex items-center gap-1.5 cursor-pointer py-4.5 px-4 rounded-xl bg-indigo-velvet hover:bg-lavender-purple focus-visible:ring-lavender-mist"
                onClick={() => handleShareProfile()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    <span>{isShared ? "Unsharing" : "Sharing"}</span>
                  </>
                ) : (
                  <span>{isShared ? "Unshare" : "Share"}</span>
                )}
              </Button>

              <Button
                type="button"
                className="cursor-pointer py-4.5 px-4 rounded-xl bg-gray-400 hover:bg-gray-600 focus-visible:ring-lavender-mist"
                aria-label="Close Modal"
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ShareProfileModal;
