// this hooks used to get the profile data from the localstorage
// later on we will get it from the DB

import type { profileData } from "@/types";
import { useMemo } from "react";

export const useProfileData = () => {
  const profileData: profileData = useMemo(() => {
    const localStorageItem = localStorage.getItem("dev-links");
    return localStorageItem ? JSON.parse(localStorageItem) : null;
  }, []);

  return profileData;
};
