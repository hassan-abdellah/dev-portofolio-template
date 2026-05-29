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
      className="cta-button bg-[#4A006F] text-lavender-mist hover:bg-[#470A77]"
      iconwidth={20}
      iconheight={20}
      linkText="View CV"
    />
  );
};

export default ViewCVButton;
