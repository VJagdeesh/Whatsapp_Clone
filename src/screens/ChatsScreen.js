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
      setChatRooms(response.data.getUser.ChatRooms.items);
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
