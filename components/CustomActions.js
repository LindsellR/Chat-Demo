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

  const uploadAndSendImage = async (imageURI, userID, storage) => {
    try {
      console.log("Current user ID:", userID);
      console.log("Uploading image URI:", imageURI);

      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      console.log("Generated storage ref string:", uniqueRefString);
      console.log("Created Firebase Storage ref:", newUploadRef.fullPath);

      console.log("Starting fetch...");
      const response = await fetch(imageURI);
      console.log("Fetch completed. Status:", response.status);

      let blob = await response.blob();
      console.log("Converting fetch response to blob...");
      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);

      // Fallback: force content type if missing
      if (!blob.type || blob.type === "") {
        blob = blob.slice(0, blob.size, "image/jpeg");
        console.log("Fixed blob type to image/jpeg");
      }

      const metadata = {
        contentType: blob.type,
      };

      console.log("Uploading blob to Firebase Storage...");
      const snapshot = await uploadBytes(newUploadRef, blob, metadata);

      const imageURL = await getDownloadURL(snapshot.ref);
      console.log("Upload successful. Image URL:", imageURL);

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

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri, userID, storage);
      } else {
        Alert.alert("No image selected.");
      }
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        await uploadAndSendImage(result.assets[0].uri, userID, storage);
      } else {
        Alert.alert("Permissions haven't been granted.");
      }
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      console.log("Location to send:", {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
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
      } else Alert.alert("Error occurred while fetching location");
    } else Alert.alert("Permissions haven't been granted.");
  };

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

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
