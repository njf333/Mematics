import * as React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  FlatList,
  Share,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";

// Converts a React View to a png
import { captureRef } from "react-native-view-shot";

import TakePhotoButton from "./components/TakePhotoButton";
import ChoosePhotoButton from "./components/ChoosePhotoButton";
import SharePhotoButton from "./components/SharePhotoButton";

const themeColor = {
  background: '#0076FF'
}

const { width: screenWidth } = Dimensions.get("window");

const memeTemplateImageUris = [
  "https://i.imgflip.com/2/1bij.jpg",
  "https://i.imgflip.com/2/1bgw.jpg",
  "https://i.imgflip.com/2/4t0m5.jpg",
  "https://i.imgflip.com/1og7s3.jpg",
  "https://i.imgur.com/QT8j0d8.png",
  "https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip",
  "https://cdn.wionews.com/sites/default/files/styles/story_page/public/2021/05/02/193478-disaster-girl-meme.jpg",
  "https://static.clideo.com/files/content/506/twitter-meme-maker-1.png",
];

export default function App() {
  const [topText, setTopText] = React.useState("");
  const [bottomText, setBottomText] = React.useState("");
  //<text> Memotics </text>

  const placeholderMeme = memeTemplateImageUris[4];
  const [imgUri, setImgUri] = React.useState(placeholderMeme);
  const memeView = React.useRef();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={{flex: 1, backgroundColor: themeColor.background}}>
        <View style={styles.container}>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: Constants.statusBarHeight - 20, marginBottom: 20 }}>
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
          <View collapsable={false} ref={memeView}>
            <Image
              source={{ uri: imgUri }}
              style={{ height: screenWidth, width: screenWidth}}
            />
            <Text style={[styles.memeText, { top: 5 }]}>{topText}</Text>
            <Text style={[styles.memeText, { bottom: 5 }]}>{bottomText}</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingVertical: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <TakePhotoButton setImgUri={setImgUri} />
            <View style={{ marginLeft: 10 }}>
              <ChoosePhotoButton setImgUri={setImgUri} />
            </View>
          </View>
          <FlatList data={memeTemplateImageUris} keyExtractor={(item, index) => String(index)} renderItem={({ item, id }) => (
            <TouchableOpacity
              key={id}
              onPress={() => {
                setImgUri(item);
              }}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item }} style={styles.templateImage} />
            </TouchableOpacity>
          )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={{ marginTop: 20 }}>
            <SharePhotoButton memeView={memeView} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColor.background,
    paddingTop: Constants.statusBarHeight,
    width: screenWidth
  },
  memeText: {
    color: "black",
    fontSize: 38,
    fontWeight: "900",
    // textAlign: "center",
    position: "absolute",
    left: 5,
    right: 5,
    elevation: 10,
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 },
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
  templateImage: {
    height: 90,
    width: 90,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 8
  },
  
});
/* 

<View style={{ flexDirection: "row" }}>
        {memeTemplateImageUris.map((uri) => {
          return (
            <TouchableOpacity
              key={uri}
              onPress={() => {
                setImgUri(uri);
              }}
            >
              <Image source={{ uri }} style={styles.templateImage} />
            </TouchableOpacity>
          );
        })}
      </View>


*/