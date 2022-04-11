import * as React from 'react';
import { Button, TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import { lightTheme } from '@expo/styleguide-native';



export default function CustomButton({ onPress, text, isActive, icon }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, isActive ? styles.activeButton : styles.inActiveButton]}>
        {
          icon
        }
        <Text style={[{ fontSize: 16, fontWeight: 'bold' }, isActive ? styles.activeText : styles.inActiveText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 125,
    height: 65,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: lightTheme.button.primary.background,
  },
  inActiveButton: {
    borderRadius: 15,
    borderColor: lightTheme.button.primary.background,
    borderWidth: 3,
  },
  activeText: {
    color: lightTheme.button.primary.foreground,
  },
  inActiveText: {
    color: lightTheme.button.primary.background,
  }
})