import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import AppText from "../AppText";

function UserCard({ onPress, name, email, autority }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <AppText
            style={{
              textAlign: "center",
              fontSize: 30,
            }}
          >
            {name}
          </AppText>
          <View style={styles.horizontalSeparator} />
          <AppText style={styles.contactInfo}>
            {email ? email : "email neprecizat"}
          </AppText>
        </View>
        <View style={styles.separatorVertical}></View>
        <View style={styles.rightContainer}>
          <AppText style={{ fontSize: 20, textAlign: "center" }}>
            Autoritate {autority}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.coldWhite,
    flexDirection: "row",
    marginBottom: 10,
    padding: 5,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 4,
  },
  rightContainer: {
    alignItems: "center",
    flex: 2,
    justifyContent: "space-evenly",
  },

  separatorVertical: {
    width: 1,
    backgroundColor: colors.textPrimary,
    marginHorizontal: 2,
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
});

export default UserCard;
