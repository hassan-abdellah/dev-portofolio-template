import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import { useAuth } from "@clerk/react";
import type { profileData } from "@/types";
import {
  createProfile,
  deleteProfile,
  getMyProfile,
  getNonAuthProfile,
  shareProfile,
  updateProfile,
  uploadProfileCV,
  type CreateProfileDto,
  type UpdateProfileDto,
} from "@/api/profiles";
import { Navigate } from "react-router";

// Centralized query key factory
export const profileKeys = {
  detail: () => ["profiles"] as const,
  nonAuthProfile: (profileId: string) => ["profiles", profileId] as const,
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

// non auth profile hook

export const useNonAuthProfile = (profileId: string) => {
  const query = useQuery<profileData>({
    queryKey: profileKeys.nonAuthProfile(profileId),
    queryFn: async () => getNonAuthProfile(profileId),
    enabled: !!profileId,
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

export const useShareProfile = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<
    profileData,
    Error,
    { profileId: string; data: { is_sharable: boolean } }
  >({
    mutationFn: async ({ profileId, data }) =>
      shareProfile(await getApi(), profileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.detail() });
    },
  });
};

export const useUploadProfileCV = () => {
  const queryClient = useQueryClient();
  const { getApi } = useApi();

  return useMutation<
    profileData,
    Error,
    { profileId: string; data: { pdf: File | string | null } }
  >({
    mutationFn: async ({ profileId, data }) =>
      uploadProfileCV(await getApi(), profileId, data),
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
