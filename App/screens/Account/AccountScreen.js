import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import AppText from "../../components/AppText";
import colors from "../../config/colors";
import AppButton from "../../components/AppButton";

import { storage } from "../../config/storage";

function AccountScreen({ navigation }) {
  const handleLogOut = async () => {
    await storage.remove("jwt_token");

    navigation.replace("LogIn");
  };

  return (
    <Screen
      safeTopPadding
      footer={
        <AppButton
          title={"Iesire din cont"}
          style={{
            backgroundColor: colors.buttonBackGroundRed,
            marginTop: "auto",
            marginBottom: 20,
          }}
          onPress={() => handleLogOut()}
        />
      }
    >
      <View style={styles.container}>
        <AppText style={{ textAlign: "center", padding: 10 }}>
          Zona administrator
        </AppText>
        <AppButton
          title={"Clienti"}
          style={{ backgroundColor: colors.buttonBackGroundSecondary }}
          onPress={() => console.log("apasat")}
        />
        <AppButton
          title={"Proceduri"}
          style={{ backgroundColor: colors.buttonBackGroundSecondary }}
          onPress={() => navigation.navigate("Admin Procedures Screen")}
        />
        <AppButton
          title={"Utilizatori"}
          style={{ backgroundColor: colors.buttonBackGroundSecondary }}
          onPress={() => navigation.navigate("Users Screen")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.coldWhite,
    marginBottom: 10,
    marginTop: 30,
    padding: 5,
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default AccountScreen;
