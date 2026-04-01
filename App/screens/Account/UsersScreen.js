import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import OrderCard from "../../components/OrderCard";
import AppButton from "../../components/AppButton";

import { useFocusEffect } from "@react-navigation/native";
import AppText from "../../components/AppText";
import UserCard from "../../components/Cards/UserCard";
import colors from "../../config/colors";
import { getUsers } from "../../network/users";
import Screen from "../../components/Screen";

function UsersScreen({ navigation }) {
  const [data, setData] = useState([]);

  const getUsersFromApi = async () => {
    const [response, err] = await getUsers();
    if (err) {
      //Alert.alert("Eroare server din users: ", err);
    } else {
      const updatedData = response.data;

      setData(updatedData);

      console.log("----------loaded data for users \n ");
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUsersFromApi();
    }, []),
  );

  return (
    <Screen>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <UserCard
            onPress={() => {
              navigation.navigate("User Details Screen", { ...item });
            }}
            name={item.name}
            email={item.email}
            autority={item.autority}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default UsersScreen;
