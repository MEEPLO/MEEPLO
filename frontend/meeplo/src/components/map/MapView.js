import React, { useState, forwardRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const screen = Dimensions.get('screen');
console.log(screen);

const MapView = forwardRef(({ onMessageHandler }, ref) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <WebView
      style={styles.webViewStyle}
      source={{ uri: 'http://70.12.246.204:8080' }}
      // source={{ uri: 'https://www.naver.com' }}
      // source={{ uri: 'https://github.com/' }}
      ref={ref}
      onMessage={onMessageHandler}
      onLoadStart={() => {
        console.log('Webview load start');
      }}
      onLoadProgress={({ nativeEvent }) => {
        console.log(`Webview loading ${nativeEvent?.progress}`);
      }}
      onLoad={() => {
        console.log('Webview load has finished');
        setLoaded(true);
      }}
      onLoadEnd={() => {
        console.log('WebView load has ended');
      }}
    />
  );
};

const styles = StyleSheet.create({
  webViewStyle: {
    position: 'absolute',
    width: screen.width,
    height: screen.height,
  },
});

export default MapView;
