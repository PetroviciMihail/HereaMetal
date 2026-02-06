import React from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import colors from "../config/colors";

function AppButton({ title, onPress, style, alertMessage }) {
  const handlePress = () => {
    if (!alertMessage) {
      onPress?.();
      return;
    }

    Alert.alert(
      "Confirmare",
      alertMessage,
      [
        { text: "Anulează", style: "cancel" },
        { text: "Continuă", onPress },
      ],
      { cancelable: true },
    );
  };
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonBackGroundPrimary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "100%",
    elevation: 3,

    marginVertical: 5,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AppButton;
