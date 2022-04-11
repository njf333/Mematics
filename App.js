import * as React from 'react';
import { 
  Text, 
  View, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Button,
  Share ,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

// Converts a React View to a png
import { captureRef } from 'react-native-view-shot';

import TakePhotoButton from './components/Buttons/TakePhotoButton';
import ChoosePhotoButton from './components/Buttons/ChoosePhotoButton';
import SharePhotoButton from './components/Buttons/SharePhotoButton';

// expostyle for react native (early version)
import { lightTheme } from '@expo/styleguide-native';

import MemePreview from './components/MemePreview';
import MainMemePreview from './components/MainMemePreview';

const { width: screenWidth } = Dimensions.get('window');

const mainMemeTempate = 'https://www.askideas.com/media/36/Mona-Lisa-With-Nicolas-Cage-Funny-Weird-Photoshopped-Face-Image.jpg';
const memeTemplateImageUris = [
  'https://scontent-sea1-1.xx.fbcdn.net/v/t1.18169-9/10703728_904936129516741_8774607823377577284_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=nk1eYS7oN6UAX8bXIg-&_nc_ht=scontent-sea1-1.xx&oh=00_AT8BO9cAysGGNafTcYjn7pm0fVhypTEkVz6GPp-xz4AidA&oe=6279A69E',
  'https://www.askideas.com/media/36/Weird-Looking-Baby-Face-Funny-Image.jpg',
  'https://www.askideas.com/media/36/Mona-Lisa-With-Nicolas-Cage-Funny-Weird-Photoshopped-Face-Image.jpg',
  'https://i.pinimg.com/564x/35/40/74/354074b0c1124e7d0cde2514d5f6c609.jpg',
  'https://i.pinimg.com/564x/b3/14/1b/b3141bc780924fd0dc7c28e7022ac155.jpg'
];

export default function App() {

  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");
  const [imgUri, setImgUri] = React.useState(mainMemeTempate);
  const memeView = React.useRef();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView style={{flex: 1, backgroundColor:  lightTheme.background.tertiary}} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: Constants.statusBarHeight - 45
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 28,
          color: 'grey'
        }}>Mematics</Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10,}}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setTopText(text)}
          value={topText}
          placeholder="Type the Top Text"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setBottomText(text)}
          value={bottomText}
          placeholder="Type the Bottom Text"
        />
      </View>
      <MainMemePreview memeView={memeView} imgUri={imgUri} topText={topText} bottomText={bottomText} />
      <View style={styles.buttonGroup}>
        <SharePhotoButton memeView={memeView} isActive={!!imgUri} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <TakePhotoButton setImgUri={setImgUri} isActive={!imgUri} />
          <ChoosePhotoButton setImgUri={setImgUri} isActive={!imgUri} />
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ flexDirection: 'row' }} >
          <MemePreview uri={memeTemplateImageUris[0]} onPress={() => setImgUri(memeTemplateImageUris[0])} />
          <MemePreview uri={memeTemplateImageUris[1]} onPress={() => setImgUri(memeTemplateImageUris[1])} />
        </View>
        <View style={{ flexDirection: 'row' }} >
          <MemePreview uri={memeTemplateImageUris[2]} onPress={() => setImgUri(memeTemplateImageUris[2])} />
          <MemePreview uri={memeTemplateImageUris[3]} onPress={() => setImgUri(memeTemplateImageUris[3])} />
        </View>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  memeText: {
    color: 'white',
    fontSize: 38,
    position: 'absolute',
    left: 5,
    right: 5,
    backgroundColor: 'transparent',
    /*  textShadowColor: 'black',
      textShadowRadius: 5,
      textShadowOffset: { height: 2, width: 2 }, */
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    width: screenWidth,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: lightTheme.background.tertiary,
  },
  buttonGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#cacaca",
    width: '90%',
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 10,
  },
});
