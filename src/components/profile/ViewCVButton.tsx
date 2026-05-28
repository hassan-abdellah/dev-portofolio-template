import { useAnimation } from "motion/react";
import FileUserIcon from "../icons/FileUserIcon";

const ViewCVButton = ({ CVURL }: { CVURL: string }) => {
  const controls = useAnimation();

  return (
    <a
      href={CVURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View CV"
      className="cursor-pointer px-4 py-2 bg-gray-900 text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-gray-800  transition-colors duration-300 flex items-center gap-1"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <FileUserIcon controls={controls} width={20} height={20} />

      <span>View CV</span>
    </a>
  );
};

export default ViewCVButton;
