import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import AppButton from "../../components/AppButton";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getNextProcedures } from "../../network/procedures";
import NextProcedureCard from "../../components/Cards/NextProcedureCard";
import AppText from "../../components/AppText";
import colors from "../../config/colors";

function ProceduresScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNextProcedureFromApi = async () => {
    const [response, err] = await getNextProcedures();
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      setData(response.data);
      console.log("////////\n    LOG din PROCEDURES SCREEN \n ");
      console.log(response.data);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNextProcedureFromApi();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <AppText
          style={{
            width: "50%",
            textAlign: "center",
            color: colors.textBrown,
            textAlign: "center",
            borderColor: colors.borderBrown,
            backgroundColor: colors.coldWhite,
            borderWidth: 3,
            borderRadius: 10,
            margin: 3,
            fontWeight: "bold",
          }}
        >
          Proceduri la rând
        </AppText>
        <AppButton
          title="Sorteaza după tip articol"
          style={{ width: "50%" }}
          onPress={() => {}}
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <NextProcedureCard
              onPress={() => {
                navigation.navigate("Item Details Screen", {
                  id: item.item_id, //item id
                  order_id: item.order_id,
                  type: item.item_type,
                  title: item.item_title,
                  details: item.details_in,
                  //size_factor: cucu
                });
              }}
              id={item.order_id}
              orderTitle={item.order_title}
              itemTitle={item.item_title}
              procedureTitle={item.procedure_title}
              waitingDays={item.order_wait_days}
              type={item.item_type}
            />
          )}
          keyExtractor={(item) => item.procedure_id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  topButtons: {
    marginLeft: 3,
    marginRight: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: { flex: 1 },
});

export default ProceduresScreen;
