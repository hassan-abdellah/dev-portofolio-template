import type { useAnimation } from "motion/react";
import type React from "react";

export interface skillType {
  name: string;
  display_name: string;
}

export type platformType =
  | "youtube"
  | "github"
  | "linkedin"
  | "others"
  | (string & {});

export interface platformLink {
  link_type: platformType;
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

export interface projectData {
  id?: string;
  title: string;
  description: string;
  image_url?: string;
  preview_url?: string;
}

export interface paginationMeta {
  total: number;
  page: number;
  per_page: number;
  totalPages: number;
}
export interface ProjectResponse {
  status: boolean;
  projects: projectData[];
  pagination?: paginationMeta;
}
export interface SingleProjectResponse {
  status: boolean;
  project: projectData;
}

export interface profileData {
  id: string;
  title: string;
  description: string;
  skills: string[];
  links: platformLink[];
  user?: userData;
  is_sharable?: boolean;
  csv_url?: string | null;
  projects?: projectData[];
}

export interface ProfileResponse {
  status: boolean;
  profile: profileData;
}

export interface AnimatedIconProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  /** Pass controls from the parent to drive the animation externally */
  controls?: ReturnType<typeof useAnimation>;
}
