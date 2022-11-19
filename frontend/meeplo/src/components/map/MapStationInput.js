import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

import { theme } from '../../assets/constant/DesignTheme';
import { MESSAGE_TYPE, createMessage, parseMessage } from '../../helper/message';
import { getMiddlePoint } from '../../redux/recommendationSlice';
import { getStationList } from '../../redux/locationSlice';

import ModalCover from '../common/ModalCover';
import MapView from './MapView';
import LoadingModal from '../common/LoadingModal';

const screen = Dimensions.get('screen');
const searchInputWidth = screen.width * 0.7;
const selectedStationInfoWidth = screen.width * 0.95;
const selectedStationInfoHeight = screen.height * 0.5;
const selectedStationInfoUpY = screen.height * 0.5;
const selectedStationInfoDownY = screen.height * 1;

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }
};

const MapStationInput = ({ type, required, value, onValueChange, state }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showSelectedStationInfo, setShowSelectedStationInfo] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mapCenter, setMapCenter] = useState();
  const [mapZoomLevel, setMapZoomLevel] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const webViewRef = useRef();
  const selectedLocationInfoPositionAnim = useRef(new Animated.ValueXY()).current;
  const isRecommendationLoading = useSelector(state => state?.recommendation?.isLoading);
  const recommendedStations = useSelector(state => state?.recommendation?.recommendedStations);
  const isSearchStationLoading = useSelector(state => state?.location?.isLoading);
  const searchedStations = useSelector(state => state?.locations?.stations);

  useEffect(() => {
    if (Array.isArray(recommendedStations)) {
      postMessage(MESSAGE_TYPE.UPDATE_RECOMMENDED_STATIONS, recommendedStations);
      openSelectedStationInfo();
    }
  }, [recommendedStations]);

  useEffect(() => {
    if (Array.isArray(searchedStations)) {
      console.log(searchedStations);
      openSelectedStationInfo();
    }
  }, [searchedStations]);

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    if (webViewRef && webViewRef.current) {
      postMessage(MESSAGE_TYPE.INIT_MAP_HEIGHT, screen.height);
    }
  }, [webViewRef.current]);

  const getCurrentPosition = () => {
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
    getCurrentPosition();
  };
  const closeModal = () => setShowModal(false);
  const openSelectedStationInfo = () => {
    setShowSelectedStationInfo(true);
  };
  const closeSelectedStationInfo = () => {
    setShowSelectedStationInfo(false);
  };

  const selectedStationUp = useCallback(() => {
    Animated.spring(selectedLocationInfoPositionAnim, {
      toValue: { x: 0, y: selectedStationInfoUpY },
      useNativeDriver: true,
    }).start();
  }, [selectedLocationInfoPositionAnim]);

  const selectedStationDown = useCallback(() => {
    Animated.spring(selectedLocationInfoPositionAnim, {
      toValue: { x: 0, y: selectedStationInfoDownY },
      useNativeDriver: true,
    }).start();
  }, [selectedLocationInfoPositionAnim]);

  useEffect(() => {
    if (showSelectedStationInfo) {
      selectedStationUp();
    } else {
      selectedStationDown();
    }
  }, [showSelectedStationInfo, selectedStationUp, selectedStationDown]);

  const onMessage = data => {
    processMessage(parseMessage(data.nativeEvent.data));
  };

  const postMessage = (messageType, messageBody) => {
    webViewRef.current.postMessage(createMessage(messageType, messageBody));
  };

  const processMessage = message => {
    const messageType = message.messageType;
    const body = message.messageBody;
    switch (messageType) {
      default:
        break;
    }
  };

  const onPressRecommendation = () => {
    dispatch(getMiddlePoint(mock));
  };

  const onPressSearchStation = () => {
    dispatch(getStationList(searchValue));
  };

  const renderSelectedStationInfoView = station => {
    // if (!station) return null;

    return (
      <View>
        <Text>여러분들의 중간 지점은...</Text>
        <Text>삼각지역</Text>
        <Text>평균 이동 시간 34분</Text>

        <TouchableOpacity>
          <Text>만남 장소로 지정</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>여기서 놀 곳 추천 받기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMapInterface = () => {
    return (
      <View style={styles.mapInterfaceView} pointerEvents="box-none">
        <View style={styles.mapSearchInputView}>
          <TextInput style={styles.mapSearchInput} value={searchValue} onChangeText={setSearchValue} />
          <TouchableOpacity style={styles.mapSearchButton} onPress={onPressSearchStation}>
            <Text>역 검색</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.recommendationButton} onPress={onPressRecommendation}>
          <Text style={styles.recommendationButtonText}>중간 지점 추천 받기</Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.selectedStationInfoView,
            {
              transform: [
                { translateX: selectedLocationInfoPositionAnim.x },
                { translateY: selectedLocationInfoPositionAnim.y },
              ],
            },
          ]}>
          <TouchableOpacity style={styles.selectedStationInfoCloseButton} onPress={() => closeSelectedStationInfo()}>
            <Text>X</Text>
          </TouchableOpacity>
          {renderSelectedStationInfoView()}
        </Animated.View>
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
        {!isLoading && renderMapInterface()}
      </ModalCover>

      <LoadingModal visible={isLoading || isRecommendationLoading || isSearchStationLoading} />
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
  mapSearchInputView: {
    width: screen.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  mapSearchInput: {
    width: searchInputWidth,
    height: 40,
    borderWidth: 1,
    borderColor: theme.color.border,
    borderRadius: theme.radius.input,
    padding: 10,
    backgroundColor: 'white',
  },
  mapSearchButton: {
    backgroundColor: theme.color.bright.red,
    paddingVertical: 10,
    paddingHorizontal: 15,

    borderWidth: theme.border.thin,
    borderColor: theme.color.border,
    borderRadius: theme.radius.base,
  },
  selectedStationInfoView: {
    position: 'absolute',
    width: selectedStationInfoWidth,
    height: selectedStationInfoHeight,
    padding: 20,
    backgroundColor: theme.color.background,

    alignItems: 'center',

    borderRadius: theme.radius.base,
    borderWidth: 2,
    borderColor: theme.color.border,
  },
  selectedStationInfoCloseButton: {
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

const mock = {
  groupId: 2,
  startLocations: [
    {
      // 성북구
      lat: 37.57861162637185,
      lng: 127.02046242004731,
      memberId: 1,
    },
    {
      // 사당역 근처
      lat: 37.4776116339714,
      lng: 126.97987605430608,
      memberId: 2,
    },
    {
      // 은평구
      lat: 37.620041424670816,
      lng: 126.91752724597757,
      memberId: 4,
    },
  ],
};

export default MapStationInput;
