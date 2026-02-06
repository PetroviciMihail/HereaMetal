import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import authEvents from "../network/authEvent";

export default function AuthListener() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = authEvents.onLogout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
    });

    return unsubscribe;
  }, []);

  return null; // NU afișează nimic
}
