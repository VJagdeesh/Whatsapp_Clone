import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { onUpdateChatRoom } from "../../graphql/subscriptions";
dayjs.extend(relativeTime);
const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRoom, setChatRoom] = useState(chat);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chatRoom.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chat.id } } })
    ).subscribe({
      next: ({ value }) => {
        setChatRoom((cr) => ({
          ...(cr || {}),
          ...value.data.onUpdateChatRoom,
        }));
      },
      error: (err) => console.warn(err),
    });
    return () => subscription.unsubscribe();
  }, []);

  // const user = chat.users.items[0].user;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Chat", { id: chatRoom.id, name: user?.name });
      }}
      style={styles.container}
    >
      <Image
        source={{
          uri: user?.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>
          {chatRoom.LastMessage && (
            <Text style={styles.subTitle}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text numberOfLines={1} style={styles.subTitle}>
          {chatRoom.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: { flexDirection: "row", marginBottom: 5 },
  name: { flex: 1, fontWeight: "bold" },
  subTitle: {
    color: "grey",
  },
});
