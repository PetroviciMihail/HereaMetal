import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";

import AppText from "../AppText";
import TypeLabel from "../TypeLabel";
import colors from "../../config/colors";

const getColor = (value) => {
  if (value < 5) return colors.textGreen;
  if (value < 10) return colors.textYellow;
  if (value < 15) return colors.textOrange;
  return colors.textRed;
};

function NextProcedureCard({
  id: orderId,
  orderTitle,
  itemTitle,
  procedureTitle,
  waitingDays,
  date_out,
  type,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTextContainer}>
            <AppText style={styles.idText}>ID: {orderId}</AppText>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.articoleContainer}>
            <TypeLabel type={type} />
          </View>
        </View>

        <View style={styles.horizontalSeparator} />

        <View style={styles.procedureTitleContainer}>
          <View style={styles.leftTextContainer}>
            <AppText style={[styles.idText, { color: colors.textPrimary }]}>
              Articol
            </AppText>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.articoleContainer}>
            <AppText style={styles.itemTitle}>{itemTitle}</AppText>
          </View>
        </View>

        <View style={styles.horizontalSeparator} />
        <AppText style={styles.orderTitle}>{orderTitle}</AppText>

        <View style={styles.horizontalSeparator} />
        <View style={styles.daysProceduresContainer}>
          <View style={{ flex: 4 }}>
            {waitingDays && (
              <AppText
                style={[styles.daysText, { color: getColor(waitingDays) }]}
              >
                In asteptare de {waitingDays} zile
              </AppText>
            )}
            {date_out && (
              <AppText style={{ alignSelf: "center", textAlign: "center" }}>
                {date_out}
              </AppText>
            )}
          </View>
          <View style={styles.verticalSeparator} />
          <View
            style={{
              flex: 5,
              flexWrap: "wrap",
              alignItems: "center",

              alignContent: "center",
            }}
          >
            <AppText style={styles.procedureTitle}> {procedureTitle} </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articoleContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  leftTextContainer: {
    flex: 2,
    alignItems: "center",
  },
  container: {
    borderRadius: 10,
    backgroundColor: colors.coldWhite,
    flexDirection: "column",
    marginBottom: 20,
    padding: 10,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    overflow: "visible",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  procedureTitle: {
    textAlign: "center",
    color: colors.blueish_black,
    marginLeft: 2,
    marginRight: 2,
  },
  daysText: {
    color: colors.pink,
    alignSelf: "center",
    textAlign: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  daysProceduresContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  procedureTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  idText: {
    fontSize: 25,
    padding: 5,
    color: colors.blueish_black,
  },
  verticalSeparator: {
    width: 2,
    backgroundColor: colors.primary,
    margin: 3,
    alignSelf: "stretch",
  },
  horizontalSeparator: {
    height: 2,
    backgroundColor: colors.primary,
    margin: 3,
  },

  procedureText: {
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  orderTitle: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: colors.pinkish_black,
  },
  itemTitle: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: colors.turqoish_black,
  },
});

export default NextProcedureCard;
