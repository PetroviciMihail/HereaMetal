import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ScreenNoScrollView from "../../components/ScreenNoScrollView";
import AppButton from "../../components/AppButton";
import { getProceduresForItemId } from "../../network/procedures";
import ProcedureTitleCard from "../../components/ProcedureTitleCard";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import TypeLabel from "../../components/TypeLabel";
import Screen from "../../components/Screen";

function CompletedItemsDetailsScreen({ navigation, route }) {
  const [itemProcedures, setItemProcedures] = useState([]);

  const getItemProceduresFromApi = async (itemId) => {
    const [response, err] = await getProceduresForItemId(itemId);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      let updatedData = response.data.sort(
        (a, b) => a.rank_index - b.rank_index,
      );
      setItemProcedures(updatedData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getItemProceduresFromApi(route.params.id);
    }, []),
  );

  return (
    <Screen>
      <View style={styles.detailsContainer}>
        <TypeLabel
          type={route.params.type}
          style={{ alignSelf: "center", width: "60%" }}
        />
        <AppText style={{ color: colors.blueish_black }}>
          id-ul comenzii: {route.params.order_id}
        </AppText>
        <View style={styles.horizontalSeparator} />
        <AppText style={{ color: colors.turqoish_black, fontWeight: "bold" }}>
          Titlu: {route.params.title}
        </AppText>
        <View style={styles.horizontalSeparator} />
        <AppText>Detalii: {route.params.details}</AppText>
        <View style={styles.horizontalSeparator} />
        <AppText>Factorul de dimeniune: {route.params.size_factor}</AppText>
        <View style={styles.horizontalSeparator} />
        <AppText
          style={{
            color: colors.blueish_black,
            textAlign: "center",
            fontWeight: "bold",
            margin: 15,
            padding: 10,
            borderWidth: 2,
            borderColor: colors.blueish_black,
            borderRadius: 15,
          }}
        >
          Cost pentru acest articol: {route.params.total_cost}
        </AppText>
      </View>

      {itemProcedures.length ? (
        <>
          <AppText
            style={{ paddingTop: 20, paddingBottom: 20, textAlign: "center" }}
          >
            Proceduri:
          </AppText>
          <FlatList
            data={itemProcedures}
            renderItem={({ item }) => (
              <ProcedureTitleCard
                type={item.type}
                title={item.title}
                base_price={item.cost}
                onPress={() =>
                  navigation.navigate("Completed Procedure Screen", {
                    ...item,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      ) : (
        <AppText
          style={{ paddingTop: 20, paddingBottom: 20, textAlign: "center" }}
        >
          Nicio procedura pentru acest articol
        </AppText>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.coldWhite,
    padding: 5,

    borderRadius: 5,
    elevation: 3,
    margin: 5,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.textGreen,
    margin: 2,
  },
});

export default CompletedItemsDetailsScreen;
