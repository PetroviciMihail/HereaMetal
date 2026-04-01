import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import OrderCard from "../../components/OrderCard";
import { getOrders } from "../../network/orders";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AddNewButton from "../../components/AddNewButton";
import AppTextInput from "../../components/AppTextInput";

function OrdersScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter(
      (item) =>
        String(item.id).includes(lowerSearch) ||
        item.title?.toLowerCase().includes(lowerSearch) ||
        item.client_name?.toLowerCase().includes(lowerSearch) ||
        item.details?.toLowerCase().includes(lowerSearch) ||
        String(item.item_types.join(" ")).toLowerCase().includes(lowerSearch),
    );
  }, [search, data]);

  useFocusEffect(
    useCallback(() => {
      getOrdersFromApi();
    }, []),
  );

  useEffect(() => {}, [search]);

  return (
    <Screen
      safeTopPadding
      scrollable={false}
      header={
        <>
          <AppTextInput
            icon="text-search-variant"
            placeholder="Cautare"
            onChangeText={(newText) => {
              setSearch(newText);
            }}
          />
        </>
      }
    >
      <FlatList
        data={filteredData}
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
        showsVerticalScrollIndicator={false}
      />
      <AddNewButton
        onPress={() => {
          navigation.navigate("Clients Screen");
        }}
        style={styles.addButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  addButton: { position: "absolute", bottom: 20, right: 20 },
});

export default OrdersScreen;
