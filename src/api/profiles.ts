import type { profileData, ProfileResponse } from "@/types";
import { type AxiosInstance } from "axios";
import { MYPROFILEURL, PROFILESURL } from "./url_helper";
import { createAxiosInstance } from "./axios";

export type CreateProfileDto = Omit<profileData, "id" | "user" | "projects">;
export type UpdateProfileDto = CreateProfileDto;

// get My Profile
export const getMyProfile = async (
  api: AxiosInstance,
): Promise<profileData> => {
  const res: ProfileResponse = await api.get(MYPROFILEURL);
  return res.profile;
};

// get Non-Auth Profile
export const getNonAuthProfile = async (
  profileId: string,
): Promise<profileData> => {
  const instanse = createAxiosInstance(null);
  const res: ProfileResponse = await instanse.get(
    `${PROFILESURL}/${profileId}`,
  );
  return res.profile;
};

// Create Profile
export const createProfile = (
  api: AxiosInstance,
  data: CreateProfileDto,
): Promise<profileData> => api.post(PROFILESURL, data);

// Update Profile
export const updateProfile = (
  api: AxiosInstance,
  profileId: string,
  data: UpdateProfileDto,
): Promise<profileData> => api.put(`${PROFILESURL}/${profileId}`, data);
// share Profile
export const shareProfile = (
  api: AxiosInstance,
  profileId: string,
  data: { is_sharable: boolean },
): Promise<profileData> => api.put(`${PROFILESURL}/${profileId}/share`, data);
// upload Profile CV
export const uploadProfileCV = (
  api: AxiosInstance,
  profileId: string,
  data: { pdf: File | string | null },
): Promise<profileData> => {
  const formData = new FormData();
  if (data.pdf) {
    formData.append("pdf", data.pdf);
  }
  return api.put(`${PROFILESURL}/${profileId}/upload-csv`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Profile
export const deleteProfile = (
  api: AxiosInstance,
  profileId: string,
): Promise<void> => api.delete(`${PROFILESURL}/${profileId}`);
