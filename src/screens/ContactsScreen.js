import { FlatList } from "react-native";
import React from "react";
import chats from "../../assets/data/chats.json";
import ContactListItem from "../components/ContactListItem";

export default function ContactsScreen() {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ContactListItem user={item.user} />}
    />
  );
}
