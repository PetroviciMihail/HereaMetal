import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import TypeLabel from "./TypeLabel";
import AppText from "./AppText";

function ProcedureTitleCard({
  onPress,
  type,
  title,
  base_price,
  size,
  rank_index,
  date_out,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <AppText
            style={{
              textAlign: "center",
              fontSize: 30,
              color: colors.blueish_black,
            }}
          >
            {title}
          </AppText>
          <TypeLabel type={type} />
        </View>
        <View style={styles.separatorVertical}></View>
        <View style={styles.rightContainer}>
          {date_out !== undefined ? (
            date_out === null ? (
              <AppText style={{ color: colors.redish_black }}>
                In asteptare
              </AppText>
            ) : (
              <AppText style={{ color: colors.greenish_black }}>
                Finalizat
              </AppText>
            )
          ) : (
            <>
              {rank_index ? (
                <>
                  <AppText style={{ textAlign: "center" }}>
                    Pret de baza: {base_price}
                  </AppText>
                  <AppText>Rank: {rank_index}</AppText>
                </>
              ) : (
                <AppText>Cost: {base_price}</AppText>
              )}
            </>
          )}
          {size && (
            <AppText style={{ textAlign: "center" }}>
              Pret: {base_price * size}
            </AppText>
          )}
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
    flex: 5,
  },
  rightContainer: {
    alignItems: "center",
    flex: 4,
    justifyContent: "space-evenly",
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
});

export default ProcedureTitleCard;
