import React from "react";
import { StyleSheet, Text, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, SubmitButton, AppFormField } from "../../components/forms";
import { registerNewClient } from "../../network/clients";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4),
  type: Yup.string(),
  fiscal_code: Yup.string(),
  email: Yup.string().email(),
  phone: Yup.string().required(),
  details: Yup.string().max(248),
  importance: Yup.number(),
});
function NewClientScreen({ navigation }) {
  let ClientValues = {
    name: "",
    type: "",
    fiscal_code: "",
    email: "",
    phone: "",
    details: "",
    importance: "",
  };

  const handleClientChoice = async (values) => {
    const [response, err] = await registerNewClient(values);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else navigation.navigate("New Order Screen", { clientName: values.name });
  };

  return (
    <Screen style={styles.container}>
      <Text>Completeaza datele clientului nou</Text>
      <AppForm
        initialValues={ClientValues}
        onSubmit={(values) => handleClientChoice(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          placeholder="Nume"
          name="name"
        />
        <AppFormField
          autoCorrect={false}
          icon="account-cash"
          placeholder="persoana fizica/juridica"
          name="type"
        />
        <AppFormField
          autoCorrect={false}
          icon="id-card"
          placeholder="Cod Fiscal"
          name="fiscal_code"
        />
        <AppFormField
          autoCorrect={false}
          icon="email"
          placeholder="Email"
          name="email"
        />
        <AppFormField
          autoCorrect={false}
          keyboardType={"numeric"}
          icon="phone"
          placeholder="Numar de telefon"
          name="phone"
        />
        <AppFormField
          autoCorrect={false}
          icon="card-account-details"
          placeholder="Detalii client"
          name="details"
        />
        <AppFormField
          autoCorrect={false}
          icon="key-star"
          placeholder="Importanta"
          name="importance"
        />
        <SubmitButton title="Creaza clientul" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default NewClientScreen;
