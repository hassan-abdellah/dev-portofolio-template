import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { ClipboardCopyIcon } from "../icons/ClipboardCopyIcon";
import { profilePaths } from "@/data/routesPaths";
import { useEffect } from "react";
import { handelSuccessMessage } from "@/utils/toasterUtils";
import AnimatedIconButton from "../common/AnimatedIconButton";
const CopyProtofolioLinkButton = ({ profileId }: { profileId: string }) => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (copied) {
      handelSuccessMessage("Link Copied to clipboard");
    }
  }, [copied]);

  return (
    <AnimatedIconButton
      IconComponent={ClipboardCopyIcon}
      type="button"
      className="cursor-pointer px-4 py-5 bg-indigo-velvet hover:bg-midnight-violet text-lavender-mist rounded-lg shadow-indigo-velvet  transition-colors duration-300 flex items-center gap-1"
      buttonText="Copy Link"
      aria-label="Copy Link"
      onClick={async () => {
        const baseLink = import.meta.env.VITE_REACT_APP_BASE_URL;
        const addonLink = profilePaths.viewProfile.replace(":id", profileId);
        const shareableLink = `${baseLink}${addonLink}`;
        await copyToClipboard(shareableLink);
      }}
    />
  );
};

export default CopyProtofolioLinkButton;
