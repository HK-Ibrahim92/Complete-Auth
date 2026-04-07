import api from "./axios";

export const signup = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data; // should return { user, token }
};

export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data; // { user, token }
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data; // { user }
};