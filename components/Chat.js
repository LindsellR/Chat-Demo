// Chat.js

// This screen displays the chat interface. It receives the user's name and selected background color from the Start screen and renders the GiftedChat UI.
// The user can send and receive messages, with system messages and user messages shown in different styles.



import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";

// React Navigation props.
// route.params: includes the user's name and selected background color passed from Start.js
// navigation: used to update the screen title dynamically.


const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;

  const [messages, setMessages] = useState([]);

  // The chat appends new messages and sets previous messages in the chat history.
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Sets a default system and welcome message on initial load.
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "You have entered the chat",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

 // On mount: update the navigation header title to the user's name

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //Custom chat bubble appearance
  const renderBubble = (props) => {
   return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        },
      }}
    />;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {/*Preventing keyboard from covering input field on Android*/}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}


    </View>
  );
};

//Full-screen container styling
const styles = StyleSheet.create({
  container: {

    flex: 1, //Takes up full height and width of screen

  },
});

export default Chat;
