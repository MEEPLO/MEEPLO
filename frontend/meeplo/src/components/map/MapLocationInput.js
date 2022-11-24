import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNearLocations } from '../../redux/locationSlice';
import Geolocation from 'react-native-geolocation-service';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

import { theme } from '../../assets/constant/DesignTheme';
import { MESSAGE_TYPE, createMessage, parseMessage } from '../../helper/message';
import { getAmuseRecommendation, clearRecommendedAmuses } from '../../redux/recommendationSlice';
import FontText from '../common/FontText';
import { BUTTON_TEXT } from '../../assets/constant/string';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';
import LoadingModal from '../common/LoadingModal';

const screen = Dimensions.get('screen');
const selectedLocationInfoViewWidth = screen.width * 0.95;
const selectedLocationInfoViewHeight = screen.height * 0.8;
const selectedLocationInfoViewUpY = screen.height * 0.55;
const selectedLocationInfoViewDownY = screen.height * 1;

const selectedLocationPrimaryFontSize = screen.height * 0.023;
const selectedLocationSecondaryFontSize = screen.height * 0.017;
const selectedLocationPhotoSize = screen.height * 0.1;

const MapLocationInput = ({ type, required, value, onValueChange, keywords, meet }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSearchCurrentMapButton, setShowSearchCurrentMapButton] = useState(true);
  const [mapCenter, setMapCenter] = useState({});
  const [mapZoomLevel, setMapZoomLevel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState();
  const [showSelectedLocationInfoView, setShowSelectedLocationInfoView] = useState(false);

  const webViewRef = useRef();
  const selectedLocationInfoViewPositionAnim = useRef(new Animated.ValueXY()).current;
  const recommendedAmuses = useSelector(state => state?.recommendation?.recommendedAmuses);
  const isRecommendationLoading = useSelector(state => state?.recommendation?.isLoading);

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
    setMapViewPosition();
  };
  const closeModal = () => {
    closeSelectedLocationInfoView();
    setShowModal(false);
    dispatch(clearRecommendedAmuses());
  };
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
        if (!meet || !meet.id) {
          setMapCenter(body.center);
          setMapZoomLevel(body.level);
        }
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
      keywords: keywords?.map(keyword => {
        return { content: keyword };
      }),
    };

    dispatch(getAmuseRecommendation(form));
  };

  const onMapViewLoad = () => {
    setMapViewPosition();
  };

  const setMapViewPosition = () => {
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
      <View
        style={{
          width: selectedLocationInfoViewWidth,
          paddingHorizontal: screen.width * 0.1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Image
            style={{
              width: selectedLocationPhotoSize,
              height: selectedLocationPhotoSize,
              borderRadius: theme.radius.base,
              borderWidth: 2,
              borderColor: theme.color.border,
            }}
            source={{
              uri: location?.photo,
            }}
          />
          <FontText style={{ fontSize: selectedLocationPrimaryFontSize, fontWeight: 'bold', color: 'gray' }}>
            {location?.name}
          </FontText>
        </View>
        <FontText style={{ fontSize: selectedLocationSecondaryFontSize }}>{location?.address}</FontText>
        <FontText style={{ fontSize: selectedLocationSecondaryFontSize }}>{location?.category}</FontText>

        <TouchableOpacity
          style={{
            height: 45,
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
          <FontText
            style={{
              fontSize: selectedLocationPrimaryFontSize,
              lineHeight: 37,
              fontWeight: 'bold',
              color: theme.color.border,
            }}>
            선택
          </FontText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FontText style={styles.titleStyle}>
        {type} {required ? <FontText style={styles.requiredStyle}>*</FontText> : null}
      </FontText>

      <TouchableOpacity onPress={openModal}>
        <FontText style={{ color: theme.font.color }}>{value?.name?.length > 0 ? value.name : ''}</FontText>
        <View style={styles.dateInputView} />
      </TouchableOpacity>

      <ModalCover visible={showModal} onRequestClose={closeModal}>
        <View style={styles.backgroundMapView}>
          <MapView ref={webViewRef} onMessageHandler={onMessage} onLoadEnd={onMapViewLoad} />
        </View>

        <View style={styles.mapInterfaceView} pointerEvents="box-none">
          {showSearchCurrentMapButton ? (
            <TouchableOpacity style={styles.mapSearchNearButton} onPress={onSearchNear}>
              <FontText style={styles.mapSearchNearText}>{BUTTON_TEXT.FIND_NEAR_LOCATION_BUTTON}</FontText>
            </TouchableOpacity>
          ) : null}

          {keywords?.length > 0 ? (
            <TouchableOpacity style={styles.recommendationButton} onPress={onPressRecommendation}>
              <FontText style={styles.recommendationButtonText}>{BUTTON_TEXT.RECOMMENDATE_LOCATION_BUTTON}</FontText>
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
              {/* <FontText>X</FontText> */}
              <FontAwesomeIcon icon={faXmark} size={17} style={{ color: '#585858' }} />
            </TouchableOpacity>

            {renderSelectedLocationInfoView(selectedLocation)}
          </Animated.View>
        </View>
      </ModalCover>
      <LoadingModal visible={isLoading || isRecommendationLoading} />
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
    marginBottom: 20,
  },
  dateInputView: {
    width: screen.width * 0.9,
    borderColor: theme.color.disabled,
    borderBottomWidth: 1,
    paddingBottom: 15,
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
    paddingVertical: 10,
    paddingHorizontal: 15,

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  mapSearchNearText: {
    color: 'white',
    fontWeight: 'bold',
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
