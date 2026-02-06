import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import OrderCard from "../../components/OrderCard";
import AppButton from "../../components/AppButton";
import { getOrders } from "../../network/orders";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

function OrdersScreen({ navigation }) {
  const [data, setData] = useState([]);

  const getOrdersFromApi = async () => {
    const [response, err] = await getOrders();
    if (err) {
      Alert.alert("Eroare server din orders: ", err);
    } else {
      const updatedData = response.data.map((item) => {
        return {
          ...item,
          item_types: item.item_types
            ? item.item_types.split(",").map((type) => type.trim())
            : [],
          waitingDays: Math.floor(
            (new Date() - new Date(item.date_in)) / (1000 * 60 * 60 * 24) +
              (item.emergency_factor - 1) +
              (item.importance - 1),
          ),
        };
      });
      updatedData.sort((a, b) => b.waitingDays - a.waitingDays);
      setData(updatedData);

      console.log("----------loaded data for orders \n ");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrdersFromApi();
    }, []),
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topButtons}>
          <AppButton
            title="Comanda noua"
            style={{ width: "50%" }}
            onPress={() => {
              navigation.navigate("Clients Screen");
            }}
          />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <OrderCard
                onPress={() => {
                  navigation.navigate("Order Details Screen", { ...item });
                }}
                id={item.id}
                title={item.title}
                clientName={item.client_name}
                waitingDays={item.waitingDays}
                proceduresDone={item.procedures_done_for_order}
                proceduresTotal={item.procedures_total_for_order}
                itemsList={item.item_types}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  topButtons: { marginLeft: 3, marginRight: 3 },
  listContainer: { flex: 1 },
});

export default OrdersScreen;
