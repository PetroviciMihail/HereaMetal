import React from "react";
import { Alert } from "react-native";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

function SubmitButton({ title, alertMessage }) {
  const { handleSubmit } = useFormikContext();
  const onPress = () => {
    if (!alertMessage) {
      handleSubmit();
      return;
    }

    Alert.alert(
      "Confirmare",
      alertMessage,
      [
        { text: "Anulează", style: "cancel" },
        { text: "Continuă", onPress: handleSubmit },
      ],
      { cancelable: true },
    );
  };
  return <AppButton title={title} onPress={onPress} />;
}

export default SubmitButton;
