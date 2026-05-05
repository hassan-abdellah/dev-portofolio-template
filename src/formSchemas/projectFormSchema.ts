import * as z from "zod";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
export const projectFormSchema = z.object({
  title: z
    .string()
    .min(5, "Project Title must be at least 5 characters.")
    .max(32, "Project Title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Project Description must be at least 20 characters.")
    .max(100, "Project Description must be at most 100 characters."),

  project_url: z.url("Please enter a valid URL").nullable(),
  project_image: z
    .custom<File>((val) => val instanceof File, {
      message: "Please select a file",
    })
    .refine((file) => file.size <= MAX_SIZE, "Max size is 5MB")
    .refine(
      (file) => ACCEPTED_TYPES.includes(file.type),
      "Only JPG, PNG allowed",
    )
    .nullable(),
});
