import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Yup from "yup";
import NextProcedureCard from "../../components/Cards/NextProcedureCard";
import {
  deleteUser,
  getUserProcedures,
  setAutorityLevel,
} from "../../network/users";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import DeleteButton from "../../components/DeleteButton";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppFormPicker from "../../components/forms/AppFormPicker";
import { userAutorities } from "../../config/userAutorities";

const validationSchema = Yup.object().shape({
  autority: Yup.number().max(100),
});

function UserDetailsScreen({ navigation, route }) {
  const [autority, setAutority] = useState(route.params.autority);
  const [data, setData] = useState([]);
  const [total_cost, setTotalCost] = useState(0);

  const getUserProceduresFromApi = async () => {
    let data = { name: route.params.name };
    console.log(data);
    const [response, err] = await getUserProcedures(data);
    if (err) {
      //Alert.alert("Eroare server din users: ", err);
    } else {
      let updatedData = response.data;

      const calculatedCost = response.data.reduce(
        (sum, item) => sum + (item.procedure_cost ?? 0),
        0,
      );
      setTotalCost(calculatedCost);
      setData(updatedData);

      console.log("----------loaded procedures for users \n ");
      console.log(route.params);
      console.log(updatedData);
    }
  };

  const handleSetAutority = async (values) => {
    const data = {
      name: route.params.name,
      autority: values.autority,
    };
    const [response, err] = await setAutorityLevel(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      setAutority(values.autority);
    }
  };

  const handleDeleteUser = async () => {
    const data = {
      name: route.params.name,
    };
    const [response, err] = await deleteUser(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUserProceduresFromApi();
    }, []),
  );
  return (
    <Screen>
      <View style={styles.detailsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText style={{ color: colors.blueish_black, flex: 5 }}>
            Nume utilizator: {route.params.name}
          </AppText>
          <DeleteButton
            onPress={handleDeleteUser}
            alertMessage={"Sigur vrei sa stergi userul?"}
          />
        </View>
        <View
          style={{ height: 1, backgroundColor: colors.primary, margin: 5 }}
        />
        <AppText>Email: {route.params.email}</AppText>

        <AppText>Autoritate : {autority}</AppText>
        <AppForm
          initialValues={{
            autority: route.params.autority,
          }}
          onSubmit={(values) => handleSetAutority(values)}
          validationSchema={validationSchema}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {({ values }) => (
            <>
              <AppFormPicker
                items={userAutorities}
                icon="book-lock-open-outline"
                placeholder="autoritate"
                name="autority"
                style={{ width: "60%" }}
              />

              {values.autority != autority && (
                <SubmitButton
                  title="Modifica autoritatea utilizatorului"
                  alertMessage="Sigur modifici ?"
                  style={{ width: "10%" }}
                />
              )}
            </>
          )}
        </AppForm>
      </View>

      <AppText style={styles.middleText}>Proceduri executate:</AppText>
      <AppText style={styles.middleText}>
        Cost total comenzi: {total_cost}
      </AppText>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NextProcedureCard
            id={item.order_id}
            orderTitle={"Cost: " + item.procedure_cost}
            itemTitle={item.item_title}
            procedureTitle={item.procedure_title}
            date_out={item.procedure_date_out}
            type={item.item_type}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  middleText: {
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: colors.coldWhite,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    margin: 5,

    zIndex: 1000,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.textGreen,
    margin: 2,
  },
});

export default UserDetailsScreen;
