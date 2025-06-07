// Import React and necessary components from React Native

import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Chat screen components props from react navigation
const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

  //useEffect hook to set screen title to users name when the component starts
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    //returns container with background color chosen by user
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/*Placeholder for chat screen */}
      <Text style={styles.titleText}>Chat</Text>
    </View>
  );
};

//Styling for Chat view
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // styling for pkaceholder
  titleText: {
    fontSize: 32,
    color: "red",
  },
});

export default Chat;
