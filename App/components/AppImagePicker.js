import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  BackHandler,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Mobile fullscreen viewer
import ImageViewer from "react-native-image-zoom-viewer";

// Web Lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import AppText from "./AppText";
import colors from "../config/colors";
import { getNowForFileName } from "../network/utils";

function AppImagePicker({
  images,
  onChangeImages,
  namePrefix = "image",
  maxImages = 10,
}) {
  const [visible, setVisible] = useState(false); // mobile modal
  const [currentIndex, setCurrentIndex] = useState(0);

  // Picker imagini
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: maxImages - images.length,
        quality: 0.9,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset, index) => {
          const fileName = `${namePrefix}_${getNowForFileName()}_${index}.jpg`;
          const safeName = fileName.replace(/[\r\n]/g, " "); //Enter delete from names that form the file name
          const imgObj = {
            uri: asset.uri,
            name: safeName,
            type: asset.mimeType || "image/jpeg",
          };
          return imgObj;
        });

        onChangeImages([...images, ...newImages]);
      }
    } catch (err) {
      console.log("Eroare selectare imagini:", err);
    }
  };

  // Sterge imagine
  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    onChangeImages(updated);
  };

  // Open fullscreen viewer
  const openViewer = (index) => {
    setCurrentIndex(index);
    if (Platform.OS !== "web") {
      setVisible(true);
    }
  };

  return (
    <View>
      <AppText style={styles.label}>
        {"   "} Poze ({images.length}/{maxImages})
      </AppText>

      <View style={styles.container}>
        {Platform.OS === "web" ? (
          <PhotoProvider>
            {images.map((img, index) => (
              <View key={img.uri} style={styles.imageWrapper}>
                <PhotoView src={img.uri}>
                  <Image source={{ uri: img.uri }} style={styles.image} />
                </PhotoView>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeImage(index)}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={18}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </PhotoProvider>
        ) : (
          images.map((img, index) => (
            // Mobile: open fullscreen modal
            <View key={img.uri} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => openViewer(index)}>
                <Image source={{ uri: img.uri }} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeImage(index)}
              >
                <MaterialCommunityIcons name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ))
        )}
        {images.length < maxImages && (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <MaterialCommunityIcons
              name="plus"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* FULLSCREEN VIEWER pentru mobil */}
      {Platform.OS !== "web" && (
        <Modal
          visible={visible}
          transparent={true}
          onRequestClose={() => setVisible(false)}
        >
          <ImageViewer
            imageUrls={images.map((img) => ({ url: img.uri }))}
            index={currentIndex}
            onCancel={() => setVisible(false)}
            enableSwipeDown
            saveToLocalByLongPress={true}
            renderIndicator={(current, total) => (
              <AppText
                style={{
                  color: "white",
                  position: "absolute",
                  top: 40,
                  alignSelf: "center",
                  fontSize: 15,
                }}
              >
                {current} / {total}
              </AppText>
            )}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageWrapper: {
    position: "relative",
    margin: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: colors.errorRed,
    borderRadius: 10,
    padding: 2,
  },
  addButton: {
    width: 90,
    height: 90,
    margin: 5,
    borderRadius: 10,
    backgroundColor: colors.coldWhite,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppImagePicker;
