import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';

import StepButton from '../../../components/stepper/StepButton';
import MapLocationInput from '../../../components/map/MapLocationInput';
import MapStationInput from '../../../components/map/MapStationInput';
import KeywordsModalInput from '../../../components/schedule/KeywordsModalInput';

const ScheduleCreateLocationScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const [keywords, setKeywords] = useState([]);
  const [meet, setMeet] = useState();
  const [amuse, setAmuse] = useState();

  useEffect(() => {
    setMeet(state.meet);
    setAmuse(state.amuse);
    setKeywords(state.keywords);
  }, [state]);

  const onSelectMeetLocation = location => {
    setMeet(location);
  };

  const onSelectAmuseLocation = location => {
    setAmuse(location);
  };

  const onConfirmKeywords = confirmedKeywords => {
    setKeywords(confirmedKeywords);
  };

  const validateInput = () => {
    return true;
  };
  const onPressNext = () => {
    if (validateInput()) {
      const actions = [
        {
          type: 'UPDATE_KEYWORDS',
          payload: keywords,
        },
        {
          type: 'UPDATE_MEET',
          payload: meet,
        },
        {
          type: 'UPDATE_AMUSE',
          payload: amuse,
        },
      ];

      toNext(actions);
    }
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <KeywordsModalInput type="키워드" value={keywords} onConfirm={onConfirmKeywords} />
      </View>
      <View style={styles.inputViewStyle}>
        <MapStationInput type="만남 장소" required value={meet} onValueChange={onSelectMeetLocation} state={state} />
      </View>
      <View style={styles.inputViewStyle}>
        <MapLocationInput
          type="약속 장소"
          value={amuse}
          onValueChange={onSelectAmuseLocation}
          keywords={keywords}
          meet={meet}
        />
      </View>
      <View style={styles.navigateViewStyle}>
        <StepButton text="< 이전" active={false} onPress={toPrev} />
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

export default ScheduleCreateLocationScreen;
