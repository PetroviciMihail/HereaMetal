import React from "react";
import { StyleSheet, TouchableOpacity, Platform, Alert } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function DeleteButton({ onPress, alertMessage }) {
  const handlePress = () => {
    if (!alertMessage) {
      onPress?.();
      return;
    }
    if (Platform.OS === "web") {
      const confirmed = window.confirm(alertMessage);
      if (confirmed) {
        onPress?.();
      }
    } else {
      Alert.alert(
        "Confirmare",
        alertMessage,
        [
          { text: "Anulează", style: "cancel" },
          { text: "Continuă", onPress },
        ],
        { cancelable: true },
      );
    }
  };
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <MaterialCommunityIcons
        name={"trash-can-outline"}
        size={32}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.errorRed,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    width: 50,
    height: 40,

    marginVertical: 5,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  icon: {
    color: colors.coldWhite,
    marginLeft: 2,
    marginRight: 2,
  },
});

export default DeleteButton;
