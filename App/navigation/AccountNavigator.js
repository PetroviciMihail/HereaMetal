import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/Account/AccountScreen";
import AdminProceduresScreen from "../screens/Account/AdminProceduresScreen";
import AdminNewProcedureScreen from "../screens/Account/AdminNewProcedureScreen";
import AdminEditProcedureScreen from "../screens/Account/AdminEditProcedureScreen";
import UsersScreen from "../screens/Account/UsersScreen";
import UserDetailsScreen from "../screens/Account/UserDatailsScreen";

const Stack = createStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account screen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin Procedures Screen"
        component={AdminProceduresScreen}
        options={{ title: "Administrare proceduri" }}
      />
      <Stack.Screen
        name="Admin New Procedure Screen"
        component={AdminNewProcedureScreen}
        options={{ title: "Procedura noua" }}
      />
      <Stack.Screen
        name="Admin Edit Procedure Screen"
        component={AdminEditProcedureScreen}
        options={{ title: "Vizualizare/ editare procedura" }}
      />
      <Stack.Screen
        name="Users Screen"
        component={UsersScreen}
        options={{ title: "Administrare Utilizatori" }}
      />
      <Stack.Screen
        name="User Details Screen"
        component={UserDetailsScreen}
        options={{ title: "Detalii utilizator" }}
      />
    </Stack.Navigator>
  );
}
export default AccountNavigator;
