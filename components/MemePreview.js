import React from 'react';

import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';

import { lightTheme } from '@expo/styleguide-native';

export default function MemePreview({ uri, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={uri}
      onPress={onPress} style={{
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      }}>
      {uri ?
        <Image source={{ uri }} style={styles.templateImage} />
        :
        <View style={styles.templateImage}>
          <Text style={{ color: lightTheme.background.quaternary, fontSize: 18 }}>Meme</Text>
        </View>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  templateImage: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: lightTheme.background.default,
    borderRadius: 15,
  },
})