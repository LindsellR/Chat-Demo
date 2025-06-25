// Chat.js

// This screen displays the chat interface. It receives the user's name and selected background color from the Start screen and renders the GiftedChat UI.
// The user can send and receive messages, with system messages and user messages shown in different styles.
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

import CustomActions from "./CustomActions";

// React Navigation props.
// route.params: includes the user's name and selected background color passed from Start.js, and userID
// navigation: used to update the screen title dynamically.

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, bgColor, userID: routeUserID } = route.params;
  const [userID, setUserID] = useState(routeUserID || null);

  // Attempt fallback to retrieve userID from Firebase Auth if not passed via route
  useEffect(() => {
    if (!userID) {
      try {
        const auth = getAuth();
        const currentUID = auth.currentUser?.uid;
        if (currentUID) {
          setUserID(currentUID);
          console.log("Fallback userID from Firebase Auth:", currentUID);
        } else {
          console.warn("No authenticated user found in Firebase.");
        }
      } catch (err) {
        console.error("Error getting userID from Firebase Auth:", err);
      }
    }
  }, []);

  const [messages, setMessages] = useState([]);

  let unsubMessages;

  // Cache messages to AsyncStorage for offline support
  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Load cached messages from AsyncStorage when offline
  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem("messages");
      setMessages(JSON.parse(cachedMessages));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Add a new message to Firestore
  const onSend = (newMessages) => {
    try {
      addDoc(collection(db, "messages"), newMessages[0]);
    } catch (error) {
      Alert.alert("Error sending message,. Please try again later");
    }
  };
  // Customizes appearance of message bubbles
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

  // Disable the input toolbar when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // Set the screen title and handle message sync with Firestore
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //clean up firestore listener on unmount
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // Renders the "+" button and its options
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        storage={storage}
        userID={userID}
        onSend={onSend}
        {...props}
      />
    );
  };

  // If the message includes location data, show a map preview
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      console.log("Custom view message:", currentMessage);
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          initialRegion={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
            }}
          />
        </MapView>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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
