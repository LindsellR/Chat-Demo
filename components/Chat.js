//Chat,js - The chat screen will eventually display the chat conversation, with an input field and submit button. It will also provide users with the ability to send images and location data that will be stored offline and online.

import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// Chat screen components props from react navigation. The navigation is set in start.js to navigate here. The route prop sets the parameters for what will be displayed (In this case the  users name at the top of the screen and the background color  chosen by the user).
const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  
  };
   useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);
  
  const renderBubble = (props) => {
   return <Bubble
     {...props}
     wrapperStyle={{
       right: {
         backgroundColor: "#000"
       },
       left: {
         backgroundColor: "#FFF"
       }
     }}
   />
 }
  //useEffect hook sets the screen title to users name by using the navigation.setOptions method
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    //returns container with background color chosen by user
    <View style={[styles.container, { backgroundColor: bgColor }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? 
          <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
};

//Styling for Chat view
const styles = StyleSheet.create({
  container: {
    flex: 1, //Takes up full height and width of screen
  },
});

export default Chat;
