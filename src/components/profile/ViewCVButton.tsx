import { FileText } from "lucide-react";

const ViewCVButton = ({ CVURL }: { CVURL: string }) => {
  return (
    <a
      href={CVURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View CV"
      className="cursor-pointer px-4 py-2 bg-gray-900 text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-gray-800  transition-colors duration-300 flex items-center gap-1"
    >
      <FileText className="size-4" />
      <span>View CV</span>
    </a>
  );
};

export default ViewCVButton;
