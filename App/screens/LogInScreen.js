import React, { useEffect } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { checkJWT, logIn } from "../network/users";
import * as SecureStore from "expo-secure-store";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(5).label("Nume"),
  password: Yup.string().required().min(5).label("Parola"),
});

function LogInScreen({ navigation }) {
  //
  const [logedinName, setLogedinName] = React.useState("");

  async function checkLoggedIn() {
    const token = await SecureStore.getItemAsync("jwt_token");
    const name = await SecureStore.getItemAsync("user_name");
    console.log("set name  " + name);
    setLogedinName(name);
    //setTimeout(()=>{});
    if (!token || !name) {
      return false; // nu există date → trebuie login
    }

    // faci un request mic la backend, de obicei un route /me protejat
    const [response, err] = await checkJWT();
    if (err) {
      //console.log("eroare de la jwt");
      await SecureStore.deleteItemAsync("jwt_token");
      return false;
    } else if (response.status == 200) {
      navigation.replace("App");
      console.log("mai trece pe aici dupa navigation");
      return true; // token valid
    }
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const handleRegister = () => {
    navigation.push("RegisterNewAccount");
  };

  const handleSignIn = async (values) => {
    console.log("cineva ceva?");
    const [response, err] = await logIn(values);

    if (err) {
      Alert.alert("Eroare la intrarea in cont: ", err);
    } else if (response.status == 200) {
      navigation.replace("App");
    }
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Herea Metal {"\n"}evidenta lucrarilor</Text>

      <AppForm
        initialValues={{ name: logedinName, password: "" }}
        onSubmit={(values) => handleSignIn(values)}
        enableReinitialize
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          placeholder="Nume"
          name="name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Parola"
          name="password"
          secureTextEntry
        />
        <SubmitButton title="Intra in cont" />
      </AppForm>
      <AppButton
        style={{ backgroundColor: colors.buttonBackGroundSecondary }}
        title="Inregistrare cont nou"
        onPress={() => handleRegister()}
      />
      <View style={styles.buttonContainer}></View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    //alignItems: "center",
  },
  buttonContainer: {
    paddingTop: 50,
  },
  title: {
    padding: 70,
    fontWeight: "400",
    fontSize: 25,
    textAlign: "center",
    textShadowColor: colors.gray,
    textShadowOffset: { width: 2, height: -2 },
    textShadowRadius: 2,
  },
});
export default LogInScreen;
