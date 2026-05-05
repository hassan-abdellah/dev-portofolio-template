import PDF from "@/assets/images/fileTypes/pdf.png";

// generate preview based on extension
export const generateFilePreview = (file: File): string => {
  // if file has name put it else put the path comming from DB
  const fileName = file.name;
  // extract extension from fileName
  const extension = fileName?.split(".")?.pop();
  let imagePreview;
  if (extension === "pdf") {
    imagePreview = PDF;
  } else {
    imagePreview = URL.createObjectURL(file);
  }

  return imagePreview;
};

// export const revokeFilePreview = (previewUrl: string): void => {
//   return URL.revokeObjectURL(previewUrl);
// };

// slice file name if it's too long and add extension at the end

export const sliceFileName = (
  fileName: string,
  maxLength: number = 20,
): string => {
  const extention = fileName?.split(".")?.pop();
  const nameWithoutExtention = fileName?.split(".")?.slice(0, -1)?.join(".");

  if (fileName.length <= maxLength) {
    return fileName;
  }

  return nameWithoutExtention.substring(0, maxLength) + "..." + "." + extention;
};

/**
 * Formats the size
 */

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
