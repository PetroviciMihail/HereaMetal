import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import NextProcedureCard from "../../components/Cards/NextProcedureCard";
import { getUserProcedures } from "../../network/users";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import DeleteButton from "../../components/DeleteButton";

function UserDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [total_cost, setTotalCost] = useState(0);

  const getUserProceduresFromApi = async () => {
    let data = { name: route.params.name };
    console.log(data);
    const [response, err] = await getUserProcedures(data);
    if (err) {
      //Alert.alert("Eroare server din users: ", err);
    } else {
      const updatedData = response.data;
      const calculatedCost = response.data.reduce(
        (sum, item) => sum + (item.procedure_cost ?? 0),
        0,
      );
      setTotalCost(calculatedCost);
      setData(updatedData);

      console.log("----------loaded procedures for users \n ");
      console.log(route.params);
      console.log(updatedData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserProceduresFromApi();
    }, []),
  );
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText style={{ color: colors.blueish_black, flex: 5 }}>
              Nume utilizator: {route.params.name}
            </AppText>
            <DeleteButton
              onPress={() => {}}
              alertMessage={"Sigur vrei sa stergi userul?"}
            />
          </View>
          <View
            style={{ height: 1, backgroundColor: colors.primary, margin: 5 }}
          />
          <AppText>Email: {route.params.email}</AppText>

          <AppText>Autoritate : {route.params.autority}</AppText>
        </View>

        <AppText style={styles.middleText}>Proceduri executate:</AppText>
        <AppText style={styles.middleText}>
          Cost total comenzi: {total_cost}
        </AppText>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <NextProcedureCard
              id={item.order_id}
              orderTitle={"Cost: " + item.procedure_cost}
              itemTitle={item.item_title}
              procedureTitle={item.procedure_title}
              date_out={item.procedure_date_out}
              type={item.item_type}
              onPress={() => {}}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  middleText: {
    textAlign: "center",
  },
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

export default UserDetailsScreen;
