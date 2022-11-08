import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const screen = Dimensions.get('screen');
console.log(screen);

const MapView = ({ setWebViewRef, onMessageHandler }) => {
  return (
    <WebView
      style={styles.webViewStyle}
      source={{ uri: 'http://meeplo.co.kr:8080' }}
      onMessage={onMessageHandler}
      ref={setWebViewRef}
    />
  );
};

const styles = StyleSheet.create({
  viewStyle: {},
  webViewStyle: {
    position: 'absolute',
    width: screen.width,
    height: screen.height,
  },
});

export default MapView;
