// this hooks used to get the profile data from the localstorage
// later on we will get it from the DB

import apiClient from "@/api/apiClient";
import { MYPROFILEURL } from "@/api/url_helper";
import type { profileData } from "@/types";
import { handleAxiosError } from "@/utils/toasterUtils";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";

export const useProfileData = () => {
  const { getToken, isLoaded } = useAuth();
  const [profileData, setProfileData] = useState<profileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetProfileData = async () => {
    setIsLoading(true);
    try {
      const token = await getToken(); // JWT to send to your Node backend
      if (!token) {
        setIsLoading(false);
        return;
      }
      const response = await apiClient.get(MYPROFILEURL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfileData(response?.data?.profile);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleGetProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return { data: profileData, isLoading: isLoading || !isLoaded };
};
