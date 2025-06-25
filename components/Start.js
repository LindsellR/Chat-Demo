

//Start.js - The start screen is where users will enter their name to join in the chat, choose a background color for their chat screen, and enter the chat.

import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";


// The navigation prop from React Navigation - used to navigate to the Chat screen and pass data (name and background color).
const Start = ({ navigation }) => {
  console.log("App received in Start.js:");
  const auth = getAuth();
  console.log("Rendering Start component, auth =", auth);

  const [name, setName] = useState(""); // Users name input
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Selected chat background color

  const image = require("../assets/Bgnd_Image.png"); // Background image for start screen
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"]; //Preset color options

    /**
   * Signs the user in anonymously using Firebase Auth
   * and navigates to the Chat screen with their selected preferences.
   */
  const signInUser = () => {
    if (!name.trim()) {
      Alert.alert("Please enter your name before starting the chat.");
      return;
    }
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          bgColor: bgColor,
        });
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in. Error", error);
      });
  };

  

  return (

    <KeyboardAvoidingView
      //Preventing keyboard from covering inputs on start screen for ios
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* Working title for app */}
        <Text style={styles.titleText}>Chat App</Text>

        {/* Form section: includes name input, color options, and chat button  */}
        <View style={styles.whiteBox}>
          <View style={styles.inputWrapper}>
            {/* Name input with icon */}
            <Image
              source={require("../assets/icon2.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter Your Name"
              placeholderTextColor="rgba(117, 112, 131, 0.5)"
              accessibilityLabel="Enter Your Name"
              accessibilityHint="Your name will be shown in the chat"
            />
          </View>


          {/* Background Color Selection */}

          <View style={styles.colorSection}>
            <Text style={styles.colorLabel}>Choose Background Color</Text>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setBgColor(color)}
                  style={[
                    styles.colorOuterCircle,
                    bgColor === color && styles.selectedOuterCircle,
                  ]}
                >
                  <View
                    style={[
                      styles.colorInnerCircle,
                      { backgroundColor: color },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* Start Chat button that navigates to the Chat screen */}
          <TouchableOpacity
            style={styles.button}
            onPress={signInUser}
            accessible={true}
            accessibilityLabel="Start chatting"
            accessibilityHint="Navigates to the chat screen"
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  image: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "6%",
  },

  //Title style

  titleText: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 50,
  },

  // Parent container for input text color picker and start chat button.
  whiteBox: {
    backgroundColor: "#FFFFFF",
    width: "88%",
    height: "44%",
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 3,
    width: "88%",
  },

  //Icon for textInput
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: "contain",
  },

  //textInput
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "300",
    paddingVertical: 15,
  },

  //Background color selection
  colorSection: {
    width: "88%",
    alignSelf: "center",
    marginTop: 10,
  },

  colorLabel: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
  },

  colorOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 15,
    marginBottom: 10,
  },
  //Outer circle for each color option (Border and spacing)
  colorOuterCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  // Border and spacing displays when user selects color
  selectedOuterCircle: {
    borderWidth: 2,
    borderColor: "#5F5F5F", // outer ring color
    backgroundColor: "#FFFFFF", // the white rim
  },
  //Inner circle for each color option
  colorInnerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Start Chat Button
  button: {
    backgroundColor: "#757083",
    width: "88%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default Start;