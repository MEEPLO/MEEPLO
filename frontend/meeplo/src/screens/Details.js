import React from 'react';
import { View, Text, Button } from 'react-native';

const Details = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is Details Screen</Text>

      <Button title="go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Details;
