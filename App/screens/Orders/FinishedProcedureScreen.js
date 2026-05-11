import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import AppText from "../../components/AppText";
import TypeLabel from "../../components/TypeLabel";
import AppButton from "../../components/AppButton";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import { editProcedure } from "../../network/procedures";
import AppImageViewer from "../../components/AppImageViewer";
import DeleteButton from "../../components/DeleteButton";

const validationSchema = Yup.object().shape({
  date_in: Yup.date(),
  details_in: Yup.string(),
  date_out: Yup.date(),
  details_out: Yup.string(),
  cost: Yup.number().required("Pretul este obligatoriu"),
  completed_by_user: Yup.string().required(
    "Numele celui care a terminat lucrarea este obligatoriu",
  ),
});

function FinishedProcedureScreen({ route, navigation }) {
  const [showForm, setShowForm] = useState(false);

  console.log("----------------finished procedure screen params: \n");
  console.log(route.params);
  const procedureInitialValues = {
    cost: route.params.cost ? route.params.cost.toString() : "",
    details_in: route.params.details_in,
    date_in: route.params.date_in.slice(0, 10),
    details_out: route.params.details_out,
    date_out: route.params.date_out.slice(0, 10),
    completed_by_user: route.params.completed_by_user,
  };

  const handleEditProcedure = async (values) => {

    let data = values;
    data.id = route.params.id;
    console.log("\n datele care pleaca la server");
    console.log(data);
    const [response, err] = await editProcedure(data); //////////////
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
    <Screen>
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
        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
          <AppText>Cost: {route.params.cost}</AppText>
          <DeleteButton
            onPress={() => handleProcedureDelete()}
            alertMessage={"Sigur vrei sa stergi procedura?"}
          />
        </View>

      </View>
      <View style={styles.detailsContainer}>
        <AppText>
          Data de intrare: {route.params.date_in.slice(0, 10)}
        </AppText>
        <View style={styles.horizontalSeparator} />
        <AppText>Detalii intrare: {route.params.details_in}</AppText>
        {route.params.images[0] && (
          <AppImageViewer images={route.params.images} initialIndex={0} in_out="IN" />
        )}

      </View>
      <View style={styles.detailsContainer}>
        <AppText>
          Data de iesire: {route.params.date_out.slice(0, 10)}{" "}
        </AppText>
        <View style={styles.horizontalSeparator} />
        <AppText>Detalii iesire: {route.params.details_out}</AppText>
        {route.params.images[0] && (
          <AppImageViewer images={route.params.images} initialIndex={0} in_out="OUT" />
        )}
      </View>


      {showForm && (
        <AppForm
          initialValues={procedureInitialValues}
          onSubmit={(values) => handleEditProcedure(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            keyboardType="numeric"
            icon="hand-coin"
            placeholder="Cost neprecizat"
            name="cost"
          />
          <View style={styles.horizontalSeparator} />
          <AppFormField
            autoCorrect={false}
            icon="calendar"
            placeholder="Data de intrare"
            name="date_in"
          />
          <AppFormField
            autoCorrect={false}
            icon="card-text"
            placeholder="Detalii intrare"
            name="details_in"
          />
          <View style={styles.horizontalSeparator} />
          <AppFormField
            autoCorrect={false}
            icon="calendar"
            placeholder="Data de iesire"
            name="date_out"
          />
          <AppFormField
            autoCorrect={false}
            icon="card-text"
            placeholder="Detalii iesire"
            name="details_out"
          />
          <View style={styles.horizontalSeparator} />
          <AppFormField
            autoCorrect={false}
            icon="account-cog"
            placeholder="Cine a terminat lucrarea"
            name="completed_by_user"
          />

          <SubmitButton
            title="Salveaza modificarea"
            alertMessage="Confirma salvarea modificarilor"
          />
        </AppForm>
      )}
      <AppButton
        title={showForm ? "Anulează" : "Editează"}
        style={{ backgroundColor: colors.buttonBackGroundSecondary }}
        onPress={() => {
          setShowForm(!showForm);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.coldWhite,
    borderColor: colors.blueish_black,
    borderWidth: 1,
    padding: 20,
    borderRadius: 5,
    elevation: 3,
    margin: 5,
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: colors.textGreen,
    marginBottom: 5,
    marginTop: 5,
  },
  text: { textAlign: "center", fontSize: 35 },
  topContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottomContainer: { justifyContent: "space-between", flexDirection: "row" },
});

export default FinishedProcedureScreen;
