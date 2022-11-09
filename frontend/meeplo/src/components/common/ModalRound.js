import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

const screen = Dimensions.get('screen');

const ModalRound = ({ title, visible, onRequestClose, children }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.roundedView}>
          <View style={styles.headerView}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.childrenView}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedView: {
    width: screen.width * 0.7,
    backgroundColor: 'white',

    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.color.border,

    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    width: screen.width,
    height: 50,
    backgroundColor: theme.color.bright.green,

    borderColor: theme.color.border,
    borderBottomWidth: 2,

    justifyContent: 'center',
    alignItems: 'center',
  },
  childrenView: {
    padding: 20,
  },
  title: {
    fontWeight: '800',
  },
});

export default ModalRound;
