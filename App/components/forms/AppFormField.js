import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import FormErrorMessage from "./FormErrorMessage";
import AppText from "../AppText";
import colors from "../../config/colors";

function AppFormField({ name, submitOnEnter, ...otherProps }) {
  const {
    setFieldTouched,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <AppText style={{ fontSize: 20, marginTop: 7, marginBottom: -6 }}>
        {"    "}
        {otherProps.placeholder}
      </AppText>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name]}
        returnKeyType={submitOnEnter ? "done" : "next"}
        onSubmitEditing={submitOnEnter ? handleSubmit : undefined}
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
