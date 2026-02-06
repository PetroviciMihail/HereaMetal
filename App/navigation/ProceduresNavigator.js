import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProceduresScreen from "../screens/Procedures/ProceduresScreen";
import ItemDetailsScreen from "../screens/Orders/ItemDetailsScreen";
import ProceduresPickScreen from "../screens/Orders/ProceduresPickScreen";
import NewProcedureScreen from "../screens/Orders/NewProcedureScreen";
import ProcedureDetailsFinishScreen from "../screens/Orders/ProcedureDetailsFinishScreen";
import FinishedProcedureScreen from "../screens/Orders/FinishedProcedureScreen";

const Stack = createStackNavigator();

function ProceduresNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Procedures Screen"
        options={{ headerShown: false }}
        component={ProceduresScreen}
      />
      <Stack.Screen
        name="Item Details Screen"
        component={ItemDetailsScreen}
        options={{ title: "Detalii articol" }}
      />
      <Stack.Screen
        name="Procedure Titles Pick Screen"
        component={ProceduresPickScreen}
        options={{ title: "Alege procedura dorita" }}
      />
      <Stack.Screen
        name="New Procedure Screen"
        component={NewProcedureScreen}
        options={{ title: "Adauga detaliile" }}
      />
      <Stack.Screen
        name="Procedure Details Finish Screen"
        component={ProcedureDetailsFinishScreen}
        options={{ title: "Detalii Procedura" }}
      />
      <Stack.Screen
        name="Finished Procedure Screen"
        component={FinishedProcedureScreen}
        options={{ title: "Detalii Procedura Finalizata" }}
      />
    </Stack.Navigator>
  );
}
export default ProceduresNavigator;
