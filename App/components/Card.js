import React from "react";
import colors from "../config/colors";
import { View, Image, StyleSheet } from "react-native";
import AppText from "./AppText";

function Card({ Title, days_in, procedures_total, procedures_done, image }) {
  return (
    <View styles={styles.card}>
      <Image source={image} />
      <View>
        <AppText>{Title}</AppText>
        <AppText>{days_in}</AppText>
        <AppText>
          {procedures_done +
            " din " +
            procedures_total +
            " proceduri efectuate"}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    background: colors.lightWarmBackground,
    margin: 10,
    overflow: "hidden",
  },
});
export default Card;
