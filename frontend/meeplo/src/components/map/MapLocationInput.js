import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { getNearLocations } from '../../redux/locationSlice';

import { theme } from '../../assets/constant/DesignTheme';
import { MESSAGE_TYPE, parseMessage } from '../../helper/message';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';
import MapSearchResultList from './MapSearchResultList';

const screen = Dimensions.get('screen');
const serachInputWidth = screen.width * 0.7;

const MapLocationInput = ({ type, required, value }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSearchCurrentMapButton, setShowSearchCurrentMapButton] = useState(true);
  const [showSearchResultList, setShowSearchResultList] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState();
  const [mapZoomLevel, setMapZoomLevel] = useState();

  const [searchResult, setSearchResult] = useState();
  const webViewRef = useRef();

  useEffect(() => {
    if (mapZoomLevel <= 5) {
      setShowSearchCurrentMapButton(true);
    } else {
      setShowSearchCurrentMapButton(false);
    }
  }, [mapZoomLevel]);

  useEffect(() => {
    if (webViewRef && webViewRef.current && webViewRef.current.postMessage) {
      webViewRef.current.postMessage(searchValue);
    }
  }, [searchValue]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const onMessageHandler = data => {
    processMapMessage(parseMessage(data.nativeEvent.data));
  };

  const processMapMessage = message => {
    console.log(message);
    switch (message.messageType) {
      case MESSAGE_TYPE.INIT_MAP:
        setMapCenter(message.messageBody.center);
        setMapZoomLevel(message.messageBody.level);
        break;
      case MESSAGE_TYPE.UPDATE_CENTER:
        setMapCenter(message.messageBody.center);
        break;
      case MESSAGE_TYPE.UPDATE_ZOOM_LEVEL:
        setMapZoomLevel(message.messageBody.level);
        break;
    }
  };

  const onSearchNear = () => {
    dispatch(
      getNearLocations({
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        radius: 1,
      }),
    )
      .unwrap()
      .then(payload => {
        console.log('isarray ', Array.isArray(payload.locations));
        setSearchResult(payload.locations);
        setShowSearchResultList(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <MapView ref={webViewRef} onMessageHandler={onMessageHandler} />
        </View>

        <View style={styles.mapInterfaceView} pointerEvents="box-none">
          <View style={styles.mapSaerchInputView}>
            <TextInput style={styles.mapSearchInput} value={searchValue} onChangeText={setSearchValue} />
          </View>

          {showSearchCurrentMapButton ? (
            <TouchableOpacity style={styles.mapSearchNearButton} onPress={onSearchNear}>
              <Text style={styles.mapSearchNearText}>현 지도에서 검색</Text>
            </TouchableOpacity>
          ) : null}

          {showSearchResultList ? <MapSearchResultList items={searchResult} /> : null}
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
  mapSaerchInputView: {
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
  mapSearchNearButton: {
    backgroundColor: theme.color.bright.red,
    paddingVertical: 5,
    paddingHorizontal: 10,

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  mapSearchNearText: {
    color: 'white',
  },
});

export default MapLocationInput;
