import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../components/AppText";
import ClientCard from "../../components/ClientCard";
import { getClient } from "../../network/clients";
import AppButton from "../../components/AppButton";
import { getItemsForOrderId } from "../../network/items";
import colors from "../../config/colors";
import { completeOrder, deliverOrder } from "../../network/orders";
import CompletedItemCard from "../../components/CompletedItemCard";
import DeleteButton from "../../components/DeleteButton";

function CompletedOrderDetailsScreen({ navigation, route }) {
  const [client, setClient] = useState({});
  const [items, setItems] = useState([]);
  const [costTotalOrder, setCostTotalOrder] = useState();
  const getClientFromApi = async (name) => {
    const [response, err] = await getClient(name);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      setClient(response.data);
    }
  };
  const getItemsFromApi = async (orderId) => {
    const [response, err] = await getItemsForOrderId(orderId);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log("log din get items pentru completed order details\n");
      console.log(response.data);
      setItems(response.data);
      const totalOrderCost = response.data.reduce(
        (sum, item) => sum + Number(item.total_cost || 0),
        0,
      );
      setCostTotalOrder(totalOrderCost);
    }
  };

  const handleOrderDelivered = async () => {
    const data = {
      id: route.params.id,
      deliveryStatus: route.params.delivered === 0 ? 1 : 0,
    };
    const [response, err] = await deliverOrder(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  const handleUNFinishOrder = async () => {
    const data = {
      id: route.params.id,
      date_out: "",
      completed_by_user: "delete",
      deliveryStatus: 0,
    };
    const [response, err] = await completeOrder(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  const handleDeleteOrder = async () => {
    const data = {
      id: route.params.id,
    };
    const [response, err] = await deleteOrder(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log("params din order details screen \n");
      console.log(route.params);
      getItemsFromApi(route.params.id);
      getClientFromApi(route.params.client_name);
    }, []),
  );

  // useEffect(() => {
  //   console.log(route.params);
  //   getItemsFromApi(route.params.id);
  //   getClientFromApi(route.params.client_name);
  // }, []);

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
              ID de comanda: {route.params.id}
            </AppText>
            <DeleteButton
              onPress={handleDeleteOrder}
              alertMessage={"Sigur vrei sa stergi comanda in totalitate?"}
            />
          </View>
          <AppText style={{ color: colors.pinkish_black }}>
            Titlu:
            <AppText
              style={{
                fontWeight: "bold",
                color: colors.pinkish_black,
                fontSize: 30,
              }}
            >
              {" "}
              {route.params.title}
            </AppText>
          </AppText>

          <AppText>Detalii: {route.params.details}</AppText>
          <View
            style={{ height: 1, backgroundColor: colors.primary, margin: 5 }}
          />
          <AppText>Adaugata la : {route.params.date_in.slice(0, 10)}</AppText>
          <AppText>Termianta la : {route.params.date_out.slice(0, 10)}</AppText>
          <AppText>Durata : {route.params.waitingDays} zile</AppText>

          <AppText style={styles.factortext}>
            Factor de pret: {route.params.price_factor}
          </AppText>
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
            Cost Comandă: {costTotalOrder}
          </AppText>
        </View>
        <AppText style={styles.middleText}>CLIENT:</AppText>
        <ClientCard
          name={client.name}
          phone={client.phone}
          email={client.email}
          fiscal_code={client.fiscal_code}
          details={client.details}
        />

        <AppText style={styles.middleText}> ARTICOLE:</AppText>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CompletedItemCard
              type={item.type}
              title={item.title}
              details={item.details}
              proceduresTotal={item.procedures_total}
              cost={item.total_cost}
              onPress={() => {
                navigation.navigate("Completed Item Details Screen", {
                  ...item,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <AppButton
          style={{
            flex: 1,
            backgroundColor: colors.buttonBackGroundSecondary,
          }}
          title="Redeschide comanda"
          alertMessage="Confirma redeschiderea comenzi"
          onPress={() => {
            handleUNFinishOrder();
          }}
        />
        <AppButton
          style={{ flex: 1 }}
          title={
            route.params.delivered === 0
              ? "Marchează ca livrat"
              : "Marchează ca nelivrat"
          }
          alertMessage={
            route.params.delivered === 0
              ? "Confirma livrarea comenzii"
              : "Confirma anularea livrarii comenzii"
          }
          onPress={() => {
            handleOrderDelivered();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingRight: 10, paddingLeft: 10 },
  factortext: { textAlign: "left", color: colors.greenish_black },
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
});

export default CompletedOrderDetailsScreen;
