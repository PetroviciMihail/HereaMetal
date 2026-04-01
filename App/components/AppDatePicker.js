import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppText from "./AppText";
import colors from "../config/colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (d) => {
  //console.log("log din format date");
  //console.log("\n" + d);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // lunile sunt 0-11
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function AppDatePicker({ value, onSelectValue, icon, style }) {
  const [date, setDate] = useState(value ?? new Date());
  const [show, setShow] = useState(false);

  const onChangeMobile = (event, selectedDate) => {
    setShow(Platform.OS === "ios"); // pe iOS rămâne deschis
    if (selectedDate) {
      console.log("suntem aici?");
      setDate(selectedDate);
      onSelectValue(formatDate(selectedDate));
    }
  };

  const onChangeWeb = (d) => {
    setDate(d);
    onSelectValue(formatDate(d));
    setShow(false);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <AppText style={{ fontSize: 20, marginTop: 7, marginBottom: -6 }}>
        {"    "}Data de intrare:
      </AppText>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setShow(true);
        }}
        activeOpacity={0.8}
      >
        {icon && (
          <MaterialCommunityIcons name={icon} size={35} style={styles.icon} />
        )}

        <AppText style={{ paddingVertical: 5, flex: 1 }}>
          {formatDate(date)}
        </AppText>
      </TouchableOpacity>

      {/* 📱 MOBILE */}
      {Platform.OS !== "web" && show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeMobile}
        />
      )}

      {/* 🌐 WEB */}
      {Platform.OS === "web" && (
        <DatePicker
          selected={date}
          onChange={(d) => onChangeWeb(d)}
          open={show}
          onClickOutside={() => setShow(false)}
          customInput={<div />} // complet invizibil
        />
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
    padding: 2,
    marginVertical: 5,

    elevation: 3,
    margin: 3,
    borderWidth: 1,
    ...(Platform.OS === "web" ? { marginBottom: -12 } : {}),
  },

  icon: {
    color: colors.lightBrown,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default AppDatePicker;
