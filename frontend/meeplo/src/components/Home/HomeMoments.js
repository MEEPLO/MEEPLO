import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import ScheduleButton from '../common/ScheduleButton';

const HomeMoments = ({ data, navigation }) => {
  const onPressCreateMoment = () => {
    navigation.navigate('MomentsStack', { screen: 'MomentsCreate' });
  };

  const onPressSchedule = ({ scheduleId }) => {
    navigation.navigate('ScheduleStack', { screen: 'Detail', params: { scheduleId } });
  };

  return (
    <>
      {data?.length > 0 ? (
        <SafeAreaView style={{ alignItems: 'center' }}>
          {data.map((item, i) => (
            <View style={{ marginVertical: 4 }} key={`homeMemory-${i}`}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  onPressSchedule({ scheduleId: item.id });
                }}>
                <ScheduleButton
                  isData={true}
                  picture="yellow"
                  title={item.name}
                  date={item.date}
                  place={item.location.meetName}
                  group={item.groupName}
                  people={item.memberCount}
                />
              </TouchableOpacity>
            </View>
          ))}
        </SafeAreaView>
      ) : (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPressCreateMoment} activeOpacity={0.6}>
          <ScheduleButton isData={false} empty="즐거웠던 추억을 남겨 보아요" picture="yellow" />
        </TouchableOpacity>
      )}
    </>
  );
};

export default HomeMoments;
