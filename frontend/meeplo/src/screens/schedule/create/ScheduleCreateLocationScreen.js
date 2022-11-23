import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { TOAST_MESSAGE } from '../../../assets/constant/string';

import StepButton from '../../../components/stepper/StepButton';
import MapLocationInput from '../../../components/map/MapLocationInput';
import MapStationInput from '../../../components/map/MapStationInput';

const ScheduleCreateLocationScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const [meet, setMeet] = useState();
  const [amuse, setAmuse] = useState();

  useEffect(() => {
    // TODO : set meet
    setMeet(state.meet);
    setAmuse(state.amuse);
  }, [state]);

  const onSelectMeetLocation = location => {
    setMeet(location);
  };

  const onSelectAmuseLocation = location => {
    setAmuse(location);
  };

  const validateInput = () => {
    if (!meet || !meet.id) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_PLACE,
      });

      return false;
    } else if (!amuse || !amuse.id) {
      Toast.show({
        type: 'error',
        text1: TOAST_MESSAGE.REQUIRED_FIELD_ERROR,
        text2: TOAST_MESSAGE.SCHEDULE_NO_PLACE,
      });
    }

    return true;
  };
  const onPressNext = () => {
    if (validateInput()) {
      const actions = [
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
        <MapStationInput type="만남 장소" required value={meet} onValueChange={onSelectMeetLocation} state={state} />
      </View>
      <View style={styles.inputViewStyle}>
        <MapLocationInput
          type="약속 장소"
          required
          value={amuse}
          onValueChange={onSelectAmuseLocation}
          state={state}
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
