import FileUserIcon from "../icons/FileUserIcon";
import AnimatedIconLink from "../common/AnimatedIconLink";

const ViewCVButton = ({ CVURL }: { CVURL: string }) => {
  return (
    <AnimatedIconLink
      IconComponent={FileUserIcon}
      target="_blank"
      href={CVURL}
      aria-label="View CV"
      rel="noopener noreferrer"
      className="cursor-pointer px-4 py-2 bg-[#4A006F] text-lavender-mist rounded-lg shadow-indigo-velvet hover:bg-[#470A77]  transition-colors duration-300 flex items-center gap-1"
      iconwidth={20}
      iconheight={20}
      linkText="View CV"
    />
  );
};

export default ViewCVButton;
