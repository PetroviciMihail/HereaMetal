import { useFormikContext } from "formik";
import React from "react";
import FormErrorMessage from "./FormErrorMessage";
import AppDatePicker from "../AppDatePicker";

function AppFormDatePicker({ name, placeholder, icon, style }) {
  const { errors, setFieldValue, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <>
      <AppDatePicker
        onSelectValue={(item) => {
          setFieldValue(name, item);
          setFieldTouched(name, true);
          console.log(item);
          console.log("din set field cu item din appdatePicker");
        }}
        value={values[name]}
        icon={icon}
        style={style}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormDatePicker;
