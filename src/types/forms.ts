import type { platformLink } from ".";
// types/forms.ts
import type { projectFormSchema } from "@/formSchemas/projectFormSchema";
import type * as z from "zod";

export interface technicalFormValues {
  title: string;
  description: string;
  skills: string[];
  links: platformLink[];
}
// export interface projectFormValues {
//   title: string;
//   description: string;
//   project_image: File | null;
//   project_url?: string | null;
// }

export type projectFormValues = z.infer<typeof projectFormSchema>;
