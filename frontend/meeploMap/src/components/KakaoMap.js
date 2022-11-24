import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline, MarkerClusterer } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

import { createMessage, parseMessage, MESSAGE_TYPE } from '../helper/message';
import { theme } from '../helper/theme';
import { MARKER_TYPE, MARKER_COLOR, getMarker } from '../helper/marker';

const NearLocationOverlay = styled.div`
  background-color: #fff0b9;
  padding: 1px 8px 1px 8px;

  top: 10px;

  /* border: 2px solid #585858;
  border-radius: 7px; */
  font-size: 14px;
  align-items: center;
  text-align: center;
`;

const KakaoMap = () => {
  // const [test, setTest] = useState('');
  const [mapHeight, setMapHeight] = useState('880px');
  const [center, setCenter] = useState({ lat: 37.50119278, lng: 127.03975728 });
  const [level, setLevel] = useState(3);

  const [nearLocations, setNearLocations] = useState([]);
  const [searchedStations, setSearchedStations] = useState([]);
  const [recommendedStations, setRecommendedStations] = useState([]);
  const [recommendedAmuses, setRecommendedAmuses] = useState([]);
  const [selectedStation, setSelectedStation] = useState({});

  const mapRef = useRef();
  const recommendedBounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    if (Array.isArray(recommendedStations) && Array.isArray(recommendedStations[0]?.requiredTimes)) {
      setSelectedStation(recommendedStations[0]);
      recommendedStations[0].requiredTimes.forEach(time => {
        bounds.extend(new kakao.maps.LatLng(time.startLocation.lat, time.startLocation.lng));
      });
    }

    return bounds;
  }, [recommendedStations]);

  const searchedBounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    if (Array.isArray(searchedStations)) {
      searchedStations.forEach(station => {
        bounds.extend(new kakao.maps.LatLng(station.lat, station.lng));
      });
    }

    return bounds;
  }, [searchedStations]);

  useEffect(() => {
    // mapRef.current.relayout();
  }, [mapRef.current]);

  useEffect(() => {
    if (recommendedBounds && mapRef.current) {
      mapRef.current.setBounds(recommendedBounds);
    }
  }, [recommendedBounds]);

  useEffect(() => {
    if (searchedBounds && mapRef.current) {
      mapRef.current.setBounds(searchedBounds);
    }
  }, [searchedBounds]);

  useEffect(() => {
    if (mapRef && mapRef.current) {
      mapRef.current.relayout();
    }
  }, [mapHeight]);

  useEffect(() => {
    const isAndroid = () => {
      return navigator?.userAgent?.toLowerCase()?.indexOf('android') > -1;
    };

    postMessage(
      createMessage(MESSAGE_TYPE.INIT_MAP, {
        center: center,
        level: level,
      }),
    );

    const target = isAndroid() ? document : window;
    target.addEventListener('message', onMessage);
    return () => {
      target.removeEventListener('message', onMessage);
    };
  }, []);

  const onMessage = message => {
    processMessage(parseMessage(message.data));
  };

  const postMessage = msg => {
    if (typeof ReactNativeWebView !== 'undefined') {
      ReactNativeWebView?.postMessage(msg);
    }
  };

  const processMessage = data => {
    const { messageType, messageBody } = data;
    switch (messageType) {
      case MESSAGE_TYPE.INIT_MAP_HEIGHT:
        setMapHeight(`${messageBody}px`);
        break;
      case MESSAGE_TYPE.UPDATE_NEAR_LOCATIONS:
        setNearLocations(messageBody);
        break;
      case MESSAGE_TYPE.UPDATE_MAPVIEW_CENTER:
        setCenter(messageBody);
        break;
      case MESSAGE_TYPE.UPDATE_RECOMMENDED_STATIONS:
        setRecommendedStations(messageBody);
        break;
      case MESSAGE_TYPE.UPDATE_SEARCHED_STATIONS:
        setSearchedStations(messageBody);
        break;
      case MESSAGE_TYPE.UPDATE_RECOMMENDED_AMUSES:
        setRecommendedAmuses(messageBody);
        break;
    }
  };

  const onClickHandler = (_t, mouseEvent) => {
    const clickedPosition = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };

    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_APP_CENTER, {
        center: clickedPosition,
      }),
    );

    setCenter(clickedPosition);
  };

  const onZoomChangedHandler = target => {
    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_ZOOM_LEVEL, {
        level: target.getLevel(),
      }),
    );
  };

  const onDragEnd = map => {
    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_APP_CENTER, {
        center: {
          lat: map.getCenter().getLat(),
          lng: map.getCenter().getLng(),
        },
      }),
    );
  };

  const renderNearLocationsMarker = nearLocations => {
    if (Array.isArray(nearLocations)) {
      return nearLocations.map(location => (
        <>
          <CustomOverlayMap position={{ lat: location.lat, lng: location.lng }} yAnchor={-0.2}>
            <NearLocationOverlay>{location.name}</NearLocationOverlay>
          </CustomOverlayMap>
          <MapMarker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            image={getMarker(MARKER_TYPE.STORE, MARKER_COLOR.PURPLE)}
            clickable={true}
            onClick={() => {
              postMessage(createMessage(MESSAGE_TYPE.SELECT_NEAR_LOCATION, location));
              setCenter({ lat: location.lat, lng: location.lng });
            }}
          />
        </>
      ));
    }

    return null;
  };

  const renderRecommendedStationMarker = stations => {
    if (Array.isArray(stations)) {
      return stations.map(station => (
        <div>
          <MapMarker
            position={{ lat: station.lat, lng: station.lng }}
            image={getMarker(MARKER_TYPE.STATION, MARKER_COLOR.GREEN)}
            onClick={() => {
              setCenter({
                lat: station?.lat,
                lng: station?.lng,
              });
              setSelectedStation(station);
              postMessage(
                createMessage(MESSAGE_TYPE.SELECT_SEARCHED_STATION, { ...station, markerType: 'recommended' }),
              );
            }}
          />

          <CustomOverlayMap position={{ lat: station.lat, lng: station.lng }} yAnchor={3}>
            <div
              style={{
                backgroundColor: theme.color.bright.green,
                color: theme.font.color,
                fontSize: 10,
                padding: 5,

                borderWidth: theme.border.thin,
                borderRadius: theme.radius.base,
                borderColor: theme.color.border,
              }}>
              {station?.name ? `${station.name}역` : ''}
            </div>
          </CustomOverlayMap>
        </div>
      ));
    }
    return null;
  };
  const renderRecommendedStationStartMarker = stations => {
    if (Array.isArray(stations) && stations[0] && Array.isArray(stations[0].requiredTimes)) {
      return stations[0].requiredTimes.map(time => {
        return (
          <div>
            <MapMarker
              position={{
                lat: time.startLocation.lat,
                lng: time.startLocation.lng,
              }}
              image={getMarker(MARKER_TYPE.USER, MARKER_COLOR.ORANGE)}
            />
            <CustomOverlayMap
              position={{
                lat: time.startLocation.lat,
                lng: time.startLocation.lng,
              }}
              yAnchor={4}>
              <div
                style={{
                  backgroundColor: '#5A5A5A',
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                {time.memberName}
              </div>
            </CustomOverlayMap>

            <CustomOverlayMap
              position={{
                lat: time.startLocation.lat,
                lng: time.startLocation.lng,
              }}
              yAnchor={3}>
              <div
                style={{
                  backgroundColor: '#5A5A5A',
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 10,
                }}>
                {`${parseInt(time.time / 45)}분 소요`}
              </div>
            </CustomOverlayMap>
          </div>
        );
      });
    }

    return null;
  };
  const renderRecommendedStationPath = selectedStation => {
    if (selectedStation && Array.isArray(selectedStation.requiredTimes)) {
      return selectedStation.requiredTimes.map(time => {
        return (
          <div>
            <Polyline
              path={time.coordinates}
              strokeWeight={6}
              strokeColor="#000000"
              strokeOpacity={1}
              strokeStyle={'solid'}
            />
            <Polyline
              path={time.coordinates}
              strokeWeight={5}
              strokeColor="#2e5bff"
              strokeOpacity={1}
              strokeStyle={'solid'}
            />
            <Polyline
              path={time.coordinates}
              strokeWeight={1}
              strokeColor="#FFFFFF"
              strokeOpacity={1}
              strokeStyle={'shortdash'}
            />
          </div>
        );
      });
    }
    return null;
  };

  const renderSearchedStationMarker = stations => {
    if (Array.isArray(stations)) {
      return stations.map(station => {
        return (
          <div>
            <MapMarker
              position={{ lat: station.lat, lng: station.lng }}
              image={getMarker(MARKER_TYPE.STATION, MARKER_COLOR.NAVY)}
              onClick={() =>
                postMessage(createMessage(MESSAGE_TYPE.SELECT_SEARCHED_STATION, { ...station, markerType: 'searched' }))
              }
            />
            <CustomOverlayMap position={{ lat: station.lat, lng: station.lng }} yAnchor={3}>
              <div
                style={{
                  backgroundColor: theme.color.bright.red,
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                {station?.name ? `${station.name}역` : ''}
              </div>
            </CustomOverlayMap>
          </div>
        );
      });
    }
    return null;
  };

  const renderRecommendedAmusesMarker = amuses => {
    if (Array.isArray(amuses)) {
      return amuses.map(amuse => {
        return (
          <>
            <CustomOverlayMap position={{ lat: amuse.lat, lng: amuse.lng }} yAnchor={-0.2}>
              <NearLocationOverlay>{amuse.name}</NearLocationOverlay>
            </CustomOverlayMap>
            <MapMarker
              key={amuse.id}
              position={{ lat: amuse.lat, lng: amuse.lng }}
              image={getMarker(MARKER_TYPE.STORE, MARKER_COLOR.YELLOW)}
              clickable={true}
              onClick={() => {
                postMessage(createMessage(MESSAGE_TYPE.SELECT_RECOMMENDED_AMUSE, amuse));
                setCenter({ lat: amuse.lat, lng: amuse.lng });
              }}
            />
          </>
        );
      });
    }

    return null;
  };

  return (
    <>
      <Map
        center={center}
        level={level}
        isPanto={true}
        style={{ width: '100%', height: mapHeight }}
        onClick={onClickHandler}
        onZoomChanged={onZoomChangedHandler}
        onDragEnd={onDragEnd}
        ref={mapRef}>
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={3} // 클러스터 할 최소 지도 레벨
          disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
          calculator={[10, 30, 50]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이
          styles={[
            {
              // calculator 각 사이 값 마다 적용될 스타일을 지정한다
              width: '30px',
              height: '30px',
              background: theme.color.bright.green,
              opacity: 0.6,
              borderRadius: '15px',
              color: theme.font.color,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '31px',
            },
            {
              width: '40px',
              height: '40px',
              background: theme.color.bright.orange,
              opacity: 0.6,
              borderRadius: '20px',
              color: theme.font.color,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '41px',
            },
            {
              width: '50px',
              height: '50px',
              background: theme.color.bright.red,
              opacity: 0.6,
              borderRadius: '25px',
              color: theme.font.color,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '51px',
            },
            {
              width: '60px',
              height: '60px',
              background: theme.color.bright.alert,
              opacity: 0.6,
              borderRadius: '30px',
              color: theme.font.color,
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '61px',
            },
          ]}>
          {renderNearLocationsMarker(nearLocations)}
          {renderRecommendedAmusesMarker(recommendedAmuses)}
        </MarkerClusterer>
        {renderSearchedStationMarker(searchedStations)}
        {renderRecommendedStationMarker(recommendedStations)}
        {renderRecommendedStationStartMarker(recommendedStations)}
        {renderRecommendedStationPath(selectedStation)}

        <MapMarker position={center} image={getMarker(MARKER_TYPE.HERE, MARKER_COLOR.ALERT)}>
          {/* <div style={{ color: '#000' }}>{test}</div> */}
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
