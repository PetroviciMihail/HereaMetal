import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrdersNavigator from "./OrdersNavigator";
import ProceduresNavigator from "./ProceduresNavigator";
import AccountNavigator from "./AccountNavigator";
import CompletedOrdersNavigator from "./CompletedOrders";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          title: "Lucrări curente",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Procedures"
        component={ProceduresNavigator}
        options={{
          title: "Proceduri",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="archive-cog"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Competed Orders"
        component={CompletedOrdersNavigator}
        options={{
          title: "Lucrări termiante",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper-check"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          title: "Cont",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-hard-hat"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default AppNavigator;
