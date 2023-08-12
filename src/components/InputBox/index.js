import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, graphqlOperation, API } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
export default function InputBox({ chatroom }) {
  const [text, setText] = useState("");
  const onSend = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const newMessage = {
      chatroomID: chatroom.id,
      text,
      userID: authUser.attributes.sub,
    };
    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessage })
    );
    setText("");
    console.warn(chatroom);
    // set the new message as last
    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          _version: chatroom._version,
          chatRoomLastMessageId: newMessageData.data.createMessage.id,
          id: chatroom.id,
        },
      })
    );
  };
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      {/* Plus icon */}
      <AntDesign name="plus" size={20} color="royalblue" />

      {/* TextInput */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
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
    </SafeAreaView>
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
