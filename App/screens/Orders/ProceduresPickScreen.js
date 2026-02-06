//aici ajungi dupa ecranul item details screen, unde vezi procedurile pentru un item, si dai sa adaugi o procedura noua
//aici alegi din lista filtrata un id de procedure-title si il dai mai departe la new procedure screen
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getProcedureTitlesForType } from "../../network/procedureTitles";
import ProcedureTitleCard from "../../components/ProcedureTitleCard";
import Screen from "../../components/Screen";

function ProceduresPickScreen({ navigation, route }) {
  console.log(
    "  Procedure Pick Screen route.params ----------------------------------------"
  );
  console.log(route.params);
  const [procedureTitles, setProcedureTitles] = useState([]);

  const getProcedureTitilesFromApi = async () => {
    const [response, err] = await getProcedureTitlesForType(route.params.type);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      response.data.sort((a, b) => a.rank_index - b.rank_index);
      console.log(response.data);
      setProcedureTitles(response.data);
    }
  };

  useEffect(() => {
    getProcedureTitilesFromApi();
  }, []);

  return (
    <>
      <Screen style={styles.container}>
        <FlatList
          data={procedureTitles}
          renderItem={({ item }) => (
            <ProcedureTitleCard
              onPress={() =>
                navigation.navigate("New Procedure Screen", {
                  procedure_title_id: item.id,
                  item_id: route.params.id,
                  base_price: item.base_price,
                  size_factor: route.params.size_factor,
                })
              }
              title={item.title}
              type={item.type}
              base_price={item.base_price}
              size={route.params.size_factor}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default ProceduresPickScreen;
