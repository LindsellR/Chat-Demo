import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
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

const App = () => {
    const connectionStatus = useNetInfo();
const firebaseConfig = {
  apiKey: "AIzaSyBY0wHELz0hT2UGfi5hxvu4vMS1YJJR7KE",
  authDomain: "chatapp-8d2ea.firebaseapp.com",
  projectId: "chatapp-8d2ea",
  storageBucket: "chatapp-8d2ea.appspot.com",
  messagingSenderId: "63967366703",
  appId: "1:63967366703:web:f6017b3dcb3e9d431700da",
};

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app, "gs://chatapp-8d2ea.firebasestorage.app")

// Main App component setting up navigation between Start and Chat screens

return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Chat">
        {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} storage = {storage} {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default App;