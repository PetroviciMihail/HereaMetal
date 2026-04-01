import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import OrderCard from "../../components/OrderCard";
import AppButton from "../../components/AppButton";
import { getCompletedOrders, getOrders } from "../../network/orders";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CompletedOrderCard from "../../components/CompletedOrderCard";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Screen from "../../components/Screen";

function CompletedOrdersScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCompletedOrdersFromApi = async () => {
    const [response, err] = await getCompletedOrders();
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      const updatedData = response.data.map((item) => {
        return {
          ...item,
          item_types: item.item_types
            ? item.item_types.split(",").map((type) => type.trim())
            : [],
          waitingDays: Math.floor(
            (new Date(item.date_out) - new Date(item.date_in)) /
              (1000 * 60 * 60 * 24),
          ),
        };
      });

      setData(updatedData);

      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCompletedOrdersFromApi();
    }, []),
  );

  return (
    <Screen
      safeTopPadding
      header={
        <View style={styles.topButtons}>
          {/* <AppButton
            title="Buton"
            style={{ width: "50%" }}
            onPress={() => {}}
          /> */}
          <AppText
            style={{
              fontSize: 35,
              color: colors.textBrown,
              textAlign: "center",
              borderColor: colors.borderBrown,
              backgroundColor: colors.coldWhite,
              borderWidth: 3,
              borderRadius: 10,
              margin: 5,
            }}
          >
            Lucrari terminate
          </AppText>
        </View>
      }
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CompletedOrderCard
            onPress={() => {
              navigation.navigate("Completed Order Details Screen", {
                ...item,
              });
            }}
            id={item.id}
            title={item.title}
            clientName={item.client_name}
            waitingDays={item.waitingDays}
            proceduresTotal={item.procedures_total_for_order}
            itemsList={item.item_types}
            delivered={item.delivered}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  topButtons: { marginLeft: 3, marginRight: 3 },
});

export default CompletedOrdersScreen;
