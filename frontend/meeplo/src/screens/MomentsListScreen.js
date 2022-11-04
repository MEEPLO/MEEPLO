import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components';

import MomentsList from '../components/moments/MomentsList';

const MomentsHome = () => {

  return (
    <ScrollView>
      <View style={{ height: '100%' }}>
        <View>
          <Text>추억 리스트</Text>
        </View>
        <View>
          <View>
            <Text>내가 작성한 추억만 보기 radio</Text>
          </View>
          <View>
            <Text>그룹 선택 selet options</Text>
          </View>
        </View>
        <MomentsList />
      </View>
    </ScrollView>
  );
};

export default MomentsHome;
