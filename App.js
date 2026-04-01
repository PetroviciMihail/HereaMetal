import "./gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import LogInNavigator from "./App/navigation/LogInNavigator";
import navigationTheme from "./App/navigation/navigationTheme";
import AuthListener from "./App/navigation/AuthListener";

const linking = {
  prefixes: [],
  // config: {
  //   screens: {
  //     Home: "",
  //     Orders: "orders",
  //     Profile: "profile",
  //   },
  //},
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <AuthListener />
      <LogInNavigator />
    </NavigationContainer>
  );
}
