import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";
import type { paginationMeta, projectData } from "@/types";
import {
  createproject,
  deleteProject,
  getMyProjects,
  getNonAuthProjects,
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
  nonAuthProjects: (profileId: string, params?: projectParamsDTO) =>
    ["nonAuthProjects", profileId, params] as const,
};

export const useProjects = (params: projectParamsDTO = {}) => {
  const { isSignedIn } = useAuth();
  const { getApi } = useApi();

  const query = useInfiniteQuery<{
    projects: projectData[];
    pagination?: paginationMeta;
  }>({
    queryKey: projectKeys.all(params),
    queryFn: async ({ pageParam = 1 }) =>
      getMyProjects(await getApi(), { ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (!pagination) return undefined;
      const { page, totalPages } = pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!isSignedIn,
  });

  return {
    data: query.data?.pages.flatMap((page) => page.projects) ?? [],
    pagination: query.data?.pages?.at(-1)?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
  };
};

export const useNonAuthProjects = (
  profileId: string,
  params: projectParamsDTO = {},
) => {
  console.log("profileId", profileId);
  const query = useInfiniteQuery<{
    projects: projectData[];
    pagination?: paginationMeta;
  }>({
    queryKey: projectKeys.nonAuthProjects(profileId, params),
    queryFn: async ({ pageParam = 1 }) =>
      getNonAuthProjects(profileId, { ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (!pagination) return undefined;
      const { page, totalPages } = pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!profileId,
  });

  return {
    data: query.data?.pages.flatMap((page) => page.projects) ?? [],
    pagination: query.data?.pages?.at(-1)?.pagination,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
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
