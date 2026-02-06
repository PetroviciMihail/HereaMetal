import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import AppButton from "../../components/AppButton";
import AppTextInput from "../../components/AppTextInput";
import ScreenNoScrollView from "../../components/ScreenNoScrollView";
import { getProcedureTitles } from "../../network/procedureTitles";
import ProcedureTitleCard from "../../components/ProcedureTitleCard";
import { useFocusEffect } from "@react-navigation/native";

function AdminProceduresScreen({ navigation }) {
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const [shownData, setShownData] = useState([]);

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
  const filterShownData = () => {
    if (category == "") {
      setShownData(data);
    } else {
      const filteredData = data.filter((item) => item.type == category);
      setShownData(filteredData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProcedureTitlesFromApi();
    }, []),
  );

  useEffect(() => {
    filterShownData();
  }, [category]);

  return (
    <ScreenNoScrollView style={styles.container}>
      <AppTextInput
        autoCapitalize="none"
        placeholder="Categorie"
        onChangeText={(text) => setCategory(text)}
      />
      <FlatList
        data={shownData}
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
      <AppButton
        title="Adauga procedura noua"
        onPress={() => navigation.navigate("Admin New Procedure Screen")}
      />
    </ScreenNoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default AdminProceduresScreen;
