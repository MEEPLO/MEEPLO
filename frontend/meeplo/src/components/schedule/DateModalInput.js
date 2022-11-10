import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';

import ModalRound from '../common/ModalRound';

const screen = Dimensions.get('screen');

const DateInput = ({ type, required }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <View>
      <Text style={{ color: theme.font.color, fontWeight: '800' }}>
        {type} {required ? <Text style={{ color: theme.color.alert }}>*</Text> : null}
      </Text>
      <TouchableOpacity onPress={openModal}>
        <Text>sadfsadf</Text>
        <View style={styles.dateInputView}></View>
      </TouchableOpacity>

      <ModalRound title="날짜 선택" visible={showModal} onRequestClose={closeModal}></ModalRound>
    </View>
  );
};

const styles = StyleSheet.create({
  dateInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
  },
});

export default DateInput;
