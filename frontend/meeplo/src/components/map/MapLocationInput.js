import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

import { theme } from '../../assets/constant/DesignTheme';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';

const screen = Dimensions.get('screen');
const serachInputWidth = screen.width * 0.7;

const MapLocationInput = ({ type, required, value }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const webViewRef = useRef();

  useEffect(() => {
    if (webViewRef && webViewRef.current && webViewRef.current.postMessage) {
      webViewRef.current.postMessage(searchValue);
    }
  }, [searchValue]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <View>
      <Text style={styles.titleStyle}>
        {type} {required ? <Text style={styles.requiredStyle}>*</Text> : null}
      </Text>

      <TouchableOpacity onPress={openModal}>
        <Text style={{ color: theme.font.color }}>{value}</Text>
        <View style={styles.dateInputView} />
      </TouchableOpacity>

      <ModalCover visible={showModal} onRequestClose={closeModal}>
        <View style={styles.backgroundMapView}>
          <MapView ref={webViewRef} />
        </View>

        <View style={styles.mapInterfaceView} pointerEvents="box-none">
          <View style={styles.mapSearchView}>
            <TextInput style={styles.mapSearchInput} value={searchValue} onChangeText={setSearchValue} />
          </View>
        </View>
      </ModalCover>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: theme.font.color,
    fontWeight: '800',
    marginBottom: 40,
  },
  dateInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
  },
  backgroundMapView: { width: screen.width, height: screen.height, position: 'absolute' },
  mapInterfaceView: {
    width: screen.width,
    height: screen.height,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  mapSearchView: {
    width: screen.width,
    alignItems: 'center',
  },
  mapSearchInput: {
    width: serachInputWidth,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.radius.input,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default MapLocationInput;
