import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import { addNewProcedureTitle } from "../../network/procedureTitles";
import AppText from "../../components/AppText";
import AppFormPicker from "../../components/forms/AppFormPicker";
import { types } from "../../config/types";

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["chiuloasa", "bloc", "arbore", "diverse"])
    .required("Tipul este obligatoriu"),
  title: Yup.string()
    .min(5, "minim 5 caractere")
    .max(50, "maxim 50 de caractere")
    .required("Titlul procedurii este obligatoriu"),
  rank_index: Yup.number()
    .typeError("Rankul trebuie sa fie un numar de la 0 la 100")
    .max(100, "maxim 100"),
  base_price: Yup.number()
    .typeError("Pret trebuie sa fie un numar")
    .required("pretul de baza trebuie stabilit"),
  price_instructions: Yup.string().max(1000),
  details: Yup.string().max(1000),
});

function AdminNewProcedureScreen({ navigation }) {
  const handleNewProcedureTitle = async (values) => {
    const [response, err] = await addNewProcedureTitle(values);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 201) navigation.pop();
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          type: "",
          rank_index: "",
          title: "",
          base_price: "",
          price_instructions: "",
          details: "",
        }}
        onSubmit={(values) => handleNewProcedureTitle(values)}
        validationSchema={validationSchema}
      >
        <AppFormPicker
          items={types}
          placeholder="Selecteaza tipul"
          name="type"
          icon="ballot"
        />
        <AppFormField
          autoCorrect={false}
          icon="rename-box"
          placeholder="Titlu"
          name="title"
        />
        <AppFormField
          autoCorrect={false}
          keyboardType="numeric"
          icon="order-numeric-ascending"
          placeholder="Rank"
          name="rank_index"
        />

        <AppFormField
          autoCorrect={false}
          keyboardType="numeric"
          icon="hand-coin"
          placeholder="Pretul de baza"
          name="base_price"
        />
        <AppFormField
          autoCorrect={false}
          icon="information-outline"
          placeholder="Instructiuni despre cum se aplica pretul de baza"
          name="price_instructions"
        />
        <AppFormField
          autoCorrect={false}
          icon="clipboard-list-outline"
          placeholder="Detalii despre ce cuprinde procedura"
          name="details"
        />

        <SubmitButton title="Adauga procedura" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default AdminNewProcedureScreen;
