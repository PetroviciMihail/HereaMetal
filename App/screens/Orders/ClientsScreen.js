import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import AppButton from "../../components/AppButton";
import ClientCard from "../../components/ClientCard";
import { getClients } from "../../network/clients";
import AppText from "../../components/AppText";

function ClientsScreen({ navigation }) {
  const [data, setData] = useState([]); // Stocăm datele
  const [loading, setLoading] = useState(true); // Stare pentru loading

  const getClientsFromApi = async () => {
    const [response, err] = await getClients();
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientsFromApi();
  }, []);

  return (
    <Screen
      header={<AppText>Clienti existenti</AppText>}
      footer={
        <AppButton
          title="Client Nou"
          onPress={() => navigation.navigate("New Client Screen")}
        />
      }
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ClientCard
            onPress={() =>
              navigation.navigate("New Order Screen", {
                clientName: item.name,
              })
            }
            name={item.name}
            phone={item.phone}
            email={item.email}
            type={item.type}
            fiscal_code={item.fiscal_code}
            details={item.details}
            importance={item.importance}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  containerButton: { paddingRight: 10, paddingLeft: 10 },
  listContainer: { paddingTop: 2 },
  container: { flex: 1 },
});

export default ClientsScreen;
