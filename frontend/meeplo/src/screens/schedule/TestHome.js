import React from 'react';
import { View, Text, Button } from 'react-native';

const TestHome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is Test Home</Text>

      <Button title="Schedule Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Schedule Create" onPress={() => navigation.navigate('Create')} />
    </View>
  );
};

export default TestHome;
