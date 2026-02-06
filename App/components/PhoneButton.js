import React from "react";
import { View, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function PhoneButton({ number }) {
  const handleCall = () => {
    Linking.openURL(`tel:${number}`);
  };
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        onPress={handleCall}
        style={{ backgroundColor: "green", borderRadius: 20, padding: 10 }}
      >
        <MaterialCommunityIcons name="phone-outgoing" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PhoneButton;
