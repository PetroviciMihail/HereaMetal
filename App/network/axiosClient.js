import axios from "axios";
import authEvents from "./authEvent";
import { storage } from "../config/storage";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.2:3000",
  timeout: 5000,
  // headers: { "Content-Type": "application/json" },
});

// Interceptor care adaugă automat JWT-ul la fiecare request
axiosClient.interceptors.request.use(async (config) => {
  const token = await storage.get("jwt_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // token expirat → logout automat
      await storage.remove("jwt_token");
      authEvents.emitLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
