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
      className="cta-button bg-[#B2C9FF] hover:bg-[#C9DCFF] text-dark-amethyst"
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
