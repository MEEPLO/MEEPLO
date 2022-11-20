import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('screen');

const MapSearchResultList = ({ items }) => {
  return (
    <View style={styles.result}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        showsVerticalScrollIndicator={false}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  result: {
    width: screen.width,
    height: 200,
    backgroundColor: 'white',
  },
});

export default MapSearchResultList;
