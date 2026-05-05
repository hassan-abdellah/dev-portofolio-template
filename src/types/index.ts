export interface skillType {
  name: string;
  display_name: string;
}

export interface platformLink {
  link_type: "youtube" | "github" | "linkedin" | "others" | (string & {});
  link_url: string;
}
export interface profileData {
  title: string;
  description: string;
  skills: string[];
  links: platformLink[];
}

export interface projectData {
  id?: string;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
}
