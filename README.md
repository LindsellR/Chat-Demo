# Chat-Demo App

A mobile chat application built using **React Native**, **Expo**, and **Firebase**. It allows users to chat anonymously, send images, and share their real-time location. The app uses Firebase for authentication, cloud Firestore for message storage, and Firebase Storage for media uploads.

---

## Features

- Anonymous user sign-in via Firebase Auth (Users can also select a backgound color for the chat screen)
- Real-time messaging with Firestore
- Image selection or camera capture with upload to Firebase Storage
- Location sharing via device GPS
- Offline support and persistent chat history with AsyncStorage
- Customizable chat background colors

---

## Screens

### Start Screen
The start screen is where users will enter their name to join the chat, choose a background color for their chat screen, and enter the chat.

- Text input for user's name to sign in.
- Color selection buttons to customize chat screen background
- "Start Chatting" button to proceed to the Chat screen


### Chat Screen
This screen displays the chat interface. It receives the user's name and selected background color from the Start screen and renders the GiftedChat UI. The user can send and receive messages, with system messages and user messages shown in different styles.

- Displays the user's name in the header
- Background color reflects the user's selection

---

## Setup & Installation

### 1. Prerequisites
- **[Node.js](https://nodejs.org/)** (LTS version recommended)
- **[Expo CLI](https://docs.expo.dev/get-started/installation/)**  
- **[Firebase](https://firebase.google.com/)**
- Install via:
  (bash)
  npm install -g expo-cli

- Android Studio (for Android emulators)
- Xcode (for iOS development on macOS)
You can also use Expo Go on your mobile device for live testing.

### 2. Clone the Project

git clone https://github.com/LindsellR/Chat-Demo
cd Chat-Demo

### 3. Install Dependencies
Install all required dependencies:
(bash)
npm install

---

## Firebase Configuration

### 1. Create a Firebase Project
- Go to Firebase Console
- Create a new project

### 2. Enable Authentication 
- Click Get Started 
- Sign-in method → Anonymous → Enable

### 3. Enable Firestore Database → 
- In Firestore Overview click on Build in the left colum
- In the dropdown menu click "Firestore Database"
- Click on "Create Database"
- Click Next
- In the rules change "allow read, write: if false;" to "if true" and click publish.

### 4. Enable Firebase Storage 
- In Firebase project overview click on Build in the left column
- Click on storage in the dropdown list
- Click Upgrade project (You need to be in the blaze plan.) 
- Create a cloud billing account (Won't cost anything under 5gb)
- In the Storage View of firebase, click the Rules tab at the top of page.
- Change "allow read, write: if false;" to "if true" and click publish.
- Click the Files tab at the top of the page.
- Copy the link to your storage (Should be next to the link icon at the left of the blue UploadFiles button). It should read "gs://name-of-your-app.firebase.app".
- Go to your editor and open App.js. 
- Paste your storage link as shown. 
```
const storage = getStorage(app, "gs://paste-your-storage-link-here");
```

### 5. Add Firebase Web App
- In the Firebase overview click on the gear icon at top left of page, next to "Project Overview"
- Click on Project Settings → General → Add App → Web icon (</>)
- Fill in name (eg Chat-App) and click register to generate configuration code
- Copy your Firebase config object(const firebase.Config)

## 4. Insert Firebase Config
Open App.js in your editor, find the config and update the firebaseConfig:

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```
---

## Running the App
### 1. Start Expo
npm start

Or

npx expo start

This will launch the Expo developer tools in your browser.

### 2. Run on Emulator or Device
Scan the QR code with Expo Go (iOS/Android) after it has launched in the console

Or 

press a to launch Android emulator

Or 

press i to launch iOS simulator (macOS only)

## Project Structure
```
/assets              # Images and icons
/components
  └── Chat.js        # Main chat screen
  └── Start.js       # Welcome screen
  └── CustomActions.js # Image & location picker
App.js               # App entry point, Firebase setup, navigation
```
---

## Dependencies

The project uses the following main libraries:

react-native-gifted-chat: For the chat UI.
- firebase: For backend services including authentication, Firestore, and storage.
- expo-image-picker: To allow users to pick images from their device.
- expo-location: To access the device's location.
- @react-native-async-storage/async-storage: For local storage of messages when offline.
- react-native-maps: To display maps for location messages.
- @expo/react-native-action-sheet: To provide action sheets for selecting images or location.
Ensure all dependencies are installed by running npm install as mentioned in the installation steps

---

### Notes
Authentication is currently anonymous only. For other auth types (Google, email/password), modify the Start.jslogic.
The app uses AsyncStorage to cache messages for offline viewing.
Only minimal Firebase rules are configured. Consider updating Firestore/Storage rules before deploying to production.

---

### License
MIT – free to use, fork, and modify.

