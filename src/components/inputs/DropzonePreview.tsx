import {
  formatBytes,
  generateFilePreview,
  sliceFileName,
} from "@/utils/fileUtils";
import { Button } from "@/components/ui/button";
import { Delete } from "../icons/Delete";
import PreviewSVG from "../icons/PreviewSVG";

const DropzonePreview = ({
  files,
  onDeleteFile,
}: {
  files: File[] | undefined;
  onDeleteFile: (file: File) => void;
}) => {
  console.log("files", files);
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
              src={typeof file === "string" ? file : generateFilePreview(file)}
              alt={file.name}
              className="w-12 h-12 rounded-md border border-input object-cover"
            />

            {/* file name and size */}
            <div className="space-y-1">
              {/* file name */}
              <p className="text-sm text-muted-foreground">
                {sliceFileName(typeof file === "string" ? file : file.name)}
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
            <a
              href={typeof file === "string" ? file : URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview File"
              className="p-2 text-dark-amethyst hover:bg-dark-amethyst hover:text-lavender-mist focus-visible:bg-dark-amethyst focus-visible:text-lavender-mist transition-colors duration-300 rounded-full"
            >
              {/* <EyeIcon className="w-4 h-4" /> */}
              <PreviewSVG className="w-4 h-4" />
            </a>
            {/* remove file button */}
            <Button
              variant="ghost"
              aria-label="Remove File"
              onClick={() => onDeleteFile(file)}
              className="rounded-full p-2 text-destructive hover:text-red-600 focus-visible:bg-muted focus-visible:text-destructive focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-0 transition-colors duration-300 cursor-pointer"
            >
              <Delete
                className="w-4 h-4 stroke-destructive"
                width={16}
                height={16}
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropzonePreview;
