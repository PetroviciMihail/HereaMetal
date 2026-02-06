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
    <>
      <View style={styles.container}>
        <View style={styles.topButtons}>
          {/* <AppText
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
            Utilizatorii aplicatiei
          </AppText> */}
        </View>

        <View style={styles.listContainer}>
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
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  topButtons: { marginLeft: 3, marginRight: 3 },
  listContainer: { flex: 1 },
});

export default UsersScreen;
