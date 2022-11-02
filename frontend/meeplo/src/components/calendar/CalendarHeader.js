import React, { useState } from 'react';
import { View, Text } from 'react-native';

const CalendarHeader = ({ date }) => {
  const [format, setFormat] = useState('');

  if (typeof date === 'object') {
  }

  console.log(date);
  return (
    <View>
      <Text>wow</Text>
    </View>
  );
};

export default CalendarHeader;
