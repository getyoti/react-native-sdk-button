import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#d5dae0',
    borderBottomWidth: 3,
  },
  icon: {width: 109.375 / 2, height: 50 / 2, marginBottom: 10},
  welcome: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/yoti.png')}
        style={styles.icon}
      />
      <Text style={styles.welcome}>Yoti Button for React Native</Text>
    </View>
  );
}

export default Header;
