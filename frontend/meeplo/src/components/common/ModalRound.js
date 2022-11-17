import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { theme } from '../../assets/constant/DesignTheme';

import RoundView from './RoundView';

const ModalRound = ({ hideHeader, title, visible, onRequestClose, children }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <RoundView hideHeade={hideHeader} title={title} onRequestClose={onRequestClose} children={children} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: theme.color.dim,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalRound;
