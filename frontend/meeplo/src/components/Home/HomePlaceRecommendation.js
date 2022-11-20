import React from 'react';
import { TouchableOpacity } from 'react-native';
import ScheduleButton from '../common/ScheduleButton';

const HomePlaceRecommendation = () => {
  // TODO: hrookim navigate go RECOMMENDATION page
  return (
    <TouchableOpacity activeOpacity={0.6}>
      <ScheduleButton isData={false} empty="놀 곳 추천 받기" picture="red" />
    </TouchableOpacity>
  );
};

export default HomePlaceRecommendation;
