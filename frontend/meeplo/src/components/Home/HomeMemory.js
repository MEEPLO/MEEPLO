import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../assets/constant/DesignTheme';
import ScheduleButton from '../common/ScheduleButton';

const HomeMemory = ({ data }) => {
  // TODO: hrookim navigate to each schedule's memoents-CREATE pagd
  // TODO: hrookim change the color option from blue to red
  return (
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
  );
};

export default HomeMemory;
