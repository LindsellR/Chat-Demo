import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//Import react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";

//Create the Navigator
const Stack = createNativeStackNavigator();

// Firebase config object (do not expose outside this file in production)
const App = () => {
  const connectionStatus = useNetInfo();
  const firebaseConfig = {
  //Your firebase config goes here
  };


  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore (to store chat messages)
  const db = getFirestore(app);

  // Initialize Firebase Storage (used to store images sent in chat)
  const storage = getStorage(app, /*your firebase storage link goes here*/);

  useEffect(() => {
    // Enable/disable Firestore network based on internet connectivity (for offline support or caching)
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);


  // Main App component setting up navigation between Start and Chat screens

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
