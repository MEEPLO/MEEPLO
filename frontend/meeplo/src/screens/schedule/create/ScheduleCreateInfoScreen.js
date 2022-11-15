import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';

import StepButton from '../../../components/stepper/StepButton';
import StepTextInput from '../../../components/common/StepTextInput';
import DateModalInput from '../../../components/schedule/DateModalInput';
import KeywordsModalInput from '../../../components/schedule/KeywordsModalInput';

const screen = Dimensions.get('screen');

const ScheduleCreateInfoScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setDate(state.date);
    setName(state.name);
    setKeywords(state.keywords);
  }, [state]);

  const validateInput = () => {
    if (!date || date.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_DATE,
      });

      return false;
    } else if (!name || name.length === 0) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_NAME,
      });

      return false;
    }

    return true;
  };

  const onPressNext = () => {
    if (validateInput()) {
      const actions = [
        {
          type: 'UPDATE_DATE',
          payload: date,
        },
        {
          type: 'UPDATE_NAME',
          payload: name,
        },
        {
          type: 'UPDATE_KEYWORDS',
          payload: keywords,
        },
      ];

      toNext(actions);
    }
  };

  const onConfirmDate = confirmedDate => {
    setDate(confirmedDate);
  };

  const onConfirmKeywords = confirmedKeywords => {
    setKeywords(confirmedKeywords);
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <DateModalInput type="일시" value={date} required onConfirm={onConfirmDate} />
      </View>
      <View style={styles.inputViewStyle}>
        <StepTextInput type="약속 이름" multiline={false} value={name} onValueChange={setName} required />
      </View>
      <View style={styles.inputViewStyle}>
        <KeywordsModalInput type="키워드" value={keywords} onConfirm={onConfirmKeywords} />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="" />
        <StepButton text="다음 >" active={true} onPress={onPressNext} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  screenStyle: {
    width: '100%',
    height: '100%',
  },
  inputViewStyle: {
    marginBottom: 20,
  },
  navigateViewStyle: {
    width: '100%',

    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateInfoScreen;
