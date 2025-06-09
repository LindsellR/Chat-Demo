//Start.js - The start screen is where users will enter their name to join in the chat, choose a background color for their chat screen, and enter the chat via a "Start Chat button".

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

//  Start screen component functionality. This is the user entry point where the user enters their name and background color choice. When they navigate to the app, these valuse (name, bgColor ) are passed in as parameters.
const Start = ({navigation}) => {
  //State to store users name (used to store and display the users name in the Chat.js UI)
  const [name, setName] = useState("");

  //State to store background color (and display in Chat.js UI)
  const [bgColor, setBgColor] = useState("#FFFFFF");

  //This is the backgound image from Assets folder displayed on the start screen (Located in root directory)
  const image = require("../assets/Bgnd_Image.png");

  //This is the colors array available for the user chosen background color
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <View style={styles.container}>

      {/*Background image on start screen */}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

        {/* App Title - This is a working title and depending on where it is to be used in the app, could be moved to a separate text component*/}
        <Text style={styles.titleText}>Chat App</Text>

        {/*White background container on start page. This is the background of the container that holds the form for text input, color picker and start chat button*/}
        <View style={styles.whiteBox}>

          {/*Username input field with icon. When the user inputs their name, the text is stored in local state and displayed at the top of the chat.js*/}
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

          {/*Background Color Picker section - the user selects one of the pre-defined color options which is then passed as a prop to the chat screen*/}
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
          {/*Button to navigate to chat screen. This passes the usersname and selected bground color as navigation parameters to display on the chat screen. Using TouchableOpacity instead of Button for more styling options*/}
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

//Define styling for all sections of start screen
const styles = StyleSheet.create({
  container: {
    flex: 1, //Fill entire screen
  },

  image: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "6%", //vertical spacing
  },
  //Title style and positioning
  titleText: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 50,
  },

  // Parent container holding input text color picker and start chat button.
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
  //Outer circlefor each color option (Border and spacing)
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
  //Inner filled color sample circle
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
