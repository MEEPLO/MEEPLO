import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from '@emotion/styled';
import { createMessage, parseMessage, MESSAGE_TYPE } from '../helper/message';

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
  const [test, setTest] = useState('마커마커마커');
  const [nearLocations, setNearLocations] = useState([]);
  const [state, setState] = useState({
    center: { lat: 37.50119278, lng: 127.03975728 },
    level: 3,
    isPanto: false,
  });

  useEffect(() => {
    const isAndroid = () => {
      return navigator?.userAgent?.toLowerCase()?.indexOf('android') > -1;
    };

    postMessage(
      createMessage(MESSAGE_TYPE.INIT_MAP, {
        center: state.center,
        level: state.level,
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
    setTest(data.messageType);
    switch (data.messageType) {
      case MESSAGE_TYPE.UPDATE_NEAR_LOCATIONS:
        setNearLocations(data.messageBody);
        break;
    }
  };

  const onClickHandler = (_t, mouseEvent) => {
    const clickedPosition = {
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    };

    postMessage(
      createMessage(MESSAGE_TYPE.UPDATE_CENTER, {
        center: clickedPosition,
      }),
    );

    setState({
      center: clickedPosition,
      isPanto: true,
    });
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
      createMessage(MESSAGE_TYPE.UPDATE_CENTER, {
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
            clickable={true}
            onClick={() => {
              postMessage(createMessage(MESSAGE_TYPE.SELECT_NEAR_LOCATION, location));
              setState({
                center: { lat: location.lat, lng: location.lng },
                isPanto: true,
              });
            }}
          />
        </>
      ));
    }

    return null;
  };

  return (
    <>
      <Map
        center={state.center}
        level={state.level}
        isPanto={state.isPanto}
        style={{ width: '100%', height: '1024px' }}
        onClick={onClickHandler}
        onZoomChanged={onZoomChangedHandler}
        onDragEnd={onDragEnd}>
        <MapMarker position={state.center} title={test}>
          <div style={{ color: '#000' }}>{test}</div>
        </MapMarker>
        {renderNearLocationsMarker(nearLocations)}
      </Map>
    </>
  );
};

export default KakaoMap;
