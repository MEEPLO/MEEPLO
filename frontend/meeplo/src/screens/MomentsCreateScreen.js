import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';

import MomentsCreate from '../components/moments/MomentsCreate';
import MomentsFrame from '../components/moments/MomentsFrame';

const MomentsCreateScreen = () => {
  return (
  <View>
    <Text>위치체크</Text>
    <MomentsFrame />
    <Text>체크합니다용</Text>
  </View>
  );
};

export default MomentsCreateScreen;
