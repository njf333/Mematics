import * as React from 'react';
import { Button, Share } from 'react-native';

import CustomButton from './CustomButton';

import { EvilIcons } from '@expo/vector-icons';
// Converts a React View to a png

import { captureRef } from 'react-native-view-shot';
import { lightTheme } from '@expo/styleguide-native';

// expo-sharing allows you to share files directly with other compatible applications.

import * as Sharing from 'expo-sharing';

export default function SharePhotoButton({ memeView, isActive }) {
  return (
    <CustomButton
      onPress={() => shareMeme(memeView)}
      text="Share Meme"
      isActive={isActive}
      icon={<EvilIcons name="share-apple" size={42}
        color={isActive ?
          lightTheme.button.primary.foreground :
          lightTheme.button.primary.background}
      />}
    />
  );
}

const shareMeme = async (meme) => {
  if (Platform.OS === 'web') {
    alert(`Uh oh, sharing isn't available on your platform`);
    return;
  }

  if (!meme.current) {
    console.log("The memeView is not rendered yet, cannot share");
    return;
  }
  
// capture photos via camera and use it for a meme
  
  const imgUri = await captureRef(meme, {
    format: "png",
    quality: 0.5,
    result: 'tmpfile',
  });

  await Sharing.shareAsync(imgUri);
};


//==========================  An async function is a function declared with the async keyword, and the await keyword is permitted within it. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

async function shareAsync(memeView) {
  if (!memeView.current) {
    console.log('The memeView is not rendered yet, cannot share');
    return;
  }
  const imgUri = await captureRef(memeView, {
    format: 'png',
    quality: 0.5,
    result: 'data-uri',
  });

  const cloudUri = await uploadImageAsync(imgUri);
  console.log('meme uploaded to', cloudUri);
  Share.share({ url: cloudUri });
}

async function uploadImageAsync(uri) {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    name: 'upload.png',
    type: 'image/png',
  });

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    body: formData,
    headers: {
      // replace with your own API key
      'Authorization': 'Client-ID 658d72e5b4a0c6b',
    },
  });
  let responseJson = await response.json();
  console.log(responseJson);
  let url = responseJson.data.link;

  return url;
}
