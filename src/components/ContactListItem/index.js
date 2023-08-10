import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const ContactListItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // navigation.navigate("Chat", { id: chat.id, name: chat.user.name });
      }}
      style={styles.container}
    >
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
          {user.status}
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
});
