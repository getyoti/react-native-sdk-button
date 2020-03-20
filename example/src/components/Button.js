import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Prompt-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  container: {
    borderRadius: 2,
    backgroundColor: '#349cf7',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function Button({children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
