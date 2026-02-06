import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

function LogInNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen
        name="RegisterNewAccount"
        component={RegisterScreen}
        options={{ headerShown: true, title: " Inregistrare cont nou" }}
      />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}

export default LogInNavigator;
