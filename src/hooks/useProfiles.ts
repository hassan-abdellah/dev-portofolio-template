import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";
import type { profileData } from "@/types";
import {
  createProfile,
  deleteProfile,
  getMyProfile,
  updateProfile,
  type CreateProfileDto,
  type UpdateProfileDto,
} from "@/api/profiles";
import { Navigate } from "react-router";

// Centralized query key factory
export const profileKeys = {
  detail: () => ["profiles"] as const,
};

export const useProfile = () => {
  const { isSignedIn } = useAuth();
  const { getApi } = useApi();

  const query = useQuery<profileData>({
    queryKey: profileKeys.detail(),
    queryFn: async () => getMyProfile(await getApi()),
    enabled: !!isSignedIn,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<profileData, Error, CreateProfileDto>({
    mutationFn: async (data) => createProfile(await getApi(), data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() }),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<
    profileData,
    Error,
    { profileId: string; data: UpdateProfileDto }
  >({
    mutationFn: async ({ profileId, data }) =>
      updateProfile(await getApi(), profileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<void, Error, string>({
    mutationFn: async (profileId) => deleteProfile(await getApi(), profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
      Navigate({ to: "/" });
    },
  });
};
