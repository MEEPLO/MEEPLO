import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Map, MapMarker, CustomOverlayMap, Polyline } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';

import { createMessage, parseMessage, MESSAGE_TYPE } from '../helper/message';
import { theme } from '../helper/theme';
import { MARKER_TYPE, MARKER_COLOR, getMarker } from '../helper/marker';

const NearLocationOverlay = styled.div`
  background-color: #ffed8c;
  padding: 0 10px 0 10px;

  top: 10px;

  border: 2px solid #585858;
  border-radius: 10px;

  align-items: center;
  text-align: center;
`;

const KakaoMap = () => {
  const [mapHeight, setMapHeight] = useState('880px');
  const [center, setCenter] = useState({ lat: 37.50119278, lng: 127.03975728 });
  const [level, setLevel] = useState(3);

  const [nearLocations, setNearLocations] = useState([]);
  const [searchedStations, setSearchedStations] = useState([]);
  const [recommendedStations, setRecommendedStations] = useState([]);
  const [recommendedAmuses, setRecommendedAmuses] = useState([]);

  const mapRef = useRef();
  const recommendedBounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    if (Array.isArray(recommendedStations) && Array.isArray(recommendedStations[0]?.requiredTimes)) {
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
      case MESSAGE_TYPE.UPDATE_WEBVIEW_CENTER:
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

  const getRandomColor = () => {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    switch (getRandomInt(1, 8)) {
      case 1:
        return theme.color.bright.red;
      case 2:
        return theme.color.bright.orange;
      case 3:
        return theme.color.bright.yellow;
      case 4:
        return theme.color.bright.green;
      case 5:
        return theme.color.bright.blue;
      case 6:
        return theme.color.bright.navy;
      case 7:
        return theme.color.bright.purple;
      case 8:
        return theme.color.bright.gray;
    }
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
            image={getMarker(MARKER_TYPE.STORE, MARKER_COLOR.NAVY)}
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
        <MapMarker
          position={{ lat: station.lat, lng: station.lng }}
          image={getMarker(MARKER_TYPE.STATION, MARKER_COLOR.GREEN)}
          onClick={() => {
            postMessage(createMessage(MESSAGE_TYPE.SELECT_SEARCHED_STATION, station));
          }}
        />
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
              position={{ lat: time.startLocation.lat, lng: time.startLocation.lng }}
              image={getMarker(MARKER_TYPE.USER, MARKER_COLOR.PURPLE)}
            />
            <CustomOverlayMap position={{ lat: time.startLocation.lat, lng: time.startLocation.lng }} yAnchor={4}>
              <div
                style={{
                  backgroundColor: '#5A5A5A',
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                {time.groupMemberName}
              </div>
            </CustomOverlayMap>

            <CustomOverlayMap position={{ lat: time.startLocation.lat, lng: time.startLocation.lng }} yAnchor={3}>
              <div
                style={{
                  backgroundColor: '#5A5A5A',
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 10,
                }}>
                {`${time.time}분 소요`}
              </div>
            </CustomOverlayMap>
          </div>
        );
      });
    }

    return null;
  };
  const renderRecommendedStationPath = stations => {
    if (Array.isArray(stations) && stations[0] && Array.isArray(stations[0].requiredTimes)) {
      return stations[0].requiredTimes.map(time => {
        return (
          <Polyline
            path={time.coordinates}
            strokeWeight={10}
            strokeColor={theme.color.bright.red}
            strokeOpacity={1}
            strokeStyle={'solid'}
          />
        );
      });
    }
    return null;
  };

  const renderSearchedStationMaker = stations => {
    if (Array.isArray(stations)) {
      return stations.map(station => {
        return (
          <div>
            <MapMarker
              position={{ lat: station.lat, lng: station.lng }}
              image={getMarker(MARKER_TYPE.STATION, MARKER_COLOR.BLUE)}
              onClick={() => postMessage(createMessage(MESSAGE_TYPE.SELECT_SEARCHED_STATION, station))}
            />
            <CustomOverlayMap position={{ lat: station.lat, lng: station.lng }} yAnchor={3}>
              <div
                style={{
                  backgroundColor: '#5A5A5A',
                  color: 'white',
                  fontSize: 10,
                  padding: 5,
                  borderRadius: 5,
                }}>
                {station.name}역
              </div>
            </CustomOverlayMap>
          </div>
        );
      });
    }
    return null;
  };

  const renderRecommendedAmuses = amuses => {
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
              image={getMarker(MARKER_TYPE.STORE, MARKER_COLOR.ORANGE)}
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
        {renderNearLocationsMarker(nearLocations)}
        {renderRecommendedStationMarker(recommendedStations)}
        {renderRecommendedStationStartMarker(recommendedStations)}
        {renderRecommendedStationPath(recommendedStations)}
        {renderRecommendedAmuses(recommendedAmuses)}
        {renderSearchedStationMaker(searchedStations)}

        <MapMarker position={center} image={getMarker(MARKER_TYPE.HERE, MARKER_COLOR.RED)}>
          {/* <div style={{ color: '#000' }}>{test}</div> */}
        </MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
