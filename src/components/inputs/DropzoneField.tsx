import { useDropzone } from "react-dropzone";
import { Field, FieldLabel } from "../ui/field";
import FormErrorMessage from "./FormErrorMessage";
import clsx from "clsx";
import { FileStack } from "../icons/FileStack";
import DropzonePreview from "./DropzonePreview";

const DropzoneField = ({
  id,
  label,
  value: files,
  onChange,
  error,
  invalid,
  fieldClassNames,
  maxFiles = 1,
  multiple = false,
  disabled = false,
}: {
  id: string;
  label: string;
  value: File[] | undefined;
  onChange: (files: File[]) => void;
  error: string | undefined;
  invalid: boolean;
  fieldClassNames?: string;
  maxFiles: number;
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => onChange(accepted),
    maxFiles: maxFiles ? maxFiles : undefined,
    multiple: multiple,
    disabled: disabled,
  });

  // handle delete file
  const handleDeleteFile = (file: File) => {
    const newFiles = Array.from(files || []);
    const filteredFiles = newFiles.filter((f) => f !== file);
    onChange(filteredFiles);
  };

  return (
    <Field data-invalid={invalid} className={fieldClassNames}>
      <FieldLabel htmlFor={id} className="input-label">
        {label}
      </FieldLabel>
      <div
        {...getRootProps()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer focus-visible:border-lavender-purple focus-visible:border-dashed text-dark-amethyst focus-visible:outline-0 hover:border-lavender-purple transition-colors duration-300",
          {
            "border-input": !invalid,
            "border-destructive": invalid,
            "bg-gray-100 pointer-events-none": disabled,
          },
        )}
      >
        <input {...getInputProps()} />

        <div className="space-y-1">
          <FileStack className="stroke-dark-amethyst" />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p>Drag & drop or click to select</p>
          )}
        </div>
      </div>

      {invalid && <FormErrorMessage error={error} />}
      {/* Preview  */}
      {files?.length ? (
        <DropzonePreview
          isViewMode={disabled}
          files={files}
          onDeleteFile={handleDeleteFile}
        />
      ) : null}
    </Field>
  );
};

export default DropzoneField;
