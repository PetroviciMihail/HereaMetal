import React from "react";
import { TouchableOpacity } from "react-native";

function PickerItem({ label, onPress }) {
  return <TouchableOpacity onPress={onPress}>{label}</TouchableOpacity>;
}

export default PickerItem;
