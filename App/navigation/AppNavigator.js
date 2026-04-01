import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OrdersNavigator from "./OrdersNavigator";
import ProceduresNavigator from "./ProceduresNavigator";
import AccountNavigator from "./AccountNavigator";
import CompletedOrdersNavigator from "./CompletedOrders";
import { Platform, Text } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            height: 70,
          },

          Platform.OS === "web" && {
            maxWidth: 900,
            width: "100%",
            alignSelf: "center",
          },
        ],
        tabBarLabel: ({ children, focused }) => (
          <AppText
            style={[
              {
                fontSize: 14,
                textAlign: "center",
              },
              focused && {
                color: colors.errorRed,
              },
              Platform.OS === "web" && {
                fontSize: 24,
              },
            ]}
            numberOfLines={2}
          >
            {children}
          </AppText>
        ),
      }}
    >
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
          title: "Lucrări terminate",
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
