import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import { addNewProcedureTitle } from "../../network/procedureTitles";
import AppText from "../../components/AppText";

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["chiuloasa", "bloc", "arbore", "diverse"])
    .required("Tipul este obligatoriu"),
  title: Yup.string()
    .min(5)
    .max(50)
    .required("Titlul procedurii este obligatoriu"),
  rank_index: Yup.number().max(100),
  base_price: Yup.number().required("pretul de baza trebuie stabilit"),
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
        initialValues={{ type: "", rank_index: "", title: "", base_price: "" }}
        onSubmit={(values) => handleNewProcedureTitle(values)}
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
        <AppText
          style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 20 }}
        >
          Pretul care ar fi aplicat cand un articol are factorul de marime 1
        </AppText>
        <SubmitButton title="Adauga procedura" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default AdminNewProcedureScreen;
