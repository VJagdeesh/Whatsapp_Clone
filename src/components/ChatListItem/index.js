import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime);
const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const userItem = chat.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  // const user = chat.users.items[0].user;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Chat", { id: chat.id, name: user?.name });
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
          {chat.LastMessage && (
            <Text style={styles.subTitle}>
              {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>
        <Text numberOfLines={1} style={styles.subTitle}>
          {chat.LastMessage?.text}
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
