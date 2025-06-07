// Import React and necessary components from React Native
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

//  Start screen component functionality
const Start = ({ navigation }) => {
  //State to store users name
  const [name, setName] = useState("");

  //State to store background color
  const [bgColor, setBgColor] = useState("#FFFFFF");

  //Load backgound image from Assets folder in root
  const image = require("../A5-chatapp-assets/Bgnd_Image.png");

  //Colors array for user chosen background color
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  return (
    <View style={styles.container}>
      {/*Background image on start screen */}
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* App Title*/}
        <Text style={styles.titleText}>Chat App</Text>
        {/*White background container on start page for text input, color picker and start chat button*/}
        <View style={styles.whiteBox}>
          {/*Username input field with icon*/}
          <View style={styles.inputWrapper}>
            <Image
              source={require("../A5-chatapp-assets/icon.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your Name"
            />
          </View>

          {/*Background Color Picker section*/}
          <View style={styles.colorSection}>
            <Text style={styles.colorLabel}>Choose Background Color</Text>
            <View style={styles.colorOptions}>
              {/*Mapping Color array and setting user picked background color*/}
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
          {/*Button to navigate to chat screen with selected name and bground color using TouchableOpacity for more styling options*/}
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
