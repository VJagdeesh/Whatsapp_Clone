import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
dayjs.extend(relativeTime);
export default function Message({ message }) {
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      // alert(message.userID);

      setIsMe(message.userID === authUser.attributes.sub);
    };
    isMyMessage();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          alignSelf: isMe ? "flex-end" : "flex-start",
          backgroundColor: isMe ? "#DCF8C5" : "white",
        },
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
  time: {
    color: "grey",
    alignSelf: "flex-end",
  },
});
