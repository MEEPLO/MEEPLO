import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import FontText from '../common/FontText';

const screen = Dimensions.get('screen');

const MapSearchResultList = ({ items }) => {
  return (
    <View style={styles.result}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <FontText>{item.name}</FontText>}
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
