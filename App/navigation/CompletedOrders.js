import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompletedOrdersScreen from "../screens/CompletedOrders/CompletedOrdersScreen";
import CompletedOrderDetailsScreen from "../screens/CompletedOrders/CompletedOrderDetailsScrenn";
import CompletedItemsDetailsScreen from "../screens/CompletedOrders/CompletedItemsDetailsScreen";
import CompletedProcedureScreen from "../screens/CompletedOrders/CompletedProcedureScreen";

const Stack = createStackNavigator();
function CompletedOrdersNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Completed Orders Screen"
        component={CompletedOrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Completed Order Details Screen"
        component={CompletedOrderDetailsScreen}
        options={{ title: "Detalii comandă completă" }}
      />
      <Stack.Screen
        name="Completed Item Details Screen"
        component={CompletedItemsDetailsScreen}
        options={{ title: "Detalii articol completat" }}
      />
      <Stack.Screen
        name="Completed Procedure Screen"
        component={CompletedProcedureScreen}
        options={{ title: "Detalii Procedura Finalizata" }}
      />
    </Stack.Navigator>
  );
}
export default CompletedOrdersNavigator;
