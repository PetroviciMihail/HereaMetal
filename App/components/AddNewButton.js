import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function AddNewButton({ onPress, style }) {
  return (
    <View style={[{ padding: 5 }, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "green",
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          elevation: 3,
          borderColor: colors.primary,
          borderWidth: 1,
        }}
      >
        <MaterialCommunityIcons name="plus-thick" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddNewButton;
