import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import { addNewItem } from "../../network/items";

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["chiuloasa", "bloc", "arbore", "diverse"])
    .required("Tipul este obligatoriu"),
  title: Yup.string().min(5).max(50).required("Titlul este obligatoriu"),
  details: Yup.string().max(245),
  size_factor: Yup.number().required("factorul de marime trebuie stabilit"),
});

function NewItemScreen({ navigation, route }) {
  let itemValues = {
    type: "",
    title: "",
    details: "",
    size_factor: "",
  };

  const handleNewItem = async (values) => {
    values.orderId = route.params.orderId;
    values.added_by_user = "Default user";
    console.log(values);
    const [response, err] = await addNewItem(values);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 201) navigation.pop();
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={itemValues}
        onSubmit={(values) => handleNewItem(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          icon="ballot"
          placeholder="Tip: chiuloasa/ bloc/ arbore/ diverse"
          name="type"
        />
        <AppFormField
          autoCorrect={false}
          icon="rename-box"
          placeholder="Titlu"
          name="title"
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
          icon="resize"
          placeholder="Factor de marime/ cilindree"
          name="size_factor"
        />
        <SubmitButton title="Adauga articolul" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default NewItemScreen;
