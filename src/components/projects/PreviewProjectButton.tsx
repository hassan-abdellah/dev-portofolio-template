import GlobeSVG from "../icons/GlobeSVG";
import AnimatedIconLink from "../common/AnimatedIconLink";

const PreviewProjectButton = ({ preview_url }: { preview_url: string }) => {
  return (
    <AnimatedIconLink
      IconComponent={GlobeSVG}
      target="_blank"
      href={preview_url}
      aria-label="Preview Website"
      className="rounded-icon-button bg-indigo-velvet hover:bg-wisteria"
      iconwidth={20}
      iconheight={20}
    />
  );
};

export default PreviewProjectButton;
