import axios from "axios";
import * as SecureStore from "expo-secure-store";
import authEvents from "./authEvent";

const axiosClient = axios.create({
  baseURL: "http://192.168.1.9:3000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Interceptor care adaugă automat JWT-ul la fiecare request
axiosClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("jwt_token");

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
      await SecureStore.deleteItemAsync("jwt_token");
      // await SecureStore.deleteItemAsync("user_name");
      authEvents.emitLogout();
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
