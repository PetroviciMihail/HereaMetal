import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import TypeLabel from "../../components/TypeLabel";
import AppButton from "../../components/AppButton";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { completeProcedure, deleteProcedure } from "../../network/procedures";
import DeleteButton from "../../components/DeleteButton";

const validationSchema = Yup.object().shape({
  date_out: Yup.date(),
  details_out: Yup.string(),
});

function ProcedureDetailsFinishScreen({ route, navigation }) {
  console.log("----------------procedure details finish screen params: \n");
  console.log(route.params);
  const procedureInitialValues = {
    details_out: "",
    date_out: new Date().toISOString().slice(0, 10),
  };

  const handleFinishProcedure = async (values) => {
    let data = values;
    data.id = route.params.id;
    data.completed_by_user = "Default user";
    console.log(data);
    const [response, err] = await completeProcedure(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 200) navigation.pop(2);
  };

  const handleProcedureDelete = async () => {
    const data = {
      id: route.params.id,
    };
    const [response, err] = await deleteProcedure(data);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else {
      console.log(response.data);
      navigation.pop(1);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.topContainer}>
          <AppText
            style={[styles.text, { color: colors.blueish_black, flex: 1 }]}
          >
            {route.params.title}
          </AppText>
          <TypeLabel type={route.params.type} />
        </View>
        <View style={styles.horizontalSeparator} />
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            <AppText>Detalii: {route.params.details_in}</AppText>
            <AppText>Cost: {route.params.cost}</AppText>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <AppButton title="edit" />
            <DeleteButton
              onPress={() => handleProcedureDelete()}
              alertMessage={"Sigur vrei sa stergi procedura?"}
            />
          </View>
        </View>
      </View>
      <AppForm
        initialValues={procedureInitialValues}
        onSubmit={(values) => handleFinishProcedure(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="calendar"
          placeholder="Data de iesire"
          name="date_out"
        />
        <AppFormField
          autoCorrect={false}
          icon="card-text"
          placeholder="Detalii finalizare"
          name="details_out"
        />

        <SubmitButton
          title="Finalizeaza procedura"
          alertMessage={"Confirma finalizarea procedurii"}
        />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 2 },
  detailsContainer: {
    backgroundColor: colors.coldWhite,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
    margin: 5,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.textGreen,
    margin: 2,
  },
  text: { textAlign: "center", fontSize: 35 },
  topContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomContainer: { justifyContent: "space-between", flexDirection: "row" },
});

export default ProcedureDetailsFinishScreen;
