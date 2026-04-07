import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export const useResetPassword = () => {
  return useMutation((data) => api.post("/auth/reset-password", data));
};