import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getNextProcedures } from "../../network/procedures";
import NextProcedureCard from "../../components/Cards/NextProcedureCard";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import AppPicker from "../../components/AppPicker";
import { types } from "../../config/types";
import AppPickerWithoutModal from "../../components/AppPickerWithoutModal";

function ProceduresScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const filteredData = selectedType
    ? data.filter((item) => item.item_type === selectedType)
    : data;

  const getNextProcedureFromApi = async () => {
    const [response, err] = await getNextProcedures();
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      setData(response.data);

      console.log("////////\n    LOG din PROCEDURES SCREEN \n ");
      console.log(filteredData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNextProcedureFromApi();
    }, []),
  );
  useEffect(() => {}, [selectedType]);

  return (
    <Screen
      safeTopPadding
      header={
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
          <AppPickerWithoutModal
            items={[{ label: "Toate", value: null }, ...types]}
            selectedValue={selectedType}
            onSelectValue={(item) => setSelectedType(item)}
            placeholder="Tip articol"
            style={{ width: "50%" }}
          />
        </View>
      }
    >
      <FlatList
        data={filteredData}
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  topButtons: {
    marginLeft: 3,
    marginRight: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProceduresScreen;
