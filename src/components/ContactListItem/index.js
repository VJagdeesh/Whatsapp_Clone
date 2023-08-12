import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";
dayjs.extend(relativeTime);
const ContactListItem = ({ user }) => {
  const navigation = useNavigation();
  const onPress = async () => {
    console.warn("Clicked");

    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.id });
      return;
    }

    // Create a new chat room
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );
    console.warn(newChatRoomData);
    if (!newChatRoomData.data.createChatRoom) {
      console.log("Error occured during creating chat");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;
    // // Add the clicked user to ChatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: user.id },
      })
    );

    // Add the auth user to ChatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub },
      })
    );

    // Navigate to Chat
    navigation.navigate("Chat", { id: newChatRoom.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <Text style={styles.subTitle} numberOfLines={1}>
          {user.satus}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 5,
    height: 70,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  row: { flexDirection: "row", marginBottom: 5 },
  name: { fontWeight: "bold" },
  subTitle: {
    color: "grey",
  },
  content: {
    flex: 1,
  },
});
