import { View, Text, Dimensions, Modal } from 'react-native';
import React from 'react';
import { PacmanIndicator } from 'react-native-indicators';
import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const LoadingModal = ({ visible, onRequestClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={{ width: screen.width, height: screen.height, backgroundColor: theme.color.dim }}>
        <PacmanIndicator size={100} color={theme.color.bright.orange} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
