import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import {
  addNewProcedureTitle,
  deleteProcedureTitle,
  editProcedureTitle,
} from "../../network/procedureTitles";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

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

function AdminEditProcedureScreen({ navigation, route }) {
  const handleEditProcedureTitle = async (values) => {
    values.id = route.params.id;
    console.log(values);
    const [response, err] = await editProcedureTitle(values);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 200) navigation.pop();
  };

  const handleDeleteProcedureTitle = async () => {
    console.log("huhh??");
    const [response, err] = await deleteProcedureTitle(route.params.id);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 200) navigation.pop();
  };

  return (
    <Screen
      footer={
        <AppButton
          title="Sterge procedura"
          alertMessage="Nerecomandat, dar niciun articol nu va fi afectat"
          style={{
            backgroundColor: colors.buttonBackGroundRed,
            marginTop: "auto",
            marginBottom: 10,
          }}
          onPress={handleDeleteProcedureTitle}
        />
      }
    >
      <AppForm
        initialValues={{
          type: route.params.type,
          rank_index: route.params.rank_index.toString(),
          title: route.params.title,
          base_price: route.params.base_price.toString(),
          price_instructions: route.params.price_instructions,
          details: route.params.details,
        }}
        onSubmit={(values) => handleEditProcedureTitle(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          icon="ballot"
          placeholder="Tip:"
          name="type"
          editable={false}
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

        <SubmitButton
          title="Salveaza modificarile"
          alertMessage="Sigur modifici detaliile? Comenzile care deja au pretul stabilit nu vor fi afectate"
        />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default AdminEditProcedureScreen;
