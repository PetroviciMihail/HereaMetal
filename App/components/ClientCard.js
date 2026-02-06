import React from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";
import PhoneButton from "./PhoneButton";

function ClientCard({
  onPress,
  name,
  phone,
  email,
  type,
  fiscal_code,
  details,
  importance,
}) {
  return (
    <TouchableOpacity style={{ margin: 5 }} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <AppText style={{ color: colors.greenish_black }}>{name}</AppText>
          <View style={styles.horizontalSeparator} />
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {fiscal_code ? (
              <AppText>{fiscal_code}</AppText>
            ) : (
              <AppText
                style={{
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                fără RO/CNP
              </AppText>
            )}
          </View>
        </View>

        <View style={styles.verticalSeparator} />

        <View style={styles.rightContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AppText style={styles.contactInfo}>{phone}</AppText>
            <PhoneButton number={phone} />
          </View>
          <View style={styles.horizontalSeparator} />
          <AppText style={styles.contactInfo}>
            {email ? email : "email neprecizat"}
          </AppText>
          <View style={styles.horizontalSeparator} />
          <AppText style={styles.details}>
            {details ? details : "lipsă detalii"}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.coldWhite,
    borderWidth: 1,
    borderColor: colors.greenish_black,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    flexDirection: "row",
  },
  leftContainer: { flex: 1 },
  rightContainer: { flex: 1 },
  verticalSeparator: {
    width: 1,
    backgroundColor: colors.greenish_black,
    margin: 3,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.greenish_black,
    margin: 3,
  },
  contactInfo: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  details: {
    fontSize: 20,
    color: colors.textPrimary,
  },
});

export default ClientCard;
