import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { getNearLocations } from '../../redux/locationSlice';

import { theme } from '../../assets/constant/DesignTheme';
import { MESSAGE_TYPE, createMessage, parseMessage } from '../../helper/message';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';
import MapSearchResultList from './MapSearchResultList';

const screen = Dimensions.get('screen');
const searchInputWidth = screen.width * 0.7;
const selectedNearLocationViewWidth = screen.width * 0.95;
const selectedNearLocationViewHeight = screen.height * 0.5;
const selectedNearLocationViewUpY = screen.height * 0.5;
const selectedNearLocationViewDownY = screen.height * 1;

const MapLocationInput = ({ type, required, value, onValueChange }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSearchCurrentMapButton, setShowSearchCurrentMapButton] = useState(true);
  const [showSearchResultList, setShowSearchResultList] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState();
  const [mapZoomLevel, setMapZoomLevel] = useState();

  const [nearLocations, setNearLocations] = useState();
  const [selectedNearLocation, setSelectedNearLocation] = useState();
  const [showSelectedNearLocationInfo, setShowSelectedNearLocationView] = useState();

  const webViewRef = useRef();
  const selectedNearLocationViewPositionAnim = useRef(new Animated.ValueXY()).current;

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

  useEffect(() => {
    if (showSelectedNearLocationInfo) {
      selectedNearLocationViewUp();
    } else {
      selectedNearLocationViewDown();
    }
  }, [showSelectedNearLocationInfo, selectedNearLocationViewUp, selectedNearLocationViewDown]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openSelectedNearLocationView = () => {
    setShowSelectedNearLocationView(true);
  };
  const closeSelectedNearLocationView = () => {
    setShowSelectedNearLocationView(false);
  };

  const onMessageHandler = data => {
    processMapMessage(parseMessage(data.nativeEvent.data));
  };

  const processMapMessage = message => {
    const messageType = message.messageType;
    const body = message.messageBody;
    switch (messageType) {
      case MESSAGE_TYPE.INIT_MAP:
        setMapCenter(body.center);
        setMapZoomLevel(body.level);
        break;
      case MESSAGE_TYPE.UPDATE_CENTER:
        setMapCenter(body.center);
        break;
      case MESSAGE_TYPE.UPDATE_ZOOM_LEVEL:
        setMapZoomLevel(body.level);
        break;
      case MESSAGE_TYPE.SELECT_NEAR_LOCATION:
        console.log(body);
        setSelectedNearLocation(body);
        openSelectedNearLocationView();
        break;
    }
  };

  const getRadiusKM = zoom => {
    switch (zoom) {
      case 1:
        return 0.1;
      case 2:
        return 0.2;
      case 3:
        return 0.3;
      case 4:
        return 0.4;
      case 5:
        return 0.5;
      default:
        return 1;
    }
  };

  const onSearchNear = () => {
    dispatch(
      getNearLocations({
        lat: mapCenter.lat,
        lng: mapCenter.lng,
        radius: getRadiusKM(mapZoomLevel),
      }),
    )
      .unwrap()
      .then(payload => {
        const locations = payload.locations;
        setNearLocations(locations);
        webViewRef.current.postMessage(createMessage(MESSAGE_TYPE.UPDATE_NEAR_LOCATIONS, locations));
        setShowSearchResultList(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const selectedNearLocationViewUp = useCallback(() => {
    Animated.spring(selectedNearLocationViewPositionAnim, {
      toValue: { x: 0, y: selectedNearLocationViewUpY },
      useNativeDriver: true,
    }).start();
  }, [selectedNearLocationViewPositionAnim]);

  const selectedNearLocationViewDown = useCallback(() => {
    Animated.spring(selectedNearLocationViewPositionAnim, {
      toValue: { x: 0, y: selectedNearLocationViewDownY },
      useNativeDriver: true,
    }).start();
  }, [selectedNearLocationViewPositionAnim]);

  const renderSelectedNearLocationInfoView = selectedNearLocation => {
    if (!selectedNearLocation || !selectedNearLocation.name) {
      return null;
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: theme.radius.base,
              borderWidth: 2,
              borderColor: theme.color.border,
            }}
            source={{
              uri: selectedNearLocation?.photo,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: '800' }}>{selectedNearLocation?.name}</Text>
        </View>
        <Text>{selectedNearLocation?.address}</Text>
        <Text>{selectedNearLocation?.category}</Text>

        <TouchableOpacity
          style={{
            backgroundColor: theme.color.bright.blue,
            marginTop: 30,
            alignItems: 'center',
            borderRadius: theme.radius.base,
            borderWidth: 2,
            borderColor: theme.color.border,
          }}
          onPress={() => {
            onValueChange(selectedNearLocation);
            closeModal();
          }}>
          <Text style={{ fontSize: 24, fontWeight: '800' }}>선택</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.titleStyle}>
        {type} {required ? <Text style={styles.requiredStyle}>*</Text> : null}
      </Text>

      <TouchableOpacity onPress={openModal}>
        <Text style={{ color: theme.font.color }}>{value?.name}</Text>
        <View style={styles.dateInputView} />
      </TouchableOpacity>

      <ModalCover visible={showModal} onRequestClose={closeModal}>
        <View style={styles.backgroundMapView}>
          <MapView ref={webViewRef} onMessageHandler={onMessageHandler} />
        </View>

        <View style={styles.mapInterfaceView} pointerEvents="box-none">
          {/* <View style={styles.mapSaerchInputView}>
            <TextInput style={styles.mapSearchInput} value={searchValue} onChangeText={setSearchValue} />
          </View> */}

          {showSearchCurrentMapButton ? (
            <TouchableOpacity style={styles.mapSearchNearButton} onPress={onSearchNear}>
              <Text style={styles.mapSearchNearText}>현 지도에서 검색</Text>
            </TouchableOpacity>
          ) : null}

          {/* {showSearchResultList ? <MapSearchResultList items={searchResult} /> : null} */}

          <Animated.View
            style={[
              styles.selectedNearLocationView,
              {
                transform: [
                  { translateX: selectedNearLocationViewPositionAnim.x },
                  { translateY: selectedNearLocationViewPositionAnim.y },
                ],
              },
            ]}>
            <TouchableOpacity
              style={styles.selectedNearLocationCloseButton}
              onPress={() => closeSelectedNearLocationView()}>
              <Text>X</Text>
            </TouchableOpacity>

            {renderSelectedNearLocationInfoView(selectedNearLocation)}
          </Animated.View>
        </View>
      </ModalCover>
    </View>
  );
};

const styles = StyleSheet.create({
  requiredStyle: {
    color: theme.color.alert,
  },
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
    width: searchInputWidth,
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
  selectedNearLocationView: {
    position: 'absolute',
    width: selectedNearLocationViewWidth,
    height: selectedNearLocationViewHeight,
    padding: 20,
    backgroundColor: theme.color.background,

    alignItems: 'center',

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  selectedNearLocationCloseButton: {
    height: 40,
    width: 40,
    backgroundColor: theme.color.bright.purple,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
});

export default MapLocationInput;
