import React from 'react';
import {StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  spacer: {
    width: '100%',
    height: 1,
    backgroundColor: '#d5dae0',
  },
});

function InputSpacer() {
  return <View style={styles.spacer} />;
}

export default InputSpacer;
