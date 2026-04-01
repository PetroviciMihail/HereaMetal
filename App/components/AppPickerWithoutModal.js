import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppPickerWithoutModal({
  items,
  selectedValue,
  onSelectValue,
  placeholder,
  icon,
  style,
}) {
  const [open, setOpen] = useState(false);
  const selectedItem = items.find((item) => item.value == selectedValue);
  return (
    <View style={[styles.wrapper, style]}>
      {/* Input */}
      <TouchableOpacity
        style={styles.container}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        {icon && (
          <MaterialCommunityIcons name={icon} size={35} style={styles.icon} />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <AppText
            style={{ paddingVertical: 10, flex: 1, textAlign: "center" }}
          >
            {selectedValue ? selectedItem?.label : placeholder}
          </AppText>
          <MaterialCommunityIcons
            name="chevron-down"
            size={35}
            style={{ color: colors.lightBrown }}
          />
        </View>
      </TouchableOpacity>

      {/* Dropdown list */}
      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={items}
            keyExtractor={(item, index) =>
              item.value != null ? item.value.toString() : "all-" + index
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelectValue(item.value);
                  setOpen(false);
                }}
              >
                <AppText>{item.label}</AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    zIndex: 1000,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.coldWhite,
    borderRadius: 15,
    borderColor: colors.primary,
    padding: 5,

    marginVertical: 5,
    elevation: 3,
    margin: 3,
    borderWidth: 1,
  },

  dropdown: {
    position: "absolute",
    alignSelf: "center",
    top: 62,
    width: "85%",
    backgroundColor: colors.coldWhite,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 15,
    maxHeight: 350,
    zIndex: 1000,
    elevation: 3, // Android shadow
  },
  item: {
    padding: 15,
  },
  icon: {
    color: colors.lightBrown,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default AppPickerWithoutModal;
