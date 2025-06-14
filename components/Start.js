//Start.js - The start screen is where users will enter their name to join in the chat, choose a background color for their chat screen, and enter the chat.

import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

// The `navigation` prop from React Navigation is being used to navigate to the Chat screen and pass data (name and background color).
const Start = ({navigation}) => {
  
  const [name, setName] = useState(""); // Users name input

  const [bgColor, setBgColor] = useState("#FFFFFF"); //Selected chat background color

  const image = require("../assets/Bgnd_Image.png"); //Background image for start screen

  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"]; //Preset color options

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.titleText}>Chat App</Text> {/*working title for app*/}

        {/* Form section: includes name input, color options, and start button */}
        <View style={styles.whiteBox}>

          <View style={styles.inputWrapper}>
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
            />
          </View>

          {/*Select a background color*/}
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
          {/*Navigate to chat screen passing name and setting background color*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name,
                bgColor: bgColor,
              })
            }
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
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
    paddingVertical: "6%", //vertical spacing
  },
  //Title style.
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
