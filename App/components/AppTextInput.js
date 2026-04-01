import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput, StyleSheet, View } from "react-native";
import colors from "../config/colors";

import AutoGrowTextInput from "./AutoGrowTextInput";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={35} style={styles.icon} />
      )}
      <AutoGrowTextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.coldWhite,
    borderRadius: 15,
    flexDirection: "row",
    padding: 2,
    marginVertical: 5,
    alignItems: "center",
    elevation: 3,
    margin: 3,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  textInput: {
    color: colors.textPrimary,
    flex: 1,
    textWrap: "wrap",
    fontSize: 25,
    fontFamily: "Roboto",
  },
  icon: {
    color: colors.lightBrown,
    marginLeft: 5,
    marginRight: 5,
  },
});
export default AppTextInput;
