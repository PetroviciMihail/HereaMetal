import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen from "../screens/Orders/OrdersScreen";
import NewClientScreen from "../screens/Orders/NewClientScreen";
import NewOrderScreen from "../screens/Orders/NewOrderScreen";
import ClientsScreen from "../screens/Orders/ClientsScreen";
import OrderDetailsScreen from "../screens/Orders/OrderDetailsScreen";
import NewItemScreen from "../screens/Orders/NewItemScreen";
import ItemDetailsScreen from "../screens/Orders/ItemDetailsScreen";
import ProceduresPickScreen from "../screens/Orders/ProceduresPickScreen";
import NewProcedureScreen from "../screens/Orders/NewProcedureScreen";
import ProcedureDetailsFinishScreen from "../screens/Orders/ProcedureDetailsFinishScreen";
import FinishedProcedureScreen from "../screens/Orders/FinishedProcedureScreen";

const Stack = createStackNavigator();

function OrdersNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders Screen"
        component={OrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order Details Screen"
        component={OrderDetailsScreen}
        options={{ title: "Detalii comanda" }}
      />
      <Stack.Screen
        name="Clients Screen"
        component={ClientsScreen}
        options={{ title: "Comanda noua: Client" }}
      />
      <Stack.Screen
        name="New Client Screen"
        component={NewClientScreen}
        options={{ title: "Comanda noua: Client nou" }}
      />
      <Stack.Screen
        name="New Order Screen"
        component={NewOrderScreen}
        options={{ title: "Comanda noua: Detalii Comanda" }}
      />
      <Stack.Screen
        name="New Item Screen"
        component={NewItemScreen}
        options={{ title: "Adauga un articol nou la comanda" }}
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

export default OrdersNavigator;
