import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import MapView from '../components/map/MapView';
const screen = Dimensions.get('screen');

const TransparentView = styled.View`
  background-color: rgba(255, 255, 255, 0);
`;

const ScheduleTestScreen = () => {
  const [searchText, setSearchText] = useState('');

  const webViewRef = useRef();

  const postMessageHandler = e => {
    console.log(e);
    webViewRef.current.postMessage('Data from React Native App');
  };

  return (
    <View style={{ width: screen.width, height: screen.height }}>
      <View style={{ width: screen.width, height: screen.height, position: 'absolute' }}>
        <MapView ref={webViewRef} />
      </View>
      <TransparentView>
        <TextInput
          style={styles.searchInputStyle}
          value={searchText}
          onChange={newText => {
            postMessageHandler(newText);
            setSearchText(newText);
          }}
        />
      </TransparentView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default ScheduleTestScreen;
