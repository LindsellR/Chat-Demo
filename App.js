import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//Import react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Create the Navigator
const Stack = createNativeStackNavigator();

// Main App component setting up navigation between Start and Chat screens
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
