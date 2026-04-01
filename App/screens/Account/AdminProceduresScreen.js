import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";

import { getProcedureTitles } from "../../network/procedureTitles";
import ProcedureTitleCard from "../../components/ProcedureTitleCard";
import { useFocusEffect } from "@react-navigation/native";
import Screen from "../../components/Screen";
import AppPickerWithoutModal from "../../components/AppPickerWithoutModal";
import { types } from "../../config/types";

function AdminProceduresScreen({ navigation }) {
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);

  const filteredData = category
    ? data.filter((item) => item.type == category)
    : data;

  const getProcedureTitlesFromApi = async () => {
    const [response, err] = await getProcedureTitles();
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      //console.log(response.data);
      setData(response.data);
      setShownData(response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProcedureTitlesFromApi();
    }, []),
  );

  useEffect(() => {}, [category]);

  return (
    <Screen
      footer={
        <AppButton
          title="Adauga procedura noua"
          onPress={() => navigation.navigate("Admin New Procedure Screen")}
        />
      }
    >
      <AppPickerWithoutModal
        items={[{ label: "Toate", value: null }, ...types]}
        selectedValue={category}
        onSelectValue={(item) => setCategory(item)}
        placeholder="Tip articol"
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <ProcedureTitleCard
            onPress={() =>
              navigation.navigate("Admin Edit Procedure Screen", { ...item })
            }
            type={item.type}
            title={item.title}
            rank_index={item.rank_index}
            base_price={item.base_price}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default AdminProceduresScreen;
