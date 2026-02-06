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
import DeleteButton from "../../components/DeleteButton";
import { deleteItem } from "../../network/items";

function ItemDetailsScreen({ navigation, route }) {
  //folosit din route.params: id de item, type, id de order, title, details, size-factor
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

  const handleDeleteItem = async () => {
    const data = {
      id: route.params.id,
    };
    const [response, err] = await deleteItem(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  return (
    <ScreenNoScrollView style={{ paddingTop: 2 }}>
      <View style={styles.detailsContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TypeLabel
            type={route.params.type}
            style={{ alignSelf: "center", width: "60%" }}
          />
          <DeleteButton
            onPress={() => handleDeleteItem()}
            alertMessage={"Sigur vrei sa stergi articolul?"}
          />
        </View>
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
                price={item.cost}
                date_out={item.date_out}
                onPress={() =>
                  item.date_out
                    ? navigation.navigate("Finished Procedure Screen", {
                        ...item,
                      })
                    : navigation.navigate("Procedure Details Finish Screen", {
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
          Nicio procedura pentru acest articol deocamdata
        </AppText>
      )}
      <AppButton
        title="Adauga procedura noua"
        onPress={() =>
          navigation.navigate("Procedure Titles Pick Screen", {
            ...route.params,
          })
        }
      />
    </ScreenNoScrollView>
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

export default ItemDetailsScreen;
