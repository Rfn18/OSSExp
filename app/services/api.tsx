import axios from "axios";
import type { AuthData } from "../types/userType";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: `${url}/api`,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  try {
    const authString = localStorage.getItem("auth");
    if (authString) {
      const parsed: AuthData = JSON.parse(authString);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }
  } catch (error) {
    console.error("Failed to parse auth from localStorage", error);
    localStorage.removeItem("auth"); 
  }
  return config;
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;