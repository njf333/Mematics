import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { lightTheme } from '@expo/styleguide-native';
import * as Icons from '@expo/vector-icons'; 

export default function TakePhotoButton({ setImgUri }) {
  return (
    <TouchableOpacity
      style={{
        height: 65,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightTheme.button.primary.background,
        paddingHorizontal: 10
      }}
      onPress={() => takePhotoAsync(setImgUri)}>
      <Icons.EvilIcons name="camera" size={42} color="white" />
      <Text style={{
        fontWeight: 'bold',
        color: lightTheme.button.primary.foreground,
      }}>
        Take a Photo
      </Text>
    </TouchableOpacity>
  );
}

async function takePhotoAsync(setImgUri) {
  
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  const isSuccessful = status === "granted";
  if (!isSuccessful) {
    alert("Camera permissions not granted");
    return;
  }

  const image = await ImagePicker.launchCameraAsync();
  if (!image.cancelled) {
    // { cancelled: false, type: 'image', uri, width, height, exif, base64 }
    setImgUri(image.uri);
  }
}
