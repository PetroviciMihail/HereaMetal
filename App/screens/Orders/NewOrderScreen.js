import React from "react";
import { StyleSheet, Text, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import { createNewOrder } from "../../network/orders";

const validationSchema = Yup.object().shape({
  id: Yup.number(),
  title: Yup.string().min(5).max(50).required(),
  date_in: Yup.date(),
  price_factor: Yup.number(),
  emergency_factor: Yup.number(),
});
function NewOrderScreen({ navigation, route }) {
  const orderInitialValues = {
    id: "",
    title: "",
    date_in: new Date().toISOString().slice(0, 10),
    price_factor: "",
    emergency_factor: "",
  };

  const handleNewOrder = async (values) => {
    console.log(values);
    values.client_name = route.params.clientName;
    values.added_by_user = "User default";
    const [response, err] = await createNewOrder(values);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 201) navigation.navigate("Orders Screen");
  };
  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={orderInitialValues}
        onSubmit={(values) => handleNewOrder(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          keyboardType="numeric"
          icon="credit-card-search"
          placeholder="ID-autocompletat"
          name="id"
        />
        <AppFormField
          autoCorrect={false}
          icon="rename-box"
          placeholder="Titlu"
          name="title"
        />
        <AppFormField
          autoCorrect={false}
          icon="calendar"
          placeholder="Data de intrare"
          name="date_in"
        />
        <AppFormField
          autoCorrect={false}
          icon="card-text"
          placeholder="Detalii"
          name="details"
        />
        <AppFormField
          autoCorrect={false}
          keyboardType="numeric"
          icon="hand-coin"
          placeholder="Factor de pret, standard:1"
          name="price_factor"
        />
        <AppFormField
          autoCorrect={false}
          icon="car-emergency"
          keyboardType="numeric"
          placeholder="Factor de urgenta, std:1"
          name="emergency_factor"
        />
        <SubmitButton title="Creaza comanda" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NewOrderScreen;
