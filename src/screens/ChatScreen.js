import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import bg from "../../assets/images/BG.png";
import Message from "../components/Message";
import messages from "../../assets//data/messages.json";
import InputBox from "../components/InputBox";
import { useNavigation, useRoute } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import { getChatRoom, listMessagesByChatRoom } from "../graphql/queries";
export default function ChatScreen() {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route);
  const chatroomID = route.params.id;
  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => {
        setChatRoom(result.data.getChatRoom);
        // setMessages(result.data?.getChatRoom?.Messages?.items);
      }
    );
  }, [chatroomID]);

  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID,
        sortDirection: "ASC",
      })
    ).then((result) => {
      setMessages(result.data.listMessagesByChatRoom.items);
    });
  }, [chatroomID]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  console.log(chatRoom);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.bg}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
