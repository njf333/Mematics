import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { lightTheme } from '@expo/styleguide-native';
import * as Icons from '@expo/vector-icons'; 

export default function ChoosePhotoButton({ setImgUri }) {
  return (
    
    // css code for choose photo button
    
    <TouchableOpacity                                                                  
      onPress={() => choosePhotoAsync(setImgUri)}
      style={{
        width: 125,
        height: 65,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: lightTheme.button.primary.background,
        marginLeft: 10,
        paddingHorizontal: 10
      }}
    >
      <Icons.EvilIcons name="image" size={42} color="white" />
      <Text style={{
        fontWeight: 'bold',
        color: lightTheme.button.primary.foreground,
      }}>
        Choose a Photo
      </Text>
    </TouchableOpacity>

  );
}

//function to choose image from saved pictures on phone

async function choosePhotoAsync(setImgUri) {
  
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const isSuccessful = status === "granted";
  if (!isSuccessful) {
    alert("Media Library permissions not granted");
    return;
  }
  
  //expo-image-picker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera.

  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
  });
  if (!image.cancelled) {
    setImgUri(image.uri);
  }
}
