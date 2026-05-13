// this hooks used to get the profile data from the localstorage
// later on we will get it from the DB

import apiClient from "@/api/apiClient";
import type { profileData } from "@/types";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export const useProfileData = () => {
  const { getToken, isLoaded } = useAuth();
  const { id: profileId } = useParams();
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
      const response = await apiClient.get(`/profiles/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfileData(response?.data?.profile);
    } catch (error) {
      toast.error(error?.message, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profileId && isLoaded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleGetProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, isLoaded]);

  return { data: profileData, isLoading: isLoading || !isLoaded };
};
