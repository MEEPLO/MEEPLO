import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Dimensions, Text } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import ScheduleButton from '../common/ScheduleButton';

const imageWidth = Dimensions.get('window').width - 40;

const HomeMoments = ({ data }) => {
  // TODO: hrookim change the color option from blue to red
  const onPressCreateMoment = () => {
    // TODO: hrookim navigate to create screen
    // navigation.navigate('MomentsStack', { screen: 'MomentsCreate' });
  };

  return (
    <>
      {data?.length > 0 ? (
        <SafeAreaView style={{ alignItems: 'center' }}>
          {data.map((item, i) => (
            <View style={{ marginVertical: 4 }} key={`homeMemory-${i}`}>
              <TouchableOpacity activeOpacity={0.6}>
                <ScheduleButton
                  isData={true}
                  picture="yellow"
                  title={item.title}
                  date={item.date}
                  place={item.place}
                  group={item.group}
                  people={item.people}
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
