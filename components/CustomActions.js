import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  // Show action sheet with options to pick image, take photo, or send location
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            await pickImage();
            return;
          case 1:
            await takePhoto();
            return;
          case 2:
            await getLocation();
            return;
          default:
        }
      }
    );
  };

  // Upload image to Firebase Storage and send message with image URL
  const uploadAndSendImage = async (imageURI, userID, storage) => {
    try {
      const uniqueRefString = generateReference(imageURI); // Create unique path
      const newUploadRef = ref(storage, uniqueRefString);

      const response = await fetch(imageURI);
      let blob = await response.blob();

      // If blob type is missing, set a fallback content type
      if (!blob.type || blob.type === "") {
        blob = blob.slice(0, blob.size, "image/jpeg");
      }

      const metadata = { contentType: blob.type };

      const snapshot = await uploadBytes(newUploadRef, blob, metadata);
      const imageURL = await getDownloadURL(snapshot.ref);

      // Send image as a chat message
      onSend([
        {
          _id: Date.now(),
          createdAt: new Date(),
          user: { _id: userID },
          image: imageURL,
        },
      ]);
    } catch (error) {
      console.error("Image upload error at step:", error);
      Alert.alert("Upload failed", error.message);
    }
  };

  // Open image picker to select image from photo library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissions?.granted) {
      Alert.alert("Media library access denied.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      await uploadAndSendImage(result.assets[0].uri, userID, storage);
    } else {
      Alert.alert("No image selected.");
    }
  };

  // Open camera to take a new photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissions?.granted) {
      Alert.alert("Camera access denied.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      await uploadAndSendImage(result.assets[0].uri, userID, storage);
    }
  };

  // Get device's current location and send as a message
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (!permissions?.granted) {
      Alert.alert("Location access denied.");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([
        {
          _id: Date.now(),
          createdAt: new Date(),
          user: {
            _id: userID,
            name: "User",
          },
          text: "",
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
      ]);
    } else {
      Alert.alert("Error occurred while fetching location");
    }
  };

  // Create a unique reference for each uploaded image using timestamp and image name
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // Renders the "+" button to trigger the action sheet
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="Tap Me!"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

// Styles for the "+" button container
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
