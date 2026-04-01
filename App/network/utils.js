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
function buildFormDataForMobile(values, images) {
  const formData = new FormData();

  Object.entries(values).forEach(([k, v]) => {
    formData.append(k, v);
  });

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (Platform.OS !== "web") {
      // MOBILE → merge direct obiectul

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

  // ISO simplu: 2026-03-30T12:34:56.789Z
  const iso = now.toISOString();

  // păstrează doar data și ora:minut
  let dateTime = iso.slice(0, 16); // "2026-03-30T12:34"

  // înlocuiește caractere problematice pentru filename
  dateTime = dateTime.replace(/[:T]/g, "_"); // "2026-03-30_12_34"

  // construit numele final
  return `${dateTime}`;
}
const BASE_URL = "http://192.168.1.2:3000";
export { buildFormData, getNowForFileName, BASE_URL };
