import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNearLocations } from '../../redux/locationSlice';
import Geolocation from 'react-native-geolocation-service';

import { theme } from '../../assets/constant/DesignTheme';
import { MESSAGE_TYPE, createMessage, parseMessage } from '../../helper/message';
import { getAmuseRecommendation } from '../../redux/recommendationSlice';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';
import LoadingModal from '../common/LoadingModal';

const screen = Dimensions.get('screen');
const selectedLocationInfoViewWidth = screen.width * 0.95;
const selectedLocationInfoViewHeight = screen.height * 0.5;
const selectedLocationInfoViewUpY = screen.height * 0.5;
const selectedLocationInfoViewDownY = screen.height * 1;

const MapLocationInput = ({ type, required, value, onValueChange, state, meet }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSearchCurrentMapButton, setShowSearchCurrentMapButton] = useState(true);
  const [mapCenter, setMapCenter] = useState({});
  const [mapZoomLevel, setMapZoomLevel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState();
  const [showSelectedLocationInfoView, setShowSelectedLocationInfoView] = useState();

  const webViewRef = useRef();
  const selectedLocationInfoViewPositionAnim = useRef(new Animated.ValueXY()).current;
  const recommendedAmuses = useSelector(state => state?.recommendation?.recommendedAmuses);

  useEffect(() => {
    if (meet && meet.id) {
      const currentPosition = {
        lat: meet.lat,
        lng: meet.lng,
      };
      setMapCenter(currentPosition);
      postMessage(MESSAGE_TYPE.UPDATE_MAPVIEW_CENTER, currentPosition);
    } else {
      setCurrentPosition();
    }
    postMessage(MESSAGE_TYPE.INIT_MAP_HEIGHT, screen.height);
  }, [meet, webViewRef.current]);

  useEffect(() => {
    if (Array.isArray(recommendedAmuses)) {
      postMessage(MESSAGE_TYPE.UPDATE_RECOMMENDED_AMUSES, recommendedAmuses);
    }
  }, [recommendedAmuses]);

  useEffect(() => {
    if (mapZoomLevel <= 5) {
      setShowSearchCurrentMapButton(true);
    } else {
      setShowSearchCurrentMapButton(false);
    }
  }, [mapZoomLevel]);

  useEffect(() => {
    if (showSelectedLocationInfoView) {
      selectedLocationInfoViewUp();
    } else {
      selectedLocationInfoViewDown();
    }
  }, [showSelectedLocationInfoView, selectedLocationInfoViewUp, selectedLocationInfoViewDown]);

  const setCurrentPosition = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const currentPosition = {
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        };
        setMapCenter(currentPosition);
        postMessage(MESSAGE_TYPE.UPDATE_MAPVIEW_CENTER, currentPosition);
        setIsLoading(false);
      },
      error => {
        setIsLoading(false);
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, fastestInterval: 100 },
    );
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const openSelectedLocationInfoView = () => {
    setShowSelectedLocationInfoView(true);
  };
  const closeSelectedLocationInfoView = () => {
    setShowSelectedLocationInfoView(false);
  };

  const onMessage = data => {
    processMessage(parseMessage(data.nativeEvent.data));
  };

  const postMessage = (messageType, messageBody) => {
    if (webViewRef && webViewRef.current) {
      webViewRef.current.postMessage(createMessage(messageType, messageBody));
    }
  };

  const processMessage = message => {
    const messageType = message.messageType;
    const body = message.messageBody;
    switch (messageType) {
      case MESSAGE_TYPE.INIT_MAP:
        setMapCenter(body.center);
        setMapZoomLevel(body.level);
        break;
      case MESSAGE_TYPE.UPDATE_APP_CENTER:
        setMapCenter(body.center);
        break;
      case MESSAGE_TYPE.UPDATE_ZOOM_LEVEL:
        setMapZoomLevel(body.level);
        break;
      case MESSAGE_TYPE.SELECT_NEAR_LOCATION:
        setSelectedLocation(body);
        openSelectedLocationInfoView();
        break;
      case MESSAGE_TYPE.SEELCT_RECOMMENDED_AMUSE:
        setSelectedLocation(body);
        openSelectedLocationInfoView();
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
    setIsLoading(true);
    dispatch(
      getNearLocations({
        lat: mapCenter?.lat,
        lng: mapCenter?.lng,
        radius: getRadiusKM(mapZoomLevel),
      }),
    )
      .unwrap()
      .then(payload => {
        const locations = payload.locations;
        postMessage(MESSAGE_TYPE.UPDATE_NEAR_LOCATIONS, locations);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onPressRecommendation = () => {
    const form = {
      startLocation: {
        lat: mapCenter?.lat,
        lng: mapCenter?.lng,
      },
      keywords: state?.keywords?.map(keyword => {
        return { content: keyword };
      }),
    };

    dispatch(getAmuseRecommendation(form));
  };

  const selectedLocationInfoViewUp = useCallback(() => {
    Animated.spring(selectedLocationInfoViewPositionAnim, {
      toValue: { x: 0, y: selectedLocationInfoViewUpY },
      useNativeDriver: true,
    }).start();
  }, [selectedLocationInfoViewPositionAnim]);

  const selectedLocationInfoViewDown = useCallback(() => {
    Animated.spring(selectedLocationInfoViewPositionAnim, {
      toValue: { x: 0, y: selectedLocationInfoViewDownY },
      useNativeDriver: true,
    }).start();
  }, [selectedLocationInfoViewPositionAnim]);

  const renderSelectedLocationInfoView = location => {
    if (!location || !location.name) {
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
              uri: location?.photo,
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gray' }}>{location?.name}</Text>
        </View>
        <Text>{location?.address}</Text>
        <Text>{location?.category}</Text>

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
            onValueChange(location);
            closeModal();
          }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'gray' }}>선택</Text>
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
          <MapView ref={webViewRef} onMessageHandler={onMessage} />
        </View>

        <View style={styles.mapInterfaceView} pointerEvents="box-none">
          {showSearchCurrentMapButton ? (
            <TouchableOpacity style={styles.mapSearchNearButton} onPress={onSearchNear}>
              <Text style={styles.mapSearchNearText}>현 지도에서 검색</Text>
            </TouchableOpacity>
          ) : null}

          {state?.keywords?.length > 0 ? (
            <TouchableOpacity style={styles.recommendationButton} onPress={onPressRecommendation}>
              <Text style={styles.recommendationButtonText}>놀 곳 추천 받기</Text>
            </TouchableOpacity>
          ) : null}

          <Animated.View
            style={[
              styles.selectedLocationInfoView,
              {
                transform: [
                  { translateX: selectedLocationInfoViewPositionAnim.x },
                  { translateY: selectedLocationInfoViewPositionAnim.y },
                ],
              },
            ]}>
            <TouchableOpacity
              style={styles.selectedLocationInfoViewButton}
              onPress={() => closeSelectedLocationInfoView()}>
              <Text>X</Text>
            </TouchableOpacity>

            {renderSelectedLocationInfoView(selectedLocation)}
          </Animated.View>
        </View>
      </ModalCover>
      <LoadingModal visible={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  requiredStyle: {
    color: theme.color.alert,
  },
  titleStyle: {
    color: theme.font.color,
    fontWeight: 'bold',
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
  selectedLocationInfoView: {
    position: 'absolute',
    width: selectedLocationInfoViewWidth,
    height: selectedLocationInfoViewHeight,
    padding: 20,
    backgroundColor: theme.color.background,

    alignItems: 'center',

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  selectedLocationInfoViewButton: {
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
  recommendationButton: {
    position: 'absolute',
    bottom: 120,

    width: screen.width * 0.8,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.color.pale.yellow,

    borderWidth: theme.border.thick,
    borderColor: theme.color.border,
    borderRadius: theme.radius.base,
  },
  recommendationButtonText: {
    color: theme.font.color,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default MapLocationInput;
