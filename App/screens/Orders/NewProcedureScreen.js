import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Screen from "../../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import * as Yup from "yup";
import AppText from "../../components/AppText";
import { addNewProcedureToItemId } from "../../network/procedures";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import { showError } from "../../network/alertService";
import AppImagePicker from "../../components/AppImagePicker";

const validationSchema = Yup.object().shape({
  date_in: Yup.date(),
  cost: Yup.number().required("Pretul este obligatoriu"),
  details_in: Yup.string(),
});

function NewProcedureScreen({ navigation, route }) {
  const [images, setImages] = useState([]);
  console.log(
    "---------------- New Procedure Screen route.params ---------------------------------",
  );
  console.log(route.params);
  const procedureInitialValues = {
    details_in: "",
    date_in: new Date(),
    cost: (route.params.base_price * route.params.size_factor).toString(),
  };
  const handleNewProcedure = async (values) => {
    let data = { ...values };
    data.cost = Number(data.cost);
    data.order_id = route.params.order_id;
    data.item_id = route.params.item_id;
    data.item_title = route.params.item_title;
    data.procedure_title_id = route.params.procedure_title_id;
    data.procedure_title = route.params.procedure_title;
    data.added_by_user = "Default user";
    console.log("images de dinainte de a le adauga");
    console.log(images);
    const [response, err] = await addNewProcedureToItemId(data, images);
    if (err) {
      showError("Eroare server: ", err);
    } else if (response.status == 201) navigation.pop(2);
  };

  return (
    <Screen>
      <AppText>
        Adauga: {route.params.procedure_title} {"\n"}la Articolul:{" "}
        {route.params.item_title}
      </AppText>
      <AppImagePicker
        images={images}
        onChangeImages={setImages}
        namePrefix={`in_order_${route.params.order_id}_item_${route.params.item_title}_${route.params.procedure_title}_in`}
      />
      <AppForm
        initialValues={procedureInitialValues}
        onSubmit={(values) => handleNewProcedure(values)}
        validationSchema={validationSchema}
      >
        <AppFormDatePicker
          name="date_in"
          icon="calendar"
          placeholder="Data de intrare"
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
          {"\n"} Instructiuni pentru pret:{" "}
          {route.params.price_instructions || ""}
          {"\n"} Factorul de dimensiune: {route.params.size_factor}
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

const styles = StyleSheet.create({});

export default NewProcedureScreen;
//aici ajungi dupa procedure pick screen, unde practic alegi din lista filtrata dupa category un id de procedura
