import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { registerNewUser } from "../network/users";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(5).label("Nume"),
  email: Yup.string().min(10).email().label("Email"),
  password: Yup.string().required().min(5).label("Parola"),
  confirmPassword: Yup.string()
    .required()
    .label("Confirmarea parolei")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function RegisterScreen({ navigation }) {
  const handleSignUp = async (values) => {
    const response = await registerNewUser(values);

    console.log(response);
    if (response.status == 201) navigation.pop();
  };

  return (
    <Screen>
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => handleSignUp(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          placeholder="Nume"
          name="name"
        />
        <AppFormField
          autoCorrect={false}
          icon="email"
          placeholder="Email"
          name="email"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Parola"
          name="password"
          secureTextEntry
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-check"
          placeholder="Confirma Parola"
          name="confirmPassword"
          secureTextEntry
        />
        <SubmitButton title="Inregistrare" />
      </AppForm>
      <View style={styles.buttonContainer}></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 50,
  },
});

export default RegisterScreen;
