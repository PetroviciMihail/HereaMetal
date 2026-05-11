import { Platform } from "react-native";

async function buildFormData(values, images) {
  const formData = new FormData();

  Object.entries(values).forEach(([k, v]) => {
    formData.append(k, v);
  });

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (Platform.OS === "web") {
      // WEB → Blob/File
      const response = await fetch(img.uri);
      const blob = await response.blob();

      formData.append(
        "images",
        blob,
        img.name || `image_${Date.now()}_${i}.jpg`,
      );
    } else {
      formData.append("images", {
        uri: img.uri,
        name: img.name || `image_${Date.now()}_${i}.jpg`,
        type: img.type || "image/jpeg",
      });
    }
  }

  return formData;
}


function getNowForFileName(procedureTitle, type = "in") {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}___${hours}-${minutes}`;
}
const BASE_URL = "http://10.140.47.105:3000";
export { buildFormData, getNowForFileName, BASE_URL };
