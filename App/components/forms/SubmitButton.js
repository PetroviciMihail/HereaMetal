import React from "react";
import { Alert, Platform } from "react-native";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

function SubmitButton({ title, alertMessage, style }) {
  const { handleSubmit } = useFormikContext();
  const onPress = () => {
    if (!alertMessage) {
      handleSubmit();
      return;
    }
    if (Platform.OS === "web") {
      const confirmed = window.confirm(alertMessage);
      if (confirmed) {
        handleSubmit?.();
      }
    } else {
      Alert.alert(
        "Confirmare",
        alertMessage,
        [
          { text: "Anulează", style: "cancel" },
          { text: "Continuă", onPress: handleSubmit },
        ],
        { cancelable: true },
      );
    }
  };
  return <AppButton title={title} onPress={onPress} style={style} />;
}

export default SubmitButton;
