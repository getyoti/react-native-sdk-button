import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Prompt-Regular',
    color: '#333b40',
    marginLeft: 10,
    marginRight: 37,
    paddingVertical: 10,
  },
  iconWrapper: {position: 'absolute', right: 10},
  icon: {color: '#39a2f7', fontSize: 20},
});

function Input({
  placeholder,
  onBlur,
  onChangeText,
  onFocus,
  value,
  showIcon = false,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        onBlur={onBlur}
        onFocus={onFocus}
        returnKeyType="done"
        placeholder={placeholder}
        placeholderTextColor="#777"
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
        underlineColorAndroid="transparent"
      />
      {showIcon && (
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>ⓘ</Text>
        </View>
      )}
    </View>
  );
}

export default Input;
