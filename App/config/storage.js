import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const isWeb = Platform.OS === "web";

export const storage = {
  get: async (key) => {
    try {
      if (isWeb) {
        if (typeof window !== "undefined") {
          return localStorage.getItem(key);
        }
        return null;
      }

      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Storage get error:", err);
      return null;
    }
  },

  set: async (key, value) => {
    try {
      if (isWeb) {
        if (typeof window !== "undefined") {
          localStorage.setItem(key, value);
        }
        return;
      }

      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error("Storage set error:", err);
    }
  },

  remove: async (key) => {
    try {
      if (isWeb) {
        if (typeof window !== "undefined") {
          localStorage.removeItem(key);
        }
        return;
      }

      await SecureStore.deleteItemAsync(key);
    } catch (err) {
      console.error("Storage remove error:", err);
    }
  },
};
