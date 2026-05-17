export interface skillType {
  name: string;
  display_name: string;
}

export interface platformLink {
  link_type: "youtube" | "github" | "linkedin" | "others" | (string & {});
  link_url: string;
}

export interface userData {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface profileData {
  id: string;
  title: string;
  description: string;
  skills: string[];
  links: platformLink[];
  user?: userData;
}

export interface projectData {
  id?: string;
  title: string;
  description: string;
  image_url?: string;
  project_url?: string;
}
