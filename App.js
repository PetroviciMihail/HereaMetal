import "./gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import LogInNavigator from "./App/navigation/LogInNavigator";
import navigationTheme from "./App/navigation/navigationTheme";
import AuthListener from "./App/navigation/AuthListener";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthListener />
      <LogInNavigator />
    </NavigationContainer>
  );
}
