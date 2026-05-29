import {
  formatBytes,
  generateFilePreview,
  generateFileURLPreview,
  sliceFileName,
} from "@/utils/fileUtils";
import PreviewSVG from "../icons/PreviewSVG";
import { DeleteIcon } from "../icons/DeleteIcon";
import AnimatedIconButton from "../common/AnimatedIconButton";
import AnimatedIconLink from "../common/AnimatedIconLink";

const DropzonePreview = ({
  files,
  onDeleteFile,
  isViewMode = false,
}: {
  files: (string | File)[] | undefined;
  onDeleteFile: (file: File | string) => void;
  isViewMode?: boolean;
}) => {
  return (
    <div className="space-y-1.5 mt-4">
      {Array.from(files || []).map((file, index) => (
        <div
          key={index}
          className="bg-transparent border border-input text-dark-amethyst p-2 rounded-md flex justify-between"
        >
          {/* left section */}
          <div className="flex items-center gap-3">
            {/* image preview */}
            <img
              src={
                typeof file === "string"
                  ? generateFileURLPreview(file)
                  : generateFilePreview(file)
              }
              alt={typeof file === "string" ? file : file.name}
              className="w-12 h-12 rounded-md border border-input object-cover"
            />

            {/* file name and size */}
            <div className="space-y-1">
              {/* file name */}
              <p className="text-sm text-muted-foreground">
                {sliceFileName(
                  typeof file === "string"
                    ? file
                      ? file.split("/").pop() || file
                      : file
                    : file.name,
                )}
              </p>
              {/* file size */}
              {typeof file === "string" ? null : (
                <p className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              )}
            </div>
          </div>

          {/* Right Section */}
          {/* files actions */}
          <div className="flex items-center gap-1">
            <AnimatedIconLink
              IconComponent={PreviewSVG}
              target="_blank"
              href={typeof file === "string" ? file : URL.createObjectURL(file)}
              rel="noopener noreferrer"
              aria-label="Preview File"
              className="p-2 text-dark-amethyst hover:bg-dark-amethyst hover:text-lavender-mist focus-visible:bg-dark-amethyst focus-visible:text-lavender-mist transition-colors duration-300 rounded-full"
              iconwidth={16}
              iconheight={16}
            />
            {/* remove file button */}
            {!isViewMode ? (
              <AnimatedIconButton
                type="button"
                variant="ghost"
                IconComponent={DeleteIcon}
                className="rounded-full p-2 text-destructive hover:text-red-600 focus-visible:bg-muted focus-visible:text-destructive focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-0 transition-colors duration-300 cursor-pointer"
                aria-label="Remove File"
                onClick={() => onDeleteFile(file)}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropzonePreview;
