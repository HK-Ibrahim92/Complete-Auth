import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export const useForgotPassword = () => {
  return useMutation((email) => api.post("/auth/forgot-password", { email }));
};  