import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function InputBox() {
  const [newMessage, setNewMessage] = useState("");
  const onSend = () => {
    console.warn("The message is being sent is ", newMessage);
    setNewMessage("");
  };
  return (
    <View style={styles.container}>
      {/* Plus icon */}
      <AntDesign name="plus" size={20} color="royalblue" />

      {/* TextInput */}
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Write your message ...."
      />

      {/* Send Icon */}
      <MaterialIcons
        onPress={onSend}
        style={styles.send}
        name="send"
        size={20}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    overflow: "hidden",
    borderRadius: 15,
  },
});
