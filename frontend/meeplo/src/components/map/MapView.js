import React from 'react';
import { WebView } from 'react-native-webview';

const MapView = () => {
  return <WebView source={{ uri: 'http://70.12.246.204:8080' }} />;
};

export default MapView;
