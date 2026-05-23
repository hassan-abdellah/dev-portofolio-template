import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";
import type { projectData } from "@/types";
import {
  createproject,
  deleteProject,
  getMyProjects,
  getProject,
  updateProject,
  type CreateProjectDto,
  type projectParamsDTO,
  type UpdateProjectDto,
} from "@/api/projects";

// Centralized query key factory
export const projectKeys = {
  base: ["projects"] as const,
  all: (params?: projectParamsDTO) => [...projectKeys.base, params] as const,
  detail: (id: string) => [...projectKeys.base, id] as const,
};

export const useProjects = (params: projectParamsDTO = {}) => {
  const { isSignedIn } = useAuth();
  const { getApi } = useApi();

  const query = useQuery<projectData[]>({
    queryKey: projectKeys.all(params),
    queryFn: async () => getMyProjects(await getApi(), params),
    enabled: !!isSignedIn,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

export const useProject = (
  projectId: string | undefined,
  enabled: boolean = true,
) => {
  const { isSignedIn } = useAuth();
  const { getApi } = useApi();

  const query = useQuery<projectData>({
    queryKey: projectKeys.detail(projectId ?? ""),
    queryFn: async () => getProject(await getApi(), projectId!),
    enabled: !!isSignedIn && !!projectId && enabled, // ✅ won't run until both are truthy
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<projectData, Error, CreateProjectDto>({
    mutationFn: async (data) => createproject(await getApi(), data),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: projectKeys.base });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<
    projectData,
    Error,
    { projectId: string; data: UpdateProjectDto }
  >({
    mutationFn: async ({ projectId, data }) =>
      updateProject(await getApi(), projectId, data),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: projectKeys.base });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<void, Error, string>({
    mutationFn: async (projectId) => deleteProject(await getApi(), projectId),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: projectKeys.base });
    },
  });
};
