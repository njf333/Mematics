import React from 'react';

import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

import { lightTheme } from '@expo/styleguide-native';

const { width: screenWidth } = Dimensions.get('window');

export default function MainMemePreview({ memeView, imgUri, topText, bottomText }) {
  return (
    <View style={{ width: screenWidth - 52, height: screenWidth - 52, borderRadius: 12, overflow: 'hidden', marginTop: 20, }}>
      <View
        style={styles.mainMemeContainer}
        collapsable={false}
        ref={memeView}>
        {
          imgUri ?
            <Image
              source={{ uri: imgUri }}
              style={{ height: '100%', width: '100%' }}
            />
            :
            <View style={styles.mainMemeTextContainer}>
              <Text style={styles.mainMemeText}>Your meme goes here</Text>
            </View>
        }
        <Text style={[styles.memeText, { top: 5 }]}>{topText}</Text>
        <Text style={[styles.memeText, { bottom: 5 }]}>{bottomText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainMemeContainer: {
    width: '100%',
    backgroundColor: lightTheme.background.default,
    // shadow props are only supported on iOS as per https://reactnative.dev/docs/shadow-props
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  mainMemeTextContainer: {
    width: screenWidth - 52,
    height: screenWidth - 52,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainMemeText: {
    fontSize: 24,
    position: 'absolute',
    color: lightTheme.background.quaternary,
  },
  memeText: {
    color: "black",
    fontSize: 38,
    fontWeight: "900",
    // textAlign: "center",
    position: "absolute",
    left: 5,
    right: 5,
    elevation: 5,
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 },
  },
})