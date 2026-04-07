import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/authApi";

export const useAuthUser = () => {
  return useQuery(
    ["me"],
    getCurrentUser,
    {
      staleTime: 1000 * 60 * 5, // 5 min cache
      retry: 1,
      onError: () => {
        // token expired or network failure
        localStorage.removeItem("auth_token");
      },
    }
  );
};