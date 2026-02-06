import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, FlatList, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../components/AppText";
import ClientCard from "../../components/ClientCard";
import { getClient } from "../../network/clients";
import AppButton from "../../components/AppButton";
import ItemCard from "../../components/ItemCard";
import { getItemsForOrderId } from "../../network/items";
import colors from "../../config/colors";
import { completeOrder, deleteOrder } from "../../network/orders";
import DeleteButton from "../../components/DeleteButton";

function OrderDetailsScreen({ navigation, route }) {
  // folosit din route.params: id, client_name, title, details, emergency factor, price factor, date_in, proceduresz_total, procedures_done

  const [client, setClient] = useState({});
  const [items, setItems] = useState([]);
  const [allCompleted, setAllCompleted] = useState(false);

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
      console.log(response.data);
      const allComplete =
        response.data.lenght &&
        response.data.every(
          (item) =>
            item.procedures_done === item.procedures_total &&
            item.procedures_total != 0,
        );
      setAllCompleted(allComplete);
      setItems(response.data);
    }
  };
  const handleFinishOrder = async () => {
    const data = {
      id: route.params.id,
      date_out: new Date().toISOString().slice(0, 10),
      completed_by_user: "Default user",
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
          <AppText style={styles.factortext}>
            Factor de urgenta: {route.params.emergency_factor} (+zile)
          </AppText>
          <AppText style={styles.factortext}>
            Factor de pret: {route.params.price_factor} (sugestie)
          </AppText>
          <AppText style={styles.factortext}>
            Importanta client: {route.params.importance - 1} (+zile in
            asteptare)
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
            <ItemCard
              type={item.type}
              title={item.title}
              details={item.details}
              proceduresTotal={item.procedures_total}
              proceduresDone={item.procedures_done}
              onPress={() => {
                navigation.navigate("Item Details Screen", { ...item });
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <AppButton
          style={{ flex: 1 }}
          title="Adauga articol nou"
          onPress={() =>
            navigation.navigate("New Item Screen", {
              orderId: route.params.id,
            })
          }
        />
        {allCompleted && (
          <AppButton
            style={{
              flex: 1,
              backgroundColor: colors.buttonBackGroundSecondary,
            }}
            title="Finalizeaza Comanda"
            alertMessage="Confirma finalizarea intregii comenzi"
            onPress={() => {
              handleFinishOrder();
            }}
          />
        )}
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

export default OrderDetailsScreen;
