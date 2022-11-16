import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';

import ModalRound from '../common/ModalRound';
import config from '../../config';

const screen = Dimensions.get('screen');

const DateModalInput = ({ type, required, value, onConfirm }) => {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(config.calendar.getTodayDateObject());
  const [time, setTime] = useState(new Date());

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onPressConfirm = () => {
    onConfirm(
      `${date.dateString} ${time.getHours()}:${time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()}`,
    );
    closeModal();
  };

  return (
    <View>
      <Text style={styles.titleStyle}>
        {type} {required ? <Text style={styles.requiredStyle}>*</Text> : null}
      </Text>

      <TouchableOpacity onPress={openModal}>
        <Text style={{ color: theme.font.color }}>{value}</Text>
        <View style={styles.dateInputView} />
      </TouchableOpacity>

      <ModalRound title="날짜 선택" visible={showModal} onRequestClose={closeModal}>
        <Calendar
          {...config.calendar.meeploCalendarParam}
          theme={{
            ...config.calendar.meeploCalendarParamTheme,
          }}
          onDayPress={setDate}
        />

        <View style={styles.datePickerView}>
          <DatePicker mode="time" date={time} onDateChange={setTime} />
        </View>

        <View style={styles.confirmButtonView}>
          <TouchableOpacity style={styles.confirmButtonStyle} onPress={onPressConfirm}>
            <Text style={styles.confirmButtonTextStyle}> 확인 </Text>
          </TouchableOpacity>
        </View>
      </ModalRound>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: theme.font.color,
    fontWeight: '800',
    marginBottom: 40,
  },
  requiredStyle: {
    color: theme.color.alert,
  },
  dateInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
  },
  datePickerView: {
    overflow: 'hidden',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  confirmButtonView: {
    alignItems: 'center',
  },
  confirmButtonStyle: {
    width: screen.width * 0.7,
    height: 50,

    borderWidth: 2,
    borderColor: theme.color.border,
    borderRadius: theme.radius.base,

    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonTextStyle: {
    fontSize: 20,
    color: theme.color.bright.red,
  },
});

export default DateModalInput;
