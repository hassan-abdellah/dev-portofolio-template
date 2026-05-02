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
