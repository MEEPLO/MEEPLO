import React, { forwardRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const screen = Dimensions.get('screen');
console.log(screen);

const MapView = forwardRef((props, ref) => {
  const onMessageHandler = e => {
    // const event = JSON.parse(e.nativeEvent.data);
    console.log('onMessage', e.nativeEvent.data);
  };

  return (
    <WebView
      style={styles.webViewStyle}
      source={{ uri: 'http://70.12.246.204:8080' }}
      ref={ref}
      onMessage={onMessageHandler}
    />
  );
});

const styles = StyleSheet.create({
  viewStyle: {},
  webViewStyle: {
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    borderWidth: 10,
  },
});

export default MapView;
