import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Go to ScheduleHome" onPress={() => navigation.navigate('ScheduleHome')} />
      <Button title="Go to ScheduleCreate" onPress={() => navigation.navigate('ScheduleCreate')} />
    </View>
  );
};

export default Home;
