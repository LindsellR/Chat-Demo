// Chat.js
// This screen displays the chat interface. It receives the user's name and selected background color from the Start screen and will eventually support chat messages, image uploads, and location sharing.

import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Chat screen components props from react navigation. 
// route.params: contains data passed from the Start screen (user's name and background color).
// navigation: used to update the screen title dynamically.

const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

 // On mount: update the navigation header title to the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      
      <Text style={styles.titleText}>Chat</Text> {/*Placeholder*/}
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
  
  titleText: {
    fontSize: 32,
    color: "red",
  },
});

export default Chat;
