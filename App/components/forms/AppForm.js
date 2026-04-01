import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  style,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {/* {() => <View style={style}>{children}</View>} */}
      {(formikProps) => (
        <View style={style}>
          {typeof children === "function" ? children(formikProps) : children}
        </View>
      )}
    </Formik>
  );
}

export default AppForm;
