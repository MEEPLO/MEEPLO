import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const ModalCover = ({ visible, onRequestClose, backgroundColor, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.backgroundView(backgroundColor)}>
        <Pressable
          onPressOut={() => onRequestClose()}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}></Pressable>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundView: backgroundColor => {
    return {
      width: screen.width,
      height: screen.height,
      backgroundColor: backgroundColor ? backgroundColor : 'rgba(0, 0, 0, 0,)',
    };
  },
});

export default ModalCover;
