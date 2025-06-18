// Chat.js

// This screen displays the chat interface. It receives the user's name and selected background color from the Start screen and renders the GiftedChat UI.
// The user can send and receive messages, with system messages and user messages shown in different styles.



import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";

import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";

// React Navigation props.
// route.params: includes the user's name and selected background color passed from Start.js, and userID
// navigation: used to update the screen title dynamically.

const Chat = ({ route, navigation, db }) => {
  const { name, bgColor, userID } = route.params;

  const [messages, setMessages] = useState([]);

  // Add a new message to Firestore
  const onSend = async (newMessages) => {
    try {
      await addDoc(collection(db, "messages"), newMessages[0]);
    } catch(error) {
            Alert.alert("Error sending message,. Please try again later");
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        });
      });
      setMessages(newMessages);
    });
    return () => {
       unsubMessages();
    };
  }, []);


  //Custom chat bubble appearance
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>

      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
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
