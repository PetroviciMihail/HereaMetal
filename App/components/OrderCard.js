import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import TypeLabel from "./TypeLabel";

const getColor = (value) => {
  if (value < 5) return colors.textGreen;
  if (value < 10) return colors.textYellow;
  if (value < 15) return colors.textOrange;
  return colors.textRed;
};

function OrderCard({
  id,
  clientName,
  title,
  waitingDays,
  proceduresTotal,
  proceduresDone,
  itemsList,
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.leftTextContainer}>
            <AppText style={styles.idText}>ID: {id}</AppText>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.articoleContainer}>
            {itemsList.length ? (
              itemsList.map((item, index) => (
                <TypeLabel key={index} type={item} />
              ))
            ) : (
              <AppText style={styles.procedureText}>
                niciun articol adaugat
              </AppText>
            )}
          </View>
        </View>

        <View style={styles.horizontalSeparator} />

        <View style={styles.clientContainer}>
          <View style={styles.leftTextContainer}>
            <AppText style={styles.clientTag}>Client: </AppText>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={styles.articoleContainer}>
            <AppText style={styles.clientTag}> {clientName}</AppText>
          </View>
        </View>

        <View style={styles.horizontalSeparator} />

        <AppText style={styles.title}>{title}</AppText>

        <View style={styles.horizontalSeparator} />
        <View style={styles.daysProceduresContainer}>
          <View style={{ flex: 1 }}>
            <AppText
              style={[styles.daysText, { color: getColor(waitingDays) }]}
            >
              In asteptare de {waitingDays} zile
            </AppText>
          </View>
          <View style={styles.verticalSeparator} />
          <View style={{ flex: 1 }}>
            {proceduresTotal > 0 ? (
              <AppText style={styles.procedureText}>
                {proceduresDone} / {proceduresTotal} proceduri terminate{" "}
              </AppText>
            ) : (
              <AppText style={styles.procedureText}>
                nicio procedura adaugata
              </AppText>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articoleContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
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
    marginLeft: 3,
    marginRight: 3,
    overflow: "visible",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  clientTag: {
    textAlign: "center",
    color: colors.greenish_black,
    borderColor: colors.greenish_black,
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
  clientContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  idText: {
    fontSize: 30,
    padding: 4,
    textAlign: "center",
    color: colors.blueish_black,
    fontWeight: "bold",
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
    fontSize: 23,
    alignSelf: "center",
    textAlign: "center",
  },
  title: {
    paddingLeft: 10,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: colors.pinkish_black,
  },
});

export default OrderCard;
