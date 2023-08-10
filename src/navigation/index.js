import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ChatScreen from "../screens/ChatScreen";
import ChatsScreen from "../screens/ChatsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import ContactsScreen from "../screens/ContactsScreen";
export default function Navigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
