import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import StepButton from '../../../components/stepper/StepButton';
import MapLocationInput from '../../../components/map/MapLocationInput';

const ScheduleCreateLocationScreen = ({ state, toNext, toPrev, onFinish, visible }) => {
  const [meet, setMeet] = useState();
  const [amuse, setAmuse] = useState();

  useEffect(() => {
    // TODO : set meet
    setMeet();
    setAmuse();
  }, []);

  const onSelectMeetLocation = location => {
    setMeet(location);
  };

  const onSelectAmuseLocation = location => {
    setAmuse(location);
  };

  const validateInput = () => {
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
    } else toNext();
  };

  return visible ? (
    <View style={styles.screenStyle}>
      <View style={styles.inputViewStyle}>
        <MapLocationInput type="만날 장소" required value={meet} onValueChange={onSelectMeetLocation} />
      </View>
      <View style={styles.inputViewStyle}>
        <MapLocationInput type="약속 장소" required value={amuse} onValueChange={onSelectAmuseLocation} />
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
    bottom: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScheduleCreateLocationScreen;
