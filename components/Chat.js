//Chat,js - The chat screen will eventually display the chat conversation, with an input field and submit button. It will also provide users with the ability to send images and location data that will be stored offline and online.

import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

// Chat screen components props from react navigation. The navigation is set in start.js to navigate her. The route prop sets the parameters for what will be displayed (In this case the  users name at the top of the screen and the background color  chosen by the user).
const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

  //useEffect hook sets the screen title to users name by using the navigation.setOptions method
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    //returns container with background color chosen by user
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {/*Placeholder for future chat UI component, where the chat converstion, input field and submit button will eventually display */}
      <Text style={styles.titleText}>Chat</Text>
    </View>
  );
};

//Styling for Chat view
const styles = StyleSheet.create({
  container: {
    flex: 1, //Takes up full height and width of screen
    justifyContent: "center",
    alignItems: "center",
  },
  // styling for placeholder text.
  titleText: {
    fontSize: 32,
    color: "red",
  },
});

export default Chat;
