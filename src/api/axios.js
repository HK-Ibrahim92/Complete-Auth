import axios from "axios";
import { getToken, removeToken } from "../utils/token";

// Create Axios instance
const api = axios.create({
  baseURL: "https://your-api.com", // replace with your backend URL
});

// Request interceptor: attach token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken(); // auto logout if token expired
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;