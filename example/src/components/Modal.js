import React from 'react';
import {StyleSheet, View, Image, Modal as BaseModal} from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'grey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    maxWidth: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 50, height: 50, position: 'absolute', top: -30},
  content: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

function Modal({open, children, onClose}) {
  return (
    <BaseModal animationType="slide" transparent={false} visible={open}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/yotiicon.png')}
            style={styles.icon}
          />
          <View style={styles.content}>
            {children}
            <Button onPress={onClose}>OK</Button>
          </View>
        </View>
      </View>
    </BaseModal>
  );
}

export default Modal;
