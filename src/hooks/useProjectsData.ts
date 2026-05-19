// this hooks used to get the profile data from the localstorage
// later on we will get it from the DB

import apiClient from "@/api/apiClient";
import { PROJECTSURL } from "@/api/url_helper";
import type { projectData } from "@/types";
import { handleAxiosError } from "@/utils/toasterUtils";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";

export const useProjectsData = ({
  projectId,
}: {
  projectId: string | undefined;
}) => {
  const { getToken, isLoaded } = useAuth();
  const [projectData, setProjectsData] = useState<projectData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetProjectsData = async ({
    projectId,
  }: {
    projectId: string;
  }) => {
    setIsLoading(true);
    try {
      const token = await getToken(); // JWT to send to your Node backend
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await apiClient.get(`${PROJECTSURL}/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProjectsData(response?.data?.project);
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && projectId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleGetProjectsData({ projectId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, projectId]);

  return { data: projectData, isLoading: isLoading || !isLoaded };
};
