import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import AppText from "../../components/AppText";
import { addNewProcedureToItemId } from "../../network/procedures";

const validationSchema = Yup.object().shape({
  date_in: Yup.date(),
  cost: Yup.number().required("Pretul este obligatoriu"),
  details_in: Yup.string(),
});

function NewProcedureScreen({ navigation, route }) {
  console.log(
    " New Procedure Screen route.params ----------------------------------------",
  );
  console.log(route.params);
  const procedureInitialValues = {
    details_in: "",
    date_in: new Date().toISOString().slice(0, 10),
    cost: (route.params.base_price * route.params.size_factor).toString(),
  };
  const handleNewProcedure = async (values) => {
    let data = values;
    data.cost = Number(data.cost);
    data.item_id = route.params.item_id;
    data.procedure_title_id = route.params.procedure_title_id;
    data.added_by_user = "Default user";
    const [response, err] = await addNewProcedureToItemId(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 201) navigation.pop(2);
  };

  return (
    <Screen style={styles.container}>
      <AppText>
        ITEM id: {route.params.item_id} procedure title id:{" "}
        {route.params.procedure_title_id}{" "}
      </AppText>
      <AppForm
        initialValues={procedureInitialValues}
        onSubmit={(values) => handleNewProcedure(values)}
        validationSchema={validationSchema}
      >
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
          name="details_in"
        />
        <AppText>
          {" "}
          Pret de baza :{route.params.base_price}
          {"\n"} Factorul de dimensiune: {route.params.size_factor}
          {"\n"} Pret in total:{" "}
          {route.params.base_price * route.params.size_factor}
        </AppText>
        <AppFormField
          autoCorrect={false}
          keyboardType="numeric"
          icon="hand-coin"
          placeholder="Cost"
          name="cost"
        />
        <SubmitButton title="Adauga procedura la articol" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
});

export default NewProcedureScreen;
//aici ajungi dupa procedure pick screen, unde practic alegi din lista filtrata dupa category un id de procedura
