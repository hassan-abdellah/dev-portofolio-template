import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
}

const useCopyToClipboard = (): UseCopyToClipboardReturn => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator.clipboard) {
        console.error("Clipboard API not supported");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return true;
      } catch (err) {
        console.error("Failed to copy: ", err);
        setCopied(false);
        return false;
      }
    },
    [],
  );

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
