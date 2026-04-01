import React from "react";
import { View, ScrollView, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../config/colors";

const MAX_WIDTH = 900;

export default function Screen({
  children,
  header,
  footer,
  safeTopPadding,
  scrollable = true,
}) {
  return (
    <SafeAreaView
      style={styles.safe}
      edges={
        safeTopPadding
          ? ["top", "left", "right", "bottom"]
          : ["left", "right", "bottom"]
      }
    >
      <View style={styles.wrapper}>
        {header && <View style={styles.header}>{header}</View>}

        <View style={styles.content}>
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            children
          )}
        </View>

        {footer && <View style={styles.footer}>{footer}</View>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.lightWarmBackground,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrapper: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    maxWidth: Platform.OS === "web" ? MAX_WIDTH : "100%",
  },
  header: {
    backgroundColor: "#c9f5f4",
    borderBottomWidth: 5,
    borderColor: colors.buttonBackGroundSecondary,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 1000,
    elevation: 1000,
    // ...(Platform.OS === "web" && {
    //   position: "sticky",
    //   top: 0,
    //   zIndex: 100,
    // }),
  },
  content: {
    flex: 1,
  },
  scrollContent: {},
  footer: {
    //backgroundColor: "white",
  },
});
