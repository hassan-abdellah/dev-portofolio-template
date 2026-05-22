import { GlobeIcon } from "lucide-react";

const PreviewProjectButton = ({ preview_url }: { preview_url: string }) => {
  return (
    <a
      target="_blank"
      href={preview_url}
      aria-label="Preview Website"
      className="rounded-icon-button bg-indigo-velvet hover:bg-wisteria"
    >
      <GlobeIcon />
    </a>
  );
};

export default PreviewProjectButton;
