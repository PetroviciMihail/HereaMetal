import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import FormErrorMessage from "./FormErrorMessage";

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name]}
        {...otherProps}
        // autoCapitalize="none"
        // autoCorrect={false}
        // icon=
        // keyboardType=
        // placeholder=
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
