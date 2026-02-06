import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function CompletedItemCard({
  type,
  title,
  details,
  proceduresTotal,
  onPress,
  cost,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.type}>
            <AppText>{type}</AppText>
          </View>
          {proceduresTotal ? (
            <AppText
              style={{
                color: colors.textGreen,
                textAlign: "center",
              }}
            >
              {proceduresTotal} proceduri
            </AppText>
          ) : (
            <AppText style={styles.title}>nicio procedura adaugata</AppText>
          )}
          <AppText style={{ textAlign: "center", color: colors.blueish_black }}>
            cost: {cost}
          </AppText>
        </View>
        <View style={styles.separatorVertical} />
        <View style={styles.rightContainer}>
          <View
            style={{
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <AppText style={styles.title}>{title}</AppText>
            <View style={styles.separatorHorizontal} />
            <AppText style={styles.details}>{details}</AppText>
          </View>
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
    flex: 5,
  },

  procedureText: { fontSize: 20, alignSelf: "center" },
  title: {
    paddingLeft: 5,
    textAlign: "center",
    color: colors.turqoish_black,
    fontSize: 25,
    fontWeight: "bold",
  },
  details: {
    paddingLeft: 5,
    alignSelf: "left",
    color: colors.textPrimary,
    fontSize: 20,
  },
  type: {
    width: "90%",
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    color: colors.textPrimary,
    margin: 2,
    padding: 2,
  },
  separatorVertical: {
    width: 1,
    backgroundColor: colors.textPrimary,
    marginHorizontal: 2,
  },
  separatorHorizontal: {
    height: 1,
    backgroundColor: colors.textPrimary,
    marginVertical: 5,
  },
});

export default CompletedItemCard;
