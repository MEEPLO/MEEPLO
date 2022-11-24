import React, { useState, forwardRef } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const screen = Dimensions.get('screen');

const MapView = forwardRef(({ onMessageHandler, onLoadStart, onLoadProgress, onLoad, onLoadEnd }, ref) => {
  return (
    <WebView
      style={styles.webViewStyle}
      source={{ uri: 'http://www.meeplo.co.kr:31111' }}
      ref={ref}
      onMessage={onMessageHandler}
      onLoadStart={onLoadStart}
      onLoadProgress={onLoadProgress}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
    />
  );
});

const styles = StyleSheet.create({
  webViewStyle: {
    position: 'absolute',
    width: screen.width,
    height: screen.height,
  },
});

export default MapView;
