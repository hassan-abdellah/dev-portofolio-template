import type {
  projectData,
  ProjectResponse,
  SingleProjectResponse,
} from "@/types";
import { type AxiosInstance } from "axios";
import { MyPROJECTSURL, PROJECTSURL } from "./url_helper";

type projectType = {
  id?: string;
  title: string;
  description: string;
  image?: File | string | null;
  project_url?: string | null;
  profile_id?: string;
};
export type CreateProjectDto = Omit<projectType, "id">;
export type UpdateProjectDto = CreateProjectDto;
export type projectParamsDTO = {
  page?: number;
};
// get projects
export const getMyProjects = async (
  api: AxiosInstance,
  params?: projectParamsDTO | undefined,
): Promise<projectData[]> => {
  const res: ProjectResponse = await api.get(MyPROJECTSURL, { params });
  return res.projects;
};
// get project
export const getProject = async (
  api: AxiosInstance,
  projectId: string,
): Promise<projectData> => {
  const res: SingleProjectResponse = await api.get(
    `${PROJECTSURL}/${projectId}`,
  );
  return res.project;
};

// Create project
export const createproject = (
  api: AxiosInstance,
  data: CreateProjectDto,
): Promise<projectData> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.profile_id) formData.append("profile_id", data.profile_id);
  if (data.image && data.image instanceof File) {
    formData.append("image", data.image);
  }
  if (data.project_url) formData.append("preview_url", data.project_url);

  return api.post(PROJECTSURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Project
export const updateProject = (
  api: AxiosInstance,
  projectId: string,
  data: UpdateProjectDto,
): Promise<projectData> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.profile_id) formData.append("profile_id", data.profile_id);
  if (data.image && data.image instanceof File) {
    formData.append("image", data.image);
  }
  if (data.project_url) formData.append("preview_url", data.project_url);

  return api.put(`${PROJECTSURL}/${projectId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Project
export const deleteProject = (
  api: AxiosInstance,
  projectId: string,
): Promise<void> => api.delete(`${PROJECTSURL}/${projectId}`);
