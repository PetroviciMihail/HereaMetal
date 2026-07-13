import axios from "axios";
import authEvents from "./authEvent";
import { storage } from "../config/storage";
import { BASE_URL } from "./utils";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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
