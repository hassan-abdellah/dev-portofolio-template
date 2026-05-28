import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { ClipboardCopyIcon } from "../icons/ClipboardCopyIcon";
import { Button } from "../ui/button";
import { useAnimation } from "motion/react";
import { profilePaths } from "@/data/routesPaths";
import { useEffect } from "react";
import { handelSuccessMessage } from "@/utils/toasterUtils";
const CopyProtofolioLinkButton = ({ profileId }: { profileId: string }) => {
  const controls = useAnimation();
  const { copied, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (copied) {
      handelSuccessMessage("Link Copied to clipboard");
    }
  }, [copied]);

  return (
    <Button
      type="button"
      className="cursor-pointer px-4 py-5 bg-indigo-velvet hover:bg-midnight-violet text-lavender-mist rounded-lg shadow-indigo-velvet  transition-colors duration-300 flex items-center gap-1"
      aria-label="Copy link"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      onClick={async () => {
        const baseLink = import.meta.env.VITE_REACT_APP_BASE_URL;
        const addonLink = profilePaths.viewProfile.replace(":id", profileId);
        const shareableLink = `${baseLink}${addonLink}`;
        await copyToClipboard(shareableLink);
      }}
    >
      <ClipboardCopyIcon controls={controls} />
      <span>Copy Link</span>
    </Button>
  );
};

export default CopyProtofolioLinkButton;
