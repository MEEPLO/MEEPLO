import React from 'react';
import {View, Text} from 'react-native';
// import { WebView } from 'react-native-webview';
import styled from 'styled-components';

import MomentsCreate from '../components/moments/MomentsCreate';

const MomentsHome = () => {
  return (
  <View>
    <Text>위치체크</Text>
    <MomentsCreate />
    <Text>체크합니다용</Text>
  </View>
  );
};

export default MomentsHome;
