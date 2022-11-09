import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../../assets/constant/DesignTheme';

import StepButton from '../../../components/stepper/StepButton';
import StepTextInput from '../../../components/common/StepTextInput';
import DateModalInput from '../../../components/schedule/DateModalInput';
import KeywordsModalInput from '../../../components/schedule/KeywordsModalInput';

const ScheduleCreateInfoScreen = ({ state, toNext, toPrev, onFinish }) => {
  const [date, setDate] = useState();
  const [name, setName] = useState();
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    setDate(state.date);
    setName(state.name);
    setKeywords(state.keywords);
  }, [state]);

  const validateInput = () => {
    if (date && name) {
      return true;
    }
    return false;
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

  return (
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
  );
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
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateInfoScreen;
