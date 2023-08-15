import { Text, FlatList } from "react-native";
import chats from "../../assets/data/chats.json";
import ChatListItem from "../components/ChatListItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listChatRooms } from "./querries";
import { useEffect, useState } from "react";
export default function ChatsScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );
      // console.warn(response.data.getUser.ChatRooms.items);
      const rooms = response.data.getUser.ChatRooms.items;
      const sortedRooms = rooms.sort(
        (r1, r2) =>
          new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
      );
      setChatRooms(sortedRooms);
    };
    fetchChatRooms();
  }, []);
  return (
    <FlatList
      data={chatRooms}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
      style={{ backgroundColor: "white" }}
    />
  );
}
