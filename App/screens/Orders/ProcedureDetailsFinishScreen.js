import React, { useState } from "react";
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
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import AppImageViewer from "../../components/AppImageViewer";
import AppImagePicker from "../../components/AppImagePicker";

const validationSchema = Yup.object().shape({
  date_out: Yup.date(),
  details_out: Yup.string(),
});

function ProcedureDetailsFinishScreen({ route, navigation }) {
  const [images, setImages] = useState([]);

  console.log("----------------procedure details finish screen params: \n");
  console.log(route.params);
  const procedureInitialValues = {
    details_out: "",
    date_out: new Date(),
  };

  const handleFinishProcedure = async (values) => {
    let data = values;
    data.procedure_id = route.params.procedure_id;
    data.order_id = route.params.order_id;
    data.item_id = route.params.item_id;
    data.item_title = route.params.item_title;
    data.procedure_title = route.params.procedure_title;
    data.in_out = "OUT";
    data.completed_by_user = "Default user";

    console.log(data);
    const [response, err] = await completeProcedure(data, images);
    if (err) {
      Alert.alert("Eroare server: ", err);
    } else if (response.status == 201) navigation.pop(2);
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
        {route.params.images[0] && (
          <AppImageViewer images={route.params.images} initialIndex={0} />
        )}
      </View>
      <AppForm
        initialValues={procedureInitialValues}
        onSubmit={(values) => handleFinishProcedure(values)}
        validationSchema={validationSchema}
        enableReinitialize={false}
      >
        <AppImagePicker
          images={images}
          onChangeImages={setImages}
          namePrefix={`out_order_${route.params.order_id}_item_${route.params.item_title}_${route.params.procedure_title}_out`}
        />
        <AppFormDatePicker
          name="date_out"
          icon="calendar"
          placeholder="Data de finalizare"
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
