import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function TypeLabel({ type, style }) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>{type}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    color: colors.textPrimary,
    margin: 2,
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: "center",
  },
  text: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default TypeLabel;
