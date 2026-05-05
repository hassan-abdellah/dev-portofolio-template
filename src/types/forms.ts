import type { platformLink } from ".";

export interface technicalFormValues {
  title: string;
  description: string;
  skills: string[];
  links: platformLink[];
}
export interface projectFormValues {
  title: string;
  description: string;
  project_image: File | null;
  project_url?: string | null;
}
