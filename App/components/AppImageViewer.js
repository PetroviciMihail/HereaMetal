import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";

// Mobile fullscreen viewer
import ImageViewer from "react-native-image-zoom-viewer";

// Web Lightbox
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import AppText from "./AppText";
import { BASE_URL } from "../network/utils";

function AppImageViewer({ images }) {
  const [visible, setVisible] = useState(false); // mobile modal
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("din image viewer");
  images.map((img, index) => console.log(`${BASE_URL}/${img.file_path}`));

  const openViewer = (index) => {
    setCurrentIndex(index);
    if (Platform.OS !== "web") {
      setVisible(true);
    }
  };

  return (
    <View>
      <AppText style={styles.label}>
        {"   "} Poze ({images.length})
      </AppText>

      <View style={styles.container}>
        {Platform.OS === "web" ? (
          <PhotoProvider>
            {images.map((img, index) => (
              <View key={img.uri || img.file_path} style={styles.imageWrapper}>
                <PhotoView
                  src={`${BASE_URL}/${img.file_path}` || img.file_path}
                >
                  <Image
                    source={{
                      uri: `${BASE_URL}/${img.file_path}` || img.file_path,
                    }}
                    style={styles.image}
                  />
                </PhotoView>
              </View>
            ))}
          </PhotoProvider>
        ) : (
          images.map((img, index) => (
            <View key={img.uri || img.file_path} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => openViewer(index)}>
                <Image
                  source={{
                    uri: `${BASE_URL}/${img.file_path}` || img.file_path,
                  }}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          ))
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
            imageUrls={images.map((img) => ({
              url: `${BASE_URL}/${img.file_path}` || img.file_path,
            }))}
            index={currentIndex}
            onCancel={() => setVisible(false)}
            enableSwipeDown
            saveToLocalByLongPress={true}
            renderIndicator={(current, total) => (
              <AppText style={styles.indicator}>
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
  indicator: {
    color: "white",
    position: "absolute",
    top: 40,
    alignSelf: "center",
    fontSize: 15,
  },
});

export default AppImageViewer;
