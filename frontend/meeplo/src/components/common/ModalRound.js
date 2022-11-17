import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

import RoundView from './RoundView';

const ModalRound = ({ hideHeader, title, visible, onRequestClose, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <RoundView hideHeade={hideHeader} title={title} onRequestClose={onRequestClose} chidlren={children} />
    </Modal>
  );
};

export default ModalRound;
